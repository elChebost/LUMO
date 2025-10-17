import prisma from '../config/db.js';

/**
 * GET /api/notifications
 * Listar todas las notificaciones (con filtro opcional de no leídas)
 */
export const getNotifications = async (req, res) => {
  try {
    const { unread } = req.query;
    
    const where = unread === 'true' ? { read: false } : {};
    
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    // Parsear metadata JSON
    const notificationsWithMetadata = notifications.map(notif => ({
      ...notif,
      metadata: notif.metadata ? JSON.parse(notif.metadata) : null,
    }));
    
    res.json(notificationsWithMetadata);
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({ error: 'Error al obtener notificaciones' });
  }
};

/**
 * POST /api/notifications
 * Crear nueva notificación (y emitir por socket)
 */
export const createNotification = async (req, res) => {
  try {
    const { title, body, senderId, targetStudentId, targetGroup, metadata } = req.body;
    
    if (!title || !body || !senderId) {
      return res.status(400).json({ 
        error: 'Faltan campos obligatorios: title, body, senderId' 
      });
    }
    
    const notification = await prisma.notification.create({
      data: {
        title,
        body,
        senderId,
        targetStudentId: targetStudentId || null,
        targetGroup: targetGroup || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
    
    // TODO: Emitir por WebSocket cuando esté implementado
    // io.to(`student-${targetStudentId}`).emit('notification:new', notification);
    
    res.status(201).json({
      message: 'Notificación creada exitosamente',
      notification: {
        ...notification,
        metadata: notification.metadata ? JSON.parse(notification.metadata) : null,
      },
    });
  } catch (error) {
    console.error('Error al crear notificación:', error);
    res.status(500).json({ error: 'Error al crear notificación' });
  }
};

/**
 * PUT /api/notifications/:id/read
 * Marcar notificación como leída
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { read: true },
    });
    
    res.json({
      message: 'Notificación marcada como leída',
      notification: {
        ...notification,
        metadata: notification.metadata ? JSON.parse(notification.metadata) : null,
      },
    });
  } catch (error) {
    console.error('Error al marcar notificación:', error);
    res.status(500).json({ error: 'Error al marcar notificación como leída' });
  }
};

/**
 * DELETE /api/notifications/:id
 * Eliminar notificación
 */
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.notification.delete({
      where: { id: parseInt(id) },
    });
    
    res.json({ message: 'Notificación eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar notificación:', error);
    res.status(500).json({ error: 'Error al eliminar notificación' });
  }
};
