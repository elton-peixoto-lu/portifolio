import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

function MarkdownRenderer({ content, className = '' }) {
  return (
    <div className={`prose-custom ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom link handling for external links
          a: ({ node, href, children, ...props }) => {
            const isExternal = href && (href.startsWith('http') || href.startsWith('https'))
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-blue-400 hover:text-blue-300 underline"
                {...props}
              >
                {children}
              </a>
            )
          },
          // Custom image handling
          img: ({ node, src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg shadow-lg max-w-full h-auto"
              loading="lazy"
              {...props}
            />
          ),
          // Custom code block styling
          pre: ({ node, children, ...props }) => (
            <pre
              className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm"
              {...props}
            >
              {children}
            </pre>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            
            if (!inline && match) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
            
            return (
              <code
                className="bg-gray-800 px-2 py-1 rounded text-sm text-gray-200 font-mono"
                {...props}
              >
                {children}
              </code>
            )
          },
          // Custom blockquote styling
          blockquote: ({ node, children, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-gray-800/30 rounded-r-lg"
              {...props}
            >
              <div className="text-gray-300 italic">{children}</div>
            </blockquote>
          ),
          // Custom table styling
          table: ({ node, children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-700" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ node, children, ...props }) => (
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-800"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ node, children, ...props }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
