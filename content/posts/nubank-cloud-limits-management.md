---
title: "Nubank Engineering Meetup #10: Gerenciando Limites na Nuvem para Crescimento Sustentável"
description: "Como o Nubank escala sua plataforma financeira global gerenciando 110 milhões de clientes, 4.000 microserviços e bilhões de eventos diários na AWS."
date: "2024-01-08"
tags: ["Cloud", "AWS", "Kubernetes", "Fintech", "Scale", "Architecture"]
author: "Elton Peixoto"
published: true
image: null
---

# Nubank Engineering Meetup #10: Gerenciando Limites na Nuvem para Crescimento Sustentável

*Artigo baseado na apresentação do Nubank Engineering Meetup #10 realizado em São Paulo, com insights sobre como uma das maiores fintechs do mundo gerencia sua infraestrutura em escala.*

O **Nubank Engineering Meetup #10** colocou os holofotes em uma das áreas mais críticas, porém frequentemente sub-discutidas, da infraestrutura moderna na nuvem: **gerenciar limites da nuvem para crescimento sustentável**.

Realizado em São Paulo, este evento atraiu entusiastas de tecnologia, especialistas em nuvem e engenheiros de software de todas as senioridades, ansiosos para descobrir como o Nubank escala sua plataforma financeira global sem sacrificar performance ou confiabilidade.

## A Escala do Nubank

O Nubank agora atende **mais de 110 milhões de clientes** no Brasil, Colômbia e México, nos colocando em um palco global para serviços financeiros digitais. Para suportar essa enorme base de usuários, nossa infraestrutura deve lidar com:

- **Dezenas de milhares de pods**
- **Bilhões de mensagens Kafka**
- **Uma teia em constante evolução de microserviços**
- **Milhões de requests por segundo**
- **72 bilhões de eventos diários via Kafka**
- **Mais de 4.000 microserviços orquestrados com Kubernetes**

Esse nível de escala não acontece da noite para o dia. No início, nossas equipes de engenharia dependiam muito da AWS para computação, armazenamento e rede. À medida que nossa base de clientes cresceu, também cresceu nossa dependência de infraestrutura em nuvem escalável para acomodar surtos nas transações dos usuários.

## De "Pangeia" para Arquiteturas Multi-Account

### O Problema da "Pangeia"

Quando o Nubank era menor, nossa infraestrutura estava agrupada em **algumas contas AWS massivas**. Internamente, chamávamos isso de **"Pangeia"**, evocando a imagem de um único supercontinente.

**Problemas identificados:**

```mermaid
graph TD
    A[Conta AWS Única "Pangeia"] --> B[Incidente Menor]
    B --> C[Outage Maior]
    A --> D[Isolamento Difícil]
    D --> E[Deployments Lentos]
    A --> F[Blast Radius Alto]
```

- **Um incidente menor** poderia desencadear uma interrupção maior
- **Isolamento de ambientes** (staging vs produção) se tornava mais difícil
- **Deployments mais lentos**
- **Alto "blast radius"** - risco de pequenos problemas escalarem

### A Solução: "Continental Drift"

Em resposta, mudamos para uma **estratégia multi-account**, que chamamos de **"continental drift"** (deriva continental).

```yaml
# Estrutura Multi-Account
accounts:
  domains:
    - payments-domain-prod
    - loans-domain-prod
    - cards-domain-prod
  teams:
    - team-alpha-prod
    - team-beta-staging
  environments:
    - domain-dev
    - domain-staging
    - domain-prod
```

**Benefícios alcançados:**

- **Isolamento granular** por domínio de negócio
- **Redução dramática do "blast radius"**
- **Liberdade para evolução independente**
- **Melhora significativa na confiabilidade**
- **Velocidade de time-to-market**

## Sharding All the Things: Datomic, Kafka e Além

Com contas AWS separadas fornecendo uma camada fundamental, também implementamos um **modelo de sharding** em nossos dados e serviços.

### Sharding de Banco de Dados: Datomic

