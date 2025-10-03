/*
🧠 Prompt para GitHub Copilot

💡 Consejo: Pegá esto en el tope de tu archivo principal (App.jsx o en un archivo README/plan.md`) antes de empezar a escribir el código, así Copilot usará el contexto completo.

# Prompt de diseño base — POV DOCENTE (Proyecto LUMO)

## Contexto general
Estamos construyendo la interfaz del **punto de vista del docente** (POV Docente) dentro del sistema educativo gamificado **LUMO**.

El objetivo es crear una **base visual organizada y navegable**, priorizando:
- Estructura jerárquica de las pantallas
- Ubicación coherente de los botones y componentes
- Fluidez en la navegación entre vistas
- Claridad visual y semántica de cada sección

No es necesario implementar toda la lógica de negocio; solo construir una **arquitectura de interfaz limpia, escalable y coherente con el diseño del wireframe**.

El proyecto usa:
- **Vite + React (JSX)**
- **Prisma** como ORM
- **Prisma Studio** integrado en el frontend para visualizar/modificar datos
- **React Router** para navegación
- **TailwindCSS** para estilos rápidos
- **Componentes reutilizables** (Cards, Panels, Sidebars, Navbars, Modals)

---

## Objetivo general
Desarrollar la **interfaz base del POV Docente** con rutas, layouts y componentes principales que correspondan a las pantallas del wireframe.

El enfoque debe ser **visual, modular y navegable**, priorizando la **disposición correcta de los elementos**.

---

## Estructura principal esperada

Crea una estructura de carpetas similar a esta:

src/
├─ components/
│ ├─ Sidebar.jsx
│ ├─ Navbar.jsx
│ ├─ NotificationPanel.jsx
│ ├─ StudentCard.jsx
│ ├─ MissionCard.jsx
│ ├─ TreePreview.jsx
│ └─ StatCard.jsx
│
├─ pages/
│ ├─ Dashboard.jsx
│ ├─ Students.jsx
│ ├─ Missions.jsx
│ ├─ Notifications.jsx
│ ├─ Performance.jsx
│ ├─ Customization.jsx
│ └─ Settings.jsx
│
├─ layout/
│ └─ MainLayout.jsx
│
├─ prisma/
│ ├─ schema.prisma
│ ├─ seed.js
│ └─ client.js
│
├─ routes/
│ └─ AppRouter.jsx
│
├─ App.jsx
└─ main.jsx

---

## Pantallas y contenido esperado

### 1. **Dashboard principal del docente**
- Muestra resumen general del progreso del curso.
- Contiene accesos rápidos a:
  - Lista de alumnos
  - Misiones activas
  - Notificaciones recientes
  - Métricas globales (XP promedio, entrega de tareas)
- Incluye un **Sidebar** con iconos: "Inicio", "Alumnos", "Misiones", "Notificaciones", "Configuración".
- Barra superior (Navbar) con perfil, buscador y botón de logout.

### 2. **Pantalla de Alumnos**
- Lista todos los alumnos.
- Cada alumno tiene una **StudentCard** con:
  - Nombre, avatar, progreso y nivel.
  - Acceso a detalle individual (popup o ruta /students/:id).
- Opción de buscar o filtrar por curso / desempeño.
- Al seleccionar un alumno:
  - Se abre vista detallada con árbol (tronco y frutos) + métricas de desempeño.

### 3. **Pantalla de Misiones**
- Lista de misiones actuales y pasadas.
- Cada misión tiene:
  - Título, descripción, fecha límite, estado (Activa / Cerrada).
  - Botón para editar o crear nueva misión.
- Al entrar a una misión:
  - Vista con lista de entregas por alumno.
  - Acceso rápido a corrección (con barra lateral de puntuación).

### 4. **Pantalla de Rendimiento / Árbol de progreso**
- Muestra **tronco general** con métricas por disciplina.
- Incluye gráficos o barras de progreso globales.
- Posibilidad de filtrar por curso, materia o nivel.

### 5. **Notificaciones**
- Panel lateral o ventana modal que muestra eventos recientes:
  - Nuevas entregas
  - Mensajes de alumnos
  - Logros desbloqueados por los estudiantes
- Botón de limpiar o marcar como leídas.

### 6. **Customización**
- Interfaz para ajustar visualmente la mascota o el entorno del aula (si corresponde).
- Permite gestionar recompensas visuales para el curso o para estudiantes destacados.

### 7. **Configuración**
- Preferencias del docente:
  - Modo oscuro
  - Parámetros de XP / Recompensas
  - Sincronización con Prisma Studio (CRUD visual)

---

## Consideraciones técnicas

- Usa **React Router DOM** para navegación.
- Implementa **MainLayout** como contenedor general con `Sidebar` fijo y `Navbar` superior.
- Usa **TailwindCSS** para grid responsive.
- Implementa cada pantalla como componente independiente.
- Integra **Prisma Client** en el frontend para obtener datos simulados o dummy (por ejemplo, lista de alumnos, misiones, progreso).
- Integra **Prisma Studio** en una ruta dedicada o dentro de Configuración para permitir exploración visual del esquema.

---

## Prioridades visuales
1. Estructura clara de navegación (sidebar, navbar).
2. Distribución correcta de botones, accesos y vistas.
3. Componentes reutilizables.
4. Jerarquía visual coherente.
5. Diseño modular y legible (centrado en UX docente).

---

## Qué debe evitar Copilot
- No implementar lógicas de backend.
- No cargar datos reales todavía (usar mocks).
- No centrarse en animaciones ni estilos finales.
- No incluir autenticación avanzada aún (solo placeholders).

---

## Resultado esperado
Una base funcional en React donde el docente pueda:
- Navegar entre Dashboard, Alumnos, Misiones, Rendimiento y Configuración.
- Ver estructuras y placeholders coherentes con el wireframe.
- Contar con componentes reutilizables y layout consistente.
- Extender la lógica más adelante sin romper la arquitectura visual.
*/

import React from 'react';
import AppRouter from './routes/AppRouter';

function App() {
  return <AppRouter />;
}

export default App;
