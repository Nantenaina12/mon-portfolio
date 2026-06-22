import { config } from "../data/config"

export default function Navigation() {
  const sections = [
    { id: "projets", label: "Projets" },
    { id: "carte", label: "Carte" },
    { id: "parcours", label: "Parcours" },
    { id: "contact", label: "Contact" }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50 py-3 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="font-bold text-lg">{config.name}</span>
        <div className="flex gap-6">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-gray-700 hover:text-blue-500 transition text-sm font-medium"
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}