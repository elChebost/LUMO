import prisma from '../config/db.js';

// ✅ Crear una misión (nuevo sistema)
export const createMission = async ({ nombre, descripcionBreve, historia, fechaInicio, fechaFin, imagenURL, estado, roles, teacherId }) => {
  try {
    // Verificar que el profesor existe
    const teacher = await prisma.teacher.findUnique({
      where: { id: Number(teacherId) }
    });
    
    if (!teacher) {
      throw new Error('Profesor no encontrado. Debe crear un profesor primero.');
    }

    return await prisma.mission.create({
      data: {
        nombre,
        descripcionBreve,
        historia,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        imagenURL: imagenURL || null,
        estado: estado || 'inactiva',
        roles: typeof roles === 'string' ? roles : JSON.stringify(roles),
        teacher: { connect: { id: Number(teacherId) } },
      },
    });
  } catch (error) {
    throw error;
  }
};

// ✅ Obtener todas las misiones
export const getMissions = async () => {
  try {
    const missions = await prisma.mission.findMany({
      include: {
        teacher: true,
      },
      orderBy: {
        fechaInicio: 'asc'
      }
    });
    
    // Parsear roles JSON
    return missions.map(mission => ({
      ...mission,
      roles: typeof mission.roles === 'string' ? JSON.parse(mission.roles) : mission.roles
    }));
  } catch (error) {
    throw error; 
  }
};

// ✅ Obtener misiones por nombre (búsqueda)
export const getMissionsByTitle = async (nombre) => {
  try {
    const missions = await prisma.mission.findMany({
      where: {
        nombre: {
          contains: nombre,
          mode: 'insensitive'
        }
      },
      include: {
        teacher: true,
      }
    });
    
    return missions.map(mission => ({
      ...mission,
      roles: typeof mission.roles === 'string' ? JSON.parse(mission.roles) : mission.roles
    }));
  } catch (error) {
    throw error;
  }
};

// ✅ Obtener misiones activas
export const getActiveMissions = async () => {
  try {
    const missions = await prisma.mission.findMany({
      where: { estado: 'activa' },
      include: {
        teacher: true,
      }
    });
    
    return missions.map(mission => ({
      ...mission,
      roles: typeof mission.roles === 'string' ? JSON.parse(mission.roles) : mission.roles
    }));
  } catch (error) {
    throw error;
  }
};

// ✅ Obtener misiones inactivas
export const getInactiveMissions = async () => {
  try {
    const missions = await prisma.mission.findMany({
      where: { estado: 'inactiva' },
      include: {
        teacher: true,
      }
    });
    
    return missions.map(mission => ({
      ...mission,
      roles: typeof mission.roles === 'string' ? JSON.parse(mission.roles) : mission.roles
    }));
  } catch (error) {
    throw error;
  }
};

// ✅ Contar total de misiones activas
export const getTotalActiveMissions = async () => {
  try {
    return await prisma.mission.count({
      where: { estado: 'activa' },
    });
  } catch (error) {
    throw error;
  }
};

// ✅ Obtener una misión por ID
export const getMissionById = async (id) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: Number(id) },
      include: {
        teacher: true,
      }
    });
    
    if (!mission) return null;
    
    return {
      ...mission,
      roles: typeof mission.roles === 'string' ? JSON.parse(mission.roles) : mission.roles
    };
  } catch (error) {
    throw error; 
  }
};

// ✅ Actualizar una misión
export const updateMission = async (id, data) => {
  try {
    // Convertir roles a JSON string si es necesario
    if (data.roles && typeof data.roles !== 'string') {
      data.roles = JSON.stringify(data.roles);
    }
    
    // Convertir fechas si existen
    if (data.fechaInicio) {
      data.fechaInicio = new Date(data.fechaInicio);
    }
    if (data.fechaFin) {
      data.fechaFin = new Date(data.fechaFin);
    }
    
    const mission = await prisma.mission.update({
      where: { id: Number(id) },
      data,
    });
    
    return {
      ...mission,
      roles: typeof mission.roles === 'string' ? JSON.parse(mission.roles) : mission.roles
    };
  } catch (error) {
    throw error; 
  }
};

// ✅ Eliminar una misión
export const deleteMission = async (id) => {
  try {
    return await prisma.mission.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};
