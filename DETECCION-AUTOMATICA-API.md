# 🎯 Detección Automática de URL de API

## 📝 Problema Resuelto

**Antes**: El frontend necesitaba configuración manual en `frontend/.env` para cambiar entre desarrollo y producción:
```env
# Desarrollo
VITE_API_URL=http://localhost:3000

# Producción
VITE_API_URL=http://lumo.anima.edu.uy/api
```

**Ahora**: El frontend **detecta automáticamente** el entorno y usa la URL correcta.

## ✨ Cómo Funciona

### Archivo: `frontend/src/config/api.js`

```javascript
// Detectar automáticamente el entorno
const isProduction = import.meta.env.PROD;
const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';

// Determinar la URL de la API
let apiUrl;

if (import.meta.env.VITE_API_URL) {
  // Si hay una variable de entorno explícita, usarla
  apiUrl = import.meta.env.VITE_API_URL;
} else if (isProduction && !isLocalhost) {
  // En producción (build) y NO en localhost, usar la ruta relativa /api
  apiUrl = `${window.location.origin}/api`;
} else {
  // En desarrollo o localhost, usar el backend local
  apiUrl = 'http://localhost:3000';
}

export const API_URL = apiUrl;
```

## 🔍 Lógica de Detección

### Escenario 1: Desarrollo Local
```
Condiciones:
- npm run dev
- window.location.hostname = 'localhost'

Resultado:
→ API_URL = 'http://localhost:3000'
```

### Escenario 2: Producción en Rocky Linux
```
Condiciones:
- npm run build (isProduction = true)
- window.location.hostname = 'lumo.anima.edu.uy'
- window.location.origin = 'http://lumo.anima.edu.uy'

Resultado:
→ API_URL = 'http://lumo.anima.edu.uy/api'
```

### Escenario 3: Producción con HTTPS
```
Condiciones:
- npm run build (isProduction = true)
- window.location.hostname = 'lumo.anima.edu.uy'
- window.location.origin = 'https://lumo.anima.edu.uy'

Resultado:
→ API_URL = 'https://lumo.anima.edu.uy/api'
```

### Escenario 4: Forzar URL Específica (Override)
```
Condiciones:
- VITE_API_URL definido en .env
- Cualquier entorno

Resultado:
→ API_URL = valor de VITE_API_URL
```

## 🎯 Ventajas

### ✅ **Sin Configuración Manual**
Ya no necesitas editar `.env` al hacer deploy a producción.

### ✅ **Detección Automática de HTTPS**
Si instalas SSL con Certbot, el frontend automáticamente usará HTTPS.

### ✅ **Funciona en Cualquier Dominio**
Si cambias el dominio, no necesitas modificar código:
- `http://lumo.anima.edu.uy` → Usa `/api` en ese dominio
- `https://lumo.anima.edu.uy` → Usa `/api` en ese dominio
- `http://otro-dominio.com` → Usa `/api` en ese dominio

### ✅ **Override Disponible**
Si necesitas forzar una URL específica, puedes usar `VITE_API_URL`.

## 🚀 Proceso de Deployment Simplificado

### Antes (3 pasos)
```bash
cd /opt/proyecto/LUMO

# 1. Copiar .env
cp frontend/.env.example frontend/.env

# 2. Editar .env manualmente
nano frontend/.env
# Cambiar VITE_API_URL=http://lumo.anima.edu.uy/api

# 3. Build
cd frontend
npm run build
```

### Ahora (1 paso)
```bash
cd /opt/proyecto/LUMO/frontend

# Solo build - ¡Detección automática!
npm run build
```

## 🐛 Debugging

El frontend imprime la configuración en la consola del navegador (solo en desarrollo):

```javascript
🔧 API Configuration: {
  mode: 'production',
  isProduction: true,
  isLocalhost: false,
  hostname: 'lumo.anima.edu.uy',
  origin: 'http://lumo.anima.edu.uy',
  apiUrl: 'http://lumo.anima.edu.uy/api'
}
```

Para ver esto en producción temporalmente, abre la consola del navegador y ejecuta:

```javascript
console.log('API URL:', window.__API_URL__);
```

## 📝 Casos de Uso

### ✅ Desarrollo Local
```bash
cd frontend
npm run dev
# → Usa http://localhost:3000 automáticamente
```

### ✅ Build para Producción
```bash
cd frontend
npm run build
# → El build está listo para cualquier dominio
# → Detectará el dominio en runtime
```

### ✅ Preview Local del Build
```bash
cd frontend
npm run build
npm run preview
# → Como estás en localhost, sigue usando localhost:3000
```

### ✅ Testing en Staging
```bash
# Deploy en http://staging.lumo.anima.edu.uy
npm run build
# → Automáticamente usará http://staging.lumo.anima.edu.uy/api
```

## 🔒 Actualizar a HTTPS

Cuando instales SSL:

```bash
# 1. Instalar certificado SSL
sudo certbot --nginx -d lumo.anima.edu.uy

# 2. Reconstruir frontend (opcional, pero recomendado)
cd /opt/proyecto/LUMO/frontend
npm run build

# 3. Recargar Nginx
sudo systemctl reload nginx
```

**¡Listo!** El frontend automáticamente detectará que ahora se accede por HTTPS y usará `https://lumo.anima.edu.uy/api`.

## 📊 Comparación

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Configuración Manual** | ✅ Requerida | ❌ No necesaria |
| **Editar .env en Deploy** | ✅ Sí | ❌ No |
| **Cambio HTTP → HTTPS** | ✅ Editar .env + rebuild | ❌ Solo rebuild (opcional) |
| **Funciona en Múltiples Dominios** | ❌ No | ✅ Sí |
| **Detección Automática** | ❌ No | ✅ Sí |
| **Override Manual** | ❌ No | ✅ Sí (VITE_API_URL) |

## 🎉 Resumen

**El frontend de LUMO ahora es completamente portátil y no requiere configuración manual al hacer deploy.**

Solo ejecuta:
```bash
npm run build
```

Y funcionará en **cualquier dominio** con **HTTP o HTTPS** automáticamente. 🚀
