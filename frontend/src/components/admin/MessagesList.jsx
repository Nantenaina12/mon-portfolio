import { useState } from 'react';

export default function MessagesList({ 
  messages, 
  loading, 
  onMarkRead, 
  onDelete,
  onRefresh 
}) {
  const [filter, setFilter] = useState('all'); // all, unread, read

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.is_read;
    if (filter === 'read') return msg.is_read;
    return true;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Chargement des messages...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Barre d'outils */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Tous ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              filter === 'unread' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Non lus ({messages.filter(m => !m.is_read).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              filter === 'read' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Lus ({messages.filter(m => m.is_read).length})
          </button>
        </div>
        <button
          onClick={onRefresh}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition text-sm"
        >
          🔄 Rafraîchir
        </button>
      </div>

      {/* Liste des messages */}
      {filteredMessages.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">📭 Aucun message</p>
          <p className="text-sm">Les messages des visiteurs apparaîtront ici.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
                !msg.is_read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              }`}
            >
              <div className="flex flex-wrap gap-4 justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {msg.name}
                    </h3>
                    {!msg.is_read && (
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {msg.email} • {new Date(msg.created_at).toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sujet: {msg.subject}
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!msg.is_read && (
                    <button
                      onClick={() => onMarkRead(msg.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                    >
                      ✅ Lu
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(msg.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}