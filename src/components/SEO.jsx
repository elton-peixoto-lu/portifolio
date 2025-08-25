import { useEffect } from 'react'

function SEO({ 
  title = 'Elton Peixoto - DevOps • SRE • Platform Engineering',
  description = 'DevOps, SRE e Platform Engineering. Infra as Code, observabilidade e plataformas internas em AWS & GCP.',
  keywords = 'DevOps, SRE, Platform Engineering, AWS, GCP, Kubernetes, Terraform, Observability',
  image = 'https://elton-peixoto-lu.github.io/portifolio/og-image.png',
  url = 'https://elton-peixoto-lu.github.io/portifolio/'
}) {
  useEffect(() => {
    // Update page title
    document.title = title

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    }

    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)

    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', 'website', true)

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', true)
    updateMetaTag('twitter:title', title, true)
    updateMetaTag('twitter:description', description, true)
    updateMetaTag('twitter:image', image, true)
    updateMetaTag('twitter:url', url, true)

  }, [title, description, keywords, image, url])

  return null
}

export default SEO
