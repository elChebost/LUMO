# 📚 LUMO - ÍNDICE DE DOCUMENTACIÓN

**Proyecto**: Sistema educativo gamificado LUMO  
**Última actualización**: 15 de octubre de 2025

---

## 🎯 INICIO RÁPIDO

### ⚡ Forma RÁPIDA (Todo en uno):

```bash
cd /workspaces/LUMO
./start.sh
```

Este script arranca **Backend + Frontend automáticamente**. Presiona `Ctrl+C` para detener todo.

---

### 📝 Otras opciones disponibles:

**Opción 1: Script npm (multiplataforma)**
```bash
cd /workspaces/LUMO
npm install  # Solo primera vez
npm start    # Arranca backend + frontend
```

**Opción 2: Windows (.bat)**
```cmd
start.bat
```

**Opción 3: Manual (por separado)**
```bash
# Terminal 1 - Backend
cd /workspaces/LUMO/backend
npm install
npm start

# Terminal 2 - Frontend
cd /workspaces/LUMO/frontend
npm install
npm run dev
```

📖 **Ver guía completa**: [INICIO_RAPIDO.md](./INICIO_RAPIDO.md)

---

### ✅ La aplicación estará disponible en:
- 🔌 **Backend**: http://localhost:3000
- 🎨 **Frontend**: http://localhost:5173

---

## 📖 DOCUMENTACIÓN COMPLETA

### 🔧 Integración Frontend ↔ Backend

| Documento | Descripción | Cuándo usarlo |
|-----------|-------------|---------------|
| **[CAMBIOS_APLICADOS.md](./CAMBIOS_APLICADOS.md)** | ✅ **LÉEME PRIMERO** - Resumen completo de todos los cambios aplicados | Para entender qué se modificó y por qué |
| **[GUIA_CONEXION_RAPIDA.md](./GUIA_CONEXION_RAPIDA.md)** | 🚀 Guía paso a paso con código listo para copiar/pegar | Para resolver problemas específicos de conexión |
| **[ANALISIS_BACKEND.md](./ANALISIS_BACKEND.md)** | 📊 Análisis exhaustivo del backend (estructura, endpoints, modelos) | Para entender la arquitectura completa del backend |

### 🎨 Diseño y Frontend

| Documento | Descripción | Cuándo usarlo |
|-----------|-------------|---------------|
| **[frontend/RESPONSIVE_MOBILE.md](./frontend/RESPONSIVE_MOBILE.md)** | 📱 Documentación del diseño responsive mobile | Para entender la implementación mobile-first |
| **[frontend/BITACORA_FRONTEND.md](./frontend/BITACORA_FRONTEND.md)** | 📝 Bitácora de desarrollo del frontend | Para ver el historial de cambios del frontend |
| **[frontend/README.md](./frontend/README.md)** | 📘 README del proyecto frontend | Para información general del frontend |

### 🔌 Backend

| Documento | Descripción | Cuándo usarlo |
|-----------|-------------|---------------|
| **[backend/README.md](./backend/README.md)** | 📗 README del proyecto backend | Para información general del backend |

---

## 🗺️ MAPA DEL PROYECTO

```
LUMO/
│
├── 📚 DOCUMENTACIÓN PRINCIPAL
│   ├── CAMBIOS_APLICADOS.md ⭐ LÉEME PRIMERO
│   ├── GUIA_CONEXION_RAPIDA.md
│   ├── ANALISIS_BACKEND.md
│   └── README.md (este archivo)
│
├── 🎨 FRONTEND (React + Vite)
│   ├── src/
│   │   ├── pages/ ............... Dashboard, Students, Missions, etc.
│   │   ├── components/ .......... Navbar, Sidebar, Modals, Cards
│   │   ├── config/
│   │   │   └── api.js ........... ✅ Puerto corregido (3000)
│   │   ├── hooks/ ............... Custom hooks para API
│   │   └── styles/ .............. CSS global + responsive
│   ├── RESPONSIVE_MOBILE.md
│   ├── BITACORA_FRONTEND.md
│   └── package.json
│
└── 🔌 BACKEND (Express + Prisma + SQLite)
    ├── routes/ .................. ✅ studentRoutes, missionRoutes, etc.
    ├── controllers/ ............. Lógica de negocio
    ├── services/ ................ Servicios de datos
    ├── config/
    │   └── db.js ................ Conexión SQLite
    ├── prisma/
    │   └── schema.prisma ........ Modelos de BD
    ├── app.js ................... ✅ Imports arreglados
    └── package.json
```

