import { useState, useEffect } from 'react';
import { useApi } from './useApi';

/**
 * Hook personalizado para gestionar notificaciones
 * @returns {object} Objeto con notifications, loading, error y función refresh
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { get, loading, error } = useApi();

  const fetchNotifications = async () => {
    try {
      const data = await get('/api/notifications');
      setNotifications(data);
    } catch (err) {
      console.error('Error al cargar notificaciones:', err);
      // Si falla, usar datos mock temporalmente
      setNotifications([
        {
          id: 1,
          type: 'success',
          title: 'Bienvenido a LUMO',
          message: 'Sistema de notificaciones activo',
          time: 'Ahora',
          read: false
        }
      ]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    refresh: fetchNotifications
  };
};
