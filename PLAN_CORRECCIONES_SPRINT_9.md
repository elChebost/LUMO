# 🔧 PLAN DE CORRECCIONES - Sprint 9

**Fecha:** 18 de Octubre 2025  
**Objetivo:** Implementar correcciones y mejoras UX solicitadas

---

## ✅ PROBLEMAS RESUELTOS (Iteración 1)

### 1. Error 500 Dashboard ✅
**Problema:** `studentsOnline is not defined`  
**Solución:** Corregido en `dashboardController.js` línea 67  
**Estado:** ✅ RESUELTO

### 2. Error Avatar Upload ✅
**Problema:** Campo `avatar_url` no existe en schema  
**Solución:** 
- Agregado campo `avatar_url String?` al modelo Teacher
- Migración aplicada: `add_avatar_to_teacher`
- Prisma Client regenerado
**Estado:** ✅ RESUELTO

---

## 🚀 CORRECCIONES PENDIENTES

### **Prioridad Alta - Iteración 2**

#### 3. Navbar - Eliminar Descripción y Arreglar Navegación
**Problema:**
- Al clickear título de pantalla en navbar → va a dashboard (incorrecto)
- Descripción de pantalla visible (debe eliminarse)

**Solución:**
- Eliminar párrafo de descripción en Navbar
- Remover onClick del título
- Hacer clickeable solo el logo (icon_text) → dashboard

**Archivos:**
- `frontend/src/components/Navbar.jsx`

---

#### 4. NotificationFAB - Un Solo Botón con Avión
**Problema:**
- Actualmente 2 botones (campana + mensaje)
- Diseño no coincide con mockup

**Solución Propuesta:**
1. **UN solo botón flotante** con icono de avión (FiSend)
2. Al clickearlo → abre panel de notificaciones
3. **Botón de redacción** aparece SOLO cuando panel está abierto
4. Click en redacción → abre composer modal
5. Composer debe tener:
   - Campo "Asunto"
   - Campo "Destinatarios" con botón "Todos los alumnos"
   - Campo "Mensaje" (textarea grande)

**Archivos:**
- `frontend/src/components/NotificationFAB.jsx`
- `frontend/src/components/NotificationComposer.jsx`

---

### **Prioridad Media - Iteración 3**

#### 5. Dashboard - Ajustar Barras de Habilidades
**Referencia:** Imagen 2 (pasted image 2)

**Cambios:**
- Ajustar proporciones de barras
- Mejor visualización de porcentajes
- Colores más saturados

**Archivos:**
- `frontend/src/pages/Dashboard.jsx`

---

#### 6. Modales - Cerrar al Clickear Fuera
**Problema:**
- StudentDetailModal y MissionPreviewModal tienen X interna
- No se cierran al clickear fuera

**Solución:**
- Eliminar botón X
- Agregar onClick en backdrop para cerrar

**Archivos:**
- `frontend/src/components/StudentDetailModal.jsx`
- `frontend/src/components/MissionPreviewModal.jsx`

---

#### 7. Dashboard - Eliminar "Accesos Rápidos"
**Problema:**
- Sección "Accesos Rápidos" con botones innecesarios

**Solución:**
- Comentar o eliminar toda la sección

**Archivos:**
- `frontend/src/pages/Dashboard.jsx`

---

#### 8. Mission Cards - Abrir Modal al Clickear
**Problema:**
- Mission cards en Dashboard no hacen nada

**Solución:**
- Al clickear → abrir MissionPreviewModal con datos de la misión

