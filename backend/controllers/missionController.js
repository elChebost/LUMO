import {
  createMission,
  getMissions,
  getMissionById,
  updateMission,
  deleteMission,
  getActiveMissions,
  getInactiveMissions,
  getMissionsByTitle,
  getTotalActiveMissions,
} from '../services/missionService.js';

// ✅ Crear misión (nuevo sistema)
export const createMissionHandler = async (req, res) => {
  try {
    const { nombre, descripcionBreve, historia, fechaInicio, fechaFin, imagenURL, estado, roles, teacherId } = req.body;

    if (!nombre || !descripcionBreve || !historia || !fechaInicio || !fechaFin || !roles || !teacherId) {
      return res.status(400).json({ 
        message: 'Faltan campos obligatorios: nombre, descripcionBreve, historia, fechaInicio, fechaFin, roles, teacherId' 
      });
    }

    const mission = await createMission({ 
      nombre, 
      descripcionBreve, 
      historia, 
      fechaInicio, 
      fechaFin, 
      imagenURL, 
      estado: estado || 'inactiva', 
      roles,
      teacherId 
    });
    
    res.status(201).json({ 
      message: 'Misión creada exitosamente', 
      mission 
    });
  } catch (error) {
    console.error('Error al crear misión:', error);
    res.status(500).json({ 
      message: 'Error al crear misión', 
      error: error.message 
    });
  }
};

// ✅ Listar todas las misiones
export const getMissionsHandler = async (req, res) => {
  try {
    const missions = await getMissions();
    res.json(missions || []);
  } catch (error) {
    console.error('[ERROR] getMissionsHandler:', error);
    // Devolver array vacío en lugar de objeto con error
    res.json([]);
  }
};

// ✅ Buscar misiones por nombre
export const getMissionsByTitleHandler = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ message: 'El parámetro "nombre" es requerido' });
    }

    const missions = await getMissionsByTitle(nombre);
    
    if (missions.length === 0) {
      return res.status(404).json({ 
        message: `No se encontraron misiones con el nombre: ${nombre}` 
      });
    }

    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar misiones activas
export const getActiveMissionsHandler = async (req, res) => {
  try {
    const missions = await getActiveMissions();
    res.json(missions || []);
  } catch (error) {
    console.error('[ERROR] getActiveMissionsHandler:', error);
    // Devolver array vacío en lugar de objeto con error
    res.json([]);
  }
};

// Listar misiones inactivas
export const getInactiveMissionsHandler = async (req, res) => {
  try {
    const missions = await getInactiveMissions();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener total de misiones activas
export const getTotalActiveMissionsHandler = async (req, res) => {
  try {
    const totalActiveMissions = await getTotalActiveMissions();
    res.json({ 
      totalActiveMissions,
      message: `Total de misiones activas: ${totalActiveMissions}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Obtener misión por ID
export const getMissionByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const mission = await getMissionById(id);

    if (!mission) {
      return res.status(404).json({ message: 'Misión no encontrada' });
    }

    res.json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
export const updateMissionHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const mission = await updateMission(id, req.body);

    if (!mission) {
      return res.status(404).json({ message: 'Misión no encontrada' });
    }

    res.json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
export const deleteMissionHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMission(id);
    res.json({ message: 'Misión eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
