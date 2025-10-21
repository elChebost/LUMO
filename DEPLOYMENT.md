# 🚀 LUMO - Guía de Deployment en Servidor SSH

Esta guía te ayudará a desplegar LUMO en un servidor SSH (Linux/Ubuntu) de forma permanente y profesional.

## 📋 Requisitos Previos

### En el Servidor SSH:
- **Sistema Operativo**: Linux (Ubuntu 20.04+ recomendado)
- **Node.js**: v18 o superior
- **npm**: v8 o superior
- **Memoria RAM**: Mínimo 1GB (2GB recomendado)
- **Espacio en disco**: Mínimo 2GB libre

### Acceso:
- Acceso SSH al servidor
- Permisos de sudo (para instalación de dependencias globales)

## 🔧 Instalación Rápida

### 1. Conectarse al servidor via SSH

```bash
ssh usuario@tu-servidor.com
```

### 2. Instalar Node.js (si no está instalado)

```bash
# Usando NodeSource para Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node -v
npm -v
```

### 3. Clonar o subir el proyecto

**Opción A: Usando Git (recomendado)**
```bash
cd ~
git clone https://github.com/tu-usuario/LUMO.git
cd LUMO
```

**Opción B: Subir archivos via SCP**
```bash
# Desde tu máquina local
scp -r /ruta/local/LUMO usuario@tu-servidor.com:~/
```

### 4. Ejecutar el script de deployment

```bash
# Dar permisos de ejecución a los scripts
chmod +x deploy.sh run.sh

# Ejecutar el deployment completo
./deploy.sh
```

Este script automáticamente:
- ✅ Verifica requisitos del sistema
- ✅ Instala PM2 (gestor de procesos)
- ✅ Crea directorios necesarios
- ✅ Configura archivos de entorno (.env)
- ✅ Instala dependencias
- ✅ Configura la base de datos
- ✅ Construye el frontend
- ✅ Inicia los servicios con PM2
- ✅ Configura inicio automático (opcional)

## 🎯 Uso del Script run.sh

### Modo Producción (Recomendado para servidor)

```bash
./run.sh
# o explícitamente
./run.sh production
```

Características:
- Usa PM2 para gestión de procesos
- Reinicio automático en caso de fallos
- Logs persistentes
- Monitorización de recursos
- Inicio automático al reiniciar el servidor

### Modo Desarrollo

```bash
./run.sh dev
```

Características:
- Sin PM2
- Recarga automática de cambios
- Logs en tiempo real en consola

## 📊 Gestión con PM2

### Comandos Básicos

```bash
# Ver estado de los servicios
pm2 list

# Ver logs en tiempo real
pm2 logs

# Ver logs de un servicio específico
pm2 logs lumo-backend
pm2 logs lumo-frontend

# Reiniciar servicios
pm2 restart all
pm2 restart lumo-backend
pm2 restart lumo-frontend

# Detener servicios
pm2 stop all

# Eliminar servicios
pm2 delete all

# Monitor interactivo (CPU, memoria, etc.)
pm2 monit

# Ver información detallada
pm2 show lumo-backend
```

### Inicio Automático

Para que LUMO se inicie automáticamente cuando el servidor se reinicie:

```bash
# Generar script de startup
pm2 startup systemd

# Copiar y ejecutar el comando que PM2 te muestra
# Ejemplo: sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u usuario --hp /home/usuario

# Guardar la configuración actual
pm2 save
```

## 🌐 Configuración de Red

### Puertos Utilizados

- **Backend**: 3000 (API)
- **Frontend**: 4173 (Aplicación web)

### Firewall (UFW en Ubuntu)

```bash
# Permitir puertos
sudo ufw allow 3000/tcp
sudo ufw allow 4173/tcp

# Verificar reglas
sudo ufw status
```

## 🔒 Configuración de Producción

### 1. Variables de Entorno

#### Backend (`backend/.env`)

```env
# Base de datos
DATABASE_URL="file:./prisma/dev.db"

# JWT Secret (CAMBIA ESTO en producción)
JWT_SECRET="tu_clave_super_secreta_aqui_cambiar_en_produccion"

# Puerto
PORT=3000

# Entorno
NODE_ENV=production
```

#### Frontend (`frontend/.env`)

