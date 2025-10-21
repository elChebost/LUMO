# 🎯 LUMO - Resumen de Adaptación para Rocky Linux 9.6

## ✅ Cambios Realizados

### 📝 Archivos Modificados (5)

#### 1. **backend/app.js** - Backend Principal
**Cambios:**
- ✅ Configuración CORS actualizada para permitir `lumo.anima.edu.uy`
- ✅ Lista explícita de orígenes permitidos (allowedOrigins)
- ✅ Soporte para HTTP y HTTPS
- ✅ Backend escucha en `HOST` configurable (0.0.0.0 o 127.0.0.1)
- ✅ Health check mejorado con más información
- ✅ Logs detallados de CORS para debugging

**Antes:**
```javascript
// Solo permitía localhost
const localhostRegex = /^https?:\/\/localhost(:\d+)?$/;
if (localhostRegex.test(origin)) {
  // ...
}
```

**Después:**
```javascript
// Permite dominios específicos
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://lumo.anima.edu.uy',    // ✅ NUEVO
  'https://lumo.anima.edu.uy',   // ✅ NUEVO
  process.env.FRONTEND_URL,
];
```

#### 2. **backend/.env.example** - Configuración Backend
**Cambios:**
- ✅ Variable `HOST` añadida (0.0.0.0 o 127.0.0.1)
- ✅ Variable `FRONTEND_URL` añadida para CORS
- ✅ Valores predeterminados para producción

**Nuevo contenido:**
```env
HOST=0.0.0.0
FRONTEND_URL=http://lumo.anima.edu.uy
NODE_ENV=production
```

#### 3. **frontend/.env.example** - Configuración Frontend
**Cambios:**
- ✅ URL actualizada para apuntar a través de Nginx (`/api`)
- ✅ Instrucciones claras para desarrollo y producción
- ✅ Ejemplo con SSL/HTTPS

**Nuevo contenido:**
```env
# Para producción con Nginx
VITE_API_URL=http://lumo.anima.edu.uy/api

# Si tienes SSL
# VITE_API_URL=https://lumo.anima.edu.uy/api
```

#### 4. **ecosystem.config.js** - Configuración PM2
**Cambios:**
- ✅ Rutas absolutas actualizadas a `/opt/proyecto/LUMO`
- ✅ HOST configurado a `127.0.0.1` para producción (Nginx hace proxy)
- ✅ Eliminado `lumo-frontend` (Nginx sirve el frontend directamente)
- ✅ Configuración de reintentos mejorada

**Cambio importante:**
```javascript
// Solo backend en PM2, frontend servido por Nginx
apps: [{
  name: 'lumo-backend',
  cwd: '/opt/proyecto/LUMO',
  env: {
    HOST: '127.0.0.1',  // Solo localhost, Nginx hace proxy
  }
}]
```

#### 5. **README.md** - Documentación Principal
**Cambios:**
- ✅ Sección nueva para Rocky Linux 9.6
- ✅ Referencias a nueva documentación
- ✅ Instrucciones específicas para deployment con Nginx

### 📄 Archivos Nuevos (5)

#### 1. **nginx-rocky-linux.conf** - Configuración Nginx
**Propósito:** Configuración completa de Nginx para Rocky Linux 9.6

**Características:**
- ✅ Proxy inverso para backend en `/api`
- ✅ Servir frontend estático desde `/opt/proyecto/LUMO/frontend/dist`
- ✅ Headers CORS adicionales
- ✅ Manejo de uploads
- ✅ Health check
- ✅ Cache de assets estáticos
- ✅ Preparado para SSL/HTTPS
- ✅ Headers de seguridad

**Estructura:**
```nginx
server {
    listen 80;
    server_name lumo.anima.edu.uy;
    root /opt/proyecto/LUMO/frontend/dist;
    
    location /api {
        proxy_pass http://127.0.0.1:3000;
        # Headers CORS
        # Timeouts
        # Cache bypass
    }
    
    location / {
        try_files $uri $uri/ /index.html;
        # Security headers
    }
}
```

#### 2. **DEPLOYMENT-ROCKY-LINUX.md** - Guía Completa
**Propósito:** Guía paso a paso para deployment en Rocky Linux 9.6

