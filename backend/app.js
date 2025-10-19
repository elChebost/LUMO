import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
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
import activityRoutes from './routes/activityRoutes.js'; // ✅ Nuevo - Actividades
import studentProfileRoutes from './routes/studentProfileRoutes.js';
import teacherProfileRoutes from './routes/teacherProfileRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js'; // ✅ Nuevo
import notificationRoutes from './routes/notificationRoutes.js'; // ✅ Nuevo
import { connectDB } from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configurar CORS ANTES de cualquier ruta (acepta múltiples puertos de Vite)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir archivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api', activityRoutes); // ✅ CRUD Actividades (incluye /missions/:id/activities)

// Rutas de perfiles separados
app.use('/api/studentProfiles', studentProfileRoutes); // ✅ Perfiles estudiantes
app.use('/api/teacherProfiles', teacherProfileRoutes); // ✅ Perfiles profesores

app.use('/api/contacts', contactRoutes); // ✅ Formulario de contacto
app.use('/api/data', dataRoutes); // ✅ Datos básicos y consultas especiales

// ✅ Nuevas rutas del rediseño
app.use('/api/dashboard', dashboardRoutes); // ✅ Estadísticas del dashboard
app.use('/api/notifications', notificationRoutes); // ✅ Sistema de notificaciones

// Conexión a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
