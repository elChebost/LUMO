# 📋 BITÁCORA TÉCNICA - INTEGRACIÓN FRONTEND-BACKEND LUMO

> **Aplicación Web de Gestión Educativa Gamificada**  
> **Inicio de Integración:** 14 de Octubre de 2025  
> **Finalización:** 16 de Octubre de 2025  
> **Desarrollador:** Sebastian Palacios

---

## 🎯 Objetivo de la Integración

Conectar completamente el frontend (React + Vite) con el backend (Express + Prisma) mediante un sistema de autenticación JWT, implementando hooks personalizados para peticiones HTTP y protección de rutas.

---

## 📦 Tecnologías Utilizadas

### Frontend
- **React Router DOM** - Navegación y protección de rutas
- **localStorage** - Almacenamiento de tokens y datos de usuario
- **Custom Hooks** - Manejo centralizado de peticiones HTTP

### Backend
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcryptjs** - Hash de contraseñas
- **Express Middleware** - Protección de rutas
- **CORS** - Comunicación entre puertos diferentes

### Herramientas
- **Postman** - Pruebas de endpoints y documentación de API
- **Prisma Studio** - Gestión de base de datos

---

## 📅 Registro Cronológico de Desarrollo

---

### 📆 Lunes 14 de Octubre de 2025

#### **Mañana (9:00 - 13:00)**
- ✅ Análisis de arquitectura actual del backend
- ✅ Revisión de endpoints disponibles
- ✅ Creación de `backend/config/jwt.js` para configuración centralizada de JWT
- ✅ Implementación de `backend/middlewares/authMiddleware.js`
- ⏱️ **Tiempo:** 4 horas

#### **Tarde (14:00 - 18:00)**
- ✅ Corrección de typo: renombrado `autchService.js` → `authService.js`
- ✅ Verificación de hash de contraseñas con bcrypt en `authService.js`
- ✅ Configuración de CORS en `backend/app.js` para permitir peticiones desde `localhost:5173`
- ✅ Pruebas iniciales de login con Postman
- ⏱️ **Tiempo:** 4 horas

#### **Noche (19:00 - 21:00)**
- ✅ Creación de colección Postman para documentar endpoints
- ✅ Pruebas de endpoints de autenticación (`POST /api/auth/login`)
- ✅ Pruebas de endpoints de usuarios (`POST /api/users/register`)
- ⏱️ **Tiempo:** 2 horas

**Total día:** 10 horas

---

### 📆 Martes 15 de Octubre de 2025

#### **Mañana (9:00 - 13:00)**
- ✅ Creación de `frontend/src/utils/auth.js` con funciones de utilidad:
  - `getToken()`, `getUser()`, `setAuth()`, `clearAuth()`, `isAuthenticated()`, `getAuthHeaders()`
- ✅ Implementación de `frontend/src/hooks/useApi.js`:
  - Interceptor automático para agregar headers de autenticación
  - Manejo centralizado de errores HTTP
  - Redirección automática a `/login` en caso de error 401
- ⏱️ **Tiempo:** 4 horas

#### **Tarde (14:00 - 18:30)**
- ✅ Actualización de `frontend/src/pages/Login.jsx`:
  - Corrección de URL de API a `http://localhost:3000`
  - Almacenamiento separado de `token` y `user` en localStorage
  - Implementación de redirección automática si ya está autenticado
- ✅ Actualización de `frontend/src/components/Navbar.jsx`:
  - Importación de funciones de `utils/auth.js`
  - Mostrar datos reales del usuario autenticado (nombre y email)
  - Funcionalidad de logout con `clearAuth()` y redirección a `/login`
- ⏱️ **Tiempo:** 4.5 horas

#### **Noche (19:00 - 22:00)**
- ✅ Creación de componente `ProtectedRoute` en `frontend/src/routes/AppRouter.jsx`
- ✅ Protección de todas las rutas privadas (Dashboard, Students, Missions, etc.)
- ✅ Pruebas de flujo completo: login → dashboard → logout
- ⏱️ **Tiempo:** 3 horas

