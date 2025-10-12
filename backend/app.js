import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import escuelaRoutes from './routes/escuelaRoutes.js';
import aulaRoutes from './routes/aulaRoutes.js';
import docenteRoutes from './routes/docenteRoutes.js';
import estudianteRoutes from './routes/estudianteRoutes.js';
import skillTreeRoutes from './routes/skillTreeRoutes.js';
import asignaturaRoutes from './routes/asignaturaRoutes.js';
import misionRoutes from './routes/misionRoutes.js';
import perfilRoutes from './routes/perfilRoutes.js';
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
app.use('/api/escuela', escuelaRoutes);
app.use('/api/aula', aulaRoutes);
app.use('/api/docente', docenteRoutes);
app.use('/api/estudiante', estudianteRoutes);
app.use('/api/skillTree', skillTreeRoutes);
app.use('/api/asignatura', asignaturaRoutes);
app.use('/api/mision', misionRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/contact', contactRoutes);
app.use

// Conexión a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
