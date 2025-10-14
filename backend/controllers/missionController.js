import {
  createMission,
  getMissions,
  getMissionById,
  updateMission,
  deleteMission,
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
