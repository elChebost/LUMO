# 📋 LUMO - Guía de Deployment para Rocky Linux 9.6

## 🎯 Resumen

Esta guía documenta los pasos necesarios para desplegar LUMO en producción en un servidor Rocky Linux 9.6 con Nginx como reverse proxy.

**Configuración:**
- **OS**: Rocky Linux 9.6
- **Ubicación**: `/opt/proyecto/LUMO`
- **Dominio**: `lumo.anima.edu.uy`
- **Backend**: Node.js + Express (Puerto 3000, solo localhost)
- **Frontend**: React + Vite (servido por Nginx)
- **Proxy**: Nginx (puerto 80/443 → localhost:3000)
- **Process Manager**: PM2
- **Database**: SQLite (Prisma ORM)

---

## 🚀 Deployment Automático (Recomendado)

### Opción 1: Script Automático Completo

```bash
# 1. Conectarse al servidor
ssh usuario@lumo.anima.edu.uy

# 2. Clonar o actualizar repositorio
cd /opt/proyecto
git clone https://github.com/elChebost/LUMO.git
# O si ya existe:
cd LUMO && git pull origin main

# 3. Ejecutar script de deployment
chmod +x deploy-production.sh
sudo ./deploy-production.sh
```

El script ejecuta automáticamente:
- ✅ Verifica dependencias (Node.js, npm, Nginx, PM2)
- ✅ Configura Nginx con archivo lumo.conf
- ✅ Configura SELinux
- ✅ Instala dependencias del backend
- ✅ Ejecuta migraciones de Prisma
- ✅ Construye frontend (dist/)
- ✅ Inicia backend con PM2
- ✅ Reinicia Nginx
- ✅ Ejecuta health checks

---

## 📝 Deployment Manual (Paso a Paso)

### Paso 1: Preparar el Sistema

```bash
# Actualizar sistema
sudo dnf update -y

# Instalar Node.js 20 LTS
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# Instalar Nginx
sudo dnf install -y nginx

# Instalar PM2 globalmente
sudo npm install -g pm2

# Verificar instalaciones
node -v
npm -v
nginx -v
pm2 -v
```

### Paso 2: Configurar Firewall

```bash
# Permitir HTTP y HTTPS
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Verificar
sudo firewall-cmd --list-all
```

### Paso 3: Configurar SELinux

```bash
# Permitir que Nginx se conecte a la red (para proxy)
sudo setsebool -P httpd_can_network_connect 1

# Verificar
getsebool httpd_can_network_connect
```

### Paso 4: Clonar Proyecto

```bash
# Crear directorio
sudo mkdir -p /opt/proyecto
sudo chown -R $USER:$USER /opt/proyecto

# Clonar repositorio
cd /opt/proyecto
git clone https://github.com/elChebost/LUMO.git
cd LUMO
```

### Paso 5: Configurar Backend

```bash
cd /opt/proyecto/LUMO/backend

# Instalar dependencias
npm install --production=false

# Copiar y editar .env
cp .env.production .env
nano .env

# EDITAR LAS SIGUIENTES VARIABLES:
# - JWT_SECRET (usar: openssl rand -base64 32)
# - DATABASE_URL (si usas PostgreSQL)
# - FRONTEND_URL=http://lumo.anima.edu.uy
# - HOST=127.0.0.1
# - NODE_ENV=production

# Generar Prisma Client
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Opcional: Seed de datos iniciales
npm run seed
```

### Paso 6: Configurar Frontend

```bash
cd /opt/proyecto/LUMO/frontend

# Instalar dependencias
npm install

# Construir para producción
npm run build

# Verificar que dist/ fue creado
ls -la dist/
```

**NOTA**: El frontend ya está configurado para detectar automáticamente el entorno. En producción usará `/api` como base URL.

### Paso 7: Configurar Nginx

