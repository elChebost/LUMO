import prisma from '../config/db.js';

export const saveContact = async ({ nombre, email, mensaje }) => {
  const contact = await prisma.contact.create({
    data: { nombre, email, mensaje }
  });
  return contact;
};

// Obtener todos los contactos
export const getContacts = async () => {
  try {
    return await prisma.contact.findMany();
  } catch (error) {
    throw error;
  }
};

// Obtener contacto por ID
export const getContactById = async (id) => {
  try {
    return await prisma.contact.findUnique({
      where: { id: parseInt(id) }
    });
  } catch (error) {
    throw error;
  }
};

// Actualizar contacto
export const updateContact = async (id, data) => {
  try {
    return await prisma.contact.update({
      where: { id: parseInt(id) },
      data
    });
  } catch (error) {
    throw error;
  }
};

// Eliminar contacto
export const deleteContact = async (id) => {
  try {
    return await prisma.contact.delete({
      where: { id: parseInt(id) }
    });
  } catch (error) {
    throw error;
  }
};
