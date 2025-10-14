import {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} from '../services/schoolService.js';

// Crear
export const createSchoolHandler = async (req, res) => {
  try {
    const { name, address, shift } = req.body;

    if (!name || !address || !shift) {
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    const school = await createSchool({ name, address, shift });
    res.status(201).json(school);
  } catch (error) {
    // Ejemplo de conflicto: escuela duplicada
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'La escuela ya existe.' });
    }

    console.error('Error al crear escuela:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todas
export const getSchoolsHandler = async (req, res) => {
  try {
    const schools = await getSchools();
    if (schools.length === 0) {
      return res.status(404).json({ message: 'No hay escuelas registradas.' });
    }
    res.json(schools);
  } catch (error) {
    console.error('Error al obtener escuelas:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener por ID
export const getSchoolByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await getSchoolById(id);

    if (!school) {
      return res.status(404).json({ message: 'Escuela no encontrada.' });
    }

    res.json(school);
  } catch (error) {
    console.error('Error al obtener escuela:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar
export const updateSchoolHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, shift } = req.body;

    if (!name && !address && !shift) {
      return res.status(400).json({ message: 'Debe enviar al menos un campo para actualizar.' });
    }

    const school = await updateSchool(id, req.body);
    res.json(school);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Escuela no encontrada para actualizar.' });
    }

    console.error('Error al actualizar escuela:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar
export const deleteSchoolHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSchool(id);
    res.json({ message: 'Escuela eliminada correctamente.' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Escuela no encontrada para eliminar.' });
    }

    console.error('Error al eliminar escuela:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
