import { useState } from 'react'
import { config } from "../data/config"
import { sendContactMessage } from '../utils/api'

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    content: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })
    setErrors({})

    try {
      await sendContactMessage(formData)
      setStatus({ 
        type: 'success', 
        message: '✅ Votre message a été envoyé avec succès !' 
      })
      setFormData({ name: '', email: '', subject: '', content: '' })
    } catch (error) {
      console.error('Erreur:', error)
      
      // Si l'erreur est un objet JSON (validation FastAPI)
      if (error.message && error.message.startsWith('{')) {
        try {
          const errorObj = JSON.parse(error.message)
          setErrors(errorObj)
          
          // Afficher les erreurs de manière lisible
          const errorMessages = Object.values(errorObj).join('. ')
          setStatus({ 
            type: 'error', 
            message: `❌ ${errorMessages}` 
          })
        } catch {
          setStatus({ 
            type: 'error', 
            message: `❌ ${error.message || 'Une erreur est survenue'}` 
          })
        }
      } else {
        setStatus({ 
          type: 'error', 
          message: `❌ ${error.message || 'Une erreur est survenue'}` 
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour récupérer le message d'erreur d'un champ
  const getFieldError = (fieldName) => {
    return errors[fieldName] || ''
  }

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 px-4" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Me Contacter</h2>
        
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
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                getFieldError('name') ? 'border-red-500' : 'border-gray-600'
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white`}
              placeholder="Votre nom"
            />
            {getFieldError('name') && (
              <p className="text-red-400 text-sm mt-1">{getFieldError('name')}</p>
            )}
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
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                getFieldError('email') ? 'border-red-500' : 'border-gray-600'
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white`}
              placeholder="votre@email.com"
            />
            {getFieldError('email') && (
              <p className="text-red-400 text-sm mt-1">{getFieldError('email')}</p>
            )}
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
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                getFieldError('subject') ? 'border-red-500' : 'border-gray-600'
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white`}
              placeholder="Sujet de votre message"
            />
            {getFieldError('subject') && (
              <p className="text-red-400 text-sm mt-1">{getFieldError('subject')}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Message <span className="text-gray-400 text-xs">(minimum 10 caractères)</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="4"
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                getFieldError('content') ? 'border-red-500' : 'border-gray-600'
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white resize-y`}
              placeholder="Votre message (au moins 10 caractères)..."
            />
            {getFieldError('content') && (
              <p className="text-red-400 text-sm mt-1">{getFieldError('content')}</p>
            )}
          </div>
          
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