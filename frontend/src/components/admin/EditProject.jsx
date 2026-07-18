// frontend/src/components/admin/EditProject.jsx
import { useState } from 'react';
import { updateProject } from '../../utils/api';

export default function EditProject({ project, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    tags: project.tags.join(', '),
    image_url: project.image_url || '',
    github_url: project.github_url || '',
    live_url: project.live_url || ''
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
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        tags: tagsArray,
        image_url: formData.image_url || null,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null
      };

      await updateProject(project.id, projectData);
      
      setStatus({ type: 'success', message: '✅ Projet mis à jour !' });
      setTimeout(() => {
        if (onUpdated) onUpdated();
        if (onClose) onClose();
      }, 1000);
      
    } catch (error) {
      setStatus({ type: 'error', message: `❌ ${error.message || 'Erreur'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">✏️ Modifier le projet</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titre *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (séparés par des virgules)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL de l'image</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL GitHub</label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL de démonstration</label>
            <input
              type="url"
              name="live_url"
              value={formData.live_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {status.message && (
            <div className={`p-3 rounded-lg text-center ${
              status.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}>
              {status.message}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition"
            >
              {loading ? 'Mise à jour...' : '💾 Mettre à jour'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}