```clojure
;; Configuração de shards do Datomic
{:shards 
 {:shard-0 {:transactor "datomic-transactor-0"
            :data-range "0-25%"}
  :shard-1 {:transactor "datomic-transactor-1" 
            :data-range "25-50%"}
  :shard-2 {:transactor "datomic-transactor-2"
            :data-range "50-75%"}
  :shard-3 {:transactor "datomic-transactor-3"
            :data-range "75-100%"}}}
```

Nosso banco principal, **Datomic**, executa múltiplos transactors no Kubernetes, cada um lidando com um subconjunto de dados.

### Sharding de Kafka

```yaml
# Múltiplos clusters Kafka por shard
kafka-clusters:
  - name: kafka-shard-0
    topics: ["payments-events", "user-events"]
  - name: kafka-shard-1  
    topics: ["loans-events", "cards-events"]
  - name: kafka-shard-2
    topics: ["risk-events", "fraud-events"]
```

O mesmo padrão se aplica ao **Kafka**: mantemos múltiplos clusters Kafka para diferentes shards para distribuir as cargas de mensageria.

### Objetivos do Sharding

1. **Prevenção de propagação de problemas** - cada shard é relativamente independente
2. **Previsão de capacidade** em unidades menores e mais previsíveis
3. **Análise de um shard** permite projetar comportamento de outros

## Gerenciamento de Capacidade e Limites da AWS

Apesar da noção popular de que **"a nuvem é infinita"**, todo provedor de nuvem impõe limites ou cotas:

### Tipos de Limites AWS
- **Load Balancers**
- **Instâncias EC2**
- **Capacidade de armazenamento**
- **VPCs e subnets**
- **CloudWatch metrics**

### Modelo de Responsabilidade Compartilhada

```yaml
# Responsabilidades por layer
infrastructure-team:
  - provides: "Best practices e monitoring automatizado"
  - monitors: "Usage patterns e cost trends"
  
domain-teams:
  - responsible-for: "Análise de custo e capacidade"
  - considers: ["CPU cores", "Memory", "AWS resources types"]
  - ensures: "Right-sizing para workload"
```

**Princípios:**
- **Qualquer pessoa** criando um microserviço deve considerar recursos necessários
- **Time de Infra** fornece práticas e monitoramento
- **Times de domínio** permanecem envolvidos na análise
- **Prevenção** de picos inesperados de uso

## AWS Limit Smoke Detector

Uma das nossas **ferramentas internas mais relevantes** é o **AWS Limit Smoke Detector**.

### Arquitetura da Ferramenta

```python
# Simplified architecture
class AWSLimitSmokeDetector:
    def __init__(self):
        self.data_sources = [
            "TrustedAdvisor",
            "ServiceQuotas", 
            "CloudWatch",
            "DirectAPIcalls"
        ]
        self.storage = "BigQuery"
        self.alerting = ["Dashboards", "AutomaticMessages"]
    
    def collect_usage_data(self):
        """Coleta dados de uso, cota e custo de todas as contas AWS"""
        pass
    
    def forecast_limits(self):
        """Previsão baseada em tendências históricas"""
        pass
    
    def alert_on_thresholds(self):
        """Alerta antes de atingir limites críticos"""
        pass
```

### Pipeline ETL

1. **Coleta** dados de uso, cota e custo de todas as contas AWS do Nubank
2. **Agrega** informações no BigQuery
3. **Compara** continuamente uso real vs cotas atribuídas
4. **Identifica** problemas potenciais antes de atingir limites críticos

### Fontes de Dados

```yaml
aws-sources:
  - trusted-advisor
  - service-quotas
  - cloudwatch-metrics
  - direct-api-calls
  
outputs:
  - historical-usage-view
  - forecasting-trends
  - threshold-alerts
  - cost-insights
```

### Benefícios

- **Alertas proativos** antes de atingir caps críticos
- **Insights valiosos** para ajustes de orçamento
- **Previsão** de quando limites serão atingidos
- **Prevenção** de incidentes relacionados a cotas

## Multi-Tenant vs. Single-Tenant: Abordagem Balanceada

### Multi-Tenant: Eficiência de Recursos

