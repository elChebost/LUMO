# 🎯 CAMBIO CRÍTICO: Detección Automática de Entorno

## ⚠️ Problema Resuelto

**ANTES**: El frontend intentaba conectarse a `localhost:3000` incluso en producción porque se requería configuración manual.

**AHORA**: El frontend detecta automáticamente si está en desarrollo o producción y usa la URL correcta.

---

## 📝 Archivos Modificados

### 1. **`frontend/src/config/api.js`** ⭐ CAMBIO PRINCIPAL

#### ANTES:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

#### AHORA:
```javascript
const isProduction = import.meta.env.PROD;
const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';

let apiUrl;

if (import.meta.env.VITE_API_URL) {
  apiUrl = import.meta.env.VITE_API_URL;
} else if (isProduction && !isLocalhost) {
  // En producción, usar el dominio actual + /api
  apiUrl = `${window.location.origin}/api`;
} else {
  apiUrl = 'http://localhost:3000';
}

export const API_URL = apiUrl;
```

### 2. **`frontend/.env`**
- ✅ Ya NO requiere `VITE_API_URL` en producción
- ✅ Comentarios actualizados explicando la detección automática

### 3. **`frontend/.env.example`**
- ✅ Documentación clara de la nueva funcionalidad
- ✅ Explicación de que la configuración manual es opcional

### 4. **`DEPLOYMENT-ROCKY-LINUX.md`**
- ✅ Sección 3.2 actualizada (ya NO requiere editar `.env`)
- ✅ Sección 9.2 actualizada (SSL automático)

### 5. **`README.md`**
- ✅ Nueva característica documentada
- ✅ Link al documento `DETECCION-AUTOMATICA-API.md`

### 6. **`DETECCION-AUTOMATICA-API.md`** 🆕
- ✅ Documento completo explicando la funcionalidad
- ✅ Ejemplos de todos los escenarios
- ✅ Comparación antes/después

---

## 🎯 Cómo Funciona

### Escenario 1: Desarrollo Local (Windows/Mac/Linux)
```bash
cd frontend
npm run dev
```
**Resultado**: `API_URL = 'http://localhost:3000'`

### Escenario 2: Producción HTTP
```bash
# Dominio: http://lumo.anima.edu.uy
cd frontend
npm run build
```
**Resultado**: `API_URL = 'http://lumo.anima.edu.uy/api'`

### Escenario 3: Producción HTTPS
```bash
# Dominio: https://lumo.anima.edu.uy
cd frontend
npm run build
```
**Resultado**: `API_URL = 'https://lumo.anima.edu.uy/api'`

### Escenario 4: Override Manual (si es necesario)
```bash
# En frontend/.env
VITE_API_URL=http://custom-api.com/api

npm run build
```
**Resultado**: `API_URL = 'http://custom-api.com/api'`

---

## ✅ Ventajas

| Antes | Ahora |
|-------|-------|
| ❌ Editar `.env` manualmente en cada deploy | ✅ Cero configuración |
| ❌ Olvidar cambiar la URL → Error en producción | ✅ Detección automática |
| ❌ Cambiar HTTP → HTTPS requiere rebuild + config | ✅ Solo rebuild (o ni eso) |
| ❌ No funciona en múltiples dominios | ✅ Funciona en cualquier dominio |

---

## 🚀 Deployment Simplificado

### ANTES (3 pasos):
```bash
cd /opt/proyecto/LUMO
cp frontend/.env.example frontend/.env
nano frontend/.env  # Editar VITE_API_URL manualmente
cd frontend && npm run build
```

### AHORA (1 paso):
```bash
cd /opt/proyecto/LUMO/frontend
npm run build  # ¡Listo!
```

---

## 🔍 Debugging

En desarrollo, el frontend imprime la configuración en la consola:

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

---

## 📋 Checklist para Rocky Linux

### Desarrollo Local (Windows)
- [x] Código actualizado
- [x] `frontend/src/config/api.js` con detección automática
- [x] `frontend/.env` con comentarios actualizados
- [x] Documentación completa

### Deploy a Producción
- [ ] Subir código al servidor: `git pull origin main`
- [ ] Instalar dependencias: `npm install`
- [ ] Build del frontend: `npm run build`
- [ ] Verificar: Abrir `http://lumo.anima.edu.uy` en navegador
- [ ] Verificar consola del navegador: Debe conectar a `/api`

### Instalar SSL (Opcional pero Recomendado)
- [ ] `sudo certbot --nginx -d lumo.anima.edu.uy`
- [ ] Rebuild del frontend: `npm run build` (opcional)
- [ ] Verificar: Abrir `https://lumo.anima.edu.uy` en navegador
- [ ] Verificar consola: Debe usar HTTPS automáticamente

---

## 🎉 Resultado Final

**El frontend de LUMO ahora es completamente portátil:**

- ✅ **Cero configuración** en producción
- ✅ **Detección automática** de HTTP/HTTPS
- ✅ **Funciona en cualquier dominio**
- ✅ **Desarrollo local sin cambios**
- ✅ **Override manual disponible** si se necesita

---

## 📚 Documentación Relacionada

- [DETECCION-AUTOMATICA-API.md](DETECCION-AUTOMATICA-API.md) - Explicación técnica completa
- [DEPLOYMENT-ROCKY-LINUX.md](DEPLOYMENT-ROCKY-LINUX.md) - Guía de deployment
- [CORS-TROUBLESHOOTING.md](CORS-TROUBLESHOOTING.md) - Solución de problemas

---

## 🔄 Migración desde Versión Anterior

Si ya tienes LUMO desplegado con la versión anterior:

```bash
# 1. Actualizar código
cd /opt/proyecto/LUMO
git pull origin main

# 2. Reinstalar dependencias (por si acaso)
cd frontend
npm install

# 3. Rebuild
npm run build

# 4. Recargar Nginx
sudo systemctl reload nginx

# 5. Limpiar caché del navegador y verificar
# Ctrl + Shift + R en Chrome/Firefox
```

**¡Ya NO necesitas modificar `frontend/.env` en producción!**

---

**Fecha**: 21 de octubre de 2025  
**Versión**: 1.0.0 con detección automática de API URL
