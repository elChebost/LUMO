import express from 'express';
import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
} from '../controllers/notificationController.js';

const router = express.Router();

// GET /api/notifications - Listar notificaciones (query: ?unread=true)
router.get('/', getNotifications);

// POST /api/notifications - Crear notificación
router.post('/', createNotification);

// PUT /api/notifications/:id/read - Marcar como leída
router.put('/:id/read', markAsRead);

// DELETE /api/notifications/:id - Eliminar notificación
router.delete('/:id', deleteNotification);

export default router;
