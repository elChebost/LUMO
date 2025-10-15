import { useState, useCallback } from 'react';
import { API_URL } from '../config/api';
import { getAuthHeaders, clearAuth } from '../utils/auth';

/**
 * Hook personalizado para realizar peticiones HTTP con autenticación automática
 * @returns {object} Objeto con funciones para hacer peticiones y estados
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Realiza una petición HTTP con autenticación automática
   * @param {string} endpoint - Ruta del endpoint (ej: '/api/students')
   * @param {object} options - Opciones de fetch (method, body, etc)
   * @returns {Promise<any>} Respuesta del servidor
   */
  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...getAuthHeaders(),
          ...options.headers
        }
      });

      const data = await response.json();

      // Si el token expiró o es inválido (401), limpiar auth
      if (response.status === 401) {
        clearAuth();
        window.location.href = '/login';
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }

      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}`);
      }

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  /**
   * GET request
   */
  const get = useCallback((endpoint) => {
    return request(endpoint, { method: 'GET' });
  }, [request]);

  /**
   * POST request
   */
  const post = useCallback((endpoint, body) => {
    return request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }, [request]);

  /**
   * PUT request
   */
  const put = useCallback((endpoint, body) => {
    return request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }, [request]);

  /**
   * DELETE request
   */
  const del = useCallback((endpoint) => {
    return request(endpoint, { method: 'DELETE' });
  }, [request]);

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    del
  };
};