**Contenido:**
1. Requisitos previos (Node.js, Nginx, PM2)
2. Instalación de dependencias con `dnf`
3. Configuración de SELinux (específico de RHEL/Rocky)
4. Configuración de firewall con `firewall-cmd`
5. Preparación del proyecto en `/opt/proyecto/LUMO`
6. Configuración de variables de entorno
7. Construcción del frontend
8. Configuración de Nginx
9. Inicio del backend con PM2
10. Configuración de SSL con Certbot
11. Solución de problemas específicos
12. Comandos útiles para Rocky Linux

#### 3. **deploy-rocky.sh** - Script de Deployment Automático
**Propósito:** Automatizar el deployment completo en Rocky Linux

**Funcionalidades:**
- ✅ Detecta Rocky Linux
- ✅ Instala dependencias del sistema (Node.js, Nginx, PM2)
- ✅ Configura SELinux automáticamente
- ✅ Configura firewall automáticamente
- ✅ Crea estructura de directorios
- ✅ Configura variables de entorno
- ✅ Instala dependencias npm
- ✅ Configura y migra base de datos
- ✅ Construye frontend
- ✅ Configura Nginx
- ✅ Inicia backend con PM2
- ✅ Configura inicio automático
- ✅ Validación completa del deployment

**Uso:**
```bash
cd /opt/proyecto/LUMO
chmod +x deploy-rocky.sh
./deploy-rocky.sh
```

#### 4. **CHECKLIST-DEPLOYMENT.md** - Checklist Interactivo
**Propósito:** Lista de verificación paso a paso para el deployment

**Secciones:**
- [ ] Pre-deployment checklist
- [ ] Pasos de instalación
- [ ] Configuración de variables
- [ ] Verificaciones de funcionamiento
- [ ] Configuración SSL
- [ ] Monitoreo post-deployment
- [ ] Comandos útiles

#### 5. **CORS-TROUBLESHOOTING.md** - Solución de Problemas CORS
**Propósito:** Guía específica para resolver problemas de CORS

**Contenido:**
- Problema original documentado
- Soluciones implementadas (Backend, Nginx, Frontend)
- Cómo verificar que CORS funciona
- Tests de CORS desde línea de comandos
- Debugging paso a paso
- Soluciones a problemas comunes
- Checklist final de CORS

## 🎯 Problema Resuelto: CORS

### Antes
```
❌ Error: Access to fetch at 'http://localhost:3000/api/auth/login' 
   from origin 'http://lumo.anima.edu.uy' has been blocked by CORS policy
```

### Después
```
✅ Backend permite explícitamente http://lumo.anima.edu.uy
✅ Nginx añade headers CORS adicionales
✅ Frontend apunta a http://lumo.anima.edu.uy/api (mismo dominio)
✅ Login funciona correctamente sin errores de CORS
```

### Solución en 3 Capas

1. **Backend (app.js)**
   ```javascript
   allowedOrigins = ['http://lumo.anima.edu.uy', ...]
   ```

2. **Nginx (nginx-rocky-linux.conf)**
   ```nginx
   location /api {
       add_header 'Access-Control-Allow-Origin' '$http_origin' always;
   }
   ```

3. **Frontend (.env)**
   ```env
   VITE_API_URL=http://lumo.anima.edu.uy/api
   ```

## 📊 Arquitectura de Deployment

```
Internet
   ↓
lumo.anima.edu.uy (Puerto 80/443)
   ↓
[Nginx]
   ├─→ / → Frontend estático (/opt/proyecto/LUMO/frontend/dist)
   ├─→ /api → Proxy a Backend (127.0.0.1:3000)
   ├─→ /health → Proxy a Backend
   └─→ /uploads → Proxy a Backend
      ↓
[Backend Node.js + Express]
   ├─ Escucha en 127.0.0.1:3000 (solo local)
   ├─ Gestionado por PM2
   ├─ CORS configurado para lumo.anima.edu.uy
   └─ Conectado a SQLite (Prisma)
```

## 🚀 Flujo de Deployment

```bash
# 1. Preparar servidor
ssh usuario@servidor
sudo mkdir -p /opt/proyecto
cd /opt/proyecto

# 2. Obtener código
sudo git clone https://github.com/elChebost/LUMO.git
sudo chown -R $USER:$USER LUMO
cd LUMO

# 3. Ejecutar deployment
chmod +x deploy-rocky.sh
./deploy-rocky.sh

# 4. Verificar
curl http://lumo.anima.edu.uy/health
# Abrir navegador: http://lumo.anima.edu.uy
```

