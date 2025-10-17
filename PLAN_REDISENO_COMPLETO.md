# 🎨 PLAN DE REDISEÑO COMPLETO - LUMO

**Fecha inicio**: 17 de octubre de 2025  
**Alcance**: Rediseño visual + funcional completo del sistema

---

## 📋 CHECKLIST GENERAL

### 🗄️ **FASE 1: Base de Datos & Migraciones**
- [ ] Migración: Agregar columnas a `students` (ci, stats, avg_time, missions_completed, is_online)
- [ ] Migración: Crear/modificar tabla `missions` con narrative JSONB
- [ ] Migración: Crear tabla `notifications`
- [ ] Migración: Crear tabla `student_mission_progress`
- [ ] Seeds: 6 estudiantes con datos realistas
- [ ] Seeds: 6 misiones narrativas (3 roles cada una)
- [ ] Seeds: 3 notificaciones de ejemplo

### 🔌 **FASE 2: Backend & API**
- [ ] Endpoint: `GET /api/dashboard` (estadísticas agregadas)
- [ ] Endpoint: `GET /api/students` (filtro A-Z, search por CI)
- [ ] Endpoint: `GET /api/students/:id` (perfil completo con stats)
- [ ] Endpoint: `PUT /api/students/:id` (actualizar avatar, ci, stats)
- [ ] Endpoint: `GET /api/missions/:id` (incluye roles narrativos)
- [ ] Endpoint: `POST /api/missions` (crear con roles)
- [ ] Endpoint: `PUT /api/missions/:id` (editar)
- [ ] Endpoint: `POST /api/notifications` (crear y emitir)
- [ ] Endpoint: `GET /api/notifications` (listar)
- [ ] Endpoint: `PUT /api/notifications/:id/read` (marcar leída)
- [ ] Endpoint: `POST /api/config/notifications` (preferencias)
- [ ] WebSockets: Setup Socket.IO
- [ ] WebSockets: Rooms por estudiante/grupo
- [ ] WebSockets: Events (notification:new, student:status, mission:created)
- [ ] WebSockets: is_online tracking

### 🎨 **FASE 3: Frontend - Sistema de Diseño**
- [ ] CSS: Tokens de diseño (variables CSS)
- [ ] CSS: Tipografía Inter
- [ ] CSS: Componentes base (cards, buttons, badges)
- [ ] CSS: Responsive grid system

### 🧩 **FASE 4: Frontend - Componentes Core**
- [ ] Navbar: Rediseño (64px, sin notificaciones ni selector)
- [ ] Sidebar: Unificado visualmente con navbar (240px)
- [ ] Layout: Grid principal con sidebar sticky
- [ ] Cards: Sistema de cards reutilizable (12px radius, shadow)

### 📊 **FASE 5: Frontend - Dashboard**
- [ ] Dashboard: Saludo personalizado
- [ ] Dashboard: Stats (misiones activas, total alumnos)
- [ ] Dashboard: Gráfico de habilidades promedio (3 barras horizontales)
- [ ] Dashboard: Quick access cards (sin "Ver estadísticas")

### 👨‍🎓 **FASE 6: Frontend - Estudiantes**
- [ ] StudentList: Tabla con columnas Estado y Progreso
- [ ] StudentList: Filtro A-Z y search por CI (sin "Todos")
- [ ] StudentModal: Rediseño (720px, overlay)
- [ ] StudentModal: Header con avatar 72px + close
- [ ] StudentModal: Tiempo promedio y Misiones realizadas (texto minimalista)
- [ ] StudentModal: Gráfico personal (3 barras verticales)
- [ ] StudentModal: Eliminar tarjetas de horario/profesor/aula

### 🎮 **FASE 7: Frontend - Misiones**
- [ ] MissionCard: Grid de cards (280x180px, 3 cols desktop)
- [ ] MissionCard: Preview con imagen + título + summary
- [ ] MissionPreviewModal: Mostrar 3 roles narrativos
- [ ] MissionEditor: Formulario con 3 bloques de roles
- [ ] MissionEditor: Preview en vivo a la derecha
- [ ] MissionEditor: Validación de 3 roles requeridos

### 🔔 **FASE 8: Frontend - Notificaciones**
- [ ] NotificationComposer: Modal 520px (destinatario, asunto, mensaje)
- [ ] NotificationComposer: Búsqueda por CI + grupos
- [ ] NotificationComposer: WYSIWYG editor
- [ ] NotificationPanel: Lista izquierda (320px) + panel lectura
- [ ] NotificationPanel: Toast en tiempo real
- [ ] NotificationPanel: Modal flotante para leer completo

### ⚙️ **FASE 9: Frontend - Configuración**
- [ ] Perfil: Upload avatar con preview
- [ ] Perfil: Persistir avatar_url en DB
- [ ] Notificaciones: Toggle con Notification.requestPermission()
- [ ] Notificaciones: Checklist de tipos
- [ ] Seguridad: Botón con tooltip "Próximamente"

### 🧪 **FASE 10: Testing**
- [ ] Test: POST /api/notifications (persistencia + socket)
- [ ] Test: GET /api/dashboard (agregación AVG)
- [ ] Test: Socket emit/receive notification:new
- [ ] Test: E2E login y navegación básica

### 📚 **FASE 11: Documentación**
- [ ] README: Actualizar con nuevas features
- [ ] README: Instrucciones para seeds
- [ ] README: Instrucciones para sockets
- [ ] API Docs: Endpoints nuevos
- [ ] Changelog: Documentar cambios visuales

---

## 🎯 ORDEN DE EJECUCIÓN SUGERIDO

### **Sprint 1: Fundación (Backend + DB)**
1. Migraciones de BD
2. Seeds con datos realistas
3. Endpoints base modificados
4. WebSockets setup básico

### **Sprint 2: Visual Foundation (Frontend Base)**
5. Sistema de diseño (CSS tokens)
6. Navbar + Sidebar rediseño
7. Layout principal
8. Sistema de cards

### **Sprint 3: Dashboard + Estudiantes**
9. Dashboard rediseñado
10. Student List con nuevas columnas
11. Student Modal completo

### **Sprint 4: Misiones + Notificaciones**
12. Mission cards + editor
13. Notification system completo
14. WebSockets en producción

### **Sprint 5: Configuración + Polish**
15. Config page
16. Testing
17. Documentación
18. PR review

---

## 🚀 COMENZAR AHORA

Voy a empezar con **FASE 1: Base de Datos**, creando las migraciones necesarias.

¿Confirmas que arranco con las migraciones o preferís que empiece por otro lado?