```yaml
# Exemplo de cluster multi-tenant
kubernetes-cluster:
  shared-resources:
    - kafka-brokers
    - elasticsearch-cluster
    - monitoring-stack
  tenants:
    - team-payments
    - team-loans
    - team-cards
  
benefits:
  - efficient-resource-utilization
  - reduced-operational-overhead
  - cost-effective
```

**Vantagens:**
- **Utilização eficiente** de recursos
- **Redução da sobrecarga operacional**
- **Custo-efetivo**

### Single-Tenant: Controle Especializado

```yaml
# Workloads críticos com requisitos especializados
single-tenant-workloads:
  - fraud-detection-ml
  - real-time-payments
  - regulatory-compliance
  
requirements:
  - specialized-performance
  - security-isolation
  - tight-control
```

**Quando usar:**
- **Workloads business-critical**
- **Requisitos de performance especializados**
- **Necessidades de segurança específicas**
- **Sistemas de alto tráfego**

### Estratégia de Balanceamento

A escolha entre multi-tenant e single-tenant é **estratégica e ongoing**:

```python
def choose_tenancy_model(workload):
    factors = {
        'criticality': workload.business_criticality,
        'performance': workload.performance_requirements,
        'security': workload.security_needs,
        'cost': workload.budget_constraints,
        'isolation': workload.isolation_requirements
    }
    
    if factors['criticality'] == 'HIGH' and factors['isolation'] == 'STRICT':
        return 'single-tenant'
    elif factors['cost'] == 'OPTIMIZE' and factors['performance'] == 'STANDARD':
        return 'multi-tenant'
    else:
        return 'evaluate-case-by-case'
```

## Lessons Learned e Best Practices

### 1. Planejamento Proativo de Capacidade

- **Monitoramento contínuo** de tendências de uso
- **Previsão** baseada em dados históricos
- **Alertas antecipados** para evitar surpresas

### 2. Arquitetura Resiliente via Sharding

- **Isolamento** para reduzir blast radius  
- **Escalabilidade** em unidades previsíveis
- **Manutenibilidade** com componentes independentes

### 3. Modelo de Responsabilidade Compartilhada

- **Teams empoderados** com ownership claro
- **Ferramentas centralizadas** para suporte
- **Best practices** compartilhadas

### 4. Observabilidade End-to-End

- **Métricas** de uso e performance
- **Visibilidade** de custos em tempo real
- **Dashboards** para tomada de decisão

## Olhando para o Futuro

A abordagem do Nubank para gerenciar limites na nuvem destaca a importância de:

- **Planejamento proativo** de capacidade
- **Isolamento baseado em shards**
- **Estratégias multi-account**

À medida que a demanda continua a crescer, garantir **performance estável** enquanto **contém custos** é mais que um desafio técnico — é uma **vantagem competitiva**.

Combinando orquestração Kubernetes, monitoramento de cotas AWS, e um modelo de responsabilidade compartilhada entre equipes, o Nubank entrega consistentemente uma experiência **resiliente e fluida** para milhões de clientes.

## Key Takeaways

1. **Arquitetura evolutiva** - de "Pangeia" para multi-account
2. **Sharding estratégico** - não apenas bancos, mas todo o stack
3. **Monitoramento proativo** - ferramentas como AWS Limit Smoke Detector
4. **Balance inteligente** - multi-tenant vs single-tenant baseado em contexto
5. **Responsabilidade compartilhada** - times empoderados com ferramentas centralizadas

Seja você uma startup fintech em ascensão ou uma empresa estabelecida, os princípios e insights do **Nubank Engineering Meetup #10** podem guiá-lo em direção a operações de nuvem mais **robustas, escaláveis e conscientes de custos**.

---

## Recursos Adicionais

- **[Vídeo do Meetup](https://www.youtube.com/watch?v=zoJFGlcCSZQ)** - Assista à apresentação completa
- **[Oportunidades de Trabalho no Nubank](https://nubank.com.br/careers)** - Junte-se ao nosso time
- **Entre em contato** para discussões técnicas: [pluizelton@gmail.com](mailto:pluizelton@gmail.com)

*Este artigo foi baseado na apresentação do Nubank Engineering Meetup #10. Para mais insights sobre engenharia em escala, acompanhe os próximos meetups e eventos.*
