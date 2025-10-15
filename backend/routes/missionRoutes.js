import express from 'express';
import {
  createMissionHandler,
  getMissionsHandler,
  getMissionsByTitleHandler,
  getActiveMissionsHandler,
  getInactiveMissionsHandler,
  getTotalActiveMissionsHandler,
  getMissionByIdHandler,
  updateMissionHandler,
  deleteMissionHandler,
} from '../controllers/missionController.js';

const router = express.Router();

router.post('/', createMissionHandler);                     // POST /missions
router.get('/', getMissionsHandler);                        // GET /missions
router.get('/search', getMissionsByTitleHandler);           // GET /missions/search?title=matemáticas
router.get('/active', getActiveMissionsHandler);            // GET /missions/active
router.get('/inactive', getInactiveMissionsHandler);        // GET /missions/inactive
router.get('/total-active', getTotalActiveMissionsHandler); // GET /missions/total-active
router.get('/:id', getMissionByIdHandler);                  // GET /missions/:id
router.put('/:id', updateMissionHandler);                   // PUT /missions/:id
router.delete('/:id', deleteMissionHandler);                // DELETE /missions/:id

export default router;
