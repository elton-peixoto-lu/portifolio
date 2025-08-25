import SEO from '../components/SEO'

function Contact() {
  const contactMethods = [
    {
      title: "Email",
      description: "A melhor forma de me contatar para oportunidades e projetos",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: "mailto:pluizelton@gmail.com",
      linkText: "pluizelton@gmail.com",
      external: false
    },
    {
      title: "LinkedIn",
      description: "Conecte-se comigo para networking e discussões profissionais",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      link: "https://www.linkedin.com/in/elton-peixoto-914452296/",
      linkText: "linkedin.com/in/elton-peixoto-914452296",
      external: true
    },
    {
      title: "GitHub",
      description: "Explore meu código e contribuições open source",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      link: "https://github.com/elton-peixoto-lu",
      linkText: "github.com/elton-peixoto-lu",
      external: true
    },
    {
      title: "Minha Empresa",
      description: "Conheça minha empresa e serviços oferecidos",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: "https://www.insidefreecoding.com.br/",
      linkText: "insidefreecoding.com.br",
      external: true
    }
  ]

  const expertise = [
    {
      area: "DevOps & Platform Engineering",
      description: "Construção de plataformas internas, CI/CD, automação e developer experience"
    },
    {
      area: "Site Reliability Engineering (SRE)",
      description: "Observabilidade, SLO/SLI, incident response e reliability engineering"
    },
    {
      area: "Cloud Infrastructure",
      description: "AWS, GCP, Kubernetes, Terraform, Pulumi e Infrastructure as Code"
    },
    {
      area: "Observability & Monitoring",
      description: "Prometheus, Grafana, OpenTelemetry, logging e distributed tracing"
    }
  ]

  return (
    <>
      <SEO 
        title="Contato - Elton Peixoto"
        description="Entre em contato para discutir projetos, oportunidades ou trocar ideias sobre DevOps, SRE e Platform Engineering"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Vamos conversar
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Sempre aberto para discutir projetos interessantes, oportunidades de colaboração 
            ou simplesmente trocar ideias sobre DevOps, SRE e Platform Engineering
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Como me encontrar</h2>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className="block p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-white/10 rounded-xl text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20 transition-all duration-200">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {method.description}
                      </p>
                      <p className="text-blue-400 font-medium text-sm">
                        {method.linkText}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-gray-400 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Expertise & Availability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Áreas de expertise</h2>
            
            <div className="space-y-4 mb-8">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.area}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Status atual</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Disponível para consultorias, projetos de Platform Engineering e discussões técnicas. 
                Respondo normalmente em 24-48 horas.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  Consultoria
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                  Projetos
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                  Mentoria
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Perguntas frequentes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Que tipo de projetos você trabalha?
              </h3>
              <p className="text-gray-400 text-sm">
                Foco em Platform Engineering, automação de infraestrutura, observabilidade, 
                e construção de ferramentas internas. Especialmente interessado em projetos 
                que envolvem AWS, Kubernetes e sistemas distribuídos.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Oferece consultoria?
              </h3>
              <p className="text-gray-400 text-sm">
                Sim! Ofereço consultoria em DevOps, SRE e Platform Engineering. 
                Desde arquiteturas de observabilidade até implementação de 
                plataformas internas e processos de CI/CD.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Trabalha remotamente?
              </h3>
              <p className="text-gray-400 text-sm">
                Absolutamente! Tenho experiência extensa com trabalho remoto 
                e colaboração distribuída. Confortável com fusos horários 
                diferentes e ferramentas de colaboração modernas.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quanto tempo para responder?
              </h3>
              <p className="text-gray-400 text-sm">
                Normalmente respondo emails e mensagens profissionais em 
                24-48 horas. Para projetos urgentes, posso ser mais rápido 
                - apenas mencione a urgência no assunto.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Pronto para começar uma conversa?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Seja para um projeto, uma oportunidade de trabalho ou apenas para trocar ideias 
              sobre tecnologia, ficarei feliz em conversar.
            </p>
            <a
              href="mailto:pluizelton@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar email
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
