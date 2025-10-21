# 🚀 LUMO - Guía de Deployment para Rocky Linux 9.6

Esta guía específica te ayudará a desplegar LUMO en un servidor Rocky Linux 9.6 con Nginx en el dominio `lumo.anima.edu.uy`.

## 📋 Información del Servidor

- **Sistema Operativo**: Rocky Linux 9.6
- **Servidor Web**: Nginx
- **Ubicación del Proyecto**: `/opt/proyecto/LUMO`
- **Dominio**: `lumo.anima.edu.uy`
- **Backend**: Node.js + Express (Puerto 3000)
- **Frontend**: React + Vite (servido por Nginx)

## 🔧 Requisitos Previos

### Verificar versiones instaladas

```bash
# Verificar sistema operativo
cat /etc/rocky-release

# Verificar Node.js (debe ser v18+)
node -v

# Verificar npm
npm -v

# Verificar Nginx
nginx -v
```

## 📦 Paso 1: Instalar Dependencias del Sistema

### 1.1 Instalar Node.js v20 LTS (recomendado)

```bash
# Instalar Node.js desde NodeSource
sudo dnf install -y curl
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# Verificar instalación
node -v
npm -v
```

### 1.2 Instalar Nginx

```bash
# Instalar Nginx
sudo dnf install -y nginx

# Habilitar e iniciar Nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Verificar estado
sudo systemctl status nginx
```

### 1.3 Instalar PM2 (Gestor de Procesos)

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Verificar instalación
pm2 -v
```

### 1.4 Configurar SELinux (Importante en Rocky Linux)

```bash
# Permitir que Nginx se conecte a la red
sudo setsebool -P httpd_can_network_connect 1

# Permitir que Nginx lea archivos del proyecto
sudo chcon -R -t httpd_sys_content_t /opt/proyecto/LUMO/frontend/dist

# Si tienes problemas con uploads
sudo chcon -R -t httpd_sys_rw_content_t /opt/proyecto/LUMO/backend/uploads
```

### 1.5 Configurar Firewall

```bash
# Permitir HTTP y HTTPS
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Recargar firewall
sudo firewall-cmd --reload

# Verificar reglas
sudo firewall-cmd --list-all
```

## 📂 Paso 2: Preparar el Proyecto

### 2.1 Crear estructura de directorios

```bash
# Crear directorio del proyecto
sudo mkdir -p /opt/proyecto
cd /opt/proyecto

# Clonar o copiar el proyecto
sudo git clone https://github.com/elChebost/LUMO.git LUMO
# O si ya lo tienes:
# sudo cp -r ~/LUMO /opt/proyecto/

# Cambiar permisos al usuario actual
sudo chown -R $USER:$USER /opt/proyecto/LUMO
cd /opt/proyecto/LUMO
```

### 2.2 Dar permisos de ejecución a los scripts

```bash
chmod +x *.sh
```

## ⚙️ Paso 3: Configurar Variables de Entorno

### 3.1 Backend (.env)

```bash
# Copiar archivo de ejemplo
cp backend/.env.example backend/.env

# Editar con nano o vi
nano backend/.env
```

Configuración para producción:

```env
# Base de datos SQLite
DATABASE_URL="file:./prisma/dev.db"

# JWT Secret - CAMBIAR ESTE VALOR en producción
JWT_SECRET="tu_clave_super_secreta_y_unica_para_produccion_2024"

# Puerto y Host
PORT=3000
HOST=127.0.0.1

# URL del Frontend (para CORS)
FRONTEND_URL=http://lumo.anima.edu.uy

# Entorno
NODE_ENV=production
```

### 3.2 Frontend (.env)

```bash
# Copiar archivo de ejemplo
cp frontend/.env.example frontend/.env

# Editar
nano frontend/.env
```

Configuración para producción:

```env
# URL del backend a través de Nginx
VITE_API_URL=http://lumo.anima.edu.uy/api
```

## 🗄️ Paso 4: Configurar Base de Datos

```bash
cd /opt/proyecto/LUMO/backend

