import {
  createPerfil,
  getPerfiles,
  getPerfilById,
  updatePerfil,
  deletePerfil,
} from '../services/perfilService.js';

// Crear perfil
export const createPerfilHandler = async (req, res) => {
  try {
    const { fotoPerfil, exp, monedas, estudianteId } = req.body;

    if (!fotoPerfil || exp == null || monedas == null || !estudianteId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    const perfil = await createPerfil({ fotoPerfil, exp, monedas, estudianteId });
    res.status(201).json(perfil);
  } catch (error) {
    console.error('Error al crear perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todos los perfiles
export const getPerfilesHandler = async (req, res) => {
  try {
    const perfiles = await getPerfiles();
    res.json(perfiles);
  } catch (error) {
    console.error('Error al obtener perfiles:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener perfil por ID
export const getPerfilByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await getPerfilById(id);

    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    res.json(perfil);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar perfil
export const updatePerfilHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await updatePerfil(id, req.body);

    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    res.json(perfil);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar perfil
export const deletePerfilHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getPerfilById(id);

    if (!existing) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    await deletePerfil(id);
    res.json({ message: 'Perfil eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
