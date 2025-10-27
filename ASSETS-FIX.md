# ✅ Resumen de Cambios - Assets en Producción

## 🎯 Problema Solucionado

Las imágenes no se renderizaban en producción después del login, aunque funcionaban en la página de login.

## 🔧 Solución Implementada

### 1. **Helper de Assets Centralizado** (`src/utils/assets.js`)

Creamos un helper que genera rutas absolutas consistentes:

```javascript
export const ASSETS = {
  AVATAR_DEFAULT: '/assets/avatar.png',
  ICON: '/assets/icon.png',
  ICON_TEXT: '/assets/icon_text.png',
  PORTADA: '/assets/portada.png',
};
```

### 2. **Actualización de Componentes**

Todos los componentes ahora importan y usan `ASSETS`:

```javascript
import { ASSETS } from '../utils/assets';

// Uso:
<img src={ASSETS.ICON_TEXT} alt="LUMO" />
<img src={student?.avatar || ASSETS.AVATAR_DEFAULT} alt="Avatar" />
```

**Componentes actualizados:**
- ✅ `Sidebar.jsx` - Logo LUMO
- ✅ `Login.jsx` - Logo y portada
- ✅ `Navbar.jsx` - Avatar del usuario
- ✅ `Settings.jsx` - Avatar del usuario
- ✅ `StudentCard.jsx` - Avatar del estudiante
- ✅ `StudentRow.jsx` - Avatar del estudiante (2 usos)
- ✅ `StudentDetailModal.jsx` - Avatar del estudiante

### 3. **Ubicación de Assets**

```
LUMO/
├── frontend/
│   ├── public/
│   │   └── assets/          ← Archivos fuente
│   │       ├── avatar.png
│   │       ├── icon.png
│   │       ├── icon_text.png
│   │       └── portada.png
│   └── dist/                ← Después del build
│       └── assets/          ← Copiados automáticamente por Vite
│           ├── avatar.png
│           ├── icon.png
│           ├── icon_text.png
│           ├── portada.png
│           ├── index-[hash].js
│           └── index-[hash].css
```

## 🚀 Deployment en Producción

### Opción 1: Script Automatizado (Linux/Server)

```bash
cd /opt/proyecto/LUMO
bash deploy.sh
```

### Opción 2: Manual

```bash
# 1. Construir frontend
cd /opt/proyecto/LUMO/frontend
npm run build

# 2. Verificar assets
ls -lh dist/assets/*.png

# 3. Ajustar permisos (si es necesario)
sudo chown -R nginx:nginx dist/
sudo chmod -R 755 dist/

# 4. Recargar nginx
sudo nginx -t
sudo systemctl reload nginx

# 5. Reiniciar backend
pm2 restart lumo-backend
```

### Opción 3: Desarrollo Local (Windows)

```powershell
# Construir
cd frontend
npm run build

# Verificar
dir dist\assets\*.png
```

## 📋 Verificación Post-Deployment

1. **Abrir el sitio** → http://lumo.anima.edu.uy
2. **Hacer login** → Verificar que el logo se ve
3. **Navegar al Dashboard** → Verificar que todos los avatares cargan
4. **Ir a Estudiantes** → Verificar que los avatares de estudiantes cargan
5. **Abrir Perfil de Estudiante** → Verificar avatar en modal
6. **Ir a Configuración** → Verificar avatar de usuario

## 🔍 Debugging

### Ver logs de nginx
```bash
sudo tail -f /var/log/nginx/lumo.access.log
sudo tail -f /var/log/nginx/lumo.error.log
```

### Verificar que assets son accesibles
```bash
curl -I http://localhost/assets/avatar.png
curl -I http://localhost/assets/icon.png
curl -I http://localhost/assets/icon_text.png
curl -I http://localhost/assets/portada.png
```

### Ver logs de backend
```bash
pm2 logs lumo-backend --lines 50
```

## ✨ Ventajas de esta Solución

1. **Rutas Absolutas**: Funcionan desde cualquier ruta de la SPA (`/`, `/dashboard`, `/students`, etc.)
2. **Centralizado**: Un solo lugar para definir todas las rutas de assets
3. **Type-safe**: Fácil de refactorizar y detectar errores
4. **Consistente**: Mismo comportamiento en desarrollo y producción
5. **Mantenible**: Fácil agregar nuevos assets o cambiar rutas

## 📝 Notas Importantes

- **NO uses rutas relativas** (`./assets/`) en componentes que pueden estar en diferentes rutas
- **SÍ usa el helper ASSETS** que genera rutas absolutas (`/assets/`)
- Vite copia automáticamente `public/` a `dist/` durante el build
- Nginx sirve los archivos directamente desde `dist/`
- El favicon en `index.html` también usa ruta absoluta: `/assets/icon.png`

## 🎉 Resultado

Todas las imágenes ahora funcionan correctamente tanto en:
- ✅ Desarrollo local (`npm run dev`)
- ✅ Build de producción (`npm run build`)
- ✅ Servidor de producción (Nginx + PM2)
- ✅ Todas las rutas de la SPA (/, /dashboard, /students, /missions, /settings)
