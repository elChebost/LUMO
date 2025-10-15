import {
  createSkillTree,
  getSkillTrees,
  getSkillTreeById,
  updateSkillTree,
  deleteSkillTree,
  getAverageXpAllStudents
} from '../services/skillTreeService.js';

// Crear skillTree
export const createSkillTreeHandler = async (req, res) => {
  try {
    const { progress, xp, studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: 'El ID del estudiante es obligatorio' });
    }

    const skillTree = await createSkillTree({ progress, xp, studentId });
    res.status(201).json(skillTree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las skillTrees
export const getSkillTreesHandler = async (req, res) => {
  try {
    const skillTrees = await getSkillTrees();
    res.json(skillTrees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// XP promedio de todos los estudiantes
export const getAverageXpAllStudentsHandler = async (req, res) => {
  try {
    let averageXp = await getAverageXpAllStudents();
    
    // Redondear a 1 decimal usando Math.round para mayor precisión
    averageXp = Math.round(averageXp * 10) / 10;
    
    res.json({ 
      averageXp,
      formattedAverageXp: averageXp.toFixed(1) // Para mostrar siempre 1 decimal
    });
  } catch (error) {
    console.error('Error al calcular XP promedio:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener skillTree por ID
export const getSkillTreeByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const skillTree = await getSkillTreeById(id);

    if (!skillTree) {
      return res.status(404).json({ message: 'SkillTree no encontrada' });
    }

    res.json(skillTree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar skillTree
export const updateSkillTreeHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const skillTree = await updateSkillTree(id, req.body);

    if (!skillTree) {
      return res.status(404).json({ message: 'SkillTree no encontrada' });
    }

    res.json(skillTree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar skillTree
export const deleteSkillTreeHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSkillTree(id);
    res.json({ message: 'SkillTree eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
