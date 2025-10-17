# 🎨 FASE 3: FRONTEND - PLAN DE IMPLEMENTACIÓN

**Fecha**: 17 de octubre de 2025  
**Estado**: 🚀 EN PROGRESO

---

## 🎯 OBJETIVO

Implementar el rediseño visual completo del frontend según la especificación, incluyendo:
- Sistema de diseño (CSS tokens)
- Navbar y Sidebar unificados visualmente
- Dashboard con estadísticas reales
- Student List con filtros y modal mejorado
- Mission cards con narrativas
- Sistema de notificaciones completo

---

## 📋 PLAN DE EJECUCIÓN

### **SPRINT 1: Sistema de Diseño Base** ⏱️ 30 min

#### 1.1 CSS Tokens (Variables de diseño)
```css
--bg-page: #f8f9fa
--panel-bg: #ffffff
--primary: #1DD75B
--text-primary: #171A1F
--shadow-soft: 0 6px 18px rgba(15, 23, 42, 0.06)
```

#### 1.2 Tipografía
```css
font-family: Inter, system-ui, sans-serif
H1: 36px, weight 600
Body: 14px/16px
```

#### 1.3 Layout Base
```css
max-width: 1200px
navbar: 64px altura fija
sidebar: 240px ancho
```

**Archivos a crear/modificar:**
- ✅ `frontend/src/styles/tokens.css`
- ✅ `frontend/src/styles/layout.css`
- ✅ `frontend/src/styles/typography.css`
- ✅ Actualizar `frontend/src/index.css`

---

### **SPRINT 2: Navbar + Sidebar** ⏱️ 45 min

#### 2.1 Navbar Rediseñado
- Altura: 64px
- Fondo: --panel-bg (blanco)
- Logo izquierda → /dashboard
- Búsqueda: mantener funcionalidad actual
- Perfil: derecha
- Eliminar: notificaciones y selector de curso

#### 2.2 Sidebar Unificado
- Ancho: 240px
- Sin border-right fuerte
- Mismo fondo que navbar
- Sticky position
- Items: Inicio, Alumnos, Misiones, Configuración

**Archivos a modificar:**
- ✅ `frontend/src/components/Navbar.jsx`
- ✅ `frontend/src/components/Sidebar.jsx`
- ✅ `frontend/src/layout/MainLayout.jsx`

---

### **SPRINT 3: Dashboard** ⏱️ 60 min

#### 3.1 Conectar con endpoint real
```javascript
const response = await fetch('http://localhost:3000/api/dashboard');
const { avgLogic, avgCreativity, avgWriting, activeMissionsCount, totalStudents } = await response.json();
```

#### 3.2 Layout
- Columna izquierda: saludo + stats (3 barras horizontales)
- Columna derecha: 2 tarjetas de acceso rápido
- Eliminar: texto "Ver estadísticas"

#### 3.3 Barras de habilidades
- Altura: 18px
- Border-radius: 9px
- Color: --primary
- Labels: Lógica, Creatividad, Escritura

**Archivos a modificar:**
- ✅ `frontend/src/pages/Dashboard.jsx`
- ✅ `frontend/src/components/StatCard.jsx` (actualizar)

---

### **SPRINT 4: Students List + Modal** ⏱️ 90 min

#### 4.1 Student List
- Agregar columnas: Estado (badge), Progreso (X/Y)
- Filtros: eliminar "Todos", mantener A-Z
- Búsqueda: por CI (no por email)
- Conectar con: `GET /api/students?filter=A-Z&search={ci}`

#### 4.2 Student Modal
- Width: 720px
- Header: Avatar 72px + nombre + X
- Content: 
  - Tiempo promedio en app (minimalista)
  - Misiones realizadas (minimalista)
  - Gráfico: 3 barras verticales (Lógica, Creatividad, Escritura)
- Eliminar: tarjetas de horario, profesor, aula

**Archivos a modificar:**
- ✅ `frontend/src/pages/Students.jsx`
- ✅ `frontend/src/components/StudentRow.jsx`
- ✅ `frontend/src/components/StudentDetailModal.jsx`

---

### **SPRINT 5: Missions** ⏱️ 90 min