---

## ✅ ESTADO ACTUAL DEL PROYECTO

### 🟢 Completamente Funcional

- ✅ **Backend arranca** sin errores
- ✅ **Frontend conecta** correctamente (puerto 3000)
- ✅ **Listar estudiantes** - GET /api/students
- ✅ **Crear estudiantes** - POST /api/students
- ✅ **Listar misiones** - GET /api/missions
- ✅ **Crear misiones** - POST /api/missions
- ✅ **Dashboard con stats** - Construido desde 3 endpoints
- ✅ **Diseño responsive** - Mobile + Desktop
- ✅ **Navegación completa** - Todas las páginas accesibles

### 🟡 Funcional con Limitaciones

- ⚠️ **Búsqueda global** - Muestra mensaje "Próximamente" (endpoint /api/search no existe)
- ⚠️ **Valores temporales** - schoolId, teacherId, classroomId usan valores dummy (1)
- ⚠️ **Notificaciones** - Usan datos mock del frontend

### 🔴 Pendiente de Implementar

- ❌ **Login/Logout** - Sistema de autenticación
- ❌ **Editar/Eliminar** - CRUD completo de estudiantes y misiones
- ❌ **Sistema de entregas** - Subir y revisar tareas
- ❌ **Árbol de habilidades** - Visualización de progreso
- ❌ **Notificaciones reales** - Backend + WebSockets

---

## 🎯 ENDPOINTS DISPONIBLES

### ✅ Students (Estudiantes)

```http
GET    /api/students              # Listar todos
GET    /api/students/:id          # Ver uno
GET    /api/students/total        # Total de estudiantes
POST   /api/students              # Crear
PUT    /api/students/:id          # Actualizar
DELETE /api/students/:id          # Eliminar
GET    /api/students/:id/missions # Misiones de un estudiante
GET    /api/students/:id/profile  # Perfil de un estudiante
```

### ✅ Missions (Misiones)

```http
GET    /api/missions              # Listar todas
GET    /api/missions/:id          # Ver una
GET    /api/missions/active       # Misiones activas
GET    /api/missions/total-active # Total de activas
POST   /api/missions              # Crear
PUT    /api/missions/:id          # Actualizar
DELETE /api/missions/:id          # Eliminar
GET    /api/missions/:id/students # Estudiantes de una misión
```

### ✅ Skill Trees (Árboles de Habilidad)

```http
GET    /api/skillTrees            # Listar todos
GET    /api/skillTrees/:id        # Ver uno
GET    /api/skillTrees/average-xp # XP promedio
POST   /api/skillTrees            # Crear
PUT    /api/skillTrees/:id        # Actualizar
DELETE /api/skillTrees/:id        # Eliminar
```

### ✅ Student Profiles (Perfiles de Estudiante)

```http
GET    /api/studentProfiles/:id   # Ver perfil
POST   /api/studentProfiles       # Crear
PUT    /api/studentProfiles/:id   # Actualizar
DELETE /api/studentProfiles/:id   # Eliminar
GET    /api/studentProfiles/:id/progress # Ver progreso
```

### ✅ Teacher Profiles (Perfiles de Profesor)

```http
GET    /api/teacherProfiles/:id   # Ver perfil
POST   /api/teacherProfiles       # Crear
PUT    /api/teacherProfiles/:id   # Actualizar
DELETE /api/teacherProfiles/:id   # Eliminar
GET    /api/teacherProfiles/:id/students # Estudiantes del profesor
```

### ❌ Endpoints NO Implementados (Comentados)

```http
# ❌ Estos endpoints están comentados en app.js
# POST   /api/auth/login
# POST   /api/auth/logout
# GET    /api/stats
# GET    /api/search?q=texto
# CRUD   /api/schools
# CRUD   /api/classrooms
# CRUD   /api/teachers
# CRUD   /api/subjects
# CRUD   /api/contacts
```

---

## 📝 CAMBIOS CRÍTICOS APLICADOS

