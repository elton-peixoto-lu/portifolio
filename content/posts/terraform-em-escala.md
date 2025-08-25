---
title: "Terraform em escala: Governança sem burocracia"
description: "Estratégias práticas para gerenciar infraestrutura como código em organizações grandes, mantendo agilidade e compliance."
date: "2024-01-05"
tags: ["Terraform", "IaC", "Cloud", "Governance", "AWS"]
author: "Elton Peixoto"
published: true
image: null
---

# Terraform em escala: Governança sem burocracia

Gerenciar **Infrastructure as Code (IaC)** com Terraform é relativamente simples para projetos pequenos. O desafio real aparece quando você tem:

- **50+ repositórios** com código Terraform
- **Múltiplas contas AWS** e ambientes  
- **Times diferentes** com níveis variados de expertise
- **Requisitos de compliance** e auditoria

Como manter governança sem transformar deploy em burocracia? Vou compartilhar estratégias que funcionaram em organizações grandes.

## O problema da anarquia do Terraform

Sem estrutura clara, você acaba com:

```hcl
# Cada time fazendo do seu jeito
resource "aws_instance" "web" {
  ami           = "ami-12345"  # AMI hardcoded
  instance_type = "t2.large"  # Sem justificativa do tamanho
  
  tags = {
    Name = "web-server"  # Tags inconsistentes
    Env  = "prod"
  }
}
```

```hcl
# Outro time, outro padrão
resource "aws_ec2_instance" "api" {  # Nome diferente
  ami                    = var.ami_id
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.api.id]
  
  tags = {
    Environment = "production"  # Tags diferentes
    Application = "api"
    Team        = "backend"
  }
}
```

## Estratégia 1: Módulos como contratos

Crie módulos que são **contratos de infraestrutura**:

```hcl
# modules/webapp/main.tf
module "webapp" {
  source = "./modules/webapp"
  
  # Parâmetros obrigatórios
  app_name     = var.app_name
  environment  = var.environment
  team         = var.team
  
  # Configurações opcionais com defaults seguros
  instance_type    = var.instance_type    # default: t3.micro
  min_capacity     = var.min_capacity     # default: 2
  max_capacity     = var.max_capacity     # default: 10
  
  # Compliance automático
  enable_monitoring = true
  enable_backup     = var.environment == "prod" ? true : false
  
  # Tags padronizadas automaticamente
  tags = local.standard_tags
}

locals {
  standard_tags = {
    Team        = var.team
    Environment = var.environment
    Application = var.app_name
    ManagedBy   = "terraform"
    BackupPolicy = var.environment == "prod" ? "daily" : "none"
    
    # Compliance tags
    DataClass   = var.data_classification
    CostCenter  = data.aws_organizations_organization.current.accounts[0].name
  }
}
```

### Validação nos módulos

```hcl
# Validações que impedem problemas
variable "environment" {
  description = "Environment name"
  type        = string
  
  validation {
    condition = contains([
      "dev", "staging", "prod"
    ], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
  
  validation {
    condition = can(regex("^t3\\.", var.instance_type)) || var.environment != "prod"
    error_message = "Production environment requires t3 instance types for cost optimization."
  }
}
```

## Estratégia 2: Pipeline de validação multicamadas

### 1. Validação local (pre-commit)

```yaml
# .pre-commit-config.yaml
repos:
- repo: https://github.com/antonbabenko/pre-commit-terraform
  rev: v1.77.0
  hooks:
    - id: terraform_fmt
    - id: terraform_validate
    - id: terraform_tflint
    - id: terraform_checkov  # Security scanning
    
- repo: local
  hooks:
    - id: cost-estimation
      name: Cost Estimation
      entry: ./scripts/cost-estimate.sh
      language: script
```

### 2. Pipeline CI/CD com gates

```yaml
# .github/workflows/terraform.yml
name: Terraform CI/CD

on:
  pull_request:
    paths: ['**/*.tf', '**/*.tfvars']
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Validação de sintaxe
      - name: Terraform Format Check
        run: terraform fmt -check -recursive
      
      # Security scanning
      - name: Run Checkov
        run: checkov -d . --framework terraform
      
      # Cost estimation
      - name: Cost Estimation
        uses: infracost/actions/setup@v2
        with:
          api-key: ${{ secrets.INFRACOST_API_KEY }}
      
      - name: Generate cost diff
        run: |
          infracost breakdown --path . \
                              --format json \
                              --out-file /tmp/infracost.json
          
          infracost comment github --path /tmp/infracost.json \
                                   --github-token ${{ secrets.GITHUB_TOKEN }} \
                                   --pull-request ${{ github.event.number }} \
                                   --behavior update

  plan:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      # Plan com approval automático para dev
      - name: Terraform Plan
        run: |
          terraform plan -var-file="environments/${{ github.event.inputs.environment }}.tfvars"
      
      # Requer approval manual para prod
      - name: Require Approval for Production
        if: github.event.inputs.environment == 'prod'
        uses: trstringer/manual-approval@v1
        with:
          secret: ${{ github.TOKEN }}
          approvers: platform-team
          minimum-approvals: 2
```

