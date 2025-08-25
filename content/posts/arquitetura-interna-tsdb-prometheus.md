---
title: "Arquitetura Interna do TSDB - Prometheus"
description: "Mergulhe profundamente na arquitetura interna do Time Series Database (TSDB) do Prometheus, desde a coleta até a persistência e indexação."
date: "2024-01-20"
tags: ["DevOps", "Prometheus", "Observability", "TSDB", "Monitoring"]
author: "Elton Peixoto"
published: true
image: null
---

# Arquitetura Interna do TSDB - Prometheus

O **Prometheus** é uma ferramenta de monitoramento e alertas de código aberto, voltada para métricas de séries temporais. Ele coleta, armazena, consulta e exibe métricas, sendo muito usado com Kubernetes, servidores, aplicações web e bancos de dados.

Mas essa ferramenta tem alguns componentes interessantes em sua arquitetura, especialmente o **Time Series Database (TSDB)**. Vou abordar a arquitetura interna do TSDB utilizado pelo Prometheus, detalhando os componentes principais e o fluxo de dados desde a coleta até a persistência e indexação.

O objetivo é fornecer uma visão geral de como o TSDB armazena e gerencia dados de séries temporais, destacando a importância de cada componente para o desempenho e a confiabilidade do sistema.

## Fluxo de Dados no TSDB

A arquitetura interna do TSDB pode ser resumida no seguinte fluxo:

```
Exporters/Targets → Scrape → Head (Memory) → WAL → Compaction → Persistent Blocks + Index Files
```

Cada etapa desse fluxo tem um papel específico na garantia de performance, durabilidade e eficiência das consultas.

## Componentes Principais

### 1. Exporters / Targets

Os **Exporters** e **Targets** são os pontos de extremidade (endpoints) HTTP que expõem as métricas. Eles são responsáveis por fornecer os dados que o Prometheus irá coletar.

Esses exporters podem ser:
- **Aplicações instrumentadas** para expor suas próprias métricas
- **Serviços dedicados** que coletam métricas de outros sistemas (como o `node_exporter` para métricas do sistema operacional)

```yaml
# Exemplo de configuração de scrape
scrape_configs:
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
    scrape_interval: 15s
    scrape_timeout: 10s
```

### 2. Scrape (Coleta)

O processo de **"scrape"** (coleta) é a ação periódica realizada pelo Prometheus para obter as métricas dos Exporters/Targets. 

O Prometheus configura um **Scrape Loop** que, em intervalos regulares, consulta os endpoints configurados e armazena os dados recebidos. A frequência de coleta é configurável e pode variar dependendo da:
- **Importância das métricas**
- **Volatilidade dos dados**
- **Recursos disponíveis**

### 3. Head (Memória)

A **"Head"** é o componente que mantém os dados mais recentes em memória. Ela armazena os dados em **"chunks"**, que são blocos de dados de séries temporais.

Cada amostra de dado é representada como um par:
```
[ts: int64, val: float64]
```
Onde:
- `ts` = timestamp (inteiro de 64 bits)  
- `val` = valor da métrica (ponto flutuante de 64 bits)

A Head é otimizada para:
- **Escritas rápidas**
- **Consultas recentes** 
- **Cache primário** para dados atuais

### 4. Write-Ahead Log (WAL)

O **Write-Ahead Log (WAL)** é um registro de escrita essencial para a recuperação de dados em caso de falha.

**Funcionamento:**
- Antes de qualquer dado ser gravado na Head, ele é **primeiro escrito no WAL**
- Garante que dados não persistidos possam ser recuperados após falhas
- Atua como um **"journal"**, registrando todas as operações de escrita em sequência

```bash
# Estrutura típica do WAL
/prometheus-data/
├── wal/
│   ├── 00000000
│   ├── 00000001
│   └── 00000002
└── chunks_head/
```

### 5. Blocos Persistentes (Compaction)

Os dados na Head são eventualmente **compactados** e gravados em disco em intervalos regulares (por padrão, a cada **2 horas**).

**O processo de compactação envolve:**
- Criação de **blocos persistentes** otimizados para leitura
- **Agregação e otimização** dos dados
- **Remoção de dados duplicados**
- **Criação de índices** para acelerar consultas

```bash
# Estrutura dos blocos persistentes
/prometheus-data/
├── 01FXXX.../  # Block ID baseado em timestamp
│   ├── chunks/
│   ├── index
│   ├── meta.json
│   └── tombstones
```

### 6. Arquivos de Índice

Os **arquivos de índice** são cruciais para acelerar as consultas. Eles mapeiam **labels** (rótulos) para séries temporais, permitindo que o Prometheus encontre rapidamente os dados relevantes.