### 1. **Backend** - app.js
```javascript
// ✅ Comentados imports de archivos inexistentes
// ✅ Rutas funcionales: students, missions, skillTrees, profiles
```

### 2. **Frontend** - config/api.js
```javascript
// ✅ Puerto cambiado de 4000 → 3000
const API_URL = 'http://localhost:3000';
```

### 3. **Frontend** - Students.jsx
```javascript
// ✅ Endpoint correcto: /api/students (antes /api/users)
// ✅ Sin filtro de rol innecesario
```

### 4. **Frontend** - Dashboard.jsx
```javascript
// ✅ Stats construidas desde 3 endpoints separados
// ✅ Mapeo de status: "active" → "activa"
```

### 5. **Frontend** - Missions.jsx
```javascript
// ✅ Mapeo de status en loadMissions()
```

### 6. **Frontend** - Navbar.jsx
```javascript
// ✅ Búsqueda desactivada con mensaje informativo
```

### 7. **Frontend** - StudentFormModal.jsx
```javascript
// ✅ Campos adaptados: name, email, age, grade
// ✅ Valores dummy: schoolId, teacherId, classroomId
```

### 8. **Frontend** - MissionFormModal.jsx
```javascript
// ✅ Formulario simplificado: title, description, grade, status
// ✅ Mapeo de status al enviar
// ✅ teacherId temporal
```

---

## 🔍 TROUBLESHOOTING RÁPIDO

### ❓ El backend no arranca

**Solución**: Verificar que los imports comentados estén correctamente comentados en `backend/app.js`

### ❓ Frontend muestra error 404 en API

**Solución**: Verificar que el backend esté corriendo en puerto 3000 y que `frontend/src/config/api.js` apunte a `localhost:3000`

### ❓ No se crean estudiantes

**Solución**: Verificar que el formulario envíe todos los campos requeridos (name, email, age, grade, schoolId, teacherId, classroomId)

### ❓ Misiones no se filtran correctamente

**Solución**: Verificar que el mapeo de status esté funcionando (active ↔ activa, inactive ↔ cerrada)

### ❓ Dashboard no muestra estadísticas

**Solución**: Verificar que los 3 endpoints estén respondiendo:
- `/api/skillTrees/average-xp`
- `/api/missions/total-active`
- `/api/students/total`

---

## 🚀 PRÓXIMAS TAREAS SUGERIDAS

### Corto plazo (1-2 días)

1. ✅ Probar todas las funcionalidades
2. 🔜 Crear endpoint unificado `/api/stats`
3. 🔜 Implementar endpoint `/api/search`
4. 🔜 Agregar sistema de autenticación básico
5. 🔜 Reemplazar valores dummy por datos reales del usuario autenticado

### Mediano plazo (1 semana)

6. 🔜 Implementar CRUD completo (editar/eliminar)
7. 🔜 Crear rutas de Schools, Classrooms, Teachers
8. 🔜 Sistema de notificaciones con backend
9. 🔜 Implementar sistema de entregas
10. 🔜 Visualización del árbol de habilidades

### Largo plazo (2+ semanas)

11. 🔜 Migrar de SQLite a PostgreSQL/MySQL
12. 🔜 Deploy a producción
13. 🔜 Optimizaciones de performance
14. 🔜 Tests automatizados
15. 🔜 Documentación de API con Swagger

---

## 👥 CONTRIBUIR

Para agregar nuevas funcionalidades:

1. **Lee primero**: `CAMBIOS_APLICADOS.md` y `ANALISIS_BACKEND.md`
2. **Respeta el patrón**: Usa comentarios `✅` para cambios, `⚠️` para temporales
3. **No elimines**: Comenta el código que no funciona, no lo borres
4. **Documenta**: Actualiza este README con tus cambios

---

## 📞 CONTACTO

**Desarrollador Frontend**: (Tu compañero)  
**Integración Backend**: Asistente AI  
**Fecha de integración**: 15 de octubre de 2025

---

## 📄 LICENCIA

Ver archivo LICENSE (si existe)

---

**¡El proyecto está listo para desarrollo!** 🎉

Para cualquier duda, consulta primero `CAMBIOS_APLICADOS.md` → `GUIA_CONEXION_RAPIDA.md` → `ANALISIS_BACKEND.md` en ese orden.
