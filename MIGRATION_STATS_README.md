# 📊 Migración de Estadísticas de Estudiantes - LUMO

## 🎯 Objetivo

Reestructurar el sistema de estadísticas de estudiantes para garantizar datos consistentes y coherentes basados en decisiones reales de los alumnos en las misiones.

## 📋 Cambios Realizados

### 1. **Base de Datos (Schema)**
- ✅ Cambio de `statWriting` a `statLanguage`
- ✅ Agregados campos de conteo: `rolesLogicCount`, `rolesCreativityCount`, `rolesLanguageCount`
- ✅ Mejora en `StudentMissionProgress`: agregado `selectedRoleName` y `completedAt`
- ✅ Garantía de que cada alumno solo puede tener un rol por misión (constraint unique)

### 2. **Backend Services**
- ✅ Nuevo servicio `statsService.js` con funciones:
  - `recalculateStudentStats()` - Recalcula estadísticas por alumno
  - `getStudentProgress()` - Calcula progreso real (misiones completadas / total)
  - `calculateClassroomAverageStats()` - Promedio de clase
  - `registerRoleSelection()` - Registra elección de rol
  - `completeMission()` - Marca misión como completada

### 3. **Controllers Actualizados**
- ✅ `dataController.js` - Ahora recalcula stats al obtener estudiante
- ✅ `dashboardController.js` - Usa `statLanguage` y calcula promedios dinámicamente

### 4. **Frontend**
- ✅ `StudentDetailModal.jsx` - Cambio de "Escritura" a "Lengua"
- ✅ `Dashboard.jsx` - Actualizado para mostrar `avgLanguage`

### 5. **Seeds Actualizados**
- ✅ `students.seed.js` - Datos coherentes con porcentajes calculados correctamente

## 🚀 Instrucciones de Aplicación

### Paso 1: Detener el Backend
```powershell
# Buscar y detener procesos de Node.js
Get-Process node | Stop-Process -Force
```

### Paso 2: Aplicar la Migración de Base de Datos
```powershell
cd backend

# La migración SQL ya está aplicada, ahora regenerar el cliente de Prisma
npx prisma generate
```

### Paso 3: Recalcular Estadísticas Existentes
```powershell
# Ejecutar el script de recalculación
node scripts/recalculate-student-stats.js
```

Este script:
- ✅ Recalcula las estadísticas de todos los estudiantes basándose en sus misiones completadas
- ✅ Actualiza los contadores de roles
- ✅ Calcula los porcentajes correctos
- ✅ Muestra un resumen de los promedios de clase

### Paso 4: (Opcional) Resetear y Volver a Sembrar
Si prefieres empezar con datos frescos:

```powershell
# Eliminar y recrear la base de datos
npx prisma migrate reset --force

# Sembrar datos base
node seeds/run-all-seeds.js
```

### Paso 5: Reiniciar el Backend
```powershell
npm run dev
```

### Paso 6: Verificar el Frontend
El frontend ya está actualizado. Solo asegúrate de que esté corriendo:
```powershell
cd ..\frontend
npm run dev
```

## 📊 Cálculo de Estadísticas

### Fórmula de Porcentajes
```javascript
statLogic = (rolesLogicCount / missionsCompleted) * 100
statCreativity = (rolesCreativityCount / missionsCompleted) * 100
statLanguage = (rolesLanguageCount / missionsCompleted) * 100
```

### Ejemplo
Si un alumno completó 10 misiones:
- 5 veces eligió Lógica → `statLogic = 50%`
- 3 veces eligió Creatividad → `statCreativity = 30%`
- 2 veces eligió Lengua → `statLanguage = 20%`

### Promedio de Clase
```javascript
avgLogic = (suma de statLogic de todos los alumnos) / total de alumnos
avgCreativity = (suma de statCreativity de todos los alumnos) / total de alumnos
avgLanguage = (suma de statLanguage de todos los alumnos) / total de alumnos
```

## 🔄 Flujo de Actualización Automática

Cuando un alumno completa una misión:

1. Se llama a `completeMission(studentId, missionId)`
2. Se actualiza el `StudentMissionProgress` con `status: 'completed'` y `completedAt`
3. Se ejecuta `recalculateStudentStats(studentId)` automáticamente
4. Se recuentan todos los roles elegidos
5. Se recalculan los porcentajes
6. Se actualiza el registro del estudiante

## ✅ Verificaciones

Después de aplicar los cambios, verifica:

1. **Dashboard del Profesor**
   - Los promedios de habilidades (Lógica, Creatividad, Lengua) deben sumar aproximadamente 100% por alumno
   - El promedio de clase debe reflejar las decisiones de todos los alumnos

2. **Perfil de Alumno**
   - La gráfica muestra 3 barras: Lógica, Creatividad, Lengua
   - Los porcentajes suman 100%
   - Los valores coinciden con las misiones completadas

3. **Lista de Alumnos**
   - El progreso muestra "X de Y misiones" de manera correcta
   - No hay inconsistencias como "12 de 6"

## 🐛 Troubleshooting

### Error: "EPERM: operation not permitted"
**Solución:** Detén todos los procesos de Node.js y vuelve a ejecutar `npx prisma generate`

### Los porcentajes no suman 100%
**Solución:** Ejecuta `node scripts/recalculate-student-stats.js` nuevamente

### "Cannot find module '@prisma/client'"
**Solución:** 
```powershell
cd backend
npm install
npx prisma generate
```

## 📁 Archivos Modificados

### Backend
- `prisma/schema.prisma`
- `prisma/migrations/20251020155128_refactor_stats_and_roles/migration.sql`
- `services/statsService.js` (nuevo)
- `controllers/dataController.js`
- `controllers/dashboardController.js`
- `seeds/students.seed.js`
- `scripts/recalculate-student-stats.js` (nuevo)

### Frontend
- `components/StudentDetailModal.jsx`
- `pages/Dashboard.jsx`

## 🎉 Resultado Final

- ✅ Estadísticas basadas en datos reales
- ✅ Cálculos automáticos y consistentes
- ✅ Progreso de misiones preciso
- ✅ Promedios de clase correctos
- ✅ Sin datos hardcodeados
- ✅ Interfaz actualizada con "Lengua" en lugar de "Escritura"
