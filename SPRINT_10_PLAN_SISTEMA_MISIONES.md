# 🎯 SPRINT 10 - REDISEÑO COMPLETO SISTEMA DE MISIONES

**Fecha inicio:** 18 de Octubre 2025  
**Estimación:** 3-4 horas  
**Complejidad:** Alta

---

## 📋 OBJETIVO GENERAL

Transformar el sistema de misiones de un modelo monolítico (narrative JSON) a un sistema modular con **Actividades independientes**, permitiendo:

1. **Múltiples actividades por misión** (pasos secuenciales)
2. **Editor visual de actividades** con preview en tiempo real
3. **Carrusel de actividades** en el preview de misión
4. **Sistema de puntos** granular por actividad
5. **Estados mejorados** (borrador, activa, cerrada)

---

## 🗃️ FASE 1: MODELO DE DATOS (Backend)

### 1.1 Nuevo Modelo: Activity

**Archivo:** `backend/prisma/schema.prisma`

```prisma
model Activity {
  id              Int      @id @default(autoincrement())
  title           String   // "Descifra el enigma"
  description     String   // Descripción de la actividad
  type            String   // "logic", "creativity", "writing"
  content         String?  // JSON con el contenido específico
  points          Int      @default(10)
  order           Int      @default(0) // Orden dentro de la misión
  
  missionId       Int
  mission         Mission  @relation(fields: [missionId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 1.2 Actualizar Modelo: Mission

**Cambios:**
- Deprecar campo `narrative` (mantener por compatibilidad)
- Agregar campo `status` mejorado: `draft`, `active`, `closed`
- Agregar relación con Activities

```prisma
model Mission {
  // ... campos existentes
  
  status           String   // "draft", "active", "closed" (antes: "active", "inactive")
  narrative        String?  // ⚠️ DEPRECATED - mantener para migración
  
  // ✅ NUEVA RELACIÓN
  activities       Activity[]
  
  // ... resto de campos
}
```

### 1.3 Migración de Datos

**Script:** `backend/migrations/migrate_narrative_to_activities.js`

Convertir misiones existentes:
```
Mission.narrative JSON → 3 Activities (logic, creativity, writing)
```

---

## 🔧 FASE 2: BACKEND API

### 2.1 Nuevos Endpoints: Activities

**Archivo:** `backend/routes/activityRoutes.js`

```javascript
POST   /api/missions/:missionId/activities     // Crear actividad
GET    /api/missions/:missionId/activities     // Listar actividades
PUT    /api/activities/:id                     // Editar actividad
DELETE /api/activities/:id                     // Eliminar actividad
PATCH  /api/activities/:id/reorder             // Cambiar orden
```

### 2.2 Actualizar Controller: Mission

**Archivo:** `backend/controllers/missionController.js`

```javascript
// Incluir activities al obtener misión
const getMissionById = async (req, res) => {
  const mission = await prisma.mission.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      activities: {
        orderBy: { order: 'asc' }
      }
    }
  });
  // ...
};
```

### 2.3 Service Layer

**Archivo:** `backend/services/activityService.js`

```javascript
- createActivity(missionId, data)
- updateActivity(id, data)
- deleteActivity(id)
- reorderActivities(missionId, newOrder)
- getActivitiesByMission(missionId)
```

---

## 🎨 FASE 3: FRONTEND - EDITOR DE MISIONES

### 3.1 Rediseño MissionFormModal.jsx

**Estructura nueva:**

```
┌─────────────────────────────────────────┐
│  CREAR MISIÓN                      [X]  │
├─────────────────────────────────────────┤
│                                         │
│  📝 Información Básica                  │
│  ├─ Título                              │
│  ├─ Resumen                             │
│  ├─ Imagen Preview                      │
│  └─ Estado (Borrador/Activa/Cerrada)    │
│                                         │
│  🎯 Actividades (3)                     │
│  ┌───────────────────────────────────┐ │
│  │ [1] Descifra el enigma       [↓]  │ │
│  │     Tipo: Lógica             [×]  │ │
│  │     Puntos: 10                    │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ [2] Crea tu personaje        [↑↓] │ │
│  │     Tipo: Creatividad        [×]  │ │
│  │     Puntos: 15                    │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ [3] Escribe la historia      [↑]  │ │
│  │     Tipo: Lengua             [×]  │ │
│  │     Puntos: 20                    │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [+ Agregar Actividad]                  │
│                                         │
│  [Cancelar]           [Guardar Misión] │
└─────────────────────────────────────────┘
```

**Componentes nuevos:**
- `ActivityEditor.jsx` - Editor individual de actividad
- `ActivityList.jsx` - Lista drag-and-drop de actividades
- `ActivityPreview.jsx` - Vista previa de actividad

### 3.2 Estado del Formulario

```javascript
const [formData, setFormData] = useState({
  title: '',
  summary: '',
  previewImage: '',
  grade: '1° Primaria',
  status: 'draft',  // ✅ Nuevo: draft, active, closed
  activities: []     // ✅ Array de actividades
});

