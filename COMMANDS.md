# 🛠️ LUMO - Comandos Útiles para Administración

Esta es una referencia rápida de comandos útiles para administrar LUMO en un servidor SSH.

## 🚀 Scripts de LUMO

```bash
# Deployment completo (primera vez)
./deploy.sh

# Ejecutar en producción
./run.sh

# Ejecutar en desarrollo
./run.sh dev

# Actualizar proyecto
./update.sh

# Detener servicios
./stop.sh

# Dar permisos de ejecución
chmod +x deploy.sh run.sh update.sh stop.sh
```

## 📦 PM2 - Gestión de Procesos

### Comandos Básicos
```bash
# Listar todos los procesos
pm2 list
pm2 ls

# Ver detalles de un proceso
pm2 show lumo-backend
pm2 show lumo-frontend

# Información detallada
pm2 describe lumo-backend
```

### Iniciar/Detener/Reiniciar
```bash
# Iniciar
pm2 start ecosystem.config.js
pm2 start backend/app.js --name lumo-backend

# Reiniciar
pm2 restart all
pm2 restart lumo-backend
pm2 restart lumo-frontend

# Detener
pm2 stop all
pm2 stop lumo-backend

# Eliminar
pm2 delete all
pm2 delete lumo-backend
```

### Logs
```bash
# Ver logs en tiempo real (todos)
pm2 logs

# Logs de un proceso específico
pm2 logs lumo-backend
pm2 logs lumo-frontend

# Ver últimas 100 líneas
pm2 logs --lines 100

# Limpiar logs
pm2 flush

# Logs de archivo
tail -f logs/backend-out.log
tail -f logs/backend-error.log
```

### Monitoreo
```bash
# Monitor interactivo
pm2 monit

# Uso de CPU y memoria
pm2 status

# Métricas detalladas
pm2 show lumo-backend
```

### Configuración
```bash
# Guardar configuración actual
pm2 save

# Cargar configuración guardada
pm2 resurrect

# Configurar inicio automático
pm2 startup systemd
pm2 startup systemd -u usuario --hp /home/usuario

# Deshabilitar inicio automático
pm2 unstartup systemd
```

### Actualización
```bash
# Actualizar PM2
npm install -g pm2
pm2 update
```

## 🗄️ Base de Datos (Prisma)

### Migraciones
```bash
cd backend

# Ver estado de migraciones
npx prisma migrate status

# Aplicar migraciones pendientes
npx prisma migrate deploy

# Crear nueva migración (desarrollo)
npx prisma migrate dev --name nombre_migracion

# Resetear base de datos (¡CUIDADO!)
npx prisma migrate reset
```

### Cliente Prisma
```bash
# Generar cliente Prisma
npx prisma generate

# Abrir Prisma Studio (GUI)
npx prisma studio
```

### Seeds
```bash
cd backend

# Ejecutar todos los seeds
npm run seed

# Seeds individuales
npm run seed:base
npm run seed:students
npm run seed:missions
```

### Backup y Restauración
```bash
# Backup de base de datos SQLite
cp backend/prisma/dev.db backend/prisma/dev.db.backup.$(date +%Y%m%d_%H%M%S)

# Restaurar backup
cp backend/prisma/dev.db.backup.TIMESTAMP backend/prisma/dev.db

# Backup automático con cron (diario a las 2 AM)
crontab -e
# Agregar: 0 2 * * * cp ~/LUMO/backend/prisma/dev.db ~/LUMO/backend/prisma/dev.db.backup.$(date +\%Y\%m\%d)
```

## 🌐 Nginx

### Comandos Básicos
```bash
# Verificar configuración
sudo nginx -t

# Reiniciar
sudo systemctl restart nginx

# Recargar (sin downtime)
sudo systemctl reload nginx

# Estado
sudo systemctl status nginx

# Ver logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/lumo-api-error.log
```

### Configuración
```bash
# Editar configuración
sudo nano /etc/nginx/sites-available/lumo

# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/lumo /etc/nginx/sites-enabled/

# Deshabilitar sitio
sudo rm /etc/nginx/sites-enabled/lumo
```

## 🔐 SSL/HTTPS (Let's Encrypt)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d lumo.tu-dominio.com -d api.tu-dominio.com

# Renovar manualmente
sudo certbot renew

# Renovar en dry-run (prueba)
sudo certbot renew --dry-run

# Listar certificados
sudo certbot certificates

