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

// Crear
export const createMissionHandler = async (req, res) => {
  try {
    const { title, description, status, grade, teacherId } = req.body;

    if (!title || !description || !status || !grade || !teacherId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const mission = await createMission({ title, description, status, grade, teacherId });
    res.status(201).json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todas
export const getMissionsHandler = async (req, res) => {
  try {
    const missions = await getMissions();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar misiones por título
export const getMissionsByTitleHandler = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: 'El parámetro "title" es requerido' });
    }

    const missions = await getMissionsByTitle(title);
    
    if (missions.length === 0) {
      return res.status(404).json({ 
        message: `No se encontraron misiones con el título: ${title}` 
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
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// Obtener por ID
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