const [activities, setActivities] = useState([
  {
    id: Date.now(),
    title: '',
    description: '',
    type: 'logic',
    points: 10,
    order: 0,
    isNew: true
  }
]);
```

### 3.3 Funciones de Gestión

```javascript
const addActivity = () => {
  setActivities([...activities, {
    id: Date.now(),
    title: '',
    description: '',
    type: 'logic',
    points: 10,
    order: activities.length,
    isNew: true
  }]);
};

const removeActivity = (id) => {
  setActivities(activities.filter(a => a.id !== id));
};

const updateActivity = (id, field, value) => {
  setActivities(activities.map(a => 
    a.id === id ? { ...a, [field]: value } : a
  ));
};

const reorderActivity = (fromIndex, toIndex) => {
  const newActivities = [...activities];
  const [removed] = newActivities.splice(fromIndex, 1);
  newActivities.splice(toIndex, 0, removed);
  setActivities(newActivities.map((a, i) => ({ ...a, order: i })));
};
```

---

## 🖼️ FASE 4: FRONTEND - PREVIEW DE MISIÓN

### 4.1 Rediseño MissionPreviewModal.jsx

**Características:**
- **Carrusel de actividades** (react-slick o custom)
- **Navegación por pasos** (1/5, 2/5, etc.)
- **Vista de actividad individual**
- **Botón "Seleccionar Rol"** → Solo si hay actividades de ese tipo

**Estructura:**

```
┌─────────────────────────────────────────┐
│  🎯 La Aventura del Reino Matemático    │
│  ┌───────────────────────────────────┐ │
│  │  [Imagen de Preview]              │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Breve descripción de la misión...      │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Actividades (5) - Paso 2/5             │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │  🎨 Crea tu personaje             │ │
│  │                                   │ │
│  │  Diseña un héroe que represente   │ │
│  │  tus valores y habilidades...     │ │
│  │                                   │ │
│  │  ⭐ +15 puntos de Creatividad     │ │
│  │                                   │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [← Anterior]  ●●○○○  [Siguiente →]     │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [Cerrar]       [Iniciar Misión →]     │
└─────────────────────────────────────────┘
```

### 4.2 Carrusel de Actividades

**Opciones:**
1. **React Slick** (librería externa)
2. **Custom Carousel** (más control)

**Implementación custom:**
```javascript
const [currentStep, setCurrentStep] = useState(0);
const currentActivity = activities[currentStep];

const nextStep = () => {
  if (currentStep < activities.length - 1) {
    setCurrentStep(currentStep + 1);
  }
};

const prevStep = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};
```

---

## 📊 FASE 5: COMPONENTES NUEVOS

### 5.1 ActivityEditor.jsx

**Props:**
```javascript
{
  activity: Object,
  index: Number,
  onChange: Function,
  onRemove: Function,
  onMoveUp: Function,
  onMoveDown: Function,
  canMoveUp: Boolean,
  canMoveDown: Boolean
}
```

**UI:**
- Título editable
- Selector de tipo (Logic/Creativity/Writing)
- Textarea para descripción
- Input de puntos
- Botones de reordenamiento (↑ ↓)
- Botón eliminar (×)

### 5.2 ActivityCard.jsx (Preview)

**Props:**
```javascript
{
  activity: Object,
  showPoints: Boolean
}
```

**UI:**
- Icono según tipo
- Título de actividad
- Descripción
- Badge de puntos

### 5.3 ActivityCarousel.jsx

**Props:**
```javascript
{
  activities: Array,
  onSelect: Function (opcional)
}
```

**Features:**
- Navegación prev/next
- Indicadores de paso (●●○○○)
- Swipe en mobile (touch events)
- Teclado (← →)

---

## 🔄 FASE 6: MIGRACIÓN Y COMPATIBILIDAD

### 6.1 Script de Migración

**Archivo:** `backend/scripts/migrate-missions.js`

```javascript
// Para cada misión con narrative:
const missions = await prisma.mission.findMany({
  where: { narrative: { not: null } }
});

