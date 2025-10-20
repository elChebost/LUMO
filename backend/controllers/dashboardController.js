import prisma from '../config/db.js';
import { calculateClassroomAverageStats } from '../services/statsService.js';

/**
 * GET /api/dashboard
 * Retorna estadísticas agregadas para el dashboard principal
 */
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Promedio de habilidades de todos los estudiantes (calculado dinámicamente)
    const { avgLogic, avgCreativity, avgLanguage } = await calculateClassroomAverageStats();

    // 2. Promedio de tiempo en la app
    const students = await prisma.student.findMany({
      select: {
        avgTimeMinutes: true,
      },
    });

    let avgTimeMinutes = 0;
    if (students.length > 0) {
      avgTimeMinutes = Math.round(
        students.reduce((sum, s) => sum + s.avgTimeMinutes, 0) / students.length
      );
    }

    // 3. Total de misiones activas
    const activeMissionsCount = await prisma.mission.count({
      where: { estado: 'activa' },
    });

    // 4. Total de estudiantes
    const totalStudents = await prisma.student.count();

    // 5. Estudiantes online (conectados actualmente)
    const onlineStudentsCount = await prisma.student.count({
      where: { isOnline: true },
    });

    res.json({
      avgLogic,
      avgCreativity,
      avgLanguage,  // ✅ Cambio de avgWriting a avgLanguage
      avgTimeMinutes,
      activeMissionsCount,
      onlineStudentsCount,
      totalStudents,
    });
  } catch (error) {
    console.error('[ERROR] getDashboardStats:', error);
    // Devolver valores por defecto en lugar de error 500
    res.json({
      avgLogic: 0,
      avgCreativity: 0,
      avgLanguage: 0,  // ✅ Cambio de avgWriting a avgLanguage
      avgTimeMinutes: 0,
      activeMissionsCount: 0,
      onlineStudentsCount: 0,
      totalStudents: 0,
    });
  }
};

