import express from 'express';
import {
  createAulaHandler,
  getAulasHandler,
  getAulaByIdHandler,
  updateAulaHandler,
  deleteAulaHandler,
} from '../controllers/aulaController.js';

const router = express.Router();

router.post('/', createAulaHandler);      // POST /aulas
router.get('/', getAulasHandler);         // GET /aulas
router.get('/:id', getAulaByIdHandler);   // GET /aulas/:id
router.put('/:id', updateAulaHandler);    // PUT /aulas/:id
router.delete('/:id', deleteAulaHandler); // DELETE /aulas/:id

export default router;
