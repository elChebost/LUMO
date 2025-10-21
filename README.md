# 🚀 LUMO - Sistema de Gestión Educativa Gamificado

Sistema integral para gestión educativa con gamificación, misiones, árbol de habilidades y seguimiento de progreso estudiantil.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Deployment en Servidor SSH](#-deployment-en-servidor-ssh)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Contribuir](#-contribuir)

## ✨ Características

### Para Estudiantes
- 🎮 **Sistema de Gamificación**: Gana XP, sube de nivel y desbloquea logros
- 🌳 **Árbol de Habilidades**: Progresa en diferentes áreas del conocimiento
- 🎯 **Misiones Educativas**: Completa misiones interactivas por asignatura
- 📊 **Dashboard Personal**: Visualiza tu progreso y estadísticas
- 🏆 **Rankings**: Compite sanamente con tus compañeros
- 📚 **Perfil Personalizado**: Avatar, biografía y logros desbloqueados

### Para Profesores
- 👥 **Gestión de Aulas**: Administra múltiples salones de clase
- 📝 **Creación de Misiones**: Diseña actividades educativas gamificadas
- 📊 **Analytics**: Monitorea el progreso de tus estudiantes
- 🔔 **Notificaciones**: Comunícate con estudiantes y padres
- 📈 **Reportes**: Genera reportes de rendimiento académico

### Para Administradores
- 🏫 **Gestión Escolar**: Administra múltiples escuelas
- 👨‍🏫 **Gestión de Personal**: Asigna profesores a aulas
- 🎨 **Personalización**: Configura el sistema según necesidades
- 📊 **Dashboard Global**: Vista general del sistema

## 🛠️ Tecnologías

### Backend
- **Node.js** + **Express.js** - API REST
- **Prisma ORM** - Gestión de base de datos
- **SQLite** - Base de datos (fácil de migrar a PostgreSQL/MySQL)
- **JWT** - Autenticación segura
- **bcryptjs** - Encriptación de contraseñas

### Frontend
- **React 19** - UI Library
- **React Router** - Navegación
- **TanStack Query** - Gestión de estado del servidor
- **Vite** - Build tool y dev server
- **CSS Modules** - Estilos modulares

### DevOps
- **PM2** - Gestor de procesos para producción
- **Nginx** - Proxy inverso (opcional)
- **Let's Encrypt** - SSL/HTTPS (opcional)

## 📦 Requisitos

### Para Desarrollo Local
- Node.js v18 o superior
- npm v8 o superior
- Git (opcional)

### Para Servidor SSH (Producción)
- Ubuntu 20.04+ (o similar)
- Node.js v18 o superior
- PM2 (se instala automáticamente)
- Nginx (opcional, recomendado)
- 1GB RAM mínimo (2GB recomendado)
- 2GB espacio en disco

## 🚀 Instalación

### Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/LUMO.git
cd LUMO

# Dar permisos de ejecución a los scripts (Linux/Mac)
chmod +x run.sh deploy.sh update.sh stop.sh

# Ejecutar en modo desarrollo
./run.sh dev

# O en Windows
.\run.bat
```

La aplicación estará disponible en:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

### Producción (Servidor SSH)

```bash
# Conectar al servidor
ssh usuario@tu-servidor.com

# Clonar el proyecto
git clone https://github.com/tu-usuario/LUMO.git
cd LUMO

# Dar permisos de ejecución
chmod +x deploy.sh run.sh update.sh stop.sh

# Ejecutar deployment completo (primera vez)
./deploy.sh

# O simplemente ejecutar el script run
./run.sh
```

La aplicación estará disponible en:
- **Frontend**: http://tu-servidor:4173
- **Backend**: http://tu-servidor:3000

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para guía completa de deployment.

## 💻 Uso

### Scripts Disponibles

#### `./run.sh [mode]`
Ejecuta LUMO en el modo especificado:
```bash
./run.sh              # Modo producción (con PM2)
./run.sh production   # Modo producción explícito
./run.sh dev          # Modo desarrollo
```

#### `./deploy.sh`
Script completo para primera instalación en servidor:
```bash
./deploy.sh
```
- Instala PM2
- Configura entorno (.env)
- Instala dependencias
- Configura base de datos
- Construye frontend
- Inicia servicios con PM2
- Configura inicio automático (opcional)

#### `./update.sh`
Actualiza el proyecto sin reinstalar todo:
```bash
./update.sh
```
- Actualiza código (git pull)
- Actualiza dependencias
- Aplica migraciones de BD
- Reconstruye frontend
- Reinicia servicios

#### `./stop.sh`
Detiene todos los servicios:
```bash
./stop.sh
```

### Comandos PM2 (Producción)

```bash
# Ver estado de servicios
pm2 list

# Ver logs en tiempo real
pm2 logs
pm2 logs lumo-backend
pm2 logs lumo-frontend

# Reiniciar servicios
pm2 restart all
pm2 restart lumo-backend

# Detener servicios
pm2 stop all

# Eliminar servicios
pm2 delete all

# Monitor de recursos
pm2 monit

# Información detallada
pm2 show lumo-backend
```

## 🏗️ Deployment en Servidor SSH

### Opción 1: Script Automático (Recomendado)

```bash
# Primera vez
./deploy.sh

# Actualizaciones posteriores
./update.sh
```

### Opción 2: Con PM2 directamente

```bash
# Usando archivo de configuración
pm2 start ecosystem.config.js

# Ver logs
pm2 logs

# Guardar configuración
pm2 save

# Configurar inicio automático
pm2 startup
```

### Opción 3: Con Nginx (Recomendado para producción)

1. Copiar configuración de ejemplo:
```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/lumo
sudo ln -s /etc/nginx/sites-available/lumo /etc/nginx/sites-enabled/
```

2. Editar y ajustar dominios:
```bash
sudo nano /etc/nginx/sites-available/lumo
```

3. Reiniciar Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

4. Configurar SSL con Let's Encrypt:
```bash
sudo certbot --nginx -d lumo.tu-dominio.com -d api.tu-dominio.com
```

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para más detalles.

## 📁 Estructura del Proyecto

```
LUMO/
├── backend/               # API Backend
│   ├── app.js            # Servidor Express
│   ├── config/           # Configuración (DB, JWT)
│   ├── controllers/      # Controladores de rutas
│   ├── middlewares/      # Middleware (auth, uploads)
│   ├── routes/           # Definición de rutas
│   ├── services/         # Lógica de negocio
│   ├── prisma/           # Schema y migraciones de BD
│   └── seeds/            # Datos iniciales
├── frontend/             # Aplicación React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas/Vistas
│   │   ├── layout/      # Layouts
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Utilidades
│   └── public/          # Assets estáticos
├── logs/                 # Logs de PM2
├── deploy.sh            # Script de deployment
├── run.sh               # Script principal
├── update.sh            # Script de actualización
├── stop.sh              # Script para detener servicios
├── ecosystem.config.js  # Configuración PM2
├── nginx.conf.example   # Configuración Nginx
├── DEPLOYMENT.md        # Guía de deployment
└── QUICKSTART.md        # Guía rápida
```

## 🌐 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar nuevo usuario

### Usuarios
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario

### Estudiantes
- `GET /api/students` - Listar estudiantes
- `GET /api/students/:id` - Obtener estudiante
- `GET /api/students/:id/stats` - Estadísticas del estudiante

### Misiones
- `GET /api/missions` - Listar misiones
- `POST /api/missions` - Crear misión
- `GET /api/missions/:id` - Obtener misión
- `POST /api/missions/:id/complete` - Completar misión

### Dashboard
- `GET /api/dashboard/stats` - Estadísticas generales
- `GET /api/dashboard/student/:id` - Dashboard de estudiante

### Notificaciones
- `GET /api/notifications` - Obtener notificaciones
- `POST /api/notifications/:id/read` - Marcar como leída

Ver documentación completa de la API en el backend.

## 🔒 Seguridad

### Variables de Entorno

**backend/.env** (NUNCA commitear al repositorio):
```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="tu_clave_secreta_super_segura_aqui"
PORT=3000
NODE_ENV=production
```

**frontend/.env**:
```env
VITE_API_URL=https://api.tu-dominio.com
```

### Recomendaciones
- ✅ Cambiar JWT_SECRET en producción
- ✅ Usar HTTPS en producción
- ✅ Configurar firewall (UFW)
- ✅ Mantener dependencias actualizadas
- ✅ Hacer backups regulares de la base de datos

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
pm2 logs
pm2 restart all
```

### Puerto ocupado
```bash
./stop.sh
# O manualmente:
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:4173 | xargs kill -9
```

### Error de base de datos
```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

### Error de permisos
```bash
sudo chown -R $(whoami):$(whoami) ~/LUMO
chmod +x *.sh
```

## 📊 Monitoreo

### Ver logs
```bash
# PM2
pm2 logs

# Archivos de log
tail -f logs/backend-out.log
tail -f logs/backend-error.log
```

### Monitor de recursos
```bash
pm2 monit
htop
```

## 🔄 Actualización

```bash
# Método rápido
./update.sh

# Método manual
git pull
cd backend && npm install
cd ../frontend && npm install && npm run build
cd ../backend && npx prisma migrate deploy
pm2 restart all
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👥 Equipo

Desarrollado por el equipo LUMO.

## 📞 Soporte

- 📧 Email: soporte@lumo.com
- 📖 Documentación: [DEPLOYMENT.md](DEPLOYMENT.md)
- 🚀 Guía Rápida: [QUICKSTART.md](QUICKSTART.md)

---

**¡Hecho con ❤️ para la educación!**
