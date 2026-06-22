import { config } from "../data/config"

export default function ContactFooter() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Me Contacter</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a href={`mailto:${config.email}`} className="hover:text-blue-400 transition">
            📧 {config.email}
          </a>
          {config.github && (
            <a href={config.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              🐙 GitHub
            </a>
          )}
          {config.linkedin && (
            <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              🔗 LinkedIn
            </a>
          )}
        </div>
        <div className="mt-6 text-gray-400 text-sm">
          © 2026 {config.name} - Tous droits réservés
        </div>
      </div>
    </footer>
  )
}