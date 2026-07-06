import { config } from "../data/config"

export default function ContactFooter() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 px-4 pt-20 md:pt-16" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-white dark:text-white">Me Contacter</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a href={`mailto:${config.email}`} className="text-gray-300 hover:text-blue-400 transition">
            📧 {config.email}
          </a>
          {config.github && (
            <a href={config.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
              🐙 GitHub
            </a>
          )}
          {config.linkedin && (
            <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
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