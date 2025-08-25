import { useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function Home() {
  // ---- Content ----
  const name = "Elton Peixoto";
  const role = "DevOps • SRE • Platform Engineering";
  const tagline =
    "Infra as Code, observability first, and smooth paved roads for dev teams.";

  const links = useMemo(
    () => ({
      github: "https://github.com/elton-peixoto-lu",
      linkedin: "https://www.linkedin.com/in/elton-peixoto-914452296/",
      company: "https://www.insidefreecoding.com.br/",
      email: "mailto:pluizelton@gmail.com",
    }),
    []
  );

  const stack = useMemo(
    () => [
      {
        group: "Cloud & Platform",
        items: [
          "AWS (Organizations, Lambda, CloudWatch, S3)",
          "GCP (BigQuery, Workflows)",
          "Kubernetes • Docker",
        ],
      },
      {
        group: "Infra as Code & Governance",
        items: ["Terraform", "Pulumi", "Cloud Custodian", "AWS Tags & Guardrails"],
      },
      {
        group: "Langs & Runtime",
        items: ["Python", "Clojure (Babashka)", "Go"],
      },
      {
        group: "CI/CD & Messaging",
        items: ["GitHub Actions", "GitLab CI", "SQS", "Slack workflows"],
      },
      {
        group: "Observability & Reliability",
        items: ["Prometheus", "Grafana", "OpenTelemetry", "SLO/SLI", "P95/P99"],
      },
      {
        group: "Data & Streaming",
        items: ["Kafka (JSON messages)", "Cost analytics", "Looker Studio"],
      },
    ],
    []
  );

  const featuredProjects = useMemo(
    () => [
      {
        title: "AWS Account Baseline at Scale",
        desc:
          "Automated creation of AWS accounts with guardrails, organization tags and paved-road defaults.",
        highlights: ["Organizations", "Guardrails", "Tags", "IaC"],
      },
      {
        title: "Cost & Reliability Data Platform",
        desc:
          "Pipelines in BigQuery to analyze costs, reliability and evolution, supporting decision-making.",
        highlights: ["BigQuery", "Dashboards", "ETL"],
      },
    ],
    []
  );

  const recentArticles = useMemo(
    () => [
      {
        title: "Arquitetura interna do TSDB do Prometheus",
        link:
          "https://web.dio.me/articles/arquitetura-interna-do-tsdb-prometheus-9c61c55014c8?back=/articles",
      },
      {
        title: "Benchmark de concatenação de strings em Clojure",
        link:
          "https://web.dio.me/articles/benchmark-de-concatenacao-de-strings-em-clojure-75b017975756?back=/articles",
      },
    ],
    []
  );

  // ---- UI helpers ----
  const Section = ({ id, title, children }) => (
    <section id={id} className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">{title}</h2>
      {children}
    </section>
  );

  const Badge = ({ children }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-sm">
      {children}
    </span>
  );

  // ---- Page ----
  return (
    <>
      <SEO />
      
      <div>
        {/* Hero */}
        <section id="home" className="px-6">
          <div className="max-w-6xl mx-auto py-24 md:py-32 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-800 dark:text-white mb-4">
                {name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">{role}</p>
              <p className="text-gray-700 dark:text-gray-300 max-w-prose mb-8 leading-relaxed">{tagline}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={links.github}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={links.linkedin}
                  className="px-6 py-3 rounded-2xl bg-gray-300 hover:bg-gray-400 dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-white border border-gray-600 dark:border-white/10 transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={links.company}
                  className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Minha Empresa
                </a>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200"
                >
                  Vamos conversar
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Áreas de atuação</h3>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                {[
                  "Infra as Code",
                  "Observability",
                  "SLO/SLI",
                  "CI/CD",
                  "Kubernetes",
                  "Cost control",
                  "Reliability",
                  "Developer Experience",
                ].map((t) => (
                  <li key={t} className="rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-center hover:bg-black/30 transition-colors">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="Sobre mim">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-6 text-lg">
                Sou engenheiro com foco em <strong className="text-gray-800 dark:text-white">DevOps, SRE e
                Platform Engineering</strong>. Trabalho criando baselines de
                infraestrutura, plataformas internas e automações de cloud em larga escala
                (AWS & GCP).
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
                Curto medir e melhorar a confiabilidade (<em>P95/P99</em>),
                padronizar via IaC, e pavimentar caminhos para que os times entreguem
                com qualidade e segurança.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Princípios</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <span className="text-emerald-400 mr-2">•</span>
                  You build it, you run it
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Observability-first
                </li>
                <li className="flex items-center">
                  <span className="text-purple-400 mr-2">•</span>
                  Paved roads &gt; snowflake
                </li>
                <li className="flex items-center">
                  <span className="text-orange-400 mr-2">•</span>
                  Automate boring, standardize safe
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Stack */}
        <Section id="stack" title="Minha stack">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((g) => (
              <div key={g.group} className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-200">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">{g.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <Badge key={it}>{it}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Featured Projects */}
        <Section id="featured-projects" title="Projetos em destaque">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredProjects.map((p) => (
              <article key={p.title} className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-200">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{p.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.highlights.map((h) => (
                    <Badge key={h}>{h}</Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-gray-500 hover:bg-gray-600 dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-white border border-gray-600 dark:border-white/10 transition-all duration-200"
            >
              Ver todos os projetos
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Section>

        {/* Recent Articles */}
        <Section id="recent-articles" title="Artigos recentes">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {recentArticles.map((a) => (
              <a
                key={a.title}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-200 group"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">{a.title}</h3>
                <p className="text-sm text-gray-400">web.dio.me</p>
              </a>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-gray-500 hover:bg-gray-600 dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-white border border-gray-600 dark:border-white/10 transition-all duration-200"
            >
              Ver todos os artigos
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Section>

        {/* CTA */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Vamos conversar?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Interessado em discutir DevOps, SRE ou Platform Engineering? Sempre aberto para boas conversas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Entre em contato
              </Link>
              <Link
                to="/blog"
                className="px-8 py-4 rounded-2xl bg-gray-500 hover:bg-gray-600 dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-white border border-gray-600 dark:border-white/10 font-medium transition-all duration-200"
              >
                Leia meus artigos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
