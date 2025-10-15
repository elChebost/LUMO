# 🔗 GUÍA DE CONEXIÓN FRONTEND ↔ BACKEND - LUMO

## ⚠️ PROBLEMAS CRÍTICOS DETECTADOS

### 🚨 El backend NO arrancará actualmente

**Razón**: Hay imports de archivos que no existen en `app.js`:

```javascript
// Estos archivos NO EXISTEN:
import authRoutes from './routes/authRoutes.js';      // ❌
import userRoutes from './routes/userRoutes.js';       // ❌
import schoolRoutes from './routes/schoolRoutes.js';   // ❌
import classroomRoutes from './routes/classroomRoutes.js'; // ❌
import teacherRoutes from './routes/teacherRoutes.js'; // ❌
import subjectRoutes from './routes/subjectRoutes.js'; // ❌
import contactRoutes from './routes/contactRoutes.js'; // ❌
```

**Solución inmediata**: Comentar esos imports en `backend/app.js`

---

## 🔧 CONFIGURACIÓN RÁPIDA (15 minutos)

### Paso 1: Arreglar el Backend (backend/app.js)

**Comentar imports y rutas que no existen:**

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import authRoutes from './routes/authRoutes.js';           // ❌ COMENTAR
// import userRoutes from './routes/userRoutes.js';            // ❌ COMENTAR
// import schoolRoutes from './routes/schoolRoutes.js';        // ❌ COMENTAR
// import classroomRoutes from './routes/classroomRoutes.js';  // ❌ COMENTAR
// import teacherRoutes from './routes/teacherRoutes.js';      // ❌ COMENTAR
import studentRoutes from './routes/studentRoutes.js';         // ✅ EXISTE
import skillTreeRoutes from './routes/skillTreeRoutes.js';     // ✅ EXISTE
// import subjectRoutes from './routes/subjectRoutes.js';      // ❌ COMENTAR
import missionRoutes from './routes/missionRoutes.js';         // ✅ EXISTE
import studentProfileRoutes from './routes/studentProfileRoutes.js';  // ✅ EXISTE
import teacherProfileRoutes from './routes/teacherProfileRoutes.js';  // ✅ EXISTE
// import contactRoutes from './routes/contactRoutes.js';      // ❌ COMENTAR
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Rutas funcionales
// app.use('/api/auth', authRoutes);              // ❌ COMENTAR
// app.use('/api/users', userRoutes);             // ❌ COMENTAR
// app.use('/api/schools', schoolRoutes);         // ❌ COMENTAR
// app.use('/api/classrooms', classroomRoutes);   // ❌ COMENTAR
// app.use('/api/teachers', teacherRoutes);       // ❌ COMENTAR
app.use('/api/students', studentRoutes);          // ✅
app.use('/api/skillTrees', skillTreeRoutes);      // ✅
// app.use('/api/subjects', subjectRoutes);       // ❌ COMENTAR
app.use('/api/missions', missionRoutes);          // ✅
app.use('/api/studentProfiles', studentProfileRoutes);  // ✅
app.use('/api/teacherProfiles', teacherProfileRoutes);  // ✅
// app.use('/api/contacts', contactRoutes);       // ❌ COMENTAR

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

### Paso 2: Arreglar el Puerto del Frontend

**Archivo**: `frontend/src/config/api.js`

```javascript
// ANTES (INCORRECTO):
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// DESPUÉS (CORRECTO):
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

---

## 📝 ADAPTACIONES NECESARIAS EN EL FRONTEND

### 1. Students.jsx - Cambiar de /users a /students

**Archivo**: `frontend/src/pages/Students.jsx`

```javascript
// ❌ ANTES (línea ~28):
const loadStudents = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/users`);
    const data = await response.json();
    // Filtrar solo alumnos
    const studentsOnly = data.filter(user => user.role === 'alumno');
    setStudents(studentsOnly);
  } catch (error) {
    console.error('Error cargando alumnos:', error);
  } finally {
    setLoading(false);
  }
};

// ✅ DESPUÉS:
const loadStudents = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/students`);
    const data = await response.json();
    // Ya son todos estudiantes, no necesita filtrar
    setStudents(data);
  } catch (error) {
    console.error('Error cargando alumnos:', error);
  } finally {
    setLoading(false);
  }
};
```

---

### 2. Dashboard.jsx - Construir stats desde múltiples endpoints

**Archivo**: `frontend/src/pages/Dashboard.jsx`

```javascript
// ❌ ANTES (línea ~25):
const loadDashboardData = async () => {
  try {
    setLoading(true);
    
    // Cargar estadísticas generales
    const statsRes = await fetch(`${API_URL}/stats`);  // ❌ No existe
    const statsData = await statsRes.json();
    setStats(statsData);

    // ... resto del código
  } catch (error) {
    console.error('Error cargando datos del dashboard:', error);
  } finally {
    setLoading(false);
  }
};

