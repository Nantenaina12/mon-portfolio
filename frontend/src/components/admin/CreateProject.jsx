import { useState } from 'react';
import { createProject } from '../../utils/api';

export default function CreateProject({ onProjectCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    image_url: '',
    github_url: '',
    live_url: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Convertir les tags (séparés par des virgules) en tableau
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        tags: tagsArray,
        image_url: formData.image_url || null,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null
      };

      await createProject(projectData);
      
      setStatus({ 
        type: 'success', 
        message: '✅ Projet créé avec succès !' 
      });
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        tags: '',
        image_url: '',
        github_url: '',
        live_url: ''
      });
      
      // Notifier le parent pour rafraîchir la liste
      if (onProjectCreated) onProjectCreated();
      
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: `❌ ${error.message || 'Erreur lors de la création'}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        ➕ Ajouter un projet
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Titre *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Mon super projet"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Description détaillée du projet..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags (séparés par des virgules)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="React, FastAPI, PostgreSQL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL de l'image
          </label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="https://exemple.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL GitHub
          </label>
          <input
            type="url"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL de démonstration
          </label>
          <input
            type="url"
            name="live_url"
            value={formData.live_url}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="https://projet-exemple.com"
          />
        </div>

        {status.message && (
          <div className={`p-3 rounded-lg text-center ${
            status.type === 'success' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-semibold transition"
        >
          {loading ? 'Création...' : '➕ Créer le projet'}
        </button>
      </form>
    </div>
  );
}