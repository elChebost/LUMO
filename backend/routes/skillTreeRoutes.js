import express from 'express';
import {
  createSkillTreeHandler,
  getSkillTreesHandler,
  getAverageXpAllStudentsHandler,
  getSkillTreeByIdHandler,
  updateSkillTreeHandler,
  deleteSkillTreeHandler,
} from '../controllers/skillTreeController.js';

const router = express.Router();

router.post('/', createSkillTreeHandler);                    // POST /skilltrees
router.get('/', getSkillTreesHandler);                       // GET /skilltrees
router.get('/average-xp', getAverageXpAllStudentsHandler);   // GET /skilltrees/average-xp
router.get('/:id', getSkillTreeByIdHandler);                 // GET /skilltrees/:id
router.put('/:id', updateSkillTreeHandler);                  // PUT /skilltrees/:id
router.delete('/:id', deleteSkillTreeHandler);               // DELETE /skilltrees/:id

export default router;
