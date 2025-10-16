import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// ✅ Todas las rutas ahora están disponibles
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import classroomRoutes from './routes/classroomRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import skillTreeRoutes from './routes/skillTreeRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import missionRoutes from './routes/missionRoutes.js';
import studentProfileRoutes from './routes/studentProfileRoutes.js';
import teacherProfileRoutes from './routes/teacherProfileRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
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

// ✅ Todas las rutas activas
app.use('/api/auth', authRoutes); // ✅ Login
app.use('/api/users', userRoutes); // ✅ Registro y perfil
app.use('/api/schools', schoolRoutes); // ✅ CRUD Escuelas
app.use('/api/classrooms', classroomRoutes); // ✅ CRUD Aulas
app.use('/api/teachers', teacherRoutes); // ✅ CRUD Profesores
app.use('/api/students', studentRoutes); // ✅ CRUD Estudiantes
app.use('/api/skillTrees', skillTreeRoutes); // ✅ Árboles de habilidad
app.use('/api/subjects', subjectRoutes); // ✅ CRUD Asignaturas
app.use('/api/missions', missionRoutes); // ✅ CRUD Misiones

// Rutas de perfiles separados
app.use('/api/studentProfiles', studentProfileRoutes); // ✅ Perfiles estudiantes
app.use('/api/teacherProfiles', teacherProfileRoutes); // ✅ Perfiles profesores

app.use('/api/contacts', contactRoutes); // ✅ Formulario de contacto
app.use('/api/data', dataRoutes); // ✅ Datos básicos y consultas especiales

// Conexión a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
