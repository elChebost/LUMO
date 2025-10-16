import express from 'express';
import { getBasicData, getStudentById } from '../controllers/dataController.js';

const router = express.Router();

router.get('/basic', getBasicData);
router.get('/student/:id', getStudentById);

export default router;