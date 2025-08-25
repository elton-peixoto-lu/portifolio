import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/SEO'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { getPostBySlug, formatDate, getReadingTime } from '../utils/blog'

function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPost() {
      if (!slug) return

      try {
        const postData = await getPostBySlug(slug)
        if (!postData) {
          setError('Post não encontrado')
        } else {
          setPost(postData)
        }
      } catch (err) {
        setError('Erro ao carregar o post')
        console.error('Error loading post:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <>
      <SEO 
        title={`${post.title} - Elton Peixoto`}
        description={post.description || `Artigo sobre ${post.title}`}
        image={post.image}
      />
      
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link 
              to="/"
              className="hover:text-white transition-colors"
            >
              Início
            </Link>
            <span>/</span>
            <Link 
              to="/blog"
              className="hover:text-white transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-300">{post.title}</span>
          </div>
        </nav>

        {/* Post Header */}
        <header className="mb-12">
          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.date}>
                {formatDate(post.date, 'dd/MM/yyyy')}
              </time>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{getReadingTime(post.content)}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.author}</span>
            </div>
          </div>

          {/* Description */}
          {post.description && (
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              {post.description}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="mb-12">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Post Footer */}
        <footer className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Back to Blog */}
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-white border border-gray-600 dark:border-white/10 rounded-2xl transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao Blog
            </Link>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Compartilhar:</span>
              
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-blue-500 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
                aria-label="Compartilhar no Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
                aria-label="Compartilhar no LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.description,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    // You could add a toast notification here
                  }
                }}
                className="p-2 bg-white/10 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
                aria-label="Copiar link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </article>
    </>
  )
}

export default BlogPost
