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
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

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

  // Composant réutilisable pour un champ avec œil
  const PasswordField = ({ label, name, placeholder, value, show, onToggle }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          {show ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🔐 Changer le mot de passe
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordField
          label="Ancien mot de passe"
          name="oldPassword"
          placeholder="••••••••"
          value={formData.oldPassword}
          show={showPassword.old}
          onToggle={() => toggleVisibility('old')}
        />

        <PasswordField
          label="Nouveau mot de passe"
          name="newPassword"
          placeholder="•••••••• (min 8 caractères)"
          value={formData.newPassword}
          show={showPassword.new}
          onToggle={() => toggleVisibility('new')}
        />

        <PasswordField
          label="Confirmer le nouveau mot de passe"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          show={showPassword.confirm}
          onToggle={() => toggleVisibility('confirm')}
        />

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