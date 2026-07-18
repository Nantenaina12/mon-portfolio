import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMessages, markMessageAsRead, deleteMessage } from '../../utils/api';
import MessagesList from './MessagesList';
import AdminStats from './AdminStats';
import ChangePassword from './ChangePassword';
import CreateProject from './CreateProject';
import ProjectList from './ProjectList';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('messages'); // messages | password | projects

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Petite fonction de rafraîchissement des projets (à lier si votre liste en a besoin)
  const loadProjects = () => {
    console.log("Les projets ont été actualisés.");
    // Si votre composant ProjectList requiert un état partagé ou un re-fetch, 
    // cette fonction peut être enrichie plus tard.
  };

  const handleMarkRead = async (id) => {
    try {
      await markMessageAsRead(id);
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, is_read: true } : msg
      ));
    } catch (err) {
      alert('Erreur: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (err) {
      alert('Erreur: ' + err.message);
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-20">
      {/* En-tête */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              📊 Tableau de bord
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Bienvenue, {user?.username} 👋
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Onglets de navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-2 flex-wrap border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === 'messages' 
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            📩 Messages
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === 'projects' 
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            🚀 Projets
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === 'password' 
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            🔐 Sécurité
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Onglet Messages */}
        {activeTab === 'messages' && (
          <>
            <AdminStats 
              total={messages.length}
              unread={unreadCount}
            />

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg mb-6">
                ❌ {error}
              </div>
            )}

            <MessagesList 
              messages={messages}
              loading={loading}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
              onRefresh={loadMessages}
            />
          </>
        )}

        {/* Onglet Projets */}
        {activeTab === 'projects' && (
          <>
            <CreateProject onProjectCreated={() => {
              // Rafraîchir la liste après création
              // On peut utiliser une référence ou un état partagé
              // Pour simplifier, on force un rechargement via window.location.reload() ou on passe une callback
            }} />
            <div className="mt-8">
              <ProjectList />
            </div>
          </>
        )}

        {/* Onglet Sécurité */}
        {activeTab === 'password' && (
          <ChangePassword />
        )}
      </div>
    </div>
  );
}