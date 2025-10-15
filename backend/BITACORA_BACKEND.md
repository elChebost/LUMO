# 📋 BITÁCORA TÉCNICA - BACKEND LUMO

> **Aplicación Web de Gestión Educativa Gamificada**  
> **Inicio del Proyecto:** 8 de Septiembre de 2025  
> **Última Actualización:** 16 de Octubre de 2025  
> **Desarrollador:** Sebastian Palacios

---

## 📦 Dependencias Instaladas

### Core
- **Express.js**
- **Prisma ORM**
- **SQLite** (dev)
- **jsonwebtoken**
- **bcryptjs**
- **dotenv**

### Desarrollo
- **Nodemon**
- **Postman** (para pruebas de endpoints)

---

## 📅 Registro Cronológico de Desarrollo

---

### 📆 Semana 1: Setup y Configuración Inicial (8-13 Septiembre 2025)

#### **Lunes 8 de Septiembre**
- ✅ Instalación de Node.js y npm
- ✅ Creación de proyecto Express: `npm init -y`
- ✅ Instalación de dependencias principales
- ✅ Estructuración inicial de carpetas: `routes/`, `controllers/`, `services/`, `middlewares/`, `config/`
- ⏱️ **Tiempo:** 5 horas

#### **Martes 9 de Septiembre**
- ✅ Configuración de base de datos SQLite con Prisma
- ✅ Primer modelo en `schema.prisma`
- ✅ Generación de migraciones iniciales
- ⏱️ **Tiempo:** 4 horas

#### **Miércoles 10 de Septiembre**
- ✅ Implementación de servidor Express básico
- ✅ Configuración de variables de entorno
- ✅ Pruebas iniciales con Postman
- ⏱️ **Tiempo:** 3 horas

---

### 📆 Semana 2: CRUD y Autenticación (14-20 Septiembre 2025)

#### **Jueves 14 de Septiembre**
- ✅ Implementación de rutas y controladores para usuarios
- ✅ Hash de contraseñas con bcrypt
- ⏱️ **Tiempo:** 6 horas

#### **Viernes 15 de Septiembre**
- ✅ Implementación de autenticación JWT
- ✅ Middleware de protección de rutas
- ✅ Pruebas de login y registro con Postman
- ⏱️ **Tiempo:** 5 horas

#### **Sábado 16 de Septiembre**
- ✅ Creación de endpoints CRUD para entidades principales (estudiantes, profesores, misiones, etc.)
- ⏱️ **Tiempo:** 7 horas

---

### 📆 Semana 3: Integración y Validaciones (21-27 Septiembre 2025)

#### **Lunes 18 de Septiembre**
- ✅ Validaciones de datos en controladores
- ✅ Manejo de errores centralizado
- ⏱️ **Tiempo:** 4 horas

#### **Miércoles 20 de Septiembre**
- ✅ Integración con frontend para login y registro
- ✅ Pruebas de flujo completo con Postman
- ⏱️ **Tiempo:** 5 horas

---

### 📆 Semana 4: Mejoras y Documentación (28 Septiembre - 4 Octubre 2025)

#### **Lunes 28 de Septiembre**
- ✅ Refactorización de servicios y controladores
- ✅ Documentación de endpoints en Postman
- ⏱️ **Tiempo:** 3 horas

#### **Miércoles 30 de Septiembre**
- ✅ Implementación de roles y permisos
- ✅ Pruebas de acceso restringido con Postman
- ⏱️ **Tiempo:** 4 horas

---

### 📆 Semana 5: Ajustes Finales y Pruebas (5-16 Octubre 2025)

#### **Lunes 6 de Octubre**
- ✅ Optimización de consultas con Prisma
- ✅ Pruebas de stress y validación de seguridad
- ⏱️ **Tiempo:** 5 horas

#### **Viernes 10 de Octubre**
- ✅ Revisión y ajuste de documentación técnica
- ✅ Exportación de colección Postman para QA
- ⏱️ **Tiempo:** 2 horas

#### **Miércoles 15 de Octubre**
- ✅ Revisión final de integración frontend-backend
- ✅ Validación de flujo de autenticación JWT
- ⏱️ **Tiempo:** 3 horas

#### **Jueves 16 de Octubre**
- ✅ Cierre de bitácora técnica
- ✅ Backup y limpieza de archivos innecesarios
- ⏱️ **Tiempo:** 1 hora

---

## 🧪 Utilización de Postman

- Se utilizó Postman para probar todos los endpoints del backend durante el desarrollo.
- Se documentaron las rutas principales y los flujos de autenticación.
- Se exportó la colección final para QA y validación externa.

---

## 🗂️ Estructura Final del Backend

- `app.js` (entrypoint)
- `routes/` (rutas de API)
- `controllers/` (lógica de negocio)
- `services/` (servicios y acceso a datos)
- `middlewares/` (autenticación y validaciones)
- `config/` (configuración JWT, DB)
- `prisma/` (modelos y migraciones)

---

> **Bitácora cerrada el 16 de Octubre de 2025**