# Revocar certificado
sudo certbot revoke --cert-path /etc/letsencrypt/live/tu-dominio.com/cert.pem
```

## 🐛 Debugging

### Ver procesos Node.js
```bash
# Todos los procesos Node
ps aux | grep node

# PIDs de Node
pgrep -a node

# Matar proceso por PID
kill -9 PID

# Matar todos los procesos Node (¡CUIDADO!)
pkill -9 node
```

### Ver puertos en uso
```bash
# Puertos escuchando
sudo netstat -tulpn | grep LISTEN

# Puerto específico
sudo netstat -tulpn | grep :3000
sudo lsof -i :3000

# Matar proceso en puerto
sudo lsof -ti:3000 | xargs kill -9
```

### Variables de entorno
```bash
# Ver variables
env

# Ver variable específica
echo $NODE_ENV
echo $PORT

# Establecer temporalmente
export NODE_ENV=production

# Verificar archivo .env
cat backend/.env
cat frontend/.env
```

## 📊 Monitoreo del Sistema

### Recursos
```bash
# Uso de CPU y memoria en tiempo real
htop

# Uso de disco
df -h

# Espacio usado por directorio
du -sh ~/LUMO
du -h --max-depth=1 ~/LUMO

# Memoria RAM
free -h

# Procesos que más consumen
top
```

### Limpieza
```bash
# Limpiar caché de npm
npm cache clean --force

# Limpiar node_modules y reinstalar
cd backend && rm -rf node_modules && npm install
cd frontend && rm -rf node_modules && npm install

# Limpiar logs antiguos
rm -f logs/*.log.old
pm2 flush

# Limpiar archivos temporales
cd backend && npx prisma generate
```

## 🔥 Firewall (UFW)

```bash
# Ver estado
sudo ufw status

# Habilitar
sudo ufw enable

# Permitir puertos
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3000/tcp  # Backend
sudo ufw allow 4173/tcp  # Frontend

# Denegar puerto
sudo ufw deny 3000/tcp

# Eliminar regla
sudo ufw delete allow 3000/tcp

# Resetear firewall
sudo ufw reset
```

## 📦 Node.js y npm

```bash
# Versiones instaladas
node -v
npm -v

# Actualizar npm
npm install -g npm@latest

# Listar paquetes globales
npm list -g --depth=0

# Actualizar paquete global
npm update -g pm2

# Limpiar caché
npm cache clean --force

# Ver versiones disponibles de Node
nvm ls-remote (si usas nvm)
```

## 🔄 Git

```bash
# Ver estado
git status

# Ver cambios
git diff

# Actualizar
git pull origin main

# Ver commits
git log --oneline

# Deshacer cambios locales
git checkout -- .

# Ver ramas
git branch

# Cambiar de rama
git checkout nombre-rama

# Ver remoto
git remote -v
```

## 🗂️ Archivos y Permisos

```bash
# Cambiar permisos
chmod +x script.sh
chmod 644 archivo.txt
chmod 755 directorio/

# Cambiar propietario
sudo chown usuario:usuario archivo
sudo chown -R usuario:usuario directorio/

# Ver permisos
ls -la

# Buscar archivos
find . -name "*.log"
find . -type f -size +100M
```

## 📝 Logs del Sistema

```bash
# Logs del sistema
sudo journalctl -xe

# Logs de un servicio
sudo journalctl -u nginx
sudo journalctl -u pm2-usuario

# Seguir logs en tiempo real
sudo journalctl -f

# Logs de hoy
sudo journalctl --since today

# Logs de las últimas 2 horas
sudo journalctl --since "2 hours ago"
```

## 🚨 Comandos de Emergencia

```bash
# Reiniciar servidor (¡CUIDADO!)
sudo reboot

# Detener todo LUMO inmediatamente
./stop.sh
pm2 kill
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:4173 | xargs kill -9

# Restaurar desde backup
cp backend/prisma/dev.db.backup backend/prisma/dev.db
./run.sh

# Ver uso de disco (si está lleno)
du -sh /* | sort -h
df -h

# Limpiar espacio
sudo apt clean
sudo apt autoremove
npm cache clean --force
```

## 📚 Recursos Adicionales

- PM2: https://pm2.keymetrics.io/docs/
- Nginx: https://nginx.org/en/docs/
- Prisma: https://www.prisma.io/docs/
- Let's Encrypt: https://letsencrypt.org/docs/

---

💡 **Tip**: Guarda estos comandos en favoritos para acceso rápido.
