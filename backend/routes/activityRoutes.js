import express from 'express';
import * as activityController from '../controllers/activityController.js';

const router = express.Router();

/**
 * Activity Routes
 * 
 * Rutas para gestión de actividades de misiones
 */

// Crear actividad para una misión
router.post('/missions/:missionId/activities', activityController.createActivity);

// Obtener actividades de una misión
router.get('/missions/:missionId/activities', activityController.getActivitiesByMission);

// Reordenar actividades de una misión
router.patch('/missions/:missionId/activities/reorder', activityController.reorderActivities);

// Actualizar una actividad específica
router.put('/activities/:id', activityController.updateActivity);

// Eliminar una actividad específica
router.delete('/activities/:id', activityController.deleteActivity);

export default router;