**Archivos:**
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/components/MissionCard.jsx`

---

### **Prioridad Baja - Sprint 10 (COMPLEJO)**

#### 9. Rediseño Completo de Misiones ⏳
**Esta es una tarea GRANDE que requiere un sprint completo**

**Componentes a Rediseñar:**

##### A. MissionPreviewModal (Vista Previa)
**Cambios:**
- ❌ Quitar: "Resumen"
- ✅ Agregar: "Historia" (contexto narrativo largo)
- ❌ Quitar: "Selecciona tu rol" (interactivo)
- ✅ Agregar: "Roles Disponibles" (lista read-only con expandibles)
- ❌ Quitar: Fechas de inicio/límite
- ✅ Agregar: Fecha de comienzo y finalización
- ✅ Agregar: Ícono lápiz translúcido en esquina de imagen → abre modo edición

##### B. MissionFormModal → MissionEditModal (Nueva)
**Cambios:**
- Reemplazar formulario actual por vista similar a preview
- Todos los campos editables inline
- Mismo componente para CREATE y EDIT
- Estilo tipo "Editar Canal de YouTube"
- Campos:
  - Imagen (URL editable + preview)
  - Título
  - Descripción breve
  - Historia (textarea grande)
  - Roles (lista editable con descripción de cada rol)
  - Fecha inicio
  - Fecha finalización
  - Estado (activa/cerrada)

##### C. Backend - Nuevos Campos en Mission
**Schema Prisma:**
```prisma
model Mission {
  // ... campos existentes
  history      String?    // Contexto narrativo largo
  startDate    DateTime?  // Fecha de inicio
  endDate      DateTime?  // Fecha de finalización
  imageUrl     String?    // URL de imagen
  // Roles ya existe como JSON en campo `roles`
}
```

**Endpoints a Actualizar:**
- `GET /api/missions/:id` - Incluir nuevos campos
- `PUT /api/missions/:id` - Actualizar con nuevos campos
- `POST /api/missions` - Crear con nuevos campos

##### D. Lógica de Roles
**Estructura actual (JSON):**
```json
{
  "roles": {
    "logic": { "title": "Rol Lógica", "description": "..." },
    "creativity": { "title": "Rol Creatividad", "description": "..." },
    "writing": { "title": "Rol Lengua", "description": "..." }
  }
}
```

**Mejora:**
- Cada rol expandible en preview
- Editable en edit mode
- Sin selección (solo información)

---

## 📊 ESTIMACIONES

| Iteración | Tareas | Tiempo Estimado | Complejidad |
|-----------|--------|-----------------|-------------|
| **Iteración 1** ✅ | 2 (Dashboard error + Avatar) | 30 min | Baja |
| **Iteración 2** | 2 (Navbar + NotificationFAB) | 45 min | Media |
| **Iteración 3** | 4 (Dashboard UI + Modales) | 60 min | Media |
| **Sprint 10** | 1 (Rediseño Misiones) | 3-4 horas | Alta |

---

## 🎯 PRÓXIMOS PASOS

### Ahora (Iteración 2):
1. Corregir Navbar (eliminar descripción, arreglar navegación)
2. Rediseñar NotificationFAB (un botón, panel mejorado)

### Después (Iteración 3):
3. Ajustar barras de habilidades en Dashboard
4. Modales con cierre por backdrop
5. Eliminar "Accesos Rápidos"
6. Mission cards clickeables

### Futuro (Sprint 10):
7. Rediseño completo de sistema de Misiones

---

## 📝 NOTAS IMPORTANTES

### Sobre el Rediseño de Misiones:
- Es un cambio arquitectónico grande
- Afecta backend (schema) y frontend (3+ componentes)
- Requiere migración de datos existentes
- Debe testearse extensivamente
- **Recomendación:** Hacerlo en un sprint separado con 4-6 horas dedicadas

### Sobre NotificationFAB:
- El diseño propuesto (un botón + panel) es buena UX
- Similar a WhatsApp Web / Telegram
- Botón de redacción contextual mejora la experiencia

### Sobre Modales:
- Cerrar con backdrop es estándar UX
- Eliminar X es válido si backdrop funciona
- Considerar agregar Escape key para cerrar

---

**📅 Última actualización:** 18 de Octubre 2025, 2:00 AM  
**Estado:** Iteración 1 completa, iniciando Iteración 2
