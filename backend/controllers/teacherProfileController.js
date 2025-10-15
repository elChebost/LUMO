import {
  createTeacherProfile,
  getTeacherProfiles,
  getTeacherProfileById,
  updateTeacherProfile,
  deleteTeacherProfile,
} from '../services/teacherProfileService.js';

// Crear perfil de docente
export const createTeacherProfileHandler = async (req, res) => {
  try {
    const { avatar, bio, teacherId } = req.body;

    if (!teacherId)
      return res.status(400).json({ message: 'Falta el ID del docente.' });

    const profile = await createTeacherProfile({ avatar, bio, teacherId });
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error al crear perfil de docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener todos los perfiles
export const getTeacherProfilesHandler = async (req, res) => {
  try {
    const profiles = await getTeacherProfiles();
    res.json(profiles);
  } catch (error) {
    console.error('Error al obtener perfiles:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener por ID
export const getTeacherProfileByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await getTeacherProfileById(id);

    if (!profile)
      return res.status(404).json({ message: 'Perfil no encontrado.' });

    res.json(profile);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar perfil
export const updateTeacherProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await updateTeacherProfile(id, req.body);
    res.json(profile);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar perfil
export const deleteTeacherProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTeacherProfile(id);
    res.json({ message: 'Perfil eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
