import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
