import { useState } from 'react';
import { changeAdminPassword } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export default function ChangePassword() {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
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

    // Vérifier que les mots de passe correspondent
    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: 'error', message: '❌ Les mots de passe ne correspondent pas' });
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setStatus({ type: 'error', message: '❌ Le nouveau mot de passe doit faire au moins 8 caractères' });
      setLoading(false);
      return;
    }

    try {
      await changeAdminPassword(formData.oldPassword, formData.newPassword);
      setStatus({ 
        type: 'success', 
        message: '✅ Mot de passe changé avec succès ! Veuillez vous reconnecter.' 
      });
      
      // Déconnecter l'utilisateur après 2 secondes
      setTimeout(() => {
        logout();
      }, 2000);
      
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: `❌ ${error.message || 'Erreur lors du changement de mot de passe'}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🔐 Changer le mot de passe
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ancien mot de passe
          </label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="•••••••• (min 8 caractères)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
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
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition"
        >
          {loading ? 'Changement en cours...' : 'Changer le mot de passe'}
        </button>
      </form>
    </div>
  );
}