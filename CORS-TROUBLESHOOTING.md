# 🔧 LUMO - Solución de Problemas CORS en Producción

## 🎯 Problema Original

```
Access to fetch at 'http://localhost:3000/api/auth/login' 
from origin 'http://lumo.anima.edu.uy' 
has been blocked by CORS policy
```

## ✅ Soluciones Implementadas

### 1. Backend - Configuración CORS Actualizada

**Archivo:** `backend/app.js`

Se actualizó el middleware CORS para permitir explícitamente el dominio de producción:

```javascript
const allowedOrigins = [
  'http://localhost:5173',           // Desarrollo local
  'http://localhost:4173',           // Preview local  
  'http://lumo.anima.edu.uy',        // Producción HTTP ✅
  'https://lumo.anima.edu.uy',       // Producción HTTPS ✅
  process.env.FRONTEND_URL,          // Configurado en .env
];
```

**Cambios clave:**
- ✅ Lista explícita de orígenes permitidos
- ✅ Incluye el dominio de producción
- ✅ Soporta HTTP y HTTPS
- ✅ Configurable mediante variable de entorno
- ✅ Logs detallados para debugging

### 2. Nginx - Configuración con Headers CORS

**Archivo:** `nginx-rocky-linux.conf`

Nginx ahora añade headers CORS adicionales para asegurar compatibilidad:

```nginx
location /api {
    proxy_pass http://127.0.0.1:3000;
    
    # Headers CORS (adicionales a los del backend)
    add_header 'Access-Control-Allow-Origin' '$http_origin' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-Requested-With' always;
    
    # Responder a preflight requests
    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```

### 3. Frontend - API URL Actualizada

**Archivo:** `frontend/.env`

La URL del API ahora apunta a través de Nginx:

```env
# ANTES (incorrecto)
VITE_API_URL=http://localhost:3000

# DESPUÉS (correcto)
VITE_API_URL=http://lumo.anima.edu.uy/api
```

**Importante:** Con Nginx como proxy, todas las peticiones al API deben ir a `/api` en el mismo dominio.

### 4. Backend - Escuchar en la Interfaz Correcta

**Archivo:** `backend/.env`

```env
# Para producción (detrás de Nginx)
HOST=127.0.0.1
PORT=3000

# Nginx hace el proxy de lumo.anima.edu.uy/api -> localhost:3000
```

## 🔍 Cómo Verificar que CORS Funciona

### Desde el Servidor

```bash
# 1. Verificar que el backend está corriendo
pm2 list
pm2 logs lumo-backend --lines 20

# 2. Test de health check local
curl http://localhost:3000/health

# 3. Test de health check público
curl http://lumo.anima.edu.uy/health

# 4. Test con Origin header
curl -H "Origin: http://lumo.anima.edu.uy" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:3000/api/auth/login \
     -v

# Debe retornar headers:
# Access-Control-Allow-Origin: http://lumo.anima.edu.uy
# Access-Control-Allow-Credentials: true
```

### Desde el Navegador

1. **Abrir DevTools (F12)**
   - Ve a la pestaña "Network" (Red)
   - Activa "Preserve log"

2. **Intentar Login**
   - Ingresa credenciales
   - Click en "Iniciar Sesión"

3. **Verificar Request**
   - Busca la petición a `/api/auth/login`
   - Click en ella
   - Ve a la pestaña "Headers"
   - Verifica que Response Headers incluyan:
     ```
     Access-Control-Allow-Origin: http://lumo.anima.edu.uy
     Access-Control-Allow-Credentials: true
     ```

4. **Verificar Console**
   - No debe haber errores de CORS
   - El login debe funcionar correctamente

## 🐛 Debugging CORS

### Ver Logs del Backend

```bash
# Logs en tiempo real
pm2 logs lumo-backend

# Últimas 100 líneas
pm2 logs lumo-backend --lines 100

# Buscar entradas de CORS
pm2 logs lumo-backend --lines 200 | grep CORS
```

**Salida esperada:**
```
[CORS] POST /api/auth/login | Origin: http://lumo.anima.edu.uy
[CORS] ✅ Allowing origin: http://lumo.anima.edu.uy
```

**Salida de error:**
```
[CORS] POST /api/auth/login | Origin: http://lumo.anima.edu.uy
[CORS] ⚠️  Unknown origin: http://lumo.anima.edu.uy
```

### Ver Logs de Nginx

```bash
# Errores de Nginx
sudo tail -f /var/log/nginx/lumo-error.log

# Accesos (con códigos de respuesta)
sudo tail -f /var/log/nginx/lumo-access.log | grep "/api"
```

### Verificar Configuración

```bash
# 1. Ver origins permitidos en el backend
grep -A 5 "allowedOrigins" /opt/proyecto/LUMO/backend/app.js

# 2. Verificar .env del backend
cat /opt/proyecto/LUMO/backend/.env | grep FRONTEND_URL

# 3. Verificar .env del frontend
cat /opt/proyecto/LUMO/frontend/.env

# 4. Verificar configuración de Nginx
sudo cat /etc/nginx/conf.d/lumo.conf | grep -A 10 "location /api"
```

## 🔧 Soluciones a Problemas Comunes

