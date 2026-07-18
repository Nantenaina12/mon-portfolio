// Récupérer l'URL de l'API
// Avec le proxy, on utilise des chemins relatifs commençant par /api
const API_URL = '';

// ========== FONCTIONS AVEC AUTH ==========

export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newToken = localStorage.getItem('access_token');
      headers['Authorization'] = `Bearer ${newToken}`;
      const retryResponse = await fetch(`/api${endpoint}`, {
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

// ========== AUTHENTIFICATION ==========

export async function login(username, password) {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch('/api/login', {
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
    const response = await fetch('/api/refresh', {
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

// ========== MESSAGES ==========

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

// ========== PROJETS (CRUD) ==========

export async function getProjects() {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Erreur lors du chargement des projets');
  }
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

// ========== CONTACT (public) ==========

export async function sendContactMessage(data) {
  const response = await fetch('/api/messages', {
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
      
      if (response.status === 422 && error.detail) {
        const errors = {};
        error.detail.forEach(err => {
          const field = err.loc.join('.');
          errors[field] = err.msg;
        });
        throw new Error(JSON.stringify(errors));
      } else if (error.detail) {
        errorMessage = error.detail;
      }
    } catch (e) {
      if (e.message.startsWith('{')) {
        throw new Error(e.message);
      }
      throw new Error(e.message || errorMessage);
    }
    
    throw new Error(errorMessage);
  }

  return response.json();
}

// ========== ADMIN (Changer mot de passe) ==========

export async function changeAdminPassword(oldPassword, newPassword) {
  return fetchWithAuth('/change-admin-password', {
    method: 'POST',
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword
    })
  });
}