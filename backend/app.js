import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import classroomRoutes from './routes/classroomRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import skillTreeRoutes from './routes/skillTreeRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import missionRoutes from './routes/missionRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS para permitir el frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/skillTrees', skillTreeRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/contacts', contactRoutes);

// Conexión a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
