/**
 * Utilidades para gestión de autenticación JWT
 */

/**
 * Obtiene el token de localStorage
 * @returns {string|null} Token JWT o null si no existe
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Obtiene los datos del usuario de localStorage
 * @returns {object|null} Objeto usuario o null si no existe
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Guarda el token y usuario en localStorage
 * @param {string} token - Token JWT
 * @param {object} user - Datos del usuario
 */
export const setAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Elimina el token y usuario de localStorage
 */
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} true si existe token
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Obtiene headers con autorización para fetch
 * @returns {object} Headers con Authorization Bearer token
 */
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};