**Total día:** 11.5 horas

---

### 📆 Miércoles 16 de Octubre de 2025

#### **Mañana (9:00 - 12:00)**
- ✅ Actualización de hooks personalizados para usar `useApi`:
  - `frontend/src/hooks/useStudents.js`
  - `frontend/src/hooks/useStudent.js`
  - `frontend/src/hooks/useMissions.js`
  - `frontend/src/hooks/useMission.js`
  - `frontend/src/hooks/useNotifications.js`
- ⏱️ **Tiempo:** 3 horas

#### **Tarde (13:00 - 16:30)**
- ✅ Actualización de `frontend/src/components/StudentFormModal.jsx`:
  - Agregado campo de contraseña en formulario
  - Integración con `POST /api/users/register` para crear usuario
  - Creación de estudiante asociado con `userId`
  - Uso de `getAuthHeaders()` para peticiones autenticadas
- ✅ Pruebas de creación de estudiantes con usuarios asociados
- ⏱️ **Tiempo:** 3.5 horas

#### **Tarde (17:00 - 20:00)**
- ✅ Pruebas exhaustivas con Postman de todos los endpoints
- ✅ Documentación de flujos de autenticación en Postman
- ✅ Verificación de expiración de tokens (7 días)
- ✅ Pruebas de manejo de errores 401 y redirección automática
- ✅ Validación de protección de rutas en frontend
- ⏱️ **Tiempo:** 3 horas

#### **Noche (20:30 - 22:00)**
- ✅ Creación de documentación técnica de integración
- ✅ Exportación de colección Postman para equipo de QA
- ✅ Revisión final de código y limpieza
- ✅ Cierre de bitácora
- ⏱️ **Tiempo:** 1.5 horas

**Total día:** 11 horas

---

## 📊 Resumen de Horas Trabajadas

- **Lunes 14 de Octubre:** 10 horas
- **Martes 15 de Octubre:** 11.5 horas
- **Miércoles 16 de Octubre:** 11 horas

**Total:** 32.5 horas en 3 días

---

## 🔧 Archivos Creados

### Backend
1. `backend/config/jwt.js` - Configuración centralizada de JWT
2. `backend/middlewares/authMiddleware.js` - Middleware de protección de rutas

### Frontend
3. `frontend/src/utils/auth.js` - Utilidades de autenticación
4. `frontend/src/hooks/useApi.js` - Hook centralizado para peticiones HTTP

---

## 🔄 Archivos Modificados

### Backend
1. `backend/services/authService.js` - Renombrado y verificación de hash
2. `backend/app.js` - Configuración de CORS

### Frontend
3. `frontend/src/pages/Login.jsx` - Integración con backend y localStorage
4. `frontend/src/components/Navbar.jsx` - Datos de usuario y logout
5. `frontend/src/components/StudentFormModal.jsx` - Registro de usuarios
6. `frontend/src/routes/AppRouter.jsx` - Protección de rutas
7. `frontend/src/hooks/useStudents.js` - Uso de `useApi`
8. `frontend/src/hooks/useStudent.js` - Uso de `useApi`
9. `frontend/src/hooks/useMissions.js` - Uso de `useApi`
10. `frontend/src/hooks/useMission.js` - Uso de `useApi`
11. `frontend/src/hooks/useNotifications.js` - Uso de `useApi`

---

## 🔒 Flujos Implementados

### 1. Flujo de Login
1. Usuario ingresa credenciales en `Login.jsx`
2. Frontend envía `POST /api/auth/login` con email y password
3. Backend verifica credenciales con bcrypt
4. Backend genera token JWT con expiración de 7 días
5. Frontend recibe `{ token, user }` y almacena en localStorage
6. Redirección automática a `/dashboard`

