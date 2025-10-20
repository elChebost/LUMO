import prisma from '../config/db.js';

/**
 * Recalcula las estadísticas de un estudiante basándose en sus misiones completadas
 * @param {number} studentId - ID del estudiante
 * @returns {Promise<Object>} - Objeto con las estadísticas actualizadas
 */
export async function recalculateStudentStats(studentId) {
  // Obtener todas las misiones completadas del estudiante
  const completedMissions = await prisma.studentMissionProgress.findMany({
    where: {
      studentId,
      status: 'completed'
    }
  });

  const total = completedMissions.length;

  // Contar roles elegidos
  let rolesLogicCount = 0;
  let rolesCreativityCount = 0;
  let rolesLanguageCount = 0;

  completedMissions.forEach(progress => {
    const roleId = progress.selectedRoleId;
    if (roleId === 1) rolesLogicCount++;
    else if (roleId === 2) rolesCreativityCount++;
    else if (roleId === 3) rolesLanguageCount++;
  });

  // Calcular porcentajes
  const statLogic = total > 0 ? Math.round((rolesLogicCount / total) * 100) : 0;
  const statCreativity = total > 0 ? Math.round((rolesCreativityCount / total) * 100) : 0;
  const statLanguage = total > 0 ? Math.round((rolesLanguageCount / total) * 100) : 0;

  // Actualizar estudiante
  const updatedStudent = await prisma.student.update({
    where: { id: studentId },
    data: {
      statLogic,
      statCreativity,
      statLanguage,
      rolesLogicCount,
      rolesCreativityCount,
      rolesLanguageCount,
      missionsCompleted: total
    }
  });

  return {
    statLogic,
    statCreativity,
    statLanguage,
    rolesLogicCount,
    rolesCreativityCount,
    rolesLanguageCount,
    missionsCompleted: total
  };
}

/**
 * Calcula el progreso de un estudiante (misiones completadas / total de misiones)
 * @param {number} studentId - ID del estudiante
 * @returns {Promise<Object>} - Objeto con el progreso
 */
export async function getStudentProgress(studentId) {
  // Contar total de misiones (activas + finalizadas)
  const totalMissions = await prisma.mission.count({
    where: {
      OR: [
        { estado: 'activa' },
        { estado: 'finalizada' }
      ]
    }
  });

  // Contar misiones completadas por el estudiante
  const completedMissions = await prisma.studentMissionProgress.count({
    where: {
      studentId,
      status: 'completed'
    }
  });

  return {
    completedMissions,
    totalMissions,
    progressPercentage: totalMissions > 0 
      ? Math.round((completedMissions / totalMissions) * 100) 
      : 0
  };
}

/**
 * Calcula el promedio de habilidades de todos los estudiantes
 * @returns {Promise<Object>} - Promedio de cada habilidad
 */
export async function calculateClassroomAverageStats() {
  const students = await prisma.student.findMany({
    select: {
      statLogic: true,
      statCreativity: true,
      statLanguage: true
    }
  });

  if (students.length === 0) {
    return {
      avgLogic: 0,
      avgCreativity: 0,
      avgLanguage: 0
    };
  }

  const sumLogic = students.reduce((sum, s) => sum + s.statLogic, 0);
  const sumCreativity = students.reduce((sum, s) => sum + s.statCreativity, 0);
  const sumLanguage = students.reduce((sum, s) => sum + s.statLanguage, 0);

  return {
    avgLogic: Math.round(sumLogic / students.length),
    avgCreativity: Math.round(sumCreativity / students.length),
    avgLanguage: Math.round(sumLanguage / students.length)
  };
}

/**
 * Registra la elección de rol de un estudiante en una misión
 * @param {number} studentId - ID del estudiante
 * @param {number} missionId - ID de la misión
 * @param {number} roleId - ID del rol elegido (1=Lógica, 2=Creatividad, 3=Lengua)
 * @param {string} roleName - Nombre del rol
 */
export async function registerRoleSelection(studentId, missionId, roleId, roleName) {
  // Verificar que no exista ya un progreso para esta misión
  const existing = await prisma.studentMissionProgress.findUnique({
    where: {
      studentId_missionId: {
        studentId,
        missionId
      }
    }
  });

  if (existing) {
    throw new Error('El estudiante ya tiene asignado un rol para esta misión');
  }

  // Crear el progreso con el rol seleccionado
  const progress = await prisma.studentMissionProgress.create({
    data: {
      studentId,
      missionId,
      selectedRoleId: roleId,
      selectedRoleName: roleName,
      status: 'in_progress'
    }
  });

  return progress;
}

/**
 * Marca una misión como completada y recalcula las estadísticas
 * @param {number} studentId - ID del estudiante
 * @param {number} missionId - ID de la misión
 */
export async function completeMission(studentId, missionId) {
  // Actualizar el progreso
  const progress = await prisma.studentMissionProgress.update({
    where: {
      studentId_missionId: {
        studentId,
        missionId
      }
    },
    data: {
      status: 'completed',
      completedAt: new Date()
    }
  });

  // Recalcular estadísticas del estudiante
  await recalculateStudentStats(studentId);

  return progress;
}
