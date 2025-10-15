import * as ContactService from '../services/contactService.js';

// Crear contacto
export const sendContact = async (req, res) => {
  try {
    const contact = await ContactService.saveContact(req.body);
    res.status(201).json({ message: 'Mensaje recibido', contact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar contactos
export const getContactsHandler = async (req, res) => {
  try {
    const contacts = await ContactService.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener contacto por ID
export const getContactByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactService.getContactById(parseInt(id));

    if (!contact) return res.status(404).json({ message: 'Contacto no encontrado.' });

    res.json(contact);
  } catch (error) {
    console.error('Error al obtener contacto:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar contacto
export const updateContactHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await ContactService.getContactById(parseInt(id));
    if (!existing) return res.status(404).json({ message: 'Contacto no encontrado.' });

    const contact = await ContactService.updateContact(parseInt(id), data);
    res.json(contact);
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar contacto
export const deleteContactHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await ContactService.getContactById(parseInt(id));
    if (!existing) return res.status(404).json({ message: 'Contacto no encontrado.' });

    await ContactService.deleteContact(parseInt(id));
    res.json({ message: 'Contacto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
