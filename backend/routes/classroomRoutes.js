import express from 'express';
import {
  createClassroomHandler,
  getClassroomsHandler,
  getClassroomByIdHandler,
  updateClassroomHandler,
  deleteClassroomHandler,
} from '../controllers/classroomController.js';

const router = express.Router();

router.post('/', createClassroomHandler);      // POST /classrooms
router.get('/', getClassroomsHandler);         // GET /classrooms
router.get('/:id', getClassroomByIdHandler);   // GET /classrooms/:id
router.put('/:id', updateClassroomHandler);    // PUT /classrooms/:id
router.delete('/:id', deleteClassroomHandler); // DELETE /classrooms/:id

export default router;
