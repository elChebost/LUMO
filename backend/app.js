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
const HOST = process.env.HOST || '0.0.0.0'; // Escuchar en todas las interfaces

// Mostrar PID en logs para detectar procesos duplicados
const PID = process.pid;

// ✅ Configurar CORS para producción y desarrollo
// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:5173',           // Desarrollo local
  'http://localhost:4173',           // Preview local
  'http://lumo.anima.edu.uy',        // Producción HTTP
  'https://lumo.anima.edu.uy',       // Producción HTTPS
  process.env.FRONTEND_URL,          // URL configurada en .env
].filter(Boolean); // Filtrar valores undefined

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  console.log(`[CORS] ${req.method} ${req.path} | Origin: ${origin || 'no-origin'}`);
  
  // Permitir requests sin origin (por ejemplo curl/postman o requests del mismo origen)
  if (!origin) {
    return next();
  }

  // Verificar si el origin está en la lista de permitidos
  if (allowedOrigins.includes(origin)) {
    console.log(`[CORS] ✅ Allowing origin: ${origin}`);
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
  } else {
    console.log(`[CORS] ⚠️  Unknown origin: ${origin}`);
    // En producción, aún permitir pero sin credentials
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
    }
  }

  // Responder inmediatamente a preflight requests
  if (req.method === 'OPTIONS') {
    console.log('[CORS] Responding to OPTIONS preflight');
    return res.sendStatus(204);
  }

  next();
});

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

// Ruta de health-check sencilla para confirmar que el servidor está arriba
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    pid: PID, 
    port: PORT,
    host: HOST,
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en ${HOST}:${PORT} (pid=${PID})`);
  console.log(`📝 Modo: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS permitido desde: ${allowedOrigins.join(', ')}`);
});
