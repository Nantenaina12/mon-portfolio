import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMessages, markMessageAsRead, deleteMessage } from '../../utils/api';
import MessagesList from './MessagesList';
import AdminStats from './AdminStats';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('messages');

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdminStats 
          total={messages.length}
          unread={unreadCount}
        />
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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
      </div>
    </div>
  );
}