### 2. Flujo de Peticiones Autenticadas
1. Componente usa hook personalizado (`useStudents`, `useMissions`, etc.)
2. Hook usa `useApi` internamente
3. `useApi` agrega automáticamente header `Authorization: Bearer <token>`
4. Backend recibe petición y verifica token con `authMiddleware`
5. Si token válido: procesa petición
6. Si token inválido/expirado: retorna 401
7. Frontend detecta 401, limpia localStorage y redirige a `/login`

### 3. Flujo de Logout
1. Usuario hace click en "Cerrar sesión" en `Navbar`
2. Se ejecuta `clearAuth()` que limpia localStorage
3. Redirección automática a `/login`

### 4. Flujo de Protección de Rutas
1. Usuario intenta acceder a ruta protegida (ej: `/dashboard`)
2. `ProtectedRoute` verifica `isAuthenticated()`
3. Si hay token: renderiza componente solicitado
4. Si no hay token: redirige a `/login`

---

## 🧪 Pruebas Realizadas con Postman

### Colección de Endpoints Documentados

#### Autenticación
- ✅ `POST /api/auth/login` - Login con credenciales
  - Body: `{ "email": "admin@test.com", "password": "123456" }`
  - Response: `{ "token": "...", "user": {...} }`

#### Usuarios
- ✅ `POST /api/users/register` - Registro de usuarios
  - Body: `{ "name": "...", "email": "...", "password": "...", "role": "..." }`
- ✅ `GET /api/users/profile` - Perfil del usuario autenticado
  - Headers: `Authorization: Bearer <token>`

#### Estudiantes
- ✅ `GET /api/students` - Listar todos los estudiantes
- ✅ `POST /api/students` - Crear estudiante
- ✅ `GET /api/students/:id` - Obtener estudiante por ID
- ✅ `PUT /api/students/:id` - Actualizar estudiante
- ✅ `DELETE /api/students/:id` - Eliminar estudiante

#### Misiones
- ✅ `GET /api/missions` - Listar todas las misiones
- ✅ `POST /api/missions` - Crear misión
- ✅ `GET /api/missions/:id` - Obtener misión por ID
- ✅ `PUT /api/missions/:id` - Actualizar misión
- ✅ `DELETE /api/missions/:id` - Eliminar misión

---

## ✅ Logros de la Integración

### Backend
- ✅ Autenticación JWT completamente funcional
- ✅ Middleware de protección de rutas implementado
- ✅ CORS configurado correctamente
- ✅ Hash de contraseñas con bcrypt
- ✅ 12 módulos CRUD operativos

### Frontend
- ✅ Sistema de autenticación con localStorage
- ✅ Hook centralizado para peticiones HTTP (`useApi`)
- ✅ Protección de rutas privadas
- ✅ Manejo automático de tokens expirados
- ✅ Datos de usuario en Navbar
- ✅ Logout funcional
- ✅ Todos los hooks actualizados para usar autenticación

### Integración
- ✅ Comunicación bidireccional frontend-backend
- ✅ Flujo de autenticación completo
- ✅ Manejo de errores centralizado
- ✅ Experiencia de usuario fluida (redirecciones automáticas)
- ✅ Documentación de API en Postman

---

## 🚀 Estado Final

- **Backend:** ✅ Completamente integrado
- **Frontend:** ✅ Completamente integrado
- **Autenticación:** ✅ 100% funcional
- **Protección de rutas:** ✅ Implementada
- **Documentación:** ✅ Completa

---

## 📚 Próximos Pasos Sugeridos

1. Implementar refresh token para renovación automática
2. Agregar más validaciones con librerías como Joi o Zod
3. Implementar sistema de notificaciones en tiempo real
4. Migrar de SQLite a PostgreSQL para producción
5. Implementar rate limiting en el backend
6. Agregar logs con Winston o Morgan

---

> **Bitácora cerrada el 16 de Octubre de 2025**  
> **Estado:** ✅ Integración completa y funcional
