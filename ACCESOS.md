# 🔗 ACCESOS RÁPIDOS - LUMO

## 🌐 URLs de la Aplicación

### Aplicación Principal
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000
- **Prisma Studio:** http://localhost:5555

---

## 🔐 Credenciales de Prueba

### 👨‍🏫 Usuario Docente
```
Email:    remindevelopment@gmail.com
Password: docentest123
```
**Accede a:** http://localhost:5173/login

### 🎓 Usuario Alumno
```
Email:    alumno.ejemplo@gmail.com
Password: alumnotest123
```
**Accede a:** http://localhost:5173/login

---

## 📡 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener un usuario
- `POST /api/users` - Crear usuario

### Misiones
- `GET /api/missions` - Obtener todas las misiones
- `GET /api/missions/:id` - Obtener una misión
- `POST /api/missions` - Crear misión
- `PUT /api/missions/:id` - Actualizar misión

### Notificaciones
- `GET /api/notifications` - Obtener notificaciones
- `PUT /api/notifications/:id/read` - Marcar como leída

### Búsqueda
- `GET /api/search?q=texto` - Búsqueda global

### Estadísticas
- `GET /api/stats` - Estadísticas generales
- `GET /api/stats/top-students` - Top 5 estudiantes

---

## 🛠️ Herramientas de Desarrollo

### Prisma Studio
```bash
cd /workspaces/LUMO/LUMO/backend
npx prisma studio
```
Abre en: http://localhost:5555

### Ver Base de Datos SQLite
```bash
cd /workspaces/LUMO/LUMO/backend/prisma
sqlite3 dev.db
```

---

## 📋 Ejemplos de Uso de la API

### Login como Docente
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "remindevelopment@gmail.com",
    "password": "docentest123"
  }'
```

### Login como Alumno
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alumno.ejemplo@gmail.com",
    "password": "alumnotest123"
  }'
```

### Obtener Estadísticas
```bash
curl http://localhost:4000/api/stats
```

### Buscar Alumnos
```bash
curl "http://localhost:4000/api/search?q=juan"
```

### Crear Misión
```bash
curl -X POST http://localhost:4000/api/missions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nueva Misión",
    "description": "Descripción de la misión",
    "subject": "Matemáticas",
    "dueDate": "2025-10-20",
    "studentIds": [1, 2, 3]
  }'
```

---

## 🎯 Rutas del Frontend

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Redirección a login | Público |
| `/login` | Página de inicio de sesión | Público |
| `/dashboard` | Dashboard del docente | Docente |
| `/students` | Lista de estudiantes | Docente |
| `/students/:id` | Perfil de estudiante | Docente |
| `/missions` | Gestión de misiones | Docente |
| `/missions/:id/edit` | Editar misión | Docente |
| `/settings` | Configuración | Docente |
| `/student-area` | Área del alumno | Alumno |

---

## 🚀 Iniciar Todo

### Opción 1: Script Automático
```bash
cd /workspaces/LUMO
./iniciar-lumo.sh
```

### Opción 2: Comandos Separados

**Terminal 1 - Backend:**
```bash
cd /workspaces/LUMO/LUMO/backend
node src/index.js
```

**Terminal 2 - Frontend:**
```bash
cd /workspaces/LUMO/LUMO/frontend
npm run dev
```

---

## ✅ Verificar Estado

```bash
cd /workspaces/LUMO
./verificar-sistema.sh
```

Este script verificará:
- ✅ Estructura de archivos
- ✅ Base de datos SQLite
- ✅ Configuración de Prisma
- ✅ Dependencias instaladas
- ✅ Servidores corriendo
- ✅ Usuarios de prueba

---

## 📊 Base de Datos

### Ubicación
```
/workspaces/LUMO/LUMO/backend/prisma/dev.db
```

### Hacer Backup
```bash
cp /workspaces/LUMO/LUMO/backend/prisma/dev.db ~/backup-lumo.db
```

### Restaurar Backup
```bash
cp ~/backup-lumo.db /workspaces/LUMO/LUMO/backend/prisma/dev.db
```

### Resetear Base de Datos
```bash
cd /workspaces/LUMO/LUMO/backend
rm -f prisma/dev.db prisma/dev.db-journal
npx prisma db push
node prisma/seed.js
```

---

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| `RESUMEN.md` | Resumen ejecutivo y guía rápida |
| `INSTRUCCIONES_SQLITE.md` | Guía completa de migración |
| `README_LUMO.md` | README del proyecto |
| `ACCESOS.md` | Este archivo - URLs y credenciales |

---

## 🆘 Solución Rápida de Problemas

### Backend no responde
```bash
# Verificar si está corriendo
curl http://localhost:4000/api/stats

# Si no responde, reiniciar
cd /workspaces/LUMO/LUMO/backend
node src/index.js
```

### Frontend no carga
```bash
# Verificar si está corriendo
curl http://localhost:5173

# Si no responde, reiniciar
cd /workspaces/LUMO/LUMO/frontend
npm run dev
```

### Error de Prisma
```bash
cd /workspaces/LUMO/LUMO/backend
npx prisma generate
npx prisma db push
```

### Login no funciona
1. Verifica que el backend esté corriendo
2. Verifica las credenciales (ver arriba)
3. Revisa la consola del navegador (F12)

---

## 💡 Tips Útiles

- **Puerto ocupado?** Cambia el puerto en `vite.config.js` (frontend) o en `src/index.js` (backend)
- **Datos perdidos?** Ejecuta `node prisma/seed.js` para repoblar
- **Cambios en schema?** Ejecuta `npx prisma db push` y `npx prisma generate`
- **Ver datos?** Usa Prisma Studio: `npx prisma studio`

---

## 🎊 ¡Listo para usar!

Con esta guía tienes acceso rápido a todas las URLs, credenciales y comandos importantes de LUMO.

**¡Feliz desarrollo!** 🚀