```bash
cd /opt/proyecto/LUMO

# Eliminar configuraciones antiguas
sudo rm -f /etc/nginx/conf.d/*.conf

# Copiar nueva configuración
sudo cp nginx-lumo.conf /etc/nginx/conf.d/lumo.conf

# Validar configuración
sudo nginx -t

# Si todo está OK, recargar Nginx
sudo systemctl reload nginx

# Habilitar Nginx para auto-inicio
sudo systemctl enable nginx
```

### Paso 8: Configurar Contexto SELinux para archivos

```bash
# Permitir que Nginx lea el frontend
sudo chcon -R -t httpd_sys_content_t /opt/proyecto/LUMO/frontend/dist

# Permitir que Nginx sirva uploads
sudo chcon -R -t httpd_sys_rw_content_t /opt/proyecto/LUMO/backend/uploads
```

### Paso 9: Iniciar Backend con PM2

```bash
cd /opt/proyecto/LUMO

# Iniciar con PM2
pm2 start ecosystem.config.js --env production

# Guardar configuración
pm2 save

# Configurar PM2 para auto-inicio
pm2 startup systemd
# Ejecutar el comando que PM2 muestra (con sudo)

# Verificar estado
pm2 list
pm2 logs lumo-backend
```

### Paso 10: Verificar Deployment

```bash
# 1. Backend local
curl http://localhost:3000/health
# Debe responder: {"status":"ok",...}

# 2. Backend a través de Nginx
curl http://lumo.anima.edu.uy/api/health
# Debe responder igual

# 3. Frontend
curl http://lumo.anima.edu.uy/
# Debe devolver HTML de la aplicación

# 4. Abrir en navegador
# http://lumo.anima.edu.uy
```

---

## 🔒 Configurar HTTPS (Opcional pero Recomendado)

```bash
# 1. Instalar Certbot
sudo dnf install -y certbot python3-certbot-nginx

# 2. Obtener certificado SSL
sudo certbot --nginx -d lumo.anima.edu.uy

# 3. Certbot modificará automáticamente la configuración de Nginx

# 4. Verificar renovación automática
sudo certbot renew --dry-run

# 5. El cron de Certbot renovará automáticamente
```

**NOTA**: El frontend detecta automáticamente si se accede por HTTPS y ajusta las llamadas API en consecuencia.

---

## 🔄 Actualizar Deployment

Para actualizar el código después del deployment inicial:

```bash
cd /opt/proyecto/LUMO

# 1. Obtener últimos cambios
git pull origin main

# 2. Actualizar backend
cd backend
npm install
npx prisma generate
npx prisma migrate deploy

# 3. Reconstruir frontend
cd ../frontend
npm install
npm run build

# 4. Reiniciar backend
pm2 restart lumo-backend

# 5. Recargar Nginx (solo si cambiaste configuración)
sudo systemctl reload nginx

# 6. Verificar
pm2 logs lumo-backend --lines 50
curl http://lumo.anima.edu.uy/health
```

---

## 🔧 Troubleshooting

### Backend no inicia

```bash
# Ver logs
pm2 logs lumo-backend

# Causas comunes:
# 1. Puerto 3000 ya en uso
sudo lsof -i :3000
sudo kill -9 <PID>

# 2. Error en .env
cat backend/.env  # Verificar variables

# 3. Base de datos no existe
cd backend
npx prisma migrate deploy
```

### Nginx retorna 502 Bad Gateway

```bash
# Verificar logs
sudo tail -f /var/log/nginx/lumo.error.log

# Verificar que backend está corriendo
pm2 list
curl http://localhost:3000/health

# Verificar SELinux
sudo ausearch -m avc -ts recent
# Si hay denials, ejecutar:
sudo setsebool -P httpd_can_network_connect 1
```

### Frontend no carga recursos

