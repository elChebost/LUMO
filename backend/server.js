import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Cargar variables de entorno
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// CORS simple - permitir todo
app.use(cors());
app.use(express.json());

console.log("🚀 Iniciando servidor LUMO...");

// ============== USUARIOS ==============

app.get("/api/users", async (req, res) => {
  console.log("📡 GET /api/users");
  try {
    const users = await prisma.user.findMany({
      include: {
        missions: true,
        notifications: true
      }
    });
    console.log(`✅ Retornando ${users.length} usuarios`);
    res.json(users);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  console.log(`📡 GET /api/users/${req.params.id}`);
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
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  console.log("📡 POST /api/users");
  try {
    const { firstName, lastName, email, password, role = "alumno", xp = 0, level = 1 } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const name = `${firstName} ${lastName}`;
    const user = await prisma.user.create({ 
      data: { firstName, lastName, name, email, password, role, xp, level } 
    });
    
    console.log(`✅ Usuario creado: ${user.name}`);
    res.status(201).json(user);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============== MISIONES ==============

app.get("/api/missions", async (req, res) => {
  console.log("📡 GET /api/missions");
  try {
    const missions = await prisma.mission.findMany({
      include: {
        students: true
      }
    });
    console.log(`✅ Retornando ${missions.length} misiones`);
    res.json(missions);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/missions/:id", async (req, res) => {
  console.log(`📡 GET /api/missions/${req.params.id}`);
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
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/missions", async (req, res) => {
  console.log("📡 POST /api/missions");
  try {
    const { 
      title, 
      description, 
      subject = "General",
      dueDate, 
      timeLimit = "23:59",
      activationDate,
      status = "activa",
      studentIds = []
    } = req.body;

    const mission = await prisma.mission.create({
      data: { 
        title, 
        description, 
        subject,
        dueDate: new Date(dueDate), 
        timeLimit,
        activationDate: activationDate ? new Date(activationDate) : new Date(),
        status,
        students: {
          connect: studentIds.map(id => ({ id: parseInt(id) }))
        }
      },
      include: {
        students: true
      }
    });
    console.log(`✅ Misión creada: ${mission.title}`);
    res.status(201).json(mission);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/missions/:id", async (req, res) => {
  console.log(`📡 PUT /api/missions/${req.params.id}`);
  try {
    const { title, description, subject, dueDate, timeLimit, activationDate, status, studentIds } = req.body;
    const mission = await prisma.mission.update({
      where: { id: parseInt(req.params.id) },
      data: { 
        ...(title && { title }),
        ...(description && { description }),
        ...(subject && { subject }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(timeLimit && { timeLimit }),
        ...(activationDate && { activationDate: new Date(activationDate) }),
        ...(status && { status }),
        ...(studentIds && {
          students: {
            set: studentIds.map(id => ({ id: parseInt(id) }))
          }
        })
      },
      include: {
        students: true
      }
    });
    console.log(`✅ Misión actualizada: ${mission.title}`);
    res.json(mission);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============== ESTADÍSTICAS ==============

app.get("/api/stats", async (req, res) => {
  console.log("📡 GET /api/stats");
  try {
    const totalStudents = await prisma.user.count({ where: { role: "alumno" } });
    const students = await prisma.user.findMany({ where: { role: "alumno" } });
    const avgXP = students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + s.xp, 0) / students.length)
      : 0;
    
    const activeMissions = await prisma.mission.count({ where: { status: "activa" } });
    const totalMissions = await prisma.mission.count();

    const stats = {
      totalStudents,
      avgXP,
      activeMissions,
      totalMissions,
      avgLevel: students.length > 0 
        ? Math.round(students.reduce((sum, s) => sum + s.level, 0) / students.length)
        : 0
    };
    
    console.log("✅ Estadísticas:", stats);
    res.json(stats);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/stats/top-students", async (req, res) => {
  console.log("📡 GET /api/stats/top-students");
  try {
    const topStudents = await prisma.user.findMany({
      where: { role: "alumno" },
      orderBy: { xp: 'desc' },
      take: 5
    });
    console.log(`✅ Top ${topStudents.length} estudiantes`);
    res.json(topStudents);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============== NOTIFICACIONES ==============

app.get("/api/notifications", async (req, res) => {
  console.log("📡 GET /api/notifications");
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        recipient: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    console.log(`✅ Retornando ${notifications.length} notificaciones`);
    res.json(notifications);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/notifications/:id/read", async (req, res) => {
  console.log(`📡 PUT /api/notifications/${req.params.id}/read`);
  try {
    const notification = await prisma.notification.update({
      where: { id: parseInt(req.params.id) },
      data: { read: true }
    });
    console.log(`✅ Notificación ${notification.id} marcada como leída`);
    res.json(notification);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============== LOGIN ==============

app.post("/api/auth/login", async (req, res) => {
  console.log("📡 POST /api/auth/login");
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        missions: true,
        notifications: true
      }
    });
    
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    console.log(`✅ Login exitoso: ${user.name}`);
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============== BÚSQUEDA ==============

app.get("/api/search", async (req, res) => {
  console.log(`📡 GET /api/search?q=${req.query.q}`);
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const searchTerm = q.toLowerCase();

    const students = await prisma.user.findMany({
      where: {
        AND: [
          { role: "alumno" },
          {
            OR: [
              { name: { contains: searchTerm, mode: 'insensitive' } },
              { firstName: { contains: searchTerm, mode: 'insensitive' } },
              { lastName: { contains: searchTerm, mode: 'insensitive' } },
              { email: { contains: searchTerm, mode: 'insensitive' } }
            ]
          }
        ]
      },
      take: 5
    });

    const missions = await prisma.mission.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { subject: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      take: 5
    });

    const results = [
      ...students.map(s => ({ 
        id: s.id, 
        type: 'student', 
        title: s.name, 
        subtitle: s.email,
        url: `/students/${s.id}`
      })),
      ...missions.map(m => ({ 
        id: m.id, 
        type: 'mission', 
        title: m.title, 
        subtitle: m.subject,
        url: `/missions/${m.id}`
      }))
    ];

    console.log(`✅ ${results.length} resultados`);
    res.json(results);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`\n✅ Backend LUMO corriendo en http://localhost:${PORT}`);
  console.log(`📊 Prisma conectado a SQLite\n`);
});
