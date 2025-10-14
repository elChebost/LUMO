import express from 'express';
import {
  createSchoolHandler,
  getSchoolsHandler,
  getSchoolByIdHandler,
  updateSchoolHandler,
  deleteSchoolHandler,
} from '../controllers/schoolController.js';

const router = express.Router();

router.post('/', createSchoolHandler);      // POST /schools
router.get('/', getSchoolsHandler);         // GET /schools
router.get('/:id', getSchoolByIdHandler);   // GET /schools/:id
router.put('/:id', updateSchoolHandler);    // PUT /schools/:id
router.delete('/:id', deleteSchoolHandler); // DELETE /schools/:id

export default router;
