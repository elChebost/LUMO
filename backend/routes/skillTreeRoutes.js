import express from 'express';
import {
  createSkillTreeHandler,
  getSkillTreesHandler,
  getSkillTreeByIdHandler,
  updateSkillTreeHandler,
  deleteSkillTreeHandler,
} from '../controllers/skillTreeController.js';

const router = express.Router();

router.post('/', createSkillTreeHandler);      // POST /skillTrees
router.get('/', getSkillTreesHandler);         // GET /skillTrees
router.get('/:id', getSkillTreeByIdHandler);   // GET /skillTrees/:id
router.put('/:id', updateSkillTreeHandler);    // PUT /skillTrees/:id
router.delete('/:id', deleteSkillTreeHandler); // DELETE /skillTrees/:id

export default router;