for (const mission of missions) {
  const narrative = JSON.parse(mission.narrative);
  
  // Crear 3 actividades (logic, creativity, writing)
  await prisma.activity.createMany({
    data: [
      {
        missionId: mission.id,
        title: narrative.logicTitle || 'Actividad de Lógica',
        description: narrative.logicStory || '',
        type: 'logic',
        points: narrative.logicReward || 10,
        order: 0
      },
      {
        missionId: mission.id,
        title: narrative.creativityTitle || 'Actividad de Creatividad',
        description: narrative.creativityStory || '',
        type: 'creativity',
        points: narrative.creativityReward || 10,
        order: 1
      },
      {
        missionId: mission.id,
        title: narrative.writingTitle || 'Actividad de Lengua',
        description: narrative.writingStory || '',
        type: 'writing',
        points: narrative.writingReward || 10,
        order: 2
      }
    ]
  });
}
```

### 6.2 Modo de Compatibilidad

Durante la transición:
- Si misión tiene `narrative` y NO tiene `activities` → Generar activities on-the-fly
- Si misión tiene `activities` → Ignorar narrative
- Mantener ambos sistemas 1 semana

---

## 🎨 FASE 7: UI/UX MEJORADA

### 7.1 Estados Visuales de Misión

```javascript
const statusConfig = {
  draft: {
    label: 'Borrador',
    color: '#FFA726',
    icon: FiEdit,
    description: 'Misión en edición, no visible para alumnos'
  },
  active: {
    label: 'Activa',
    color: '#1DD75B',
    icon: FiCheckCircle,
    description: 'Misión disponible para completar'
  },
  closed: {
    label: 'Cerrada',
    color: '#9E9E9E',
    icon: FiLock,
    description: 'Misión finalizada, solo lectura'
  }
};
```

### 7.2 Badges de Actividad

```javascript
const activityTypeConfig = {
  logic: {
    label: 'Lógica',
    icon: '🧩',
    color: '#1DD75B'
  },
  creativity: {
    label: 'Creatividad',
    icon: '🎨',
    color: '#E91E63'
  },
  writing: {
    label: 'Lengua',
    icon: '✏️',
    color: '#2196F3'
  }
};
```

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

### Backend ✅
- [ ] 1.1 Crear modelo Activity en schema.prisma
- [ ] 1.2 Actualizar modelo Mission (add activities relation)
- [ ] 1.3 Crear migración Prisma
- [ ] 1.4 Aplicar migración
- [ ] 2.1 Crear activityRoutes.js
- [ ] 2.2 Crear activityController.js
- [ ] 2.3 Crear activityService.js
- [ ] 2.4 Actualizar missionController (include activities)
- [ ] 2.5 Registrar rutas en app.js
- [ ] 6.1 Script de migración de datos (narrative → activities)

### Frontend - Componentes ✅
- [ ] 5.1 Crear ActivityEditor.jsx
- [ ] 5.2 Crear ActivityCard.jsx (preview)
- [ ] 5.3 Crear ActivityCarousel.jsx
- [ ] 3.1 Rediseñar MissionFormModal.jsx
- [ ] 4.1 Rediseñar MissionPreviewModal.jsx

### Frontend - Lógica ✅
- [ ] 3.2 Estado del formulario con activities array
- [ ] 3.3 Funciones CRUD de actividades
- [ ] 3.4 Validaciones (mínimo 1 actividad)
- [ ] 3.5 Submit: crear misión + activities
- [ ] 4.2 Implementar carrusel
- [ ] 4.3 Navegación de pasos

### Testing ✅
- [ ] Backend: GET mission con activities
- [ ] Backend: POST mission con activities
- [ ] Backend: DELETE activity (cascade)
- [ ] Frontend: Crear misión con 3 actividades
- [ ] Frontend: Reordenar actividades
- [ ] Frontend: Preview con carrusel
- [ ] Frontend: Editar misión existente

---

## ⏱️ ESTIMACIÓN POR FASE

| Fase | Descripción | Tiempo |
|------|-------------|--------|
| 1 | Modelo de datos | 30 min |
| 2 | Backend API | 45 min |
| 3 | Editor de misiones | 60 min |
| 4 | Preview con carrusel | 45 min |
| 5 | Componentes auxiliares | 30 min |
| 6 | Migración de datos | 20 min |
| 7 | UI/UX polish | 20 min |
| **TOTAL** | | **3h 50m** |

---

## 🚀 ORDEN DE EJECUCIÓN

1. **Backend primero** (Fases 1-2) - 1h 15m
2. **Componentes base** (Fase 5) - 30m
3. **Editor de misiones** (Fase 3) - 1h
4. **Preview mejorado** (Fase 4) - 45m
5. **Migración** (Fase 6) - 20m
6. **Polish final** (Fase 7) - 20m

---

## 📌 NOTAS IMPORTANTES

1. **Backward Compatibility:** Mantener campo `narrative` deprecated pero funcional
2. **Migración gradual:** No forzar conversión inmediata de misiones antiguas
3. **Validaciones:** Mínimo 1 actividad por misión
4. **Puntos totales:** Sumar automáticamente de todas las actividades
5. **Orden:** Mantener siempre ordenado por campo `order`
6. **Cascade Delete:** Si se borra misión, borrar todas sus actividades

---

**Inicio:** Fase 1 - Modelo de Datos  
**Status:** ⏳ PENDIENTE
