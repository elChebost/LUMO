# ✅ SPRINT 7: SETTINGS - COMPLETADO

## 📋 Objetivo
Mejorar la página de configuración con perfil conectado a datos reales, upload de avatar, preferencias de notificaciones, y seguridad.

---

## 🎯 Componente Actualizado

### **Settings.jsx** ✅
**Ubicación**: `frontend/src/pages/Settings.jsx`

---

## 📦 Sección 1: Perfil del Usuario

### Estructura:
```
┌─────────────────────────────────────┐
│  👤 Perfil                           │
│  ┌────┐                              │
│  │ 96 │  Elias Diaz                  │
│  │ px │  remindevelopment@gmail.com  │
│  │ 🔁 │  Profesor                    │
│  └────┘                              │
└─────────────────────────────────────┘
```

### Avatar con Hover Upload:
**Dimensiones**:
- Desktop: 96×96px
- Mobile: 72×72px

**Hover State**:
- Overlay negro 60% opacity
- Icono FiUpload + texto "Subir"
- Input file oculto (type="file", accept="image/*")

**Funcionalidad**:
```javascript
const handleAvatarUpload = async (event) => {
  const file = event.target.files?.[0];
  
  // Validaciones
  - Tipo: image/*
  - Tamaño: máx 5MB
  
  // Upload
  POST /api/teachers/{id}/avatar
  FormData con campo 'avatar'
  
  // Response
  { avatar_url: string }
  
  // Update local state
  setUserData(prev => ({ ...prev, avatar_url }));
};
```

### Datos del Usuario:
```javascript
useEffect(() => {
  loadUserData(); // GET /api/teachers/{id}
}, []);

// Estructura de userData:
{
  name: string,
  email: string,
  role: string,
  avatar_url: string
}
```

---

## 📦 Sección 2: Notificaciones

### Toggle Principal:
```
┌──────────────────────────────────────────┐
│ Habilitar notificaciones en el dispositivo │
│ Recibe alertas en tiempo real        [⚪ →] │
└──────────────────────────────────────────┘
```

**Funcionalidad**:
```javascript
const handleNotificationToggle = async () => {
  if (Notification.permission === 'granted') {
    // Desactivar
    setNotificationsEnabled(false);
  } else if (Notification.permission === 'denied') {
    alert('Permisos bloqueados...');
  } else {
    // Solicitar permiso
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotificationsEnabled(true);
      new Notification('LUMO', {
        body: 'Las notificaciones están activadas',
        icon: '/icon.png'
      });
    }
  }
};
```

**Estilos del Toggle**:
```css
/* Container */
width: 48px
height: 26px
border-radius: 9999px
background: enabled ? --primary : --border-color

/* Dot */
width: 20px
height: 20px
left: enabled ? 25px : 3px
transition: left 0.2s ease
```

### Checklist de Tipos:
Solo visible si `notificationsEnabled === true`

```javascript
const notificationTypes = {
  newMission: true,
  studentSubmission: true,
  studentAchievement: true,
  systemUpdate: false
};

const handleNotificationTypeChange = (type) => {
  setNotificationTypes(prev => ({
    ...prev,
    [type]: !prev[type]
  }));
  // TODO: POST /api/teachers/{id}/notification-preferences
};
```

**Checkboxes**:
- ✅ Nuevas misiones creadas
- ✅ Entregas de estudiantes
- ✅ Logros de estudiantes
- ☐ Actualizaciones del sistema

**Estilos**:
```css
input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
}
```

---

## 📦 Sección 3: Seguridad y Privacidad

### Botón "Cambiar contraseña":
```
┌─────────────────────────────────────────┐
│ Cambiar contraseña                   ℹ️ │
└─────────────────────────────────────────┘
```

**Tooltip al Hover**:
```
┌──────────────────────────────────────────┐
│ Funcionalidad disponible próximamente.  │
│ Contacta al administrador para cambiar  │
│ tu contraseña.                          │
└──────────────────────────────────────────┘
```

**Estados**:
```javascript
const [showTooltip, setShowTooltip] = useState(false);

// Toggle con hover
onMouseEnter={() => setShowTooltip(true)}
onMouseLeave={() => setShowTooltip(false)}
```

**Estilos del Tooltip**:
```css
position: absolute
top: calc(100% + 4px)
background: rgba(15, 23, 42, 0.95)
color: white
font-size: var(--text-xs)
border-radius: var(--radius-md)
animation: fadeIn 0.2s ease
```

---

## 📦 Sección 4: Cerrar Sesión

### Botón:
```jsx
<button onClick={() => navigate('/login')}>
  <FiLogOut /> Cerrar sesión
</button>
```

**Estilos**:
```css
background: transparent
border: 1px solid #ef4444
color: #ef4444

/* Hover */
background: rgba(239, 68, 68, 0.1)
transform: translateY(-1px)
```

---

## 🎨 Layout Completo

