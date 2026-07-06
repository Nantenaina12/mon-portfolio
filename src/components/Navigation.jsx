import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from '../data/config'
import { useTheme } from '../context/ThemeContext'
import './Navigation.css'  // ← AJOUTER CETTE LIGNE

export default function Navigation() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const sections = [
    { id: "projets", label: "Projets" },
    { id: "carte", label: "Carte" },
    { id: "parcours", label: "Parcours" },
    { id: "contact", label: "Contact" }
  ]

  // Fermer le menu quand on clique sur un lien
  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false)
    navigate('/')
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  // Fermer le menu avec la touche Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [isMenuOpen])

  // Toggle du menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Navigation principale */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm z-50 py-3 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <span 
            className="font-bold text-lg cursor-pointer text-gray-900 dark:text-white" 
            onClick={() => navigate('/')}
          >
            {config.name}
          </span>
          
          {/* Menu Desktop */}
          <div className="desktop-menu flex gap-6 items-center">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigation(section.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition text-sm font-medium"
              >
                {section.label}
              </button>
            ))}
            
            {/* Bouton Dark Mode Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Bouton Burger + Dark Mode Mobile */}
          <div className="flex items-center gap-3">
            {/* Bouton Dark Mode Mobile */}
            <button
              onClick={toggleTheme}
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Bouton Burger */}
            <button 
              className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay (fond sombre derrière le menu) */}
      <div 
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Menu latéral (tiroir) */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        {/* Nom dans le menu */}
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Menu</p>
          <p className="font-bold text-gray-900 dark:text-white">{config.name}</p>
        </div>

        {/* Liens du menu */}
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleNavigation(section.id)}
            className="menu-item"
          >
            {section.label}
          </button>
        ))}

        <div className="menu-divider" />

        {/* Lien GitHub */}
        {config.github && (
          <a 
            href={config.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            🐙 GitHub
          </a>
        )}

        {/* Lien LinkedIn */}
        {config.linkedin && (
          <a 
            href={config.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            🔗 LinkedIn
          </a>
        )}

        {/* Version du portfolio */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Portfolio v1.0
          </p>
        </div>
      </div>
    </>
  )
}