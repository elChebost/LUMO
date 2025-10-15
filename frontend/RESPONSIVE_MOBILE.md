# Diseño Responsive Móvil - LUMO

## 📱 Descripción

Se ha implementado un diseño responsive completo que transforma la aplicación LUMO en una experiencia móvil tipo app nativa cuando se detecta un dispositivo móvil (ancho de pantalla ≤ 768px).

## ✨ Características Principales

### 1. **Navegación Inferior (Bottom Navigation)**
- Barra de navegación fija en la parte inferior de la pantalla
- 4 secciones principales con iconos:
  - 🏠 **Inicio** (Dashboard)
  - 👥 **Alumnos**
  - 📋 **Misiones**
  - ⚙️ **Configuración**
- Iconos sin texto para maximizar el espacio
- Indicador visual del tab activo
- Animación suave al aparecer

### 2. **Detección Automática de Dispositivo**
- Detección automática del ancho de pantalla
- Cambio dinámico entre layout desktop y móvil
- Actualización en tiempo real al redimensionar la ventana

### 3. **Adaptaciones Móviles**

#### **MainLayout**
- Eliminación del Sidebar en móvil
- Eliminación del Navbar superior en móvil
- Implementación de Bottom Navigation
- Ajuste del FAB de notificaciones para no chocar con la barra inferior

#### **Todas las Páginas**
- Headers compactos con títulos más pequeños
- Subtítulos ocultos en móvil para ahorrar espacio
- Grid de 1 columna para todas las cards
- Espaciado reducido (1rem → 0.75rem)
- Fuentes ligeramente más pequeñas para mejor legibilidad

#### **Dashboard**
- Stats cards apiladas verticalmente
- Accesos rápidos en columna única
- Misiones activas en lista vertical
- Solo 1 skeleton loader en estado de carga

#### **Students**
- Barra de búsqueda a ancho completo
- Filtros en 2 columnas side-by-side
- Botón "Agregar Alumno" a ancho completo
- StudentRow transformado en cards compactas con:
  - Avatar, nombre y nivel en línea superior
  - XP y misiones en línea inferior
  - Email truncado si es necesario
- Header de tabla oculto (no necesario en vista móvil)

#### **Missions**
- Grid de 1 columna para todas las mission cards
- Buscador y filtros apilados verticalmente
- Botón "Crear Misión" a ancho completo

#### **Settings**
- Perfil del usuario con avatar más pequeño
- Cards de configuración apiladas
- Botón de cerrar sesión a ancho completo

#### **NotificationFAB**
- Posicionado arriba de la bottom navigation
- Panel adaptado al ancho de la pantalla (con márgenes)
- Fuentes más pequeñas
- Altura máxima ajustada (60vh)

## 🎨 Estilos CSS Implementados

### Variables CSS Móviles
```css
--bottom-nav-height: 70px;
```

### Clases Específicas para Móvil
- `.mobile-layout` - Layout principal para móvil
- `.mobile-main` - Contenedor principal con padding ajustado
- `.bottom-navigation` - Barra de navegación inferior
- `.bottom-nav-item` - Ítem individual de navegación
- `.bottom-nav-label` - Etiqueta de texto del ítem
- `.mobile-page-header` - Header de página optimizado
- `.mobile-stats-grid` - Grid de estadísticas en columna
- `.mobile-actions` - Contenedor de acciones apiladas
- `.mobile-search` - Buscador a ancho completo
- `.mobile-table-responsive` - Contenedor de tabla con scroll horizontal

## 📐 Breakpoints

- **Móvil**: ≤ 768px
- **Tablet**: 769px - 1024px
- **Desktop**: > 1024px

## 🔄 Comportamiento Responsive

### Al cambiar de Desktop a Móvil:
1. Sidebar desaparece
2. Navbar superior desaparece
3. Aparece Bottom Navigation con animación
4. FAB se reposiciona arriba de la Bottom Nav
5. Todos los grids se transforman a 1 columna
6. Headers se compactan
7. Elementos se apilan verticalmente

### Al cambiar de Móvil a Desktop:
1. Bottom Navigation desaparece
2. Sidebar aparece a la izquierda
3. Navbar superior aparece arriba
4. FAB vuelve a su posición original
5. Grids vuelven a múltiples columnas
6. Layout centrado con max-width

## 🚀 Componentes Creados/Modificados

### Nuevos Componentes
- `BottomNavigation.jsx` - Barra de navegación inferior

### Componentes Modificados
- `MainLayout.jsx` - Lógica de detección y cambio de layout
- `Dashboard.jsx` - Adaptaciones móviles
- `Students.jsx` - Adaptaciones móviles
- `Missions.jsx` - Adaptaciones móviles
- `Settings.jsx` - Contenido mejorado y responsive
- `StudentRow.jsx` - Vista móvil tipo card
- `NotificationFAB.jsx` - Posicionamiento responsive
- `index.css` - Media queries y estilos móviles

## 🎯 Mejores Prácticas Implementadas

1. **Touch-friendly**: Todos los elementos táctiles tienen tamaño mínimo de 44px
2. **Font-size**: Mínimo 16px en inputs para evitar zoom automático en iOS
3. **Smooth scrolling**: `-webkit-overflow-scrolling: touch`
4. **Viewport optimizado**: Meta tags apropiados
5. **Animaciones suaves**: Transiciones CSS para mejor UX
6. **Accesibilidad**: Labels descriptivos, contraste adecuado
7. **Performance**: Detección de resize con debounce implícito

## 📱 Pruebas Recomendadas

Para probar el diseño móvil:

1. **Chrome DevTools**
   - F12 → Toggle device toolbar (Ctrl+Shift+M)
   - Seleccionar un dispositivo móvil (iPhone, Pixel, etc.)
   - Recargar la página

2. **Responsive Design Mode** (Firefox)
   - F12 → Responsive Design Mode (Ctrl+Shift+M)
   - Ajustar al tamaño deseado

3. **Dispositivo Real**
   - Acceder desde tu smartphone
   - Verificar que el servidor está accesible en la red local

## 🔧 Personalización

Para ajustar el breakpoint móvil, editar en `index.css`:

```css
@media (max-width: 768px) {
  /* Cambiar 768px al valor deseado */
}
```

Para modificar la altura de la bottom navigation:

```css
:root {
  --bottom-nav-height: 70px; /* Ajustar altura */
}
```

## 🐛 Notas Importantes

- La configuración ahora muestra información real del perfil en móvil
- El perfil del usuario en el Navbar desktop abre Settings directamente en móvil
- Los modales y formularios se adaptan automáticamente al ancho móvil
- El FAB de notificaciones está siempre accesible sin interferir con la navegación

## ✅ Estado

**Implementación Completa** ✨

Todas las páginas principales están optimizadas para móvil con una experiencia fluida tipo app nativa.