# Instalar dependencias
npm install --production=false

# Generar cliente Prisma
npx prisma generate

# Aplicar migraciones
npx prisma migrate deploy

# Ejecutar seeds (datos iniciales)
npm run seed
```

## 🏗️ Paso 5: Construir Frontend

```bash
cd /opt/proyecto/LUMO/frontend

# Instalar dependencias
npm install

# Construir para producción
npm run build

# Verificar que se creó el directorio dist
ls -la dist/
```

## 🌐 Paso 6: Configurar Nginx

### 6.1 Copiar configuración

```bash
# Copiar archivo de configuración
sudo cp /opt/proyecto/LUMO/nginx-rocky-linux.conf /etc/nginx/conf.d/lumo.conf

# Editar si necesitas ajustar algo
sudo nano /etc/nginx/conf.d/lumo.conf
```

### 6.2 Verificar y aplicar configuración

```bash
# Verificar sintaxis
sudo nginx -t

# Si todo está OK, recargar Nginx
sudo systemctl reload nginx
```

### 6.3 Ver logs de Nginx

```bash
# Logs de acceso
sudo tail -f /var/log/nginx/lumo-access.log

# Logs de errores
sudo tail -f /var/log/nginx/lumo-error.log
```

## 🚀 Paso 7: Iniciar Backend con PM2

### 7.1 Iniciar el backend

```bash
cd /opt/proyecto/LUMO

# Iniciar usando el archivo de configuración
pm2 start ecosystem.config.js

# O iniciar manualmente
pm2 start backend/app.js --name lumo-backend
```

### 7.2 Configurar inicio automático

```bash
# Generar script de startup
pm2 startup systemd -u $USER --hp $HOME

# IMPORTANTE: Copia y ejecuta el comando que PM2 te muestra
# Será algo como:
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u usuario --hp /home/usuario

# Guardar la configuración actual
pm2 save
```

### 7.3 Verificar estado

```bash
# Ver servicios
pm2 list

# Ver logs en tiempo real
pm2 logs

# Ver solo logs del backend
pm2 logs lumo-backend

# Monitor de recursos
pm2 monit
```

## ✅ Paso 8: Verificar Deployment

### 8.1 Health Check

```bash
# Desde el servidor
curl http://localhost:3000/health

# Desde el dominio
curl http://lumo.anima.edu.uy/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "pid": 12345,
  "port": 3000,
  "host": "127.0.0.1",
  "environment": "production"
}
```

### 8.2 Verificar Frontend

```bash
# Abrir en navegador
http://lumo.anima.edu.uy
```

### 8.3 Verificar CORS

En el navegador, abre las DevTools (F12) y ve a la pestaña Console. Intenta hacer login. No deberías ver errores de CORS.

## 🔒 Paso 9: Configurar SSL/HTTPS (Opcional pero Recomendado)

### 9.1 Instalar Certbot

```bash
# Instalar Certbot para Nginx
sudo dnf install -y certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d lumo.anima.edu.uy

# Verificar renovación automática
sudo certbot renew --dry-run
```

### 9.2 Actualizar frontend/.env para HTTPS

```bash
nano /opt/proyecto/LUMO/frontend/.env
```

Cambiar a:
```env
VITE_API_URL=https://lumo.anima.edu.uy/api
```

### 9.3 Reconstruir frontend

```bash
cd /opt/proyecto/LUMO/frontend
npm run build
sudo systemctl reload nginx
```

## 🔄 Actualización del Proyecto

### Script de actualización rápida

```bash
cd /opt/proyecto/LUMO

# Detener backend
pm2 stop lumo-backend

# Actualizar código
git pull origin main

# Actualizar dependencias backend
cd backend && npm install

# Aplicar migraciones
npx prisma migrate deploy

# Actualizar frontend
cd ../frontend
npm install
npm run build

