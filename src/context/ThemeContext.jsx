import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    // ✅ IMPORTANT : Ajouter/retirer la classe sur html ET body
    const htmlElement = document.documentElement
    const bodyElement = document.body
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark')
      bodyElement.classList.add('dark')
      bodyElement.style.backgroundColor = '#111827'  // Force le fond
    } else {
      htmlElement.classList.remove('dark')
      bodyElement.classList.remove('dark')
      bodyElement.style.backgroundColor = '#ffffff'
    }
    
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}