# 🌟 LUMO - Plataforma Educativa Gamificada

## 🎯 Descripción

LUMO es una plataforma educativa que gamifica el proceso de aprendizaje, permitiendo a los docentes gestionar misiones, hacer seguimiento del progreso de los estudiantes y motivar el aprendizaje a través de un sistema de puntos y niveles.

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)
```bash
./iniciar-lumo.sh
```

### Opción 2: Manual

**Backend:**
```bash
cd LUMO/backend
node src/index.js
```

**Frontend:**
```bash
cd LUMO/frontend
npm run dev
```

**Acceder:** `http://localhost:5173`

---

## 🔐 Credenciales de Prueba

### Docente
- **Email:** remindevelopment@gmail.com
- **Password:** docentest123
- **Acceso:** Dashboard completo de gestión

### Alumno
- **Email:** alumno.ejemplo@gmail.com
- **Password:** alumnotest123
- **Acceso:** Área de estudiantes (placeholder para juego Unity)

---

## 🗄️ Base de Datos

### SQLite (Actual)
- **Ubicación:** `LUMO/backend/prisma/dev.db`
- **Tipo:** SQLite (archivo local)
- **Ventajas:** Simple, sin configuración, portátil

### Prisma Studio
Interfaz visual para la base de datos:
```bash
cd LUMO/backend
npx prisma studio
```
Abre en: `http://localhost:5555`

---

## 📁 Estructura del Proyecto

```
LUMO/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma    # Definición del modelo de datos
│   │   ├── seed.js          # Datos iniciales
│   │   └── dev.db           # Base de datos SQLite
│   ├── src/
│   │   └── index.js         # Servidor Express + API
│   └── .env                 # Variables de entorno
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Página de login
│   │   │   ├── Dashboard.jsx     # Dashboard del docente
│   │   │   ├── Students.jsx      # Gestión de alumnos
│   │   │   ├── Missions.jsx      # Gestión de misiones
│   │   │   └── StudentArea.jsx   # Área del alumno
│   │   ├── routes/
│   │   │   └── AppRouter.jsx     # Rutas de la aplicación
│   │   └── components/           # Componentes reutilizables
│   └── vite.config.js
│
└── iniciar-lumo.sh          # Script de inicio rápido
```

---

## 🎮 Funcionalidades

### Para Docentes
- ✅ Dashboard con estadísticas generales
- ✅ Gestión de alumnos (crear, editar, ver progreso)
- ✅ Creación y asignación de misiones
- ✅ Sistema de notificaciones
- ✅ Búsqueda global
- ✅ Visualización de progreso por estudiante

### Para Alumnos
- ✅ Inicio de sesión
- ✅ Visualización de progreso (nivel, XP)
- 🚧 Juego Unity (próximamente)

---

## 🔧 Comandos Útiles

### Resetear Base de Datos
```bash
cd LUMO/backend
rm -f prisma/dev.db prisma/dev.db-journal
npx prisma db push
node prisma/seed.js
```

### Regenerar Cliente Prisma
```bash
cd LUMO/backend
npx prisma generate
```

### Ver Logs del Backend
```bash
cd LUMO/backend
node src/index.js
```

---

## 🛠️ Stack Tecnológico

### Backend
- Node.js + Express
- Prisma ORM
- SQLite
- JWT para autenticación

### Frontend
- React + Vite
- React Router
- React Icons
- TailwindCSS (estilos inline)

---

## 📊 Modelo de Datos

### User (Usuario)
- Tipos: `docente` o `alumno`
- Campos: nombre, email, contraseña, XP, nivel, rol

### Mission (Misión)
- Asignaciones con fecha límite
- Estados: `activa` o `cerrada`
- Relación muchos-a-muchos con estudiantes

### Notification (Notificación)
- Mensajes para usuarios
- Estado de lectura

---

## 🔐 Seguridad

**⚠️ IMPORTANTE:** Este es un proyecto demo. En producción deberías:
- Usar bcrypt para hash de contraseñas
- Implementar tokens JWT con expiración
- Agregar validación de inputs
- Implementar rate limiting
- Usar HTTPS
- Variables de entorno seguras

---

## 🎯 Próximos Pasos

1. **Integración Unity WebGL**
   - Exportar juego para web
   - Conectar sistema de puntos
   - Integrar en `/student-area`

2. **Sistema de Entregas**
   - Subida de archivos
   - Corrección de tareas
   - Retroalimentación

3. **Mejoras de Seguridad**
   - Implementar bcrypt
   - JWT tokens
   - Middleware de autenticación

---

## 📝 Documentación Adicional

- [INSTRUCCIONES_SQLITE.md](INSTRUCCIONES_SQLITE.md) - Guía completa de migración y uso
- [Prisma Docs](https://www.prisma.io/docs) - Documentación oficial de Prisma

---

## 🤝 Contribuir

Este es un proyecto educativo en desarrollo. Siéntete libre de:
- Reportar bugs
- Sugerir mejoras
- Hacer fork y experimentar

---

## 📄 Licencia

Proyecto educativo - Uso libre

---

## 👨‍💻 Desarrollado con ❤️

LUMO - Transformando la educación en una aventura gamificada

**¡Feliz enseñanza!** 🎓✨
