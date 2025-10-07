import express from 'express';
import {
  createMisionHandler,
  getMisionesHandler,
  getMisionByIdHandler,
  updateMisionHandler,
  deleteMisionHandler,
} from '../controllers/misionController.js';

const router = express.Router();

router.post('/', createMisionHandler);      // POST /misiones
router.get('/', getMisionesHandler);         // GET /misiones
router.get('/:id', getMisionByIdHandler);   // GET /misiones/:id
router.put('/:id', updateMisionHandler);    // PUT /misiones/:id
router.delete('/:id', deleteMisionHandler); // DELETE /misiones/:id

export default router;
