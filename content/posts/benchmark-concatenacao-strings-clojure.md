---
title: "Benchmark de Concatenação de Strings em Clojure"
description: "Análise comparativa de performance entre reduce str e StringBuilder para concatenação de strings em Clojure, com medições estatísticas e visualizações."
date: "2024-01-12"
tags: ["Clojure", "Performance", "Benchmark", "Estrutura de dados", "JVM"]
author: "Elton Peixoto"
published: true
image: null
---

# Benchmark de Concatenação de Strings em Clojure

Sempre achei interessantes experimentos de performance — especialmente aqueles que colocam lado a lado abordagens diferentes para resolver um mesmo problema. Foi esse tipo de curiosidade que me motivou a testar o impacto real de diferentes formas de concatenar strings em **Clojure**.

Considerando que **Lisp** — a família de linguagens da qual Clojure faz parte — tem uma longa história relacionada à gestão eficiente de memória, achei relevante fazer esse benchmark para compartilhar a experiência e nos ajudar a tomar decisões técnicas mais fundamentadas.

## O que é um Benchmark?

Um **benchmark** é um teste prático que mede o desempenho de um algoritmo, função, sistema ou componente, em termos de tempo, uso de memória, ou outros recursos importantes.

No desenvolvimento de software, benchmarks ajudam a:
- **Comparar abordagens diferentes** para resolver um mesmo problema
- **Identificar** qual abordagem é mais rápida, eficiente ou adequada
- **Evitar decisões** baseadas em achismos ou suposições
- **Fundamentar escolhas técnicas** com dados concretos

## O que é StringBuilder?

**StringBuilder** é uma classe do Java que oferece uma forma eficiente de construir strings por meio de um **buffer mutável**. 

**Diferenças principais:**
- **Concatenação direta:** cria uma nova string a cada operação
- **StringBuilder:** permite múltiplas concatenações no mesmo buffer

Isso **evita cópias repetidas** e melhora significativamente a performance.

## Objetivo

Este benchmark compara o desempenho de **duas abordagens** para concatenação de strings em Clojure:

1. **`reduce str`** (concatenação ingênua)
2. **`StringBuilder`** (concatenação eficiente)

## Algoritmos Comparados

### 1. Concatenação ingênua (`reduce str`)

**Pseudocódigo:**
1. Comece com uma string vazia
2. Para cada elemento da lista de partes:
   - Concatene a string acumulada com o próximo elemento usando `str`
3. Retorne a string final

**Resumo:**
- A cada passo, é criada uma **nova string**
- Copia todo o conteúdo anterior
- O custo cresce **rapidamente** conforme o número de partes aumenta
- **Complexidade:** O(n²)

### 2. Concatenação eficiente (`StringBuilder`)

**Pseudocódigo:**
1. Crie um buffer mutável (StringBuilder)
2. Para cada elemento da lista de partes:
   - Adicione (`append`) o elemento ao buffer
3. Ao final, converta o buffer para uma string comum

**Resumo:**
- O **buffer é reutilizado** durante todo o processo
- O custo cresce **linearmente** com o número de partes
- **Complexidade:** O(n)

## Implementação

### Funções testadas

```clojure
(defn using-str-concat [parts]
  (reduce str "" parts))

(defn using-string-builder [parts]
  (let [sb (StringBuilder.)]
    (doseq [part parts]
      (.append sb part))
    (.toString sb)))
```

### Código-fonte completo

```clojure
(ns clojure-benchmarks.core
  (:require [criterium.core :as c]
            [incanter.core :as i]
            [incanter.charts :as charts]))

(def parts (repeat 100000 "abc"))

(defn using-str-concat [parts]
  (reduce str "" parts))

(defn using-string-builder [parts]
  (let [sb (StringBuilder.)]
    (doseq [part parts]
      (.append sb part))
    (.toString sb)))

(defn log10 [x]
  (Math/log10 (max x 1e-9))) ; evita log(0)

(defn -main [& args]
  (println "Benchmark de concatenação de strings em Clojure\n")
  (println "reduce str:")
  (let [res1 (c/quick-benchmark (using-str-concat parts) {})]
    (c/report-result res1)
    (println "Valor bruto :mean reduce str:" (:mean res1))
    (println "\nStringBuilder:")
    (let [res2 (c/quick-benchmark (using-string-builder parts) {})]
      (c/report-result res2)
      (println "Valor bruto :mean StringBuilder:" (:mean res2))
      (let [mean1 (when (and (map? res1) (vector? (:mean res1))) (first (:mean res1)))
            mean2 (when (and (map? res2) (vector? (:mean res2))) (first (:mean res2)))]
        (when (and (number? mean1) (number? mean2))
          (let [labels ["reduce str" "StringBuilder"]
                vals   [(double mean1) (double mean2)]
                logvals (mapv log10 vals)
                chart  (charts/bar-chart labels logvals
                                        :title "Concatenação de Strings (log₁₀ ns)"
                                        :y-label "log₁₀ Tempo médio (ns)")]
            (i/view chart)
            (println "\nValores médios (ns):")
            (println (format "reduce str    : %.2f ns" (first vals)))
            (println (format "StringBuilder : %.2f ns" (second vals)))))))))
```

## Metodologia

### Entrada de dados
```clojure
(def parts (repeat 100000 "abc"))
```
- **100.000 strings** de 3 caracteres cada
- Total de **300.000 caracteres** para concatenar

