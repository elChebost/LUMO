// Configuración de la API
// ======================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const config = {
  apiUrl: API_URL,
  endpoints: {
    // Autenticación
    login: `${API_URL}/api/auth/login`,
    logout: `${API_URL}/api/auth/logout`,
    
    // Usuarios
    users: `${API_URL}/api/users`,
    userById: (id) => `${API_URL}/api/users/${id}`,
    
    // Misiones
    missions: `${API_URL}/api/missions`,
    missionById: (id) => `${API_URL}/api/missions/${id}`,
    
    // Estadísticas
    stats: `${API_URL}/api/stats`,
    topStudents: `${API_URL}/api/stats/top-students`,
    
    // Notificaciones
    notifications: `${API_URL}/api/notifications`,
    markNotificationAsRead: (id) => `${API_URL}/api/notifications/${id}/read`,
    
    // Búsqueda
    search: (query) => `${API_URL}/api/search?q=${encodeURIComponent(query)}`,
  },
  
  // Opciones por defecto para fetch
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  },
};

export default config;
