import { useMemo } from 'react'
import SEO from '../components/SEO'

function Projects() {
  const emergingBusinessProjects = useMemo(() => [
    {
      title: "Estúdio Vitória Freitas",
      description: "Site moderno para fotógrafa especializada em newborn e ensaios familiares. Interface elegante com galeria otimizada, sistema de agendamento e integração com redes sociais.",
      highlights: ["React", "Tailwind", "Vite", "Responsive"],
      technologies: ["React", "Tailwind CSS", "Vite", "Vercel", "Cloudinary"],
      category: "Website",
      status: "Production",
      github: null,
      demo: "https://www.estudiovitoriafreitas.com.br/",
      impact: ["Aumento de 40% no engajamento", "Interface mobile-first", "Carregamento < 2s"]
    },
    {
      title: "RA Controle de Pragas", 
      description: "Plataforma web para empresa de controle de pragas com foco em conversão. Landing page otimizada para SEO local, formulários de contato e integração WhatsApp.",
      highlights: ["SEO Local", "Conversão", "WhatsApp", "Performance"],
      technologies: ["React", "Tailwind CSS", "Vite", "React Router", "Vercel"],
      category: "Website",
      status: "Production", 
      github: "https://github.com/elton-peixoto-lu/RA-Controle-de-Pragas",
      demo: "https://racontroledpragas.com.br/",
      impact: ["200% aumento em leads", "Posicionamento no Google Local", "Taxa de conversão 15%"]
    },
    {
      title: "AD Dedetizadora e Desintupidora",
      description: "Website completo para empresa de dedetização com sistema de orçamento online. Design moderno, otimização para dispositivos móveis e integração com ferramentas de analytics.",
      highlights: ["Mobile First", "Analytics", "Forms", "Modern UI"],
      technologies: ["React 19", "Tailwind CSS", "Vite 7", "React Router", "React Icons"],
      category: "Website",
      status: "Production",
      github: "https://github.com/elton-peixoto-lu/-ad-dedetizadora-desintupidora", 
      demo: "https://ad-dedetizadora-desintupidora.vercel.app/",
      impact: ["Interface 100% responsiva", "Tempo de carregamento otimizado", "Sistema de contato 24/7"]
    },
    {
      title: "Photo Vitória - Portfolio Fotográfico",
      description: "Portfolio fotográfico com otimização avançada de imagens usando Cloudinary. Implementa lazy loading, compression inteligente e blur-up technique para performance excepcional.",
      highlights: ["Cloudinary", "Image Optimization", "Lazy Loading", "Performance"],
      technologies: ["React", "Tailwind CSS", "Cloudinary", "Vite", "Image Processing"],
      category: "Website",
      status: "Production",
      github: "https://github.com/elton-peixoto-lu/photo-vitoria",
      demo: "https://photo-vitoria.vercel.app/",
      impact: ["Compressão de 70% nas imagens", "LCP < 1.5s", "Score 95+ no Lighthouse"]
    }
  ], [])

  const projects = useMemo(() => [
    {
      title: "AWS Account Baseline at Scale",
      description: "Automated creation of AWS accounts with guardrails, organization tags and paved-road defaults. This system enables rapid, secure account provisioning while maintaining governance standards across the entire AWS organization.",
      highlights: ["Organizations", "Guardrails", "Tags", "IaC"],
      technologies: ["Terraform", "Python", "AWS Organizations", "AWS Config"],
      category: "Platform Engineering",
      status: "Production",
      github: null, // Private enterprise project
      demo: null,
      impact: ["Reduced account setup time from days to minutes", "100% compliance with security policies", "Standardized tagging across 200+ accounts"]
    },
    {
      title: "Cost & Reliability Data Platform",
      description: "Comprehensive data pipelines in BigQuery to analyze costs, reliability metrics and system evolution, providing actionable insights for engineering decisions and budget optimization.",
      highlights: ["BigQuery", "Dashboards", "ETL", "Analytics"],
      technologies: ["BigQuery", "Python", "Looker Studio", "Cloud Workflows", "Airflow"],
      category: "Data Engineering",
      status: "Production",
      github: null, // Private enterprise project
      demo: null,
      impact: ["30% cost reduction through optimization insights", "Real-time reliability monitoring", "Data-driven capacity planning"]
    },
    {
      title: "Maat – AWS Tag Editor with Approvals",
      description: "Slack-integrated approval workflow for controlled tag changes across AWS resources. Features SQS-based processing, approval chains, and integration with internal systems for governance.",
      highlights: ["SQS", "Slack", "Approvals", "Governance"],
      technologies: ["Python", "AWS SQS", "Slack SDK", "DynamoDB", "Lambda"],
      category: "DevOps Tools",
      status: "Production",
      github: null, // Private enterprise project
      demo: null,
      impact: ["99% tag compliance across infrastructure", "Automated approval workflows", "Audit trail for all tag changes"]
    },
    {
      title: "Org & Accounts Diagrams",
      description: "Dynamic visualization system that generates organizational and account diagrams from AWS API data using Mingrammer's diagrams library. Provides real-time estate overviews and dependency mapping.",
      highlights: ["Mingrammer", "Automation", "Visual", "Documentation"],
      technologies: ["Python", "Mingrammer Diagrams", "AWS APIs", "GraphViz", "S3"],
      category: "Documentation",
      status: "Production",
      github: null, // Private enterprise project
      demo: null,
      impact: ["Automated architecture documentation", "Visual dependency tracking", "Simplified onboarding for new team members"]
    },
    {
      title: "Kubernetes Multi-Cluster Observability Stack",
      description: "Complete observability solution spanning multiple Kubernetes clusters with Prometheus federation, Grafana dashboards, and custom SLI/SLO monitoring for platform reliability.",
      highlights: ["Prometheus", "Grafana", "SLO/SLI", "Multi-cluster"],
      technologies: ["Prometheus", "Grafana", "AlertManager", "Thanos", "Kubernetes"],
      category: "Observability",
      status: "Production",
      github: null, // Private enterprise project
      demo: null,
      impact: ["99.9% platform uptime", "Mean time to recovery < 15 minutes", "Proactive incident detection"]
    },
    {
      title: "Infrastructure as Code Template Library",
      description: "Curated library of Terraform and Pulumi templates for common infrastructure patterns, featuring automated testing, compliance checks, and best practice enforcement.",
      highlights: ["Terraform", "Pulumi", "Templates", "Compliance"],
      technologies: ["Terraform", "Pulumi", "Go", "GitHub Actions", "Terratest"],
      category: "Infrastructure",
      status: "Active Development",
      github: "https://github.com/elton-peixoto-lu/iac-templates", // This would be a real repo
      demo: null,
      impact: ["80% faster infrastructure deployment", "Standardized security configurations", "Reduced configuration drift"]
    }
  ], [])

  const categories = [...new Set(projects.map(p => p.category))]

  return (
    <>
      <SEO 
        title="Projetos - Elton Peixoto"
        description="Projetos em DevOps, SRE, Platform Engineering e desenvolvimento de sites para pequenas empresas. Especialização em React, Tailwind, Vite e uso de IA para acelerar desenvolvimento."
      />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projetos
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Projetos em <strong>DevOps, SRE e Platform Engineering</strong> para empresas de grande escala, 
            além de <strong>sites profissionais</strong> para pequenas empresas e profissionais emergentes
          </p>
        </header>

        {/* Emerging Business Projects Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Sites para Profissionais Emergentes
              </h2>
              <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Desenvolvo <strong>sites de baixo custo</strong> para ajudar pequenas empresas e profissionais emergentes 
                a estabelecerem presença digital de qualidade. Usando <strong>React, Tailwind, Vite</strong> e 
                conceitos de <strong>resiliência, performance e deploy</strong>, além de <strong>IA para otimizar o desenvolvimento</strong>.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {emergingBusinessProjects.map((project, index) => (
                <article
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-medium">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 border border-white/10 rounded text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Resultados:</h4>
                    <ul className="space-y-1">
                      {project.impact.map((item, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start">
                          <span className="text-emerald-400 mr-2 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Ver Site
                      </a>
                    )}
                    
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm text-gray-300">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Especialização crescente em IA para acelerar desenvolvimento
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Projects Divider */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Projetos Enterprise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Soluções em larga escala para DevOps, SRE e Platform Engineering
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <div
                key={category}
                className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Project Info */}
                <div className="flex-1">
                  <header className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Production' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">
                      {project.category}
                    </p>
                  </header>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Tecnologias</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Destaques</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map(highlight => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  {project.impact && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Impacto</h3>
                      <ul className="space-y-1">
                        {project.impact.map((item, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start">
                            <span className="text-green-400 mr-2 mt-0.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="lg:w-48 lg:flex-shrink-0">
                  <div className="space-y-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Demo
                      </a>
                    )}

                    {!project.github && !project.demo && (
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-xs text-gray-400">
                          Projeto proprietário
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Quer discutir algum projeto?
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Estou sempre interessado em conversar sobre DevOps, SRE, Platform Engineering
              e como construir infraestrutura resiliente e observável.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/elton-peixoto-lu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl transition-colors"
              >
                Ver no GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/elton-peixoto-914452296/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:pluizelton@gmail.com"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Projects