## Estratégia 3: State management distribuído

Para organizações grandes, state centralizado não escala. Use padrão de **state por domínio**:

```hcl
# Estrutura de states
terraform/
├── global/              # Recursos compartilhados
│   ├── iam/
│   ├── dns/
│   └── monitoring/
├── environments/
│   ├── dev/
│   │   ├── networking/
│   │   ├── databases/
│   │   └── applications/
│   └── prod/
│       ├── networking/
│       ├── databases/
│       └── applications/
```

```hcl
# Cada domínio tem seu próprio backend
terraform {
  backend "s3" {
    bucket         = "company-terraform-state"
    key            = "environments/prod/networking/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}

# Data sources para compartilhar informações entre states
data "terraform_remote_state" "networking" {
  backend = "s3"
  config = {
    bucket = "company-terraform-state"
    key    = "environments/prod/networking/terraform.tfstate"
    region = "us-east-1"
  }
}
```

## Estratégia 4: Policies as Code

Use **Open Policy Agent (OPA)** para governança automatizada:

```rego
# policy/aws_security.rego
package terraform.security

# Deny S3 buckets without encryption
deny[msg] {
    r := input.resource_changes[_]
    r.type == "aws_s3_bucket"
    not r.change.after.server_side_encryption_configuration
    msg := sprintf("S3 bucket '%s' must have encryption enabled", [r.address])
}

# Require specific tags
required_tags := ["Team", "Environment", "DataClass", "CostCenter"]

deny[msg] {
    r := input.resource_changes[_]
    r.type == "aws_instance"
    missing := required_tags[_]
    not r.change.after.tags[missing]
    msg := sprintf("Resource '%s' missing required tag '%s'", [r.address, missing])
}

# Restrict instance types in prod
allowed_prod_instances := ["t3.micro", "t3.small", "t3.medium", "m5.large"]

deny[msg] {
    r := input.resource_changes[_]
    r.type == "aws_instance"
    r.change.after.tags.Environment == "prod"
    not r.change.after.instance_type in allowed_prod_instances
    msg := sprintf("Instance type '%s' not allowed in production", [r.change.after.instance_type])
}
```

```bash
# Validação no pipeline
terraform plan -out=tfplan
terraform show -json tfplan > plan.json
opa exec --decision terraform/security/deny --bundle policy/ plan.json
```

## Estratégia 5: Observabilidade de infraestrutura

Monitore suas mudanças de infraestrutura:

```hcl
# Módulo que sempre inclui observabilidade
resource "aws_cloudwatch_event_rule" "terraform_changes" {
  name_prefix = "terraform-changes-"
  
  event_pattern = jsonencode({
    source      = ["aws.cloudtrail"]
    detail-type = ["AWS Console Sign In via CloudTrail"]
    detail = {
      userIdentity = {
        type = ["AssumedRole"]
        arn  = [{prefix = "arn:aws:sts::${data.aws_caller_identity.current.account_id}:assumed-role/terraform-"}]
      }
    }
  })
}

resource "aws_cloudwatch_event_target" "slack_notification" {
  rule      = aws_cloudwatch_event_rule.terraform_changes.name
  target_id = "terraform-notification"
  arn       = aws_sns_topic.alerts.arn
  
  input_transformer {
    input_paths = {
      account = "$.detail.recipientAccountId"
      user    = "$.detail.userIdentity.arn" 
      time    = "$.time"
    }
    
    input_template = jsonencode({
      channel = "#infrastructure"
      text    = "Terraform change detected in account <account> by <user> at <time>"
    })
  }
}
```

## Dicas práticas

### 1. Versionamento de módulos

```hcl
# Use tags para versionamento
module "webapp" {
  source = "git::https://github.com/company/terraform-modules.git//webapp?ref=v1.2.0"
  # ...
}
```

### 2. Ambientes com configurações específicas

```hcl
# environments/prod.tfvars
instance_type = "t3.medium"
min_capacity  = 3
max_capacity  = 20
backup_enabled = true

# environments/dev.tfvars  
instance_type = "t3.micro"
min_capacity  = 1
max_capacity  = 3
backup_enabled = false
```

### 3. Documentação automática

```bash
# Gera documentação dos módulos automaticamente
terraform-docs markdown table --output-file README.md --output-mode inject ./modules/webapp
```

## Resultados esperados

Com essa estrutura, você consegue:

- **Deploy seguro** com validações automáticas
- **Compliance** sem burocracia manual  
- **Autonomia** para os times dentro de guardrails
- **Visibilidade** de todas as mudanças
- **Escala** para centenas de recursos

A chave é balancear **flexibilidade** com **padronização**.

---

*Implementando Terraform em escala? Vamos trocar experiências no [LinkedIn](https://www.linkedin.com/in/elton-peixoto-914452296/).*