// ✅ DESPUÉS:
const loadDashboardData = async () => {
  try {
    setLoading(true);
    
    // Cargar estadísticas desde 3 endpoints separados
    const [xpRes, missionsRes, studentsRes] = await Promise.all([
      fetch('http://localhost:3000/api/skillTrees/average-xp'),
      fetch('http://localhost:3000/api/missions/total-active'),
      fetch('http://localhost:3000/api/students/total')
    ]);

    const xpData = await xpRes.json();
    const missionsData = await missionsRes.json();
    const studentsData = await studentsRes.json();

    // Construir el objeto stats
    const statsData = {
      avgXP: Math.round(xpData.averageXp * 10) / 10, // Redondear
      activeMissions: missionsData.totalActiveMissions,
      totalStudents: studentsData.totalStudents
    };
    
    setStats(statsData);

    // Cargar misiones activas
    const missionsRes2 = await fetch('http://localhost:3000/api/missions/active');
    const missionsData2 = await missionsRes2.json();
    
    // Mapear status de "active" a "activa"
    const activeMissions = missionsData2.map(m => ({
      ...m,
      status: m.status === 'active' ? 'activa' : 'cerrada'
    })).slice(0, 3);
    
    setActiveMissions(activeMissions);

  } catch (error) {
    console.error('Error cargando datos del dashboard:', error);
  } finally {
    setLoading(false);
  }
};
```

---

### 3. Missions.jsx - Mapear status de active/inactive a activa/cerrada

**Archivo**: `frontend/src/pages/Missions.jsx`

```javascript
// ❌ ANTES (línea ~30):
const loadMissions = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${API_URL}/missions`);
    const data = await response.json();
    setMissions(data);  // Status es "active"/"inactive"
  } catch (error) {
    console.error('Error cargando misiones:', error);
  } finally {
    setLoading(false);
  }
};

// ✅ DESPUÉS:
const loadMissions = async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/missions');
    const data = await response.json();
    
    // Mapear status del backend al frontend
    const mappedMissions = data.map(mission => ({
      ...mission,
      status: mission.status === 'active' ? 'activa' : 'cerrada'
    }));
    
    setMissions(mappedMissions);
  } catch (error) {
    console.error('Error cargando misiones:', error);
  } finally {
    setLoading(false);
  }
};

// También actualizar el filtro (línea ~42):
const filteredMissions = missions.filter(mission => {
  const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       mission.description.toLowerCase().includes(searchTerm.toLowerCase());
  
  // Mapear el filtro también
  let backendStatus = filterStatus;
  if (filterStatus === 'activa') backendStatus = 'active';
  if (filterStatus === 'cerrada') backendStatus = 'inactive';
  
  const matchesStatus = filterStatus === 'all' || mission.status === filterStatus;
  return matchesSearch && matchesStatus;
});
```

---

### 4. Navbar.jsx - Desactivar búsqueda global (temporal)

**Archivo**: `frontend/src/components/Navbar.jsx`

**Opción A - Comentar la funcionalidad completa:**
```javascript
// ❌ COMENTAR TODO ESTO (líneas 42-57):
/*
useEffect(() => {
  const searchTimeout = setTimeout(async () => {
    if (searchValue.length >= 2) {
      try {
        const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(searchValue)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error en búsqueda:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  }, 300);

  return () => clearTimeout(searchTimeout);
}, [searchValue]);
*/
```

**Opción B - Mostrar mensaje "Próximamente":**
```javascript
// Reemplazar el useEffect de búsqueda por:
useEffect(() => {
  if (searchValue.length >= 2) {
    setSearchResults([
      {
        id: 'msg-1',
        type: 'info',
        title: 'Búsqueda no disponible',
        subtitle: 'Esta funcionalidad estará disponible próximamente'
      }
    ]);
  } else {
    setSearchResults([]);
  }
}, [searchValue]);
```

---

### 5. StudentFormModal.jsx - Ajustar campos del formulario

El backend espera estos campos para crear un estudiante:
```javascript
{
  name: String,        // ✅ Ya lo tienes
  email: String,       // ✅ Ya lo tienes
  age: Number,         // ⚠️ Verificar que sea número
  grade: String,       // ✅ Ya lo tienes
  level: Number,       // ⚠️ Opcional (1-5), default 1
  schedule: String,    // ❌ Agregar campo
  schoolId: Number,    // ❌ Agregar campo
  teacherId: Number,   // ❌ Agregar campo
  classroomId: Number  // ❌ Agregar campo
}
```

