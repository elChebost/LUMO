import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from '../services/profileService.js';

// Crear perfil
export const createProfileHandler = async (req, res) => {
  try {
    const { profilePicture, exp, coins, studentId } = req.body;

    if (!profilePicture || exp == null || coins == null || !studentId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    const profile = await createProfile({ profilePicture, exp, coins, studentId });
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error al crear perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todos los perfiles
export const getProfilesHandler = async (req, res) => {
  try {
    const profiles = await getProfiles();
    res.json(profiles);
  } catch (error) {
    console.error('Error al obtener perfiles:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener perfil por ID
export const getProfileByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await getProfileById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar perfil
export const updateProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await updateProfile(id, req.body);

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar perfil
export const deleteProfileHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getProfileById(id);

    if (!existing) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    await deleteProfile(id);
    res.json({ message: 'Perfil eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
