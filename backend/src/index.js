import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ============== USUARIOS ==============

// GET todos los usuarios
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        missions: true,
        notifications: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET usuario por ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        missions: true,
        notifications: true
      }
    });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST crear usuario
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, role = "alumno", xp = 0, level = 1 } = req.body;
    const user = await prisma.user.create({ 
      data: { name, email, role, xp, level } 
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============== MISIONES ==============

// GET todas las misiones
app.get("/api/missions", async (req, res) => {
  try {
    const missions = await prisma.mission.findMany({
      include: {
        students: true
      }
    });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET misión por ID
app.get("/api/missions/:id", async (req, res) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        students: true
      }
    });
    if (!mission) return res.status(404).json({ error: "Misión no encontrada" });
    res.json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST crear misión
app.post("/api/missions", async (req, res) => {
  try {
    const { title, description, dueDate, status = "activa" } = req.body;
    const mission = await prisma.mission.create({
      data: { title, description, dueDate: new Date(dueDate), status }
    });
    res.status(201).json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT actualizar misión
app.put("/api/missions/:id", async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const mission = await prisma.mission.update({
      where: { id: parseInt(req.params.id) },
      data: { 
        ...(title && { title }),
        ...(description && { description }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(status && { status })
      }
    });
    res.json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============== NOTIFICACIONES ==============

// GET todas las notificaciones
app.get("/api/notifications", async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        recipient: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT marcar notificación como leída
app.put("/api/notifications/:id/read", async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: parseInt(req.params.id) },
      data: { read: true }
    });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============== ESTADÍSTICAS ==============

// GET estadísticas generales del curso
app.get("/api/stats", async (req, res) => {
  try {
    const totalStudents = await prisma.user.count({ where: { role: "alumno" } });
    const students = await prisma.user.findMany({ where: { role: "alumno" } });
    const avgXP = students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + s.xp, 0) / students.length)
      : 0;
    
    const activeMissions = await prisma.mission.count({ where: { status: "activa" } });
    const totalMissions = await prisma.mission.count();

    res.json({
      totalStudents,
      avgXP,
      activeMissions,
      totalMissions,
      avgLevel: students.length > 0 
        ? Math.round(students.reduce((sum, s) => sum + s.level, 0) / students.length)
        : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET alumnos destacados (top 5 por XP)
app.get("/api/stats/top-students", async (req, res) => {
  try {
    const topStudents = await prisma.user.findMany({
      where: { role: "alumno" },
      orderBy: { xp: 'desc' },
      take: 5
    });
    res.json(topStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log("Backend en http://localhost:4000"));

