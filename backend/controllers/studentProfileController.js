import {
  createStudentProfile,
  getStudentProfiles,
  getStudentProfileById,
  updateStudentProfile,
  deleteStudentProfile,
} from '../services/studentProfileService.js';

// Crear perfil de estudiante
export const createStudentProfileHandler = async (req, res) => {
  try {
    const { avatar, exp, coins, studentId } = req.body;

    if (!studentId)
      return res.status(400).json({ message: 'Falta el ID del estudiante.' });

    const profile = await createStudentProfile({ avatar, exp, coins, studentId });
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error al crear perfil de estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener todos los perfiles
export const getStudentProfilesHandler = async (req, res) => {
  try {
    const profiles = await getStudentProfiles();
    res.json(profiles);
  } catch (error) {
    console.error('Error al obtener perfiles:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener por ID
export const getStudentProfileByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await getStudentProfileById(id);

    if (!profile)
      return res.status(404).json({ message: 'Perfil no encontrado.' });

    res.json(profile);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar perfil
export const updateStudentProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await updateStudentProfile(id, req.body);

    res.json(profile);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar perfil
export const deleteStudentProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteStudentProfile(id);
    res.json({ message: 'Perfil eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