#### 5.1 Mission Cards
- Grid: 3 cols desktop, 2 tablet, 1 móvil
- Tamaño: 280px × 180px
- Imagen arriba, título y summary abajo
- Botones: Ver y Editar

#### 5.2 Mission Preview Modal
- Mostrar: title, summary
- 3 opciones de rol con:
  - Title
  - Story description
  - Reward points

#### 5.3 Mission Editor
- Formulario: Título, Resumen, Imagen preview
- 3 bloques de roles:
  - Role title
  - Rich description
  - Reward points
- Preview a la derecha

**Archivos a modificar:**
- ✅ `frontend/src/pages/Missions.jsx`
- ✅ `frontend/src/components/MissionCard.jsx`
- ✅ Crear: `frontend/src/components/MissionPreviewModal.jsx`
- ✅ Actualizar: `frontend/src/components/MissionFormModal.jsx`

---

### **SPRINT 6: Notificaciones** ⏱️ 90 min

#### 6.1 Notification Composer
- Modal: 520px width
- Campos:
  - Destinatario (buscar por CI, Grupo, "Todos")
  - Asunto
  - Mensaje (WYSIWYG simple)
- Botón Enviar: --primary

#### 6.2 Notification Panel
- Lista izquierda: 320px
- Items: title + snippet + timestamp
- Panel derecha: contenido completo
- Click: abrir modal flotante

#### 6.3 Real-time (Toast)
- Mostrar toast cuando llegue notificación
- Añadir al tope de la lista

**Archivos a crear:**
- ✅ `frontend/src/components/NotificationComposer.jsx`
- ✅ `frontend/src/components/NotificationPanel.jsx`
- ✅ `frontend/src/pages/Notifications.jsx`
- ✅ `frontend/src/hooks/useNotifications.js`

---

### **SPRINT 7: Configuración** ⏱️ 45 min

#### 7.1 Perfil
- Conectar con usuario real
- Upload avatar con preview
- Persistir en DB (campo avatar_url)

#### 7.2 Notificaciones Settings
- Toggle para notificaciones de dispositivo
- `Notification.requestPermission()`
- Checklist de tipos permitidos

#### 7.3 Seguridad
- Botón visible pero inactivo
- Tooltip: "Próximamente"

**Archivos a modificar:**
- ✅ `frontend/src/pages/Settings.jsx` (crear si no existe)
- ✅ Actualizar perfil de usuario

---

## 📊 PROGRESO ACTUAL

```
[████████░░░░░░░░░░░░] 40% - Backend completado

FASE 1: Base de datos     ████████████ 100% ✅
FASE 2: Backend APIs       ████████████ 100% ✅
FASE 3: Frontend           ░░░░░░░░░░░░   0% ⏳
  - Sistema de diseño      ░░░░░░░░░░░░   0%
  - Navbar + Sidebar       ░░░░░░░░░░░░   0%
  - Dashboard              ░░░░░░░░░░░░   0%
  - Students               ░░░░░░░░░░░░   0%
  - Missions               ░░░░░░░░░░░░   0%
  - Notifications          ░░░░░░░░░░░░   0%
  - Settings               ░░░░░░░░░░░░   0%
```

---

## 🎯 MÉTRICAS ESTIMADAS

| Sprint | Componentes | Archivos | Tiempo | Prioridad |
|--------|-------------|----------|--------|-----------|
| 1 | Sistema de diseño | 4 | 30 min | 🔴 Alta |
| 2 | Navbar + Sidebar | 3 | 45 min | 🔴 Alta |
| 3 | Dashboard | 2 | 60 min | 🔴 Alta |
| 4 | Students | 3 | 90 min | 🟡 Media |
| 5 | Missions | 4 | 90 min | 🟡 Media |
| 6 | Notifications | 4 | 90 min | 🟢 Baja |
| 7 | Settings | 1 | 45 min | 🟢 Baja |

**Total estimado**: ~7.5 horas

---

## 🚀 COMENZAR AHORA

**Siguiente paso**: Sprint 1 - Sistema de Diseño (CSS Tokens)

¿Arrancamos? 🎨
