import express from 'express';
import {
  createMissionHandler,
  getMissionsHandler,
  getMissionByIdHandler,
  updateMissionHandler,
  deleteMissionHandler,
} from '../controllers/missionController.js';

const router = express.Router();

router.post('/', createMissionHandler);      // POST /missions
router.get('/', getMissionsHandler);         // GET /missions
router.get('/:id', getMissionByIdHandler);   // GET /missions/:id
router.put('/:id', updateMissionHandler);    // PUT /missions/:id
router.delete('/:id', deleteMissionHandler); // DELETE /missions/:id

export default router;