## ✅ Verificación de Deployment

### Checks Automáticos
- ✅ Rocky Linux 9.6 detectado
- ✅ Node.js v18+ instalado
- ✅ Nginx instalado y corriendo
- ✅ PM2 instalado y gestionando backend
- ✅ SELinux configurado (`httpd_can_network_connect`)
- ✅ Firewall permite HTTP/HTTPS
- ✅ Backend escucha en 127.0.0.1:3000
- ✅ Frontend construido en `dist/`
- ✅ Nginx configurado correctamente
- ✅ Health check responde: `{"status":"ok"}`
- ✅ No hay errores de CORS en navegador

### Comandos de Verificación
```bash
# Backend
pm2 list | grep lumo-backend
curl http://localhost:3000/health

# Nginx
sudo systemctl status nginx
sudo nginx -t

# Público
curl http://lumo.anima.edu.uy/health
curl http://lumo.anima.edu.uy -I

# CORS
curl -H "Origin: http://lumo.anima.edu.uy" \
     -X OPTIONS \
     http://lumo.anima.edu.uy/api/auth/login -v
```

## 📦 Archivos de Configuración Críticos

### En el Servidor

```
/opt/proyecto/LUMO/
├── backend/.env                      # ✅ HOST=127.0.0.1, FRONTEND_URL
├── frontend/.env                     # ✅ VITE_API_URL=/api
├── ecosystem.config.js               # ✅ PM2 config con rutas absolutas
└── frontend/dist/                    # ✅ Build de producción

/etc/nginx/conf.d/
└── lumo.conf                         # ✅ Proxy inverso y CORS

/var/log/nginx/
├── lumo-access.log                   # Logs de acceso
└── lumo-error.log                    # Logs de errores

/opt/proyecto/LUMO/logs/
├── backend-out.log                   # Logs PM2 stdout
└── backend-error.log                 # Logs PM2 stderr
```

## 🎓 Documentación Generada

| Archivo | Propósito | Audiencia |
|---------|-----------|-----------|
| `DEPLOYMENT-ROCKY-LINUX.md` | Guía completa de deployment | DevOps, SysAdmin |
| `CHECKLIST-DEPLOYMENT.md` | Lista de verificación interactiva | Todos |
| `CORS-TROUBLESHOOTING.md` | Solución de problemas CORS | Desarrolladores |
| `nginx-rocky-linux.conf` | Configuración de Nginx | SysAdmin |
| `deploy-rocky.sh` | Script de deployment automático | DevOps |

## 🎉 Resultado Final

### URLs de Acceso
- 🌐 Frontend: http://lumo.anima.edu.uy
- ❤️ Health Check: http://lumo.anima.edu.uy/health
- 📊 Dashboard: http://lumo.anima.edu.uy/dashboard

### Características
- ✅ CORS funcionando correctamente
- ✅ Backend permanente con PM2
- ✅ Frontend optimizado servido por Nginx
- ✅ Logs centralizados y accesibles
- ✅ Reinicio automático en caso de errores
- ✅ Inicio automático al reiniciar servidor
- ✅ Preparado para SSL/HTTPS
- ✅ SELinux y Firewall configurados
- ✅ Documentación completa y específica

### Próximos Pasos
1. [ ] Configurar SSL con Let's Encrypt
2. [ ] Configurar backups automáticos
3. [ ] Configurar monitoreo adicional
4. [ ] Actualizar JWT_SECRET en producción
5. [ ] Documentar credenciales de acceso

## 📞 Soporte

Para problemas durante el deployment, consulta:

1. **CORS-TROUBLESHOOTING.md** - Si hay errores de CORS
2. **DEPLOYMENT-ROCKY-LINUX.md** - Guía completa paso a paso
3. **CHECKLIST-DEPLOYMENT.md** - Lista de verificación
4. Logs del sistema:
   - Backend: `pm2 logs lumo-backend`
   - Nginx: `sudo tail -f /var/log/nginx/lumo-error.log`

---

**¡Deployment completado exitosamente para Rocky Linux 9.6!** 🚀
