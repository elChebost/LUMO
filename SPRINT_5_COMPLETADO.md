# ✅ SPRINT 5: MISIONES - COMPLETADO

## 📋 Objetivo
Rediseñar el sistema de misiones con cards visuales, modal de preview con selección de roles, y formulario completo para crear misiones narrativas.

---

## 🎯 Componentes Actualizados

### 1. **MissionCard.jsx** ✅
**Dimensiones**: 280×180px (vertical)

**Estructura**:
- Imagen de preview (100px de altura)
- Badge de estado (Activa/Cerrada) sobre la imagen
- Título (font-weight 600, nowrap)
- Summary (2 líneas con line-clamp)
- onClick handler para abrir preview

**Estados**:
- Loading skeleton con animación pulse
- Hover con translateY(-4px) y shadow-md

**Props**:
```jsx
<MissionCard 
  mission={mission}
  loading={boolean}
  onClick={handleClick}
/>
```

---

### 2. **MissionPreviewModal.jsx** ✅ (NUEVO)
**Dimensiones**: 900px máx., 90vh altura

**Secciones**:
1. **Header con imagen** (200px altura)
   - Imagen de preview a ancho completo
   - Botón cerrar (36px circular, blur backdrop)
   
2. **Contenido**:
   - Título (text-2xl)
   - Summary (text-base, line-height 1.6)
   - Separador
   
3. **Roles** (Grid responsive):
   - 3 cards de roles (Lógica, Creatividad, Escritura)
   - Cada card muestra: icono, título, historia (3 líneas), puntos
   - Hover: border verde + translateY(-2px)
   - Click: ejecuta onSelectRole(role)

**Props**:
```jsx
<MissionPreviewModal
  mission={mission}
  isOpen={boolean}
  onClose={callback}
  onSelectRole={callback}
/>
```

**Parseo de narrative**:
```javascript
const narrativeData = JSON.parse(mission.narrative);
// Extrae: logicTitle, logicStory, logicReward
// creativityTitle, creativityStory, creativityReward
// writingTitle, writingStory, writingReward
```

---

### 3. **MissionFormModal.jsx** ✅
**Dimensiones**: 800px máx.

**Estructura del Formulario**:

#### Información Básica:
- **Título** (required) - Placeholder: "La Aventura del Reino Matemático"
- **Resumen** (required) - Textarea 3 filas
- **URL Imagen de Preview** - Input URL + preview de imagen (100px)
- **Grado** (select) - 1° a 6° Primaria
- **Estado** (select) - Activa/Cerrada

#### Roles (3 bloques con bg gris):

**Rol Lógica**:
- Título del Rol (input)
- Historia (textarea 3 filas)
- Recompensa (number, 0-100 puntos)

**Rol Creatividad**:
- Título del Rol (input)
- Historia (textarea 3 filas)
- Recompensa (number, 0-100 puntos)

**Rol Escritura**:
- Título del Rol (input)
- Historia (textarea 3 filas)
- Recompensa (number, 0-100 puntos)

**Valores por defecto**:
```javascript
{
  title: '',
  summary: '',
  previewImage: '',
  grade: '1° Primaria',
  status: 'activa',
  logicTitle: '',
  logicStory: '',
  logicReward: 10,
  creativityTitle: '',
  creativityStory: '',
  creativityReward: 10,
  writingTitle: '',
  writingStory: '',
  writingReward: 10
}
```

**Submit**:
```javascript
POST /api/missions
{
  title,
  summary,
  previewImage,
  description: summary, // Backend espera description
  grade,
  status: 'active' | 'inactive',
  narrative: JSON.stringify({
    logicTitle, logicStory, logicReward,
    creativityTitle, creativityStory, creativityReward,
    writingTitle, writingStory, writingReward
  }),
  teacherId: 1
}
```

---

### 4. **Missions.jsx** ✅

**Layout Grid**:
```css
gridTemplateColumns:
  - Desktop (≥1024px): repeat(3, 1fr)
  - Tablet (768-1023px): repeat(2, 1fr)
  - Mobile (<768px): 1fr
gap: var(--spacing-lg)
justifyItems: center
```