**Sem índices:**
- Prometheus teria que escanear **todos os blocos**
- Performance extremamente degradada
- Consultas lentas e custosas

**Com índices:**
- Busca otimizada por labels
- Consultas rápidas e eficientes
- Menor uso de CPU e I/O

## Detalhes Adicionais

### Histograms e Summaries

O Prometheus suporta tipos de métricas especiais:

```prometheus
# Histogram
http_request_duration_seconds_bucket{le="0.1"} 24054
http_request_duration_seconds_bucket{le="0.2"} 33444
http_request_duration_seconds_bucket{le="0.5"} 100392
http_request_duration_seconds_sum 53423
http_request_duration_seconds_count 144320

# Summary  
http_request_duration_seconds{quantile="0.5"} 0.052
http_request_duration_seconds{quantile="0.9"} 0.564
http_request_duration_seconds{quantile="0.99"} 1.745
```

### Lifecycle de uma Amostra

O ciclo de vida completo de uma amostra no TSDB:

1. **Coleta** via scrape
2. **Armazenamento** na Head (memória)
3. **Escrita** no WAL (durabilidade)
4. **Compactação** em blocos persistentes
5. **Indexação** para consultas eficientes

### Considerações de Desempenho

O desempenho do TSDB depende de vários fatores:

- **Frequência de coleta** (scrape_interval)
- **Tamanho da Head** (quantidade de séries ativas)
- **Velocidade do disco** (SSD vs HDD)
- **Complexidade das consultas** (número de labels, range)
- **Cardinalidade das métricas** (combinações únicas de labels)

## Por que isso importa para um SRE?

Entender o TSDB ajuda a:

### Otimizar o uso de métricas
```prometheus
# Alta cardinalidade (problemática)
http_requests_total{method="GET", endpoint="/api/users/123", user_id="456"}

# Baixa cardinalidade (otimizada)  
http_requests_total{method="GET", endpoint="/api/users"}
```

### Escrever alertas mais performáticos
```yaml
# Consulta custosa
- alert: HighMemoryUsage
  expr: (sum by (instance) (node_memory_MemTotal_bytes) - sum by (instance) (node_memory_MemAvailable_bytes)) / sum by (instance) (node_memory_MemTotal_bytes) > 0.8

# Consulta otimizada usando recording rules
- alert: HighMemoryUsage  
  expr: instance:memory_utilization_ratio > 0.8
```

### Prever impacto de retenção e compactações
```yaml
# Configuração de retenção
global:
  external_labels:
    cluster: 'production'

# Retenção: 15 dias
retention.time: 15d
retention.size: 100GB
```

### Diagnosticar consumo de disco e memória
```bash
# Monitorar uso do TSDB
prometheus_tsdb_head_samples 
prometheus_tsdb_head_series
prometheus_tsdb_symbol_table_size_bytes
prometheus_tsdb_head_chunks
```

## Dicas Práticas para SREs

1. **Monitore a cardinalidade:**
   ```promql
   count by (__name__)({__name__=~".+"})
   ```

2. **Configure retention apropriada:**
   ```bash
   --storage.tsdb.retention.time=30d
   --storage.tsdb.retention.size=50GB
   ```

3. **Use recording rules para queries complexas:**
   ```yaml
   - record: instance:cpu_utilization:rate5m
     expr: 100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
   ```

4. **Monitore a performance do TSDB:**
   ```promql
   rate(prometheus_tsdb_compactions_total[5m])
   prometheus_tsdb_head_samples
   prometheus_tsdb_wal_fsync_duration_seconds
   ```

## Conclusão

Compreender a arquitetura interna do TSDB é fundamental para:
- **Otimizar** a coleta e armazenamento de métricas
- **Troubleshooting** de problemas de performance
- **Dimensionar** adequadamente o Prometheus
- **Escrever queries** eficientes

O TSDB do Prometheus é uma peça de engenharia impressionante, otimizada especificamente para dados de séries temporais em ambientes de monitoramento modernos.

---

## Referências

- [Prometheus TSDB Internals](https://prometheus.io/docs/prometheus/latest/storage/)
- [Lifecycle of a Sample in TSDB – FOSSASIA](https://www.youtube.com/watch?v=35TAaAESLcc)
- [Histograms and Summaries](https://prometheus.io/docs/practices/histograms/)
- [Selecting Data in PromQL](https://promlabs.com/blog/2020/07/02/selecting-data-in-promql/)

*Quer discutir mais sobre observabilidade e Prometheus? Me encontre no [LinkedIn](https://www.linkedin.com/in/elton-peixoto-914452296/) ou [email](mailto:pluizelton@gmail.com).*