**Solución temporal** - Usar valores dummy:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
        level: 1,  // Default
        schedule: 'Matutino',  // Dummy
        schoolId: 1,           // Dummy - cambiar cuando exista
        teacherId: 1,          // Dummy - cambiar cuando exista
        classroomId: 1         // Dummy - cambiar cuando exista
      })
    });
    
    if (response.ok) {
      onStudentAdded();
      onClose();
    }
  } catch (error) {
    console.error('Error creando estudiante:', error);
  }
};
```

---

### 6. MissionFormModal.jsx - Ajustar campos

El backend espera:
```javascript
{
  title: String,
  description: String,
  status: String,      // "active" o "inactive"
  grade: String,
  teacherId: Number    // ❌ Necesario
}
```

**Solución**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:3000/api/missions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        status: formData.status === 'activa' ? 'active' : 'inactive',  // Mapear
        teacherId: 1  // Dummy - cambiar cuando exista auth
      })
    });
    
    if (response.ok) {
      onMissionCreated();
      onClose();
    }
  } catch (error) {
    console.error('Error creando misión:', error);
  }
};
```

---

## 🚀 ORDEN DE IMPLEMENTACIÓN

### DÍA 1 - Hacer funcionar lo básico (2 horas)

1. ✅ **Arreglar app.js** - Comentar imports rotos (5 min)
2. ✅ **Cambiar puerto** en frontend/src/config/api.js (2 min)
3. ✅ **Students.jsx** - Cambiar /users por /students (5 min)
4. ✅ **Dashboard.jsx** - Construir stats (20 min)
5. ✅ **Missions.jsx** - Mapear status (15 min)
6. ✅ **Navbar.jsx** - Desactivar búsqueda (5 min)
7. ✅ **StudentFormModal** - Agregar campos dummy (20 min)
8. ✅ **MissionFormModal** - Mapear status (10 min)
9. 🧪 **Testing** - Probar todo (30 min)

### DÍA 2 - Mejorar (4 horas)

10. 📊 Crear endpoint /api/stats en backend
11. 🔍 Crear endpoint /api/search en backend
12. 👤 Implementar auth básico
13. 🏫 Crear CRUD de Schools/Teachers
14. 🎨 Mejorar UX de formularios

---

## 🧪 TESTING RÁPIDO

### 1. Arrancar el Backend
```bash
cd /workspaces/LUMO/backend
npm install
npm start
# Debería mostrar: "Servidor corriendo en puerto 3000"
# Y: "SQLite conectado con Prisma"
```

### 2. Probar endpoints manualmente
```bash
# Listar estudiantes (debería devolver array vacío o con datos)
curl http://localhost:3000/api/students

# Listar misiones
curl http://localhost:3000/api/missions

# Ver stats
curl http://localhost:3000/api/skillTrees/average-xp
curl http://localhost:3000/api/missions/total-active
curl http://localhost:3000/api/students/total
```

### 3. Arrancar el Frontend
```bash
cd /workspaces/LUMO/frontend
npm run dev
# Abrir http://localhost:5173
```

### 4. Verificar consola del navegador
- ✅ No debe haber errores 404
- ✅ Debe cargar datos del backend
- ⚠️ Puede haber warnings de campos faltantes

---

## 📋 CHECKLIST FINAL

Antes de considerar listo para producción:

- [ ] Backend arranca sin errores
- [ ] Frontend conecta al puerto correcto (3000)
- [ ] Página Students carga datos
- [ ] Dashboard muestra estadísticas
- [ ] Misiones se listan correctamente
- [ ] Se pueden crear estudiantes (con campos dummy)
- [ ] Se pueden crear misiones
- [ ] Búsqueda global desactivada o con mensaje
- [ ] Notificaciones usan datos mock
- [ ] Login redirige al Dashboard (sin auth real)

---

## 🆘 TROUBLESHOOTING

### Error: "Cannot find module './routes/authRoutes.js'"
**Solución**: Comentar el import en app.js

### Error: "fetch failed" o "CORS error"
**Solución**: Verificar que el backend esté corriendo en puerto 3000

### Error: "Cannot read property 'role' of undefined"
**Solución**: Los estudiantes no tienen campo 'role', usar directamente los datos

### Error: "status 'activa' not found"
**Solución**: Mapear "activa" → "active" antes de enviar al backend

### Error: "Missing required field: schoolId"
**Solución**: Agregar valores dummy (1) temporalmente

---

**¡Listo!** Con estos cambios tu frontend funcionará con el backend actual. 🚀
