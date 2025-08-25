---
title: "Observabilidade moderna com Prometheus: Além das métricas básicas"
description: "Como implementar observabilidade efetiva usando Prometheus, desde configuração até alertas inteligentes para sistemas distribuídos."
date: "2024-01-15"
tags: ["Observabilidade", "Prometheus", "SRE", "Monitoring"]
author: "Elton Peixoto"
published: true
image: null
---

# Observabilidade moderna com Prometheus: Além das métricas básicas

A observabilidade é um dos pilares fundamentais da **Site Reliability Engineering (SRE)**. Quando falamos de sistemas distribuídos e arquiteturas em cloud, ter visibilidade completa do que está acontecendo não é mais um luxo - é uma necessidade.

Neste artigo, vou compartilhar algumas práticas avançadas com Prometheus que aprendi implementando observabilidade em larga escala.

## O problema da observabilidade superficial

Muitas equipes começam com métricas básicas: CPU, memória, disk I/O. Isso é um bom começo, mas é como dirigir olhando apenas o velocímetro - você sabe a velocidade, mas não vê os obstáculos à frente.

```yaml
# Configuração básica (que não é suficiente)
global:
  scrape_interval: 15s
  
scrape_configs:
  - job_name: 'basic-metrics'
    static_configs:
      - targets: ['localhost:9090']
```

## Métricas que realmente importam

### 1. Service Level Indicators (SLIs)

Em vez de focar apenas em métricas de infraestrutura, implemente SLIs que reflitam a experiência do usuário:

```yaml
# Exemplo de SLI para latência
- record: sli:request_latency_seconds:rate5m
  expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# SLI para taxa de erro
- record: sli:error_rate:rate5m
  expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])
```

### 2. Métricas de negócio

Conecte suas métricas técnicas com impactos de negócio:

```python
# Instrumentação personalizada em Python
from prometheus_client import Counter, Histogram

# Métricas de negócio
orders_total = Counter('orders_total', 'Total orders', ['status'])
order_processing_time = Histogram('order_processing_seconds', 'Order processing time')

def process_order(order):
    start_time = time.time()
    try:
        # Lógica de processamento
        result = process_business_logic(order)
        orders_total.labels(status='success').inc()
        return result
    except Exception as e:
        orders_total.labels(status='failed').inc()
        raise
    finally:
        order_processing_time.observe(time.time() - start_time)
```

## Alertas inteligentes com base em SLOs

A diferença entre um bom sistema de alertas e spam é contextualização. Use **burn rate** para alertas mais inteligentes:

```yaml
# Alert baseado em burn rate
- alert: HighErrorBudgetBurnRate
  expr: |
    (
      sli:error_rate:rate1m > (14.4 * 0.001)  # 14.4x burn rate
      and
      sli:error_rate:rate5m > (14.4 * 0.001)
    )
    or
    (
      sli:error_rate:rate6h > (6 * 0.001)  # 6x burn rate  
      and
      sli:error_rate:rate1h > (6 * 0.001)
    )
  for: 2m
  labels:
    severity: critical
  annotations:
    summary: "High error budget burn rate detected"
    description: "Error budget is burning {{ $value | humanizePercentage }} times faster than sustainable rate"
```

## Federation e alta disponibilidade

Para ambientes grandes, a federation é essencial:

```yaml
# Prometheus global coletando de múltiplos clusters
- job_name: 'federate'
  scrape_interval: 15s
  honor_labels: true
  metrics_path: '/federate'
  params:
    'match[]':
      - '{job=~"kubernetes-.*"}'
      - '{__name__=~"sli:.*"}'
  static_configs:
    - targets:
      - 'prometheus-cluster-1:9090'
      - 'prometheus-cluster-2:9090'
```

## Integração com Kubernetes

Se você está em Kubernetes, use service monitors para descoberta automática:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: my-app
spec:
  selector:
    matchLabels:
      app: my-app
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
```

## Próximos passos

Observabilidade é uma jornada, não um destino. Algumas práticas que recomendo:

1. **Comece com SLIs simples** mas que reflitam experiência do usuário
2. **Implemente alertas baseados em burn rate** em vez de thresholds estáticos
3. **Use recording rules** para pré-computar consultas complexas
4. **Mantenha cardinality sob controle** - métricas com muitas labels podem quebrar o Prometheus

A observabilidade efetiva não é sobre coletar mais dados, mas sobre coletar os dados certos e agir sobre eles de forma inteligente.

---

*Quer discutir estratégias de observabilidade? Me chame no [LinkedIn](https://www.linkedin.com/in/elton-peixoto-914452296/) ou [email](mailto:pluizelton@gmail.com).*
