import { useNavigate } from 'react-router-dom'
import { config } from '../data/config'

export default function Navigation() {
  const navigate = useNavigate()
  
  const sections = [
    { id: "projets", label: "Projets" },
    { id: "carte", label: "Carte" },
    { id: "parcours", label: "Parcours" },
    { id: "contact", label: "Contact" }
  ]

  const handleNavigation = (sectionId) => {
    navigate('/')
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50 py-3 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="font-bold text-lg cursor-pointer" onClick={() => navigate('/')}>
          {config.name}
        </span>
        <div className="flex gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section.id)}
              className="text-gray-700 hover:text-blue-500 transition text-sm font-medium"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}