**Handlers**:
```javascript
const handleMissionClick = (mission) => {
  setSelectedMission(mission);
  setShowPreview(true);
};

const handleSelectRole = (role) => {
  console.log('Rol seleccionado:', role);
  // TODO: Implementar asignación de rol
  setShowPreview(false);
};
```

**Estados**:
- `selectedMission`: Misión seleccionada para preview
- `showPreview`: Controla modal de preview

---

## 🎨 Variables de Diseño Usadas

```css
/* Layout */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px

/* Typography */
--text-xs: 12px
--text-sm: 14px
--text-base: 16px
--text-lg: 18px
--text-xl: 20px
--text-2xl: 24px

/* Colors */
--primary: #1DD75B
--bg-page: #f8f9fa
--panel-bg: #ffffff
--border-color: #e2e8f0
--text-primary: #0f172a
--text-secondary: #64748b
--text-muted: #94a3b8

/* Shadows */
--shadow-soft: 0 1px 3px rgba(15, 23, 42, 0.08)
--shadow-md: 0 4px 12px rgba(15, 23, 42, 0.10)

/* Radius */
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-full: 9999px
```

---

## 📱 Responsive

### MissionCard:
- Desktop: 280×180px en grid de 3 columnas
- Tablet: 280×180px en grid de 2 columnas
- Mobile: 280×180px centrado en 1 columna

### MissionPreviewModal:
- Desktop: 900px máx.
- Móvil: 100% con padding

### MissionFormModal:
- Desktop: 800px máx.
- Móvil: 100% con padding

---

## 🔄 Flujo de Usuario

1. **Ver Misiones**:
   - Usuario ve grid de MissionCard con imágenes
   - Filtros: Búsqueda por texto + estado (Todas/Activas/Cerradas)

2. **Preview de Misión**:
   - Click en card → Abre MissionPreviewModal
   - Ve imagen grande, título, summary, y 3 opciones de rol
   - Hover en rol → Border verde + elevación
   - Click en rol → console.log (TODO: asignar)

3. **Crear Misión**:
   - Click en "Crear Misión" → Abre MissionFormModal
   - Completa título, summary, imagen (opcional)
   - Define 3 roles con título, historia, recompensa
   - Submit → POST /api/missions → Recarga lista

---

## 🐛 Notas Técnicas

### Parseo de Narrative:
El campo `narrative` en la BD es JSON string:
```json
{
  "logicTitle": "El Estratega",
  "logicStory": "Debes resolver...",
  "logicReward": 15,
  "creativityTitle": "El Artista",
  "creativityStory": "Debes crear...",
  "creativityReward": 12,
  "writingTitle": "El Cronista",
  "writingStory": "Debes escribir...",
  "writingReward": 10
}
```

### Status Mapping:
- Frontend: 'activa' / 'cerrada'
- Backend: 'active' / 'inactive'
- Mapeo en Missions.jsx y MissionFormModal.jsx

### Imagen de Preview:
- Campo opcional
- Si no hay URL → Muestra "Sin imagen"
- Validación de carga con onError

---

## ✅ Checklist de Completitud

- [x] MissionCard rediseñada a 280×180px con imagen top
- [x] MissionPreviewModal creado con 3 roles clicables
- [x] MissionFormModal actualizado con campos de narrative
- [x] Missions.jsx con grid de 3 columnas + modal preview
- [x] Estados y handlers para abrir/cerrar modales
- [x] Todas las variables de diseño aplicadas
- [x] Responsive para desktop/tablet/mobile
- [x] Loading skeletons con animación pulse
- [x] Hover effects en todos los elementos interactivos

---

## 🚀 Próximos Pasos

**Sprint 6: Notifications (90 min)**
- NotificationComposer modal (520px)
- Búsqueda de destinatario por CI o Grupo
- WYSIWYG editor para mensaje
- NotificationPanel (320px) con lista + contenido
- Toasts para notificaciones en tiempo real
- Hook useNotifications.js
- Integración con WebSocket events

**Sprint 7: Settings (45 min)**
- Conectar perfil a datos de usuario
- Upload de avatar con hover
- Toggle de notificaciones con requestPermission()
- Checklist de tipos de notificación
- Botón "Seguridad y privacidad" con tooltip

---

**Tiempo Estimado Sprint 5**: 90 min  
**Estado**: ✅ COMPLETADO  
**Fecha**: 2025-10-17