# Reiniciar backend
pm2 restart lumo-backend

# Ver logs
pm2 logs --lines 50
```

O simplemente usa el script incluido:

```bash
./update.sh
```

## 🐛 Solución de Problemas

### Error de CORS

```bash
# Verificar logs del backend
pm2 logs lumo-backend

# Verificar que el origen esté permitido en app.js
grep -A 5 "allowedOrigins" /opt/proyecto/LUMO/backend/app.js

# Verificar configuración de Nginx
sudo nginx -t
sudo tail -f /var/log/nginx/lumo-error.log
```

### Error 502 Bad Gateway

```bash
# Verificar que el backend esté corriendo
pm2 list

# Verificar puerto del backend
sudo netstat -tulpn | grep :3000

# Reiniciar backend
pm2 restart lumo-backend

# Verificar logs
pm2 logs lumo-backend --lines 100
```

### Problemas con SELinux

```bash
# Ver errores de SELinux
sudo ausearch -m avc -ts recent

# Permitir conexiones de Nginx
sudo setsebool -P httpd_can_network_connect 1

# Ajustar contexto de archivos
sudo chcon -R -t httpd_sys_content_t /opt/proyecto/LUMO/frontend/dist
```

### Frontend no se actualiza

```bash
# Limpiar caché del navegador
# Ctrl + Shift + R (en el navegador)

# Reconstruir frontend
cd /opt/proyecto/LUMO/frontend
rm -rf dist node_modules
npm install
npm run build

# Recargar Nginx
sudo systemctl reload nginx
```

### Base de datos corrupta

```bash
cd /opt/proyecto/LUMO/backend

# Backup actual
cp prisma/dev.db prisma/dev.db.backup

# Recrear
rm prisma/dev.db
npx prisma migrate deploy
npm run seed

# Reiniciar backend
pm2 restart lumo-backend
```

## 📊 Monitoreo

### Logs del sistema

```bash
# PM2 logs
pm2 logs

# Nginx access log
sudo tail -f /var/log/nginx/lumo-access.log

# Nginx error log
sudo tail -f /var/log/nginx/lumo-error.log

# System journal (PM2 en systemd)
sudo journalctl -u pm2-$USER -f
```

### Recursos del sistema

```bash
# Monitor de PM2
pm2 monit

# CPU y memoria
htop

# Espacio en disco
df -h

# Estado de servicios
sudo systemctl status nginx
pm2 status
```

## 🔐 Seguridad Adicional

### Actualizar el sistema

```bash
# Actualizar paquetes
sudo dnf update -y

# Reiniciar si es necesario
sudo reboot
```

### Configurar fail2ban (opcional)

```bash
# Instalar fail2ban
sudo dnf install -y fail2ban

# Habilitar e iniciar
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 📞 Comandos Útiles

```bash
# Ver servicios activos
pm2 list
sudo systemctl status nginx

# Reiniciar servicios
pm2 restart all
sudo systemctl restart nginx

# Detener servicios
pm2 stop all
sudo systemctl stop nginx

# Ver logs
pm2 logs
sudo tail -f /var/log/nginx/lumo-error.log

# Health check
curl http://localhost:3000/health
curl http://lumo.anima.edu.uy/health

# Verificar puerto 3000
sudo netstat -tulpn | grep :3000

# Verificar procesos Node
ps aux | grep node
```

## 🎉 ¡Listo!

Tu aplicación LUMO ahora está corriendo en producción en Rocky Linux 9.6 con Nginx.

**URLs de acceso:**
- Frontend: `http://lumo.anima.edu.uy`
- API Health Check: `http://lumo.anima.edu.uy/health`

**Credenciales de prueba (si ejecutaste seeds):**
- Ver en la documentación del backend

Para cualquier problema, revisa los logs con `pm2 logs` y `sudo tail -f /var/log/nginx/lumo-error.log`

---

**Equipo LUMO** 🚀
