/**
 * Utilidades para gestión de autenticación JWT
 */

/**
 * Obtiene el token de localStorage
 * @returns {string|null} Token JWT o null si no existe
 */
const getToken = () => {
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
