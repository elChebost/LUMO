import {
  createSkillTree,
  getSkillTrees,
  getSkillTreeById,
  updateSkillTree,
  deleteSkillTree
} from '../services/skillTreeService.js';

// Crear
export const createSkillTreeHandler = async (req, res) => {
  try {
    const { progress, xp, studentId } = req.body;

    if (progress == null || xp == null || !studentId) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    const skillTree = await createSkillTree({ progress, xp, studentId });
    res.status(201).json(skillTree);
  } catch (error) {
    console.error('Error al crear SkillTree:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todas
export const getSkillTreesHandler = async (req, res) => {
  try {
    const skillTrees = await getSkillTrees();
    res.json(skillTrees);
  } catch (error) {
    console.error('Error al obtener SkillTrees:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener por ID
export const getSkillTreeByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const skillTree = await getSkillTreeById(id);

    if (!skillTree) {
      return res.status(404).json({ message: 'SkillTree no encontrada.' });
    }

    res.json(skillTree);
  } catch (error) {
    console.error('Error al obtener SkillTree:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar
export const updateSkillTreeHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await getSkillTreeById(id);
    if (!existing) {
      return res.status(404).json({ message: 'SkillTree no encontrada.' });
    }

    const skillTree = await updateSkillTree(id, data);
    res.json(skillTree);
  } catch (error) {
    console.error('Error al actualizar SkillTree:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar
export const deleteSkillTreeHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await getSkillTreeById(id);
    if (!existing) {
      return res.status(404).json({ message: 'SkillTree no encontrada.' });
    }

    await deleteSkillTree(id);
    res.json({ message: 'SkillTree eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar SkillTree:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