### Ferramenta de medição
- **Biblioteca:** [Criterium](https://github.com/hugoduncan/criterium) — ferramenta robusta para benchmarks estatísticos em Clojure
- **Função:** `criterium.core/quick-benchmark`
- **Unidade:** Nanossegundos (ns)

### Execução
- Cada função é executada usando `criterium.core/quick-benchmark`
- Resultados apresentados em **escala logarítmica** para facilitar a comparação
- **Reprodutibilidade:** Rode em diferentes máquinas, JVMs ou tamanhos de entrada

## Resultados Obtidos

### `reduce str`
- **Execution time mean:** ~717 ms
- **Comportamento:** Alto custo por causa da criação de muitas strings intermediárias
- **Complexidade:** O(n²) - cresce quadraticamente

### `StringBuilder`
- **Execution time mean:** ~855 µs
- **Comportamento:** Muito mais rápido, custo linear e buffer mutável
- **Complexidade:** O(n) - cresce linearmente

### Diferença de Performance

A diferença é **impressionante:**
```
reduce str:     717.000.000 ns (717 ms)
StringBuilder:     855.000 ns (855 µs)

StringBuilder é ~838x mais rápido!
```

## Interpretação dos Resultados

### Gráfico em Escala Logarítmica

O gráfico gerado mostra:
- **Título:** "Concatenação de Strings (log₁₀ ns)"
- **Eixo Y:** log₁₀ do tempo médio (em nanosegundos)
- **Eixo X:** Dois métodos comparados
- **Escala:** Logarítmica na base 10

### Como interpretar a escala logarítmica?

- **-1** equivale a 10⁻¹ = 0,1 ns
- **-2** equivale a 10⁻² = 0,01 ns  
- **-3** equivale a 10⁻³ = 0,001 ns

No gráfico:
- **`reduce str`** tem tempo médio perto de **-0.1** (~0.8 ns)
- **`StringBuilder`** tem tempo médio perto de **-3** (~0.001 ns)

## Como Reproduzir

### 1. Configuração do projeto

Adicione as dependências no seu `project.clj`:
```clojure
(defproject clojure-benchmarks "0.1.0"
  :dependencies [[org.clojure/clojure "1.10.3"]
                 [criterium "0.4.6"]
                 [incanter "1.9.3"]]
  :main clojure-benchmarks.core)
```

### 2. Execução

```bash
# Via Leiningen
lein run

# Ou pelo REPL
lein repl
user=> (require '[clojure-benchmarks.core :as core])
user=> (core/-main)
```

### 3. Experimentos adicionais

**Teste diferentes tamanhos:**
```clojure
; Teste com 10.000 strings
(def parts (repeat 10000 "abc"))

; Teste com 1.000.000 strings  
(def parts (repeat 1000000 "abc"))

; Teste com strings maiores
(def parts (repeat 100000 "Esta é uma string mais longa para testar"))
```

**Teste outras abordagens:**
```clojure
; Usando clojure.string/join
(defn using-string-join [parts]
  (clojure.string/join "" parts))

; Usando apply str
(defn using-apply-str [parts]
  (apply str parts))
```

## Lições Aprendidas

### 1. **Algoritmos importam muito**
A diferença entre O(n²) e O(n) é **dramática** na prática, não apenas na teoria.

### 2. **Java interop pode ser vantajosa**
Em Clojure, usar classes Java como `StringBuilder` pode trazer ganhos significativos de performance.

### 3. **Benchmark estatístico é fundamental**
Usar ferramentas como **Criterium** garante medições confiáveis e reproduzíveis.

### 4. **Visualização facilita comunicação**
Gráficos em escala logarítmica ajudam a comunicar diferenças de ordens de magnitude.

### 5. **Prefira funções otimizadas**
Use `clojure.string/join` em vez de `reduce str` para concatenação de strings.

## Alternativas Recomendadas

Para concatenação eficiente em Clojure:

```clojure
; Melhor opção: clojure.string/join
(clojure.string/join "" parts)

; Ou com separador
(clojure.string/join " " parts)

; StringBuilder direto (quando precisa de controle fino)
(let [sb (StringBuilder.)]
  (doseq [part parts]
    (.append sb part))
  (.toString sb))

; Evite: reduce str para listas grandes
(reduce str "" parts)
```

## Conclusão

Os resultados deste benchmark deixam claro que a **escolha do algoritmo de concatenação de strings faz toda a diferença** em aplicações que lidam com grandes volumes de dados.

**Principais takeaways:**

1. **`reduce str`** é simples, mas ineficiente para listas grandes
2. **`StringBuilder`** (ou `clojure.string/join`) é muito mais eficiente
3. **Ferramentas de benchmark** como Criterium são essenciais
4. **Visualização em escala logarítmica** comunica diferenças de performance relevantes
5. **Prefira abordagens otimizadas** quando a performance for requisito

Ao desenvolver em Clojure (ou em qualquer linguagem JVM), sempre considere o custo algorítmico das operações de string, especialmente em loops ou processamento de grandes volumes de dados.

---

## Referências

- **[Criterium](https://github.com/hugoduncan/criterium)** – Biblioteca de benchmarking para Clojure
  - [Documentação](https://cljdoc.org/d/criterium/criterium/0.4.6/api/criterium.core)
- **[Incanter](https://github.com/incanter/incanter)** – Ambiente de computação estatística e gráficos estilo R para Clojure
  - [Documentação de gráficos](https://incanter.github.io/incanter/charts-api.html)
- **[StringBuilder (Java)](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html)** – Classe para construção eficiente de strings mutáveis
- **[reduce (Clojure)](https://clojuredocs.org/clojure.core/reduce)** – Função para redução de coleções
- **[str (Clojure)](https://clojuredocs.org/clojure.core/str)** – Função para conversão e concatenação de strings

*Interessado em mais experimentos de performance? Vamos conversar no [LinkedIn](https://www.linkedin.com/in/elton-peixoto-914452296/) ou [email](mailto:pluizelton@gmail.com).*
