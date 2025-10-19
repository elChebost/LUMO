import prisma from '../config/db.js';

/**
 * GE    res.json({
      avgLogic,
      avgCreativity,
      avgWriting,
      avgTimeMinutes,
      activeMissionsCount,
      onlineStudentsCount,
      totalStudents,
    });
  } catch (error) {
    console.error('Error en getDashboardStats:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas del dashboard' });
  }
};rd
 * Retorna estadísticas agregadas para el dashboard principal
 */
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Promedio de habilidades de todos los estudiantes
    const students = await prisma.student.findMany({
      select: {
        statLogic: true,
        statCreativity: true,
        statWriting: true,
        avgTimeMinutes: true,
      },
    });

    let avgLogic = 0;
    let avgCreativity = 0;
    let avgWriting = 0;
    let avgTimeMinutes = 0;

    if (students.length > 0) {
      avgLogic = Math.round(
        students.reduce((sum, s) => sum + s.statLogic, 0) / students.length
      );
      avgCreativity = Math.round(
        students.reduce((sum, s) => sum + s.statCreativity, 0) / students.length
      );
      avgWriting = Math.round(
        students.reduce((sum, s) => sum + s.statWriting, 0) / students.length
      );
      avgTimeMinutes = Math.round(
        students.reduce((sum, s) => sum + s.avgTimeMinutes, 0) / students.length
      );
    }

    // 2. Total de misiones activas
    const activeMissionsCount = await prisma.mission.count({
      where: { status: 'active' },
    });

    // 3. Total de estudiantes
    const totalStudents = await prisma.student.count();

    // 4. Estudiantes online (conectados actualmente)
    const onlineStudentsCount = await prisma.student.count({
      where: { isOnline: true },
    });

    res.json({
      avgLogic,
      avgCreativity,
      avgWriting,
      avgTimeMinutes,
      activeMissionsCount,
      onlineStudentsCount,
      totalStudents,
    });
  } catch (error) {
    console.error('Error en getDashboardStats:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas del dashboard' });
  }
};
