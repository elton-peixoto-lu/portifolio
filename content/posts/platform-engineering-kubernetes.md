---
title: "Platform Engineering: Construindo abstrações que os desenvolvedores amam"
description: "Como criar plataformas internas em Kubernetes que aceleram o desenvolvimento sem sacrificar flexibilidade ou observabilidade."
date: "2024-01-10"
tags: ["Platform Engineering", "Kubernetes", "DevOps", "Developer Experience"]
author: "Elton Peixoto"
published: true
image: null
---

# Platform Engineering: Construindo abstrações que os desenvolvedores amam

**Platform Engineering** está se tornando uma disciplina fundamental para empresas que querem escalar desenvolvimento sem perder velocidade. Mas há uma diferença entre criar uma plataforma e criar uma plataforma que os desenvolvedores realmente querem usar.

## O problema das abstrações mal feitas

Quantas vezes você já viu isso acontecer?

1. **Equipe de infra cria uma "plataforma"** que é basicamente Kubernetes raw com alguns templates YAML
2. **Desenvolvedores reclamam** que é muito complexo
3. **Platform team adiciona mais abstrações** para "simplificar"
4. **Resultado:** Uma abstração leaky que é complexa E limitante

O segredo está em encontrar o **sweet spot** entre simplicidade e poder.

## Princípios para boas abstrações

### 1. Progressive Disclosure

Comece simples, mas permita complexidade quando necessário:

```yaml
# Nível 1: Deploy simples
apiVersion: platform.company.com/v1
kind: WebApp
metadata:
  name: my-api
spec:
  image: my-api:v1.0.0
  port: 8080
  replicas: 3
```

```yaml
# Nível 2: Configurações avançadas (opcional)
apiVersion: platform.company.com/v1
kind: WebApp
metadata:
  name: my-api
spec:
  image: my-api:v1.0.0
  port: 8080
  replicas: 3
  
  # Configurações avançadas opcionais
  scaling:
    minReplicas: 2
    maxReplicas: 10
    targetCPU: 70
  
  monitoring:
    slos:
      - name: availability
        target: 99.9
      - name: latency_p95
        target: 200ms
  
  networking:
    ingress:
      domains: ["api.company.com"]
      tls: true
```

### 2. Observabilidade Built-in

Toda aplicação deployada deve vir com observabilidade automaticamente:

```go
// Operator que injeta observabilidade automaticamente
func (r *WebAppReconciler) injectObservability(app *WebApp) {
    // ServiceMonitor para Prometheus
    serviceMonitor := &monitoringv1.ServiceMonitor{
        ObjectMeta: metav1.ObjectMeta{
            Name:      app.Name + "-metrics",
            Namespace: app.Namespace,
        },
        Spec: monitoringv1.ServiceMonitorSpec{
            Selector: metav1.LabelSelector{
                MatchLabels: map[string]string{
                    "app": app.Name,
                },
            },
            Endpoints: []monitoringv1.Endpoint{
                {
                    Port: "metrics",
                    Path: "/metrics",
                },
            },
        },
    }
    
    // Dashboards automáticos no Grafana
    dashboard := r.generateDashboard(app)
    
    // Alertas baseados em SLOs
    if app.Spec.Monitoring.SLOs != nil {
        alerts := r.generateSLOAlerts(app)
    }
}
```

### 3. Self-Service com Guardrails

Desenvolvedores devem conseguir fazer deploys sem tickets, mas com limites seguros:

```yaml
# Policy Engine (Open Policy Agent)
package platform.limits

# Máximo de recursos por namespace
max_cpu_per_namespace = 10
max_memory_per_namespace = "20Gi"
max_replicas_per_app = 50

# Namespaces permitidos para cada team
allowed_namespaces[team] = namespaces {
    team := input.metadata.labels.team
    team_config := data.teams[team]
    namespaces := team_config.allowed_namespaces
}

# Validação de recursos
deny[msg] {
    input.kind == "WebApp"
    input.spec.resources.cpu > "2"
    msg := "CPU limit cannot exceed 2 cores. Contact platform team for exceptions."
}
```

## Ferramental que funciona

### 1. Custom Resources + Operators

Para abstrações específicas do seu domínio:

```go
// WebApp CRD que gera Deployment + Service + Ingress + Monitoring
type WebAppSpec struct {
    Image    string            `json:"image"`
    Port     int32             `json:"port"`
    Replicas *int32            `json:"replicas,omitempty"`
    Env      map[string]string `json:"env,omitempty"`
    
    // Configurações avançadas opcionais
    Resources *ResourceRequirements `json:"resources,omitempty"`
    Scaling   *AutoScalingSpec      `json:"scaling,omitempty"`
    SLOs      []SLOSpec             `json:"slos,omitempty"`
}
```

### 2. GitOps com validação automática

```yaml
# ArgoCD Application com validação
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
spec:
  source:
    repoURL: https://github.com/company/my-app
    path: k8s/
    helm:
      parameters:
      - name: image.tag
        value: "{{.Values.image.tag}}"
  
  # Validation hooks
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - Validate=true
    - CreateNamespace=false
    
  # Pre-sync hooks para validação
  preSync:
  - name: validate-resources
    image: platform/validator:v1.0.0
    command: ["/bin/validate"]
    args: ["--manifest", "/tmp/manifests"]
```

### 3. Developer Portal integrado

Use algo como [Backstage](https://backstage.io) para centralizar tudo:

```yaml
# catalog-info.yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-api
  description: User management API
  annotations:
    kubernetes.io/deployment: my-api
    prometheus.io/service-monitor: my-api-metrics
    grafana.io/dashboard: my-api-dashboard
spec:
  type: service
  lifecycle: production
  owner: team-backend
  system: user-management
```

## Medindo sucesso da plataforma

Não meça apenas uptime - meça **developer happiness**:

```yaml
# Métricas de adoção
- platform_deployments_total
- platform_self_service_ratio  # % deploys sem tickets
- developer_time_to_production  # tempo do commit ao prod

# Métricas de satisfação
- platform_support_tickets_total
- developer_survey_scores
- platform_migration_rate  # % apps migradas para plataforma
```

## Lições aprendidas

Depois de construir plataformas em diferentes empresas, algumas lições importantes:

1. **Comece pequeno** - Uma boa abstração para um use case vale mais que uma abstração genérica para todos
2. **Envolva os desenvolvedores** desde o início - Eles são seus usuários
3. **Documente o "porquê"** - Não só como usar, mas por que certas decisões foram tomadas
4. **Meça constantemente** - Developer Experience é quantificável

## Próximos passos

Platform Engineering é uma jornada. Sugestões para começar:

1. **Identifique o pain point #1** dos desenvolvedores
2. **Crie uma abstração mínima** que resolve 80% dos casos
3. **Adicione observabilidade desde o dia 1**
4. **Colete feedback constantemente**

A melhor plataforma é aquela que os desenvolvedores escolheriam usar mesmo se tivessem outras opções.

---

*Implementando plataformas internas? Vamos conversar sobre estratégias no [LinkedIn](https://www.linkedin.com/in/elton-peixoto-914452296/).*