```bash
# Verificar permisos
ls -laZ /opt/proyecto/LUMO/frontend/dist

# Reconfigurar SELinux
sudo chcon -R -t httpd_sys_content_t /opt/proyecto/LUMO/frontend/dist

# Verificar Nginx
sudo nginx -t
sudo systemctl reload nginx
```

### CORS errors (no debería ocurrir)

El frontend está configurado para usar rutas relativas `/api`, lo que elimina problemas de CORS. Si aún así ocurren:

```bash
# Verificar que Nginx está sirviendo en el mismo dominio
curl -I http://lumo.anima.edu.uy/
curl -I http://lumo.anima.edu.uy/api/health

# Ambos deben responder con headers del mismo origen
```

---

## 🎯 Checklist de Verificación Post-Deployment

- [ ] `sudo nginx -t` → Configuration test is successful
- [ ] `pm2 list` → lumo-backend status: online
- [ ] `curl http://localhost:3000/health` → {"status":"ok"}
- [ ] `curl http://lumo.anima.edu.uy/api/health` → {"status":"ok"}
- [ ] `curl http://lumo.anima.edu.uy/` → Retorna HTML
- [ ] Abrir navegador en `http://lumo.anima.edu.uy` → Carga UI
- [ ] Login funciona correctamente
- [ ] No hay errores CORS en consola del navegador
- [ ] `pm2 logs lumo-backend` → Sin errores
- [ ] `sudo tail -f /var/log/nginx/lumo.error.log` → Sin errores
- [ ] `getenforce` → Enforcing (SELinux habilitado)
- [ ] `getsebool httpd_can_network_connect` → on
- [ ] `sudo firewall-cmd --list-services` → Incluye http (y https)
- [ ] PM2 configurado para auto-inicio → `pm2 startup` ejecutado

---

## 📚 Comandos Útiles

```bash
# PM2
pm2 list                    # Ver procesos
pm2 logs lumo-backend       # Ver logs
pm2 restart lumo-backend    # Reiniciar
pm2 stop lumo-backend       # Detener
pm2 delete lumo-backend     # Eliminar
pm2 monit                   # Monitor en tiempo real

# Nginx
sudo nginx -t               # Validar configuración
sudo systemctl status nginx # Estado
sudo systemctl reload nginx # Recargar config
sudo systemctl restart nginx # Reiniciar
sudo tail -f /var/log/nginx/lumo.error.log  # Logs

# Base de datos
cd backend
npx prisma studio          # GUI de DB (puerto 5555)
npx prisma migrate deploy  # Aplicar migraciones
npx prisma generate        # Generar client

# Sistema
sudo firewall-cmd --list-all  # Ver firewall
getenforce                     # Ver SELinux
journalctl -u nginx -f         # Logs de systemd
```

---

## 🔙 Rollback

Si necesitas volver a una versión anterior:

```bash
cd /opt/proyecto/LUMO

# 1. Volver a commit anterior
git log --oneline  # Ver commits
git reset --hard <commit-hash>

# 2. Reconstruir
cd frontend && npm run build
cd ../backend && npm install

# 3. Reiniciar
pm2 restart lumo-backend
```

---

## 📞 Soporte

**Documentación adicional:**
- [SOLUCION-BACKEND-NO-CORRE.md](SOLUCION-BACKEND-NO-CORRE.md) - Troubleshooting backend
- [CORS-TROUBLESHOOTING.md](CORS-TROUBLESHOOTING.md) - Solución problemas CORS
- [DETECCION-AUTOMATICA-API.md](DETECCION-AUTOMATICA-API.md) - Cómo funciona la detección de API
- [check-backend-production.sh](check-backend-production.sh) - Script de verificación

**Logs importantes:**
- Backend: `pm2 logs lumo-backend`
- Nginx: `/var/log/nginx/lumo.error.log`
- Sistema: `journalctl -u nginx`

---

**Última actualización**: 21 de octubre de 2025  
**Versión**: 1.0.0 - Rocky Linux 9.6 Production
