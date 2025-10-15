# 🎨 LUMO Frontend

> Plataforma Educativa Gamificada - Aplicación Frontend

## 📋 Descripción

Este es el frontend de LUMO, una plataforma educativa que gamifica el proceso de aprendizaje. La interfaz permite a docentes y estudiantes interactuar con el sistema de misiones, seguimiento de progreso y gestión educativa.

## 🛠️ Stack Tecnológico

- **React 19** - Framework de UI
- **Vite 7** - Build tool y dev server
- **React Router 7** - Enrutamiento
- **TanStack Query** - Gestión de estado y caché
- **React Icons** - Biblioteca de iconos

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn
- Backend de LUMO corriendo (ver repositorio del backend)

### Instalación

**⚠️ IMPORTANTE: Todos los comandos npm deben ejecutarse desde `/frontend`**

1. **Clonar el repositorio:**
   ```bash
   git clone <repo-url>
   cd LUMO
   ```

2. **Opción A - Usar script de inicio (Recomendado):**
   ```bash
   # Desde la raíz del proyecto
   chmod +x iniciar.sh
   ./iniciar.sh
   ```

3. **Opción B - Manual:**
   ```bash
   # Ir al directorio frontend
   cd frontend
   
   # Instalar dependencias
   npm install
   
   # Configurar variables de entorno
   cp .env.example .env
   nano .env  # Editar VITE_API_URL
   
   # Iniciar servidor
   npm run dev
   ```

4. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

### 📍 Ubicación de Archivos Clave

```
LUMO/
├── iniciar.sh           ← Script de inicio rápido
├── README.md            ← Este archivo
└── frontend/            ← DIRECTORIO PRINCIPAL
    ├── package.json     ← Configuración npm (ejecutar npm aquí)
    ├── .env             ← Variables de entorno
    └── src/             ← Código fuente
```

**❌ NO ejecutar `npm run dev` desde la raíz**  
**✅ SÍ ejecutar desde `/frontend`**

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── assets/          # Imágenes, fuentes, etc.
│   ├── components/      # Componentes reutilizables
│   ├── config/          # Configuración (API, constantes)
│   ├── hooks/           # Custom hooks
│   ├── layout/          # Componentes de layout
│   ├── pages/           # Páginas/vistas
│   ├── routes/          # Configuración de rutas
│   ├── styles/          # Estilos globales
│   ├── ui/              # Componentes UI base
│   ├── utils/           # Funciones de utilidad
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Punto de entrada
├── public/              # Archivos estáticos
├── .env.example         # Ejemplo de variables de entorno
├── vite.config.js       # Configuración de Vite
└── package.json         # Dependencias y scripts
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🔐 Credenciales de Prueba

### Docente
- **Email:** remindevelopment@gmail.com
- **Password:** docentest123
- **Acceso:** Dashboard completo de gestión

### Alumno
- **Email:** alumno.ejemplo@gmail.com
- **Password:** alumnotest123
- **Acceso:** Área de estudiantes

## 🌐 Rutas Principales

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Redirección a login | Público |
| `/login` | Página de inicio de sesión | Público |
| `/dashboard` | Dashboard del docente | Docente |
| `/students` | Gestión de estudiantes | Docente |
| `/students/:id` | Perfil de estudiante | Docente |
| `/missions` | Gestión de misiones | Docente |
| `/missions/:id/edit` | Editar misión | Docente |
| `/settings` | Configuración | Docente |
| `/student-area` | Área del alumno | Alumno |

## 🔌 Conexión con el Backend

El frontend se conecta al backend a través de:

1. **Variables de entorno** (`.env`):
   ```env
   VITE_API_URL=http://localhost:4000
   ```

2. **Configuración centralizada** (`src/config/api.js`):
   - Endpoints organizados
   - Opciones de fetch predefinidas
   - Fácil mantenimiento

3. **Proxy de Vite** (desarrollo):
   - Las peticiones a `/api/*` se redirigen automáticamente al backend
   - Evita problemas de CORS en desarrollo

## 📡 Endpoints del Backend

El frontend espera que el backend tenga los siguientes endpoints:

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario

### Misiones
- `GET /api/missions` - Listar misiones
- `GET /api/missions/:id` - Obtener misión
- `POST /api/missions` - Crear misión
- `PUT /api/missions/:id` - Actualizar misión

### Estadísticas
- `GET /api/stats` - Estadísticas generales
- `GET /api/stats/top-students` - Top estudiantes

### Notificaciones
- `GET /api/notifications` - Listar notificaciones
- `PUT /api/notifications/:id/read` - Marcar como leída

### Búsqueda
- `GET /api/search?q=término` - Búsqueda global

## 🎨 Personalización

### Temas y Estilos

Los estilos están organizados en:
- `src/index.css` - Estilos globales
- `src/App.css` - Estilos del componente principal
- Componentes individuales usan estilos inline o módulos CSS

### Configuración de la API

Edita `src/config/api.js` para:
- Agregar nuevos endpoints
- Modificar opciones de fetch
- Cambiar configuración de la API

## 🚧 Desarrollo

### Agregar una nueva página

1. Crea el componente en `src/pages/`
2. Agrega la ruta en `src/routes/AppRouter.jsx`
3. Importa y usa en el layout correspondiente

### Agregar un nuevo endpoint

1. Agrega el endpoint en `src/config/api.js`
2. Crea un hook personalizado en `src/hooks/` si es necesario
3. Usa TanStack Query para gestión de estado

## 📦 Build para Producción

```bash
# Construir
npm run build

# Los archivos se generan en /dist
# Sube el contenido de /dist a tu servidor web
```

### Variables de entorno en producción

Asegúrate de configurar `VITE_API_URL` con la URL de tu backend en producción:

```env
VITE_API_URL=https://api.tudominio.com
```

## 🐛 Solución de Problemas

### Error: Cannot connect to backend

**Causa:** Backend no está corriendo o URL incorrecta

**Solución:**
1. Verifica que el backend esté corriendo
2. Revisa la URL en `.env`
3. Verifica la consola del navegador para más detalles

### Error: CORS

**Causa:** Backend no tiene CORS configurado correctamente

**Solución:**
- Asegúrate que el backend permita peticiones desde `http://localhost:5173`
- En producción, configura el CORS para tu dominio

### Error: ERR_BLOCKED_BY_CLIENT

**Causa:** Extensiones del navegador (bloqueadores de anuncios)

**Solución:**
1. Usa modo incógnito
2. Desactiva bloqueadores para localhost
3. Prueba en otro navegador

## 🔗 Repositorios Relacionados

- **Backend:** [Repositorio del Backend de LUMO] (pendiente)
- **Documentación:** Ver `BITACORA_TECNICA.md` en la raíz del proyecto

## 📝 Licencia

Proyecto educativo - Uso libre para fines académicos

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para problemas o preguntas:
1. Revisa la documentación en `BITACORA_TECNICA.md`
2. Abre un issue en GitHub
3. Consulta la wiki del proyecto

---

**🎓 LUMO - Transformando la educación en una aventura gamificada**

*Última actualización: 15 de Octubre 2025*