```
┌────────────────────────────────────────┐
│ ⚙️ Configuración                        │
│ Ajustes y preferencias del sistema     │
├────────────────────────────────────────┤
│ ┌──────────────────────────────────┐   │
│ │ 👤 Perfil                        │   │
│ │ [Avatar] Nombre, Email, Rol      │   │
│ └──────────────────────────────────┘   │
│ ┌──────────────────────────────────┐   │
│ │ 🔔 Notificaciones                │   │
│ │ [Toggle] Habilitar               │   │
│ │ [Checklist] Tipos                │   │
│ └──────────────────────────────────┘   │
│ ┌──────────────────────────────────┐   │
│ │ 🔒 Seguridad y Privacidad        │   │
│ │ [Botón] Cambiar contraseña       │   │
│ └──────────────────────────────────┘   │
│ [Botón Rojo] Cerrar sesión             │
└────────────────────────────────────────┘
```

---

## 🔄 Flujos de Usuario

### 1. Cambiar Avatar:
```
Hover en avatar → 
Overlay aparece → 
Click en overlay → 
File picker abre → 
Seleccionar imagen → 
Validar tipo y tamaño → 
POST /api/teachers/{id}/avatar → 
Actualizar estado local → 
Avatar se actualiza
```

### 2. Activar Notificaciones:
```
Click en toggle → 
Verificar Notification.permission → 
Si 'default': requestPermission() → 
Si 'granted': Mostrar toast "Activadas" → 
Actualizar estado → 
Mostrar checklist de tipos
```

### 3. Cambiar Preferencias:
```
Click en checkbox → 
Toggle estado local → 
(TODO) POST /api/teachers/{id}/notification-preferences → 
Estado persiste en backend
```

### 4. Ver Tooltip:
```
Hover en botón "Cambiar contraseña" → 
showTooltip = true → 
Tooltip aparece con animación fadeIn → 
Mouse out → 
showTooltip = false → 
Tooltip desaparece
```

---

## 📱 Responsive

### Desktop:
- Cards con padding lg
- Avatar 96px
- 3 cards apiladas verticalmente

### Mobile:
- Cards con padding md
- Avatar 72px
- Botón "Cerrar sesión" width: 100%

---

## 🎨 Variables de Diseño Usadas

```css
/* Spacing */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px

/* Typography */
--text-xs: 12px
--text-sm: 14px
--text-base: 16px
--text-lg: 18px
--text-xl: 20px

/* Colors */
--primary: #1DD75B
--bg-page: #f8f9fa
--panel-bg: #ffffff
--border-color: #e2e8f0
--text-primary: #0f172a
--text-secondary: #64748b
--text-muted: #94a3b8

/* Radius */
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-full: 9999px
```

---

## 🐛 Notas Técnicas

### Validaciones de Avatar:
```javascript
// Tipo de archivo
if (!file.type.startsWith('image/')) {
  alert('Por favor selecciona una imagen válida');
  return;
}

// Tamaño máximo
if (file.size > 5 * 1024 * 1024) { // 5MB
  alert('La imagen no puede superar los 5MB');
  return;
}
```

### Notification API:
```javascript
// Verificar soporte
if ('Notification' in window) {
  // Verificar permiso actual
  if (Notification.permission === 'granted') {
    // Ya tiene permiso
  } else if (Notification.permission === 'denied') {
    // Usuario bloqueó
  } else {
    // Solicitar permiso
    await Notification.requestPermission();
  }
}
```

### Estados Locales:
```javascript
const [userData, setUserData] = useState(null);
const [notificationsEnabled, setNotificationsEnabled] = useState(false);
const [notificationTypes, setNotificationTypes] = useState({
  newMission: true,
  studentSubmission: true,
  studentAchievement: true,
  systemUpdate: false
});
const [avatarHover, setAvatarHover] = useState(false);
const [showTooltip, setShowTooltip] = useState(false);
```

---

## ✅ Checklist de Completitud

- [x] Perfil conectado a GET /api/teachers/{id}
- [x] Avatar con hover upload (96px desktop, 72px mobile)
- [x] Validación de tipo y tamaño de imagen
- [x] POST avatar a backend (FormData)
- [x] Toggle de notificaciones con Notification API
- [x] requestPermission() al activar
- [x] Toast de confirmación con new Notification()
- [x] Checklist de tipos de notificación (4 opciones)
- [x] Checkbox con accent-color: --primary
- [x] Botón "Cambiar contraseña" con tooltip
- [x] Tooltip con animación fadeIn
- [x] Botón "Cerrar sesión" con navegación a /login
- [x] Todas las variables de diseño aplicadas
- [x] Responsive para desktop/mobile

---

## 🚀 Próximos Pasos

**Pendientes Backend**:
- Implementar `POST /api/teachers/{id}/avatar` con Multer
- Guardar avatar_url en base de datos
- Implementar `POST /api/teachers/{id}/notification-preferences`
- Cargar preferencias en GET /api/teachers/{id}

**Mejoras Futuras**:
- Sección "Cambiar contraseña" funcional
- Sección "Gestionar privacidad" con configuraciones avanzadas
- Historial de notificaciones enviadas
- Estadísticas de uso de la plataforma

---

**Tiempo Estimado Sprint 7**: 45 min  
**Estado**: ✅ COMPLETADO  
**Fecha**: 2025-10-17
