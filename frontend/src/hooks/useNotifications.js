import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:3000/api';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar notificaciones
  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Cambiar teacherId cuando se implemente auth
      const response = await fetch(`${API_URL}/notifications/teacher/1`);
      
      if (!response.ok) {
        throw new Error('Error al cargar notificaciones');
      }
      
      const data = await response.json();
      setNotifications(data);
      
      // Contar no leídas
      const unread = data.filter(n => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      setError(err.message);
      console.error('Error loading notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Marcar como leída
  const markAsRead = useCallback(async (notificationId) => {
    try {
      const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
        method: 'PUT'
      });

      if (!response.ok) {
        throw new Error('Error al marcar notificación como leída');
      }

      // Actualizar estado local
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(async () => {
    try {
      // Marcar cada notificación no leída
      const unreadNotifications = notifications.filter(n => !n.isRead);
      
      await Promise.all(
        unreadNotifications.map(n =>
          fetch(`${API_URL}/notifications/${n.id}/read`, { method: 'PUT' })
        )
      );

      // Actualizar estado local
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
      
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  }, [notifications]);

  // Eliminar notificación
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      const response = await fetch(`${API_URL}/notifications/${notificationId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar notificación');
      }

      // Actualizar estado local
      const notification = notifications.find(n => n.id === notificationId);
      
      setNotifications(prev =>
        prev.filter(n => n.id !== notificationId)
      );
      
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  }, [notifications]);

  // Enviar notificación
  const sendNotification = useCallback(async (notificationData) => {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al enviar notificación');
      }

      const newNotification = await response.json();
      
      // Recargar notificaciones
      await loadNotifications();
      
      return newNotification;
    } catch (err) {
      console.error('Error sending notification:', err);
      throw err;
    }
  }, [loadNotifications]);

  // Cargar al montar
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refresh: loadNotifications,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendNotification
  };
};
