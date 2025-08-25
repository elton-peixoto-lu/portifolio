import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { getAllPosts, formatDate, getReadingTime, excerptFromContent } from '../utils/blog'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTag, setSelectedTag] = useState('all')

  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getAllPosts()
        setPosts(allPosts)
      } catch (err) {
        setError('Erro ao carregar os posts')
        console.error('Error loading posts:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  // Get all unique tags
  const allTags = posts.reduce((tags, post) => {
    post.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    })
    return tags
  }, [])

  // Filter posts by selected tag
  const filteredPosts = selectedTag === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag))

  if (loading) {
    return (
      <>
        <SEO 
          title="Blog - Elton Peixoto"
          description="Artigos sobre DevOps, SRE, Platform Engineering e tecnologias relacionadas"
        />
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando posts...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SEO 
          title="Blog - Elton Peixoto"
          description="Artigos sobre DevOps, SRE, Platform Engineering e tecnologias relacionadas"
        />
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO 
        title="Blog - Elton Peixoto"
        description="Artigos sobre DevOps, SRE, Platform Engineering e tecnologias relacionadas"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Pensamentos e experiências sobre DevOps, SRE, Platform Engineering e o ecossistema de tecnologia
          </p>
        </header>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedTag === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Todos ({posts.length})
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {tag} ({posts.filter(post => post.tags.includes(tag)).length})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Post Image */}
                  {post.image && (
                    <div className="md:w-64 md:flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {/* Post Content */}
                  <div className="flex-1">
                    <header className="mb-3">
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                          {post.title}
                        </h2>
                      </Link>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        <span>•</span>
                        <span>{getReadingTime(post.content)}</span>
                        <span>•</span>
                        <span>por {post.author}</span>
                      </div>
                    </header>

                    {/* Description or Excerpt */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {post.description || excerptFromContent(post.content)}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white/20 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Ler mais
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">
              {selectedTag === 'all' ? 'Nenhum post encontrado' : `Nenhum post com a tag "${selectedTag}"`}
            </h3>
            <p className="text-gray-400 mb-6">
              {selectedTag === 'all' 
                ? 'Ainda estou trabalhando nos primeiros artigos. Volte em breve!'
                : 'Tente selecionar uma tag diferente ou veja todos os posts.'
              }
            </p>
            {selectedTag !== 'all' && (
              <button
                onClick={() => setSelectedTag('all')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-colors"
              >
                Ver todos os posts
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
