import express from 'express';
import {
  sendContact,
  getContactsHandler,
  getContactByIdHandler,
  updateContactHandler,
  deleteContactHandler
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', sendContact);                    // POST /contact
router.get('/', getContactsHandler);              // GET /contact
router.get('/:id', getContactByIdHandler);        // GET /contact/:id
router.put('/:id', updateContactHandler);         // PUT /contact/:id
router.delete('/:id', deleteContactHandler);      // DELETE /contact/:id

export default router;
