// Récupérer l'URL de l'API depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

// Fonction pour faire des requêtes avec token
export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  // Si token expiré, essayer de rafraîchir
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Réessayer avec le nouveau token
      const newToken = localStorage.getItem('access_token');
      headers['Authorization'] = `Bearer ${newToken}`;
      const retryResponse = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
      });
      return retryResponse.json();
    }
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erreur API');
  }

  return response.json();
}

// Authentification
export async function login(username, password) {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erreur de connexion');
  }

  return response.json();
}

export async function getCurrentUser() {
  return fetchWithAuth('/me');
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!response.ok) return false;

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return true;
  } catch {
    return false;
  }
}

// Messages
export async function getMessages() {
  return fetchWithAuth('/messages');
}

export async function markMessageAsRead(messageId) {
  return fetchWithAuth(`/messages/${messageId}/read`, {
    method: 'PUT'
  });
}

export async function deleteMessage(messageId) {
  return fetchWithAuth(`/messages/${messageId}`, {
    method: 'DELETE'
  });
}

// Projets
export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);
  return response.json();
}

export async function createProject(project) {
  return fetchWithAuth('/projects', {
    method: 'POST',
    body: JSON.stringify(project)
  });
}

export async function updateProject(id, project) {
  return fetchWithAuth(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project)
  });
}

export async function deleteProject(id) {
  return fetchWithAuth(`/projects/${id}`, {
    method: 'DELETE'
  });
}

// ... le reste du code ...

// Formulaire de contact (public)
export async function sendContactMessage(data) {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    let errorMessage = 'Erreur lors de l\'envoi';
    
    try {
      const error = await response.json();
      
      // Gestion des erreurs de validation FastAPI (422)
      if (response.status === 422 && error.detail) {
        const errors = {};
        error.detail.forEach(err => {
          const field = err.loc.join('.');
          errors[field] = err.msg;
        });
        // Throw avec un objet d'erreurs
        throw new Error(JSON.stringify(errors));
      } else if (error.detail) {
        errorMessage = error.detail;
      }
    } catch (e) {
      if (e.message.startsWith('{')) {
        // C'est notre objet d'erreurs
        throw new Error(e.message);
      }
      throw new Error(e.message || errorMessage);
    }
    
    throw new Error(errorMessage);
  }

  return response.json();
}