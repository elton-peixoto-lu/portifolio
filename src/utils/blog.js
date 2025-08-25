import matter from 'gray-matter'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Buffer } from 'buffer'

// Make Buffer available globally for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

// This will be populated by the build process or dynamically loaded
const blogPosts = import.meta.glob('/content/posts/*.md', { as: 'raw' })

export async function getAllPosts() {
  const posts = []
  
  for (const path in blogPosts) {
    const content = await blogPosts[path]()
    const { data, content: body } = matter(content)
    
    const slug = path.split('/').pop().replace('.md', '')
    
    posts.push({
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date(),
      tags: data.tags || [],
      author: data.author || 'Elton Peixoto',
      image: data.image || null,
      published: data.published !== false,
      content: body,
      frontmatter: data
    })
  }
  
  // Sort by date (newest first)
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getPostBySlug(slug) {
  try {
    const path = `/content/posts/${slug}.md`
    const content = await blogPosts[path]()
    const { data, content: body } = matter(content)
    
    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date(),
      tags: data.tags || [],
      author: data.author || 'Elton Peixoto',
      image: data.image || null,
      published: data.published !== false,
      content: body,
      frontmatter: data
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export function formatDate(date, formatStr = 'dd/MM/yyyy') {
  return format(new Date(date), formatStr, { locale: ptBR })
}

export function getReadingTime(content) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  
  return `${readingTime} min de leitura`
}

export function excerptFromContent(content, maxLength = 150) {
  const plainText = content.replace(/[#*`\-\[\]]/g, '').trim()
  if (plainText.length <= maxLength) return plainText
  
  return plainText.substring(0, maxLength).trim() + '...'
}
