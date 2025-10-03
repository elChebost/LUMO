import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// GET usuarios
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// POST usuario
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.status(201).json(user);
});

app.listen(4000, () => console.log("Backend en http://localhost:4000"));
