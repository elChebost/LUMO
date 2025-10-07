import express from 'express';
import {
  createPerfilHandler,
  getPerfilesHandler,
  getPerfilByIdHandler,
  updatePerfilHandler,
  deletePerfilHandler,
} from '../controllers/perfilController.js';

const router = express.Router();

router.post('/', createPerfilHandler);      // POST /perfiles
router.get('/', getPerfilesHandler);        // GET /perfiles
router.get('/:id', getPerfilByIdHandler);   // GET /perfiles/:id
router.put('/:id', updatePerfilHandler);    // PUT /perfiles/:id
router.delete('/:id', deletePerfilHandler); // DELETE /perfiles/:id

export default router;