### Problema: CORS sigue bloqueando

**Síntoma:**
```
Access-Control-Allow-Origin header is missing
```

**Solución:**

```bash
# 1. Verificar que el backend tiene los origins correctos
cd /opt/proyecto/LUMO
grep "lumo.anima.edu.uy" backend/app.js

# 2. Reiniciar backend
pm2 restart lumo-backend

# 3. Verificar logs
pm2 logs lumo-backend --lines 20
```

### Problema: OPTIONS request falla

**Síntoma:**
```
Preflight request doesn't pass access control check
```

**Solución:**

```bash
# 1. Verificar configuración de Nginx
sudo nginx -t

# 2. Verificar que Nginx responde a OPTIONS
curl -X OPTIONS http://lumo.anima.edu.uy/api/auth/login -v

# Debe retornar 204 No Content

# 3. Recargar Nginx
sudo systemctl reload nginx
```

### Problema: Credentials no se envían

**Síntoma:**
```
Cannot use wildcard in Access-Control-Allow-Origin when credentials flag is true
```

**Solución:**

El backend ya NO usa wildcard (`*`), sino que refleja el origin específico:

```javascript
// ✅ CORRECTO (implementado)
res.setHeader('Access-Control-Allow-Origin', origin);
res.setHeader('Access-Control-Allow-Credentials', 'true');

// ❌ INCORRECTO (no usar)
res.setHeader('Access-Control-Allow-Origin', '*');
```

### Problema: Frontend usa URL incorrecta

**Síntoma:**
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Solución:**

```bash
# 1. Verificar frontend/.env
cat /opt/proyecto/LUMO/frontend/.env

# Debe ser:
# VITE_API_URL=http://lumo.anima.edu.uy/api

# 2. Si está incorrecto, actualizar:
echo "VITE_API_URL=http://lumo.anima.edu.uy/api" > /opt/proyecto/LUMO/frontend/.env

# 3. Reconstruir frontend
cd /opt/proyecto/LUMO/frontend
npm run build

# 4. Actualizar permisos SELinux
sudo chcon -R -t httpd_sys_content_t dist

# 5. Recargar Nginx
sudo systemctl reload nginx
```

## 🧪 Tests de CORS

### Test 1: Preflight Request

```bash
curl -X OPTIONS http://lumo.anima.edu.uy/api/auth/login \
  -H "Origin: http://lumo.anima.edu.uy" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization" \
  -v
```

**Respuesta esperada:**
```
< HTTP/1.1 204 No Content
< Access-Control-Allow-Origin: http://lumo.anima.edu.uy
< Access-Control-Allow-Credentials: true
< Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
< Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

### Test 2: Actual Request

```bash
curl -X POST http://lumo.anima.edu.uy/api/auth/login \
  -H "Origin: http://lumo.anima.edu.uy" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}' \
  -v
```

**Respuesta esperada:**
```
< HTTP/1.1 200 OK
< Access-Control-Allow-Origin: http://lumo.anima.edu.uy
< Access-Control-Allow-Credentials: true
< Content-Type: application/json
```

### Test 3: Health Check con Origin

```bash
curl http://lumo.anima.edu.uy/health \
  -H "Origin: http://lumo.anima.edu.uy" \
  -v
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "pid": 12345,
  "port": 3000,
  "host": "127.0.0.1",
  "environment": "production"
}
```

## 📋 Checklist Final de CORS

- [ ] Backend permite `http://lumo.anima.edu.uy` en allowedOrigins
- [ ] Backend escucha en `127.0.0.1:3000`
- [ ] Backend tiene `FRONTEND_URL` configurado en `.env`
- [ ] Nginx proxy_pass apunta a `http://127.0.0.1:3000`
- [ ] Nginx añade headers CORS en location `/api`
- [ ] Nginx responde a OPTIONS requests con 204
- [ ] Frontend `.env` tiene `VITE_API_URL=http://lumo.anima.edu.uy/api`
- [ ] Frontend está construido (`npm run build`)
- [ ] SELinux permite conexiones de Nginx (`httpd_can_network_connect`)
- [ ] Firewall permite HTTP/HTTPS
- [ ] PM2 muestra backend "online"
- [ ] Health check funciona: `curl http://lumo.anima.edu.uy/health`
- [ ] No hay errores de CORS en console del navegador

## 🎉 Verificación Final

Si todos los checks están ✅, ejecuta:

```bash
# Desde el servidor
curl -X POST http://lumo.anima.edu.uy/api/auth/login \
  -H "Origin: http://lumo.anima.edu.uy" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lumo.com","password":"Admin123!"}' \
  -v | grep -i "access-control"
```

Debe mostrar:
```
< Access-Control-Allow-Origin: http://lumo.anima.edu.uy
< Access-Control-Allow-Credentials: true
```

**¡CORS configurado correctamente!** ✅

---

Para más ayuda, consulta:
- `DEPLOYMENT-ROCKY-LINUX.md` - Guía completa
- `CHECKLIST-DEPLOYMENT.md` - Checklist paso a paso
- `pm2 logs lumo-backend` - Logs del backend
- `sudo tail -f /var/log/nginx/lumo-error.log` - Logs de Nginx
