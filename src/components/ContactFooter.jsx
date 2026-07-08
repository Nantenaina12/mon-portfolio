import { useState } from 'react'
import { config } from "../data/config"

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Erreur lors de l\'envoi')
      }

      const data = await response.json()
      setStatus({ type: 'success', message: '✅ Votre message a été envoyé avec succès !' })
      // Réinitialiser le formulaire
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Erreur:', error)
      setStatus({ type: 'error', message: `❌ ${error.message || 'Une erreur est survenue'}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 px-4" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Me Contacter</h2>
        
        {/* Formulaire de contact */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-12 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">Sujet</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white"
              placeholder="Sujet de votre message"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white resize-y"
              placeholder="Votre message..."
            />
          </div>
          
          {/* Statut d'envoi */}
          {status.message && (
            <div className={`p-3 rounded-lg text-center ${
              status.type === 'success' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
            }`}>
              {status.message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition rounded-lg font-semibold"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>

        {/* Liens de contact existants */}
        <div className="text-center border-t border-gray-700 pt-8">
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
      </div>
    </footer>
  )
}