```env
# URL del backend (usa la IP pública o dominio del servidor)
VITE_API_URL=http://tu-servidor.com:3000

# O si usas proxy inverso
VITE_API_URL=https://api.tu-dominio.com
```

### 2. Nginx como Proxy Inverso (Recomendado)

Instalar Nginx:

```bash
sudo apt update
sudo apt install nginx -y
```

Configurar sitio (`/etc/nginx/sites-available/lumo`):

```nginx
# Backend API
server {
    listen 80;
    server_name api.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Frontend
server {
    listen 80;
    server_name lumo.tu-dominio.com;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar configuración:

```bash
sudo ln -s /etc/nginx/sites-available/lumo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. SSL/HTTPS con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificados
sudo certbot --nginx -d lumo.tu-dominio.com -d api.tu-dominio.com

# Renovación automática (ya configurado por defecto)
sudo certbot renew --dry-run
```

## 📦 Actualización del Proyecto

### Actualización Manual

```bash
cd ~/LUMO

# Detener servicios
pm2 stop all

# Actualizar código (si usas Git)
git pull origin main

# Reinstalar dependencias (si cambiaron)
cd backend && npm install
cd ../frontend && npm install

# Reconstruir frontend
cd frontend && npm run build

# Actualizar base de datos (si hay migraciones nuevas)
cd backend && npx prisma migrate deploy

# Reiniciar servicios
pm2 restart all
```

### Script de Actualización Automática

Crear `update.sh`:

```bash
#!/bin/bash
cd ~/LUMO
git pull origin main
cd backend && npm install
cd ../frontend && npm install && npm run build
cd ../backend && npx prisma migrate deploy
pm2 restart all
pm2 logs --lines 50
```

```bash
chmod +x update.sh
./update.sh
```

## 🔍 Monitorización y Logs

### Ver Logs

```bash
# Logs de PM2
pm2 logs --lines 100

# Logs de archivo
tail -f logs/backend-out.log
tail -f logs/backend-error.log

# Logs del sistema
journalctl -u pm2-$(whoami) -f
```

### Monitorización de Recursos

```bash
# Monitor de PM2
pm2 monit

# Uso de recursos del sistema
htop

# Espacio en disco
df -h

# Uso de memoria
free -h
```

## 🆘 Solución de Problemas

### El servidor no inicia

```bash
# Verificar logs
pm2 logs

# Verificar estado de servicios
pm2 list

# Verificar puertos en uso
sudo netstat -tulpn | grep -E ':(3000|4173)'

# Reiniciar PM2
pm2 kill
./run.sh
```

### Base de datos corrupta

```bash
cd backend

# Backup de la base de datos actual
cp prisma/dev.db prisma/dev.db.backup

# Recrear base de datos
rm prisma/dev.db
npx prisma migrate deploy
node seeds/run-all-seeds.js
```

### Problemas de permisos

```bash
# Dar permisos al usuario actual
sudo chown -R $(whoami):$(whoami) ~/LUMO

# Permisos de ejecución
chmod +x *.sh
```

### Puerto ya en uso

```bash
# Encontrar proceso usando el puerto
sudo lsof -ti:3000
sudo lsof -ti:4173

# Matar proceso
sudo kill -9 $(sudo lsof -ti:3000)

# O reiniciar servicios con PM2
pm2 delete all
./run.sh
```

## 📈 Optimización para Producción

### 1. Configurar Swap (si tienes poca RAM)

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 2. Limitar Recursos de PM2

Editar `ecosystem.config.js`:

```javascript
max_memory_restart: '500M',  // Reiniciar si supera 500MB
instances: 1,                // Una instancia por servicio
```

### 3. Rotación de Logs

```bash
# Instalar PM2 log rotate
pm2 install pm2-logrotate

# Configurar
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

## 📚 Recursos Adicionales

- [Documentación de PM2](https://pm2.keymetrics.io/docs/)
- [Guía de Nginx](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

## 🎉 ¡Listo!

Tu aplicación LUMO ahora está corriendo de forma permanente en tu servidor SSH. 

**URLs de acceso:**
- Frontend: `http://tu-servidor:4173`
- Backend API: `http://tu-servidor:3000`
- Health Check: `http://tu-servidor:3000/health`

Para cualquier problema, revisa los logs con `pm2 logs` o contacta al equipo de desarrollo.
