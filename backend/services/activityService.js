import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Activity Service - Lógica de negocio para actividades de misiones
 */

// Crear actividad
export const createActivity = async (missionId, data) => {
  try {
    // Obtener el siguiente orden
    const maxOrder = await prisma.activity.aggregate({
      where: { missionId: parseInt(missionId) },
      _max: { order: true }
    });

    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    const activity = await prisma.activity.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type, // 'logic', 'creativity', 'writing'
        content: data.content || null,
        points: parseInt(data.points) || 10,
        order: nextOrder,
        missionId: parseInt(missionId)
      }
    });

    return activity;
  } catch (error) {
    console.error('Error en createActivity:', error);
    throw error;
  }
};

// Obtener actividades de una misión
export const getActivitiesByMission = async (missionId) => {
  try {
    const activities = await prisma.activity.findMany({
      where: { missionId: parseInt(missionId) },
      orderBy: { order: 'asc' }
    });

    return activities;
  } catch (error) {
    console.error('Error en getActivitiesByMission:', error);
    throw error;
  }
};

// Actualizar actividad
export const updateActivity = async (id, data) => {
  try {
    const activity = await prisma.activity.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        content: data.content || null,
        points: parseInt(data.points) || 10
      }
    });

    return activity;
  } catch (error) {
    console.error('Error en updateActivity:', error);
    throw error;
  }
};

// Eliminar actividad
export const deleteActivity = async (id) => {
  try {
    await prisma.activity.delete({
      where: { id: parseInt(id) }
    });

    return { message: 'Activity deleted successfully' };
  } catch (error) {
    console.error('Error en deleteActivity:', error);
    throw error;
  }
};

// Reordenar actividades
export const reorderActivities = async (missionId, activitiesOrder) => {
  try {
    // activitiesOrder es un array de { id, order }
    const updatePromises = activitiesOrder.map((item) =>
      prisma.activity.update({
        where: { id: parseInt(item.id) },
        data: { order: parseInt(item.order) }
      })
    );

    await Promise.all(updatePromises);

    const activities = await getActivitiesByMission(missionId);
    return activities;
  } catch (error) {
    console.error('Error en reorderActivities:', error);
    throw error;
  }
};
