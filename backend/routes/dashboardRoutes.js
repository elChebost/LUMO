import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = express.Router();

// GET /api/dashboard - Obtener estadísticas del dashboard
router.get('/', getDashboardStats);

export default router;
