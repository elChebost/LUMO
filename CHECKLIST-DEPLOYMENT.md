# ✅ LUMO - Checklist de Deployment para Rocky Linux 9.6

## 📋 Checklist Pre-Deployment

### Sistema
- [ ] Rocky Linux 9.6 instalado y actualizado
- [ ] Acceso root o sudo disponible
- [ ] Dominio `lumo.anima.edu.uy` apuntando al servidor

### Software Requerido
- [ ] Node.js v18+ instalado
- [ ] npm instalado
- [ ] Nginx instalado y corriendo
- [ ] Git instalado (opcional)
- [ ] PM2 instalado globalmente

## 🚀 Pasos de Deployment

### 1. Preparación del Servidor

```bash
# Conectar al servidor
ssh usuario@lumo.anima.edu.uy

# Actualizar sistema
sudo dnf update -y

# Instalar Node.js v20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# Instalar Nginx
sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Instalar PM2
sudo npm install -g pm2

# Configurar firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Configurar SELinux
sudo setsebool -P httpd_can_network_connect 1
```

### 2. Preparar el Proyecto

```bash
# Crear directorio
sudo mkdir -p /opt/proyecto
cd /opt/proyecto

# Clonar proyecto
sudo git clone https://github.com/elChebost/LUMO.git
sudo chown -R $USER:$USER /opt/proyecto/LUMO
cd /opt/proyecto/LUMO

# Dar permisos a scripts
chmod +x *.sh
```

### 3. Configurar Variables de Entorno

```bash
# Backend
cp backend/.env.example backend/.env
nano backend/.env
```

**Valores críticos en backend/.env:**
```env
JWT_SECRET="cambiar_por_algo_super_secreto_unico_2024"
HOST=127.0.0.1
FRONTEND_URL=http://lumo.anima.edu.uy
NODE_ENV=production
```

```bash
# Frontend
cp frontend/.env.example frontend/.env
nano frontend/.env
```

**Valores en frontend/.env:**
```env
VITE_API_URL=http://lumo.anima.edu.uy/api
```

### 4. Ejecutar Deployment

```bash
# Opción A: Script automático
./deploy-rocky.sh

# Opción B: Manual (seguir DEPLOYMENT-ROCKY-LINUX.md)
cd backend && npm install
npx prisma generate
npx prisma migrate deploy
npm run seed
cd ../frontend && npm install
npm run build
cd ..
pm2 start ecosystem.config.js
pm2 save
```

### 5. Configurar Nginx

```bash
# Copiar configuración
sudo cp nginx-rocky-linux.conf /etc/nginx/conf.d/lumo.conf

# Verificar sintaxis
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx

# Configurar SELinux para frontend
sudo chcon -R -t httpd_sys_content_t /opt/proyecto/LUMO/frontend/dist
```

### 6. Verificaciones

```bash
# ✅ Backend corriendo
pm2 list
# Debe mostrar "lumo-backend" en estado "online"

# ✅ Backend responde
curl http://localhost:3000/health
# Debe retornar JSON con status: "ok"

# ✅ Nginx corriendo
sudo systemctl status nginx
# Debe estar "active (running)"

# ✅ Frontend accesible
curl -I http://lumo.anima.edu.uy
# Debe retornar 200 OK

# ✅ API accesible a través de Nginx
curl http://lumo.anima.edu.uy/health
# Debe retornar JSON con status: "ok"

# ✅ No hay errores CORS (desde navegador)
# Abrir http://lumo.anima.edu.uy
# Intentar hacer login
# No debe haber errores de CORS en consola
```

### 7. Configurar Inicio Automático

```bash
# PM2 startup
pm2 startup systemd -u $USER --hp $HOME
# Ejecutar el comando sudo que PM2 muestra

# Guardar configuración actual
pm2 save

# Verificar
sudo systemctl status pm2-$USER
```

### 8. Configurar SSL (Opcional pero Recomendado)

```bash
# Instalar Certbot
sudo dnf install -y certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d lumo.anima.edu.uy

# Actualizar frontend/.env
nano frontend/.env
# Cambiar a: VITE_API_URL=https://lumo.anima.edu.uy/api

# Reconstruir frontend
cd frontend && npm run build
sudo chcon -R -t httpd_sys_content_t dist
cd ..

# Recargar Nginx
sudo systemctl reload nginx
```

## 🔍 Verificación Final

### Desde el Servidor

```bash
# 1. Backend está corriendo
pm2 list | grep lumo-backend
# Debe estar "online"

# 2. Puerto 3000 está escuchando
sudo netstat -tulpn | grep :3000
# Debe mostrar node escuchando en 127.0.0.1:3000

# 3. Nginx está activo
sudo systemctl is-active nginx
# Debe retornar "active"

# 4. Health check local
curl http://localhost:3000/health
# {"status":"ok","pid":...}

# 5. Health check público
curl http://lumo.anima.edu.uy/health
# {"status":"ok","pid":...}
```

### Desde el Navegador

1. **Frontend carga correctamente**
   - [ ] Abrir `http://lumo.anima.edu.uy`
   - [ ] La página se carga sin errores
   - [ ] Los estilos se aplican correctamente

2. **Login funciona sin CORS**
   - [ ] Abrir DevTools (F12) > Console
   - [ ] Intentar hacer login
   - [ ] No hay errores de CORS
   - [ ] El login funciona correctamente

3. **API responde**
   - [ ] Después del login, navegar por la aplicación
   - [ ] Las requests a `/api/*` funcionan
   - [ ] Los datos se cargan correctamente

## 🐛 Solución de Problemas Comunes

### Error: CORS

```bash
# Verificar logs del backend
pm2 logs lumo-backend --lines 50

# Verificar que el origin está permitido
grep "allowedOrigins" /opt/proyecto/LUMO/backend/app.js

# Reiniciar backend
pm2 restart lumo-backend
```

### Error: 502 Bad Gateway

```bash
# Backend no está corriendo
pm2 restart lumo-backend

# Verificar logs
pm2 logs lumo-backend
sudo tail -f /var/log/nginx/lumo-error.log
```

### Error: Permission Denied (SELinux)

```bash
# Configurar contextos SELinux
sudo chcon -R -t httpd_sys_content_t /opt/proyecto/LUMO/frontend/dist
sudo chcon -R -t httpd_sys_rw_content_t /opt/proyecto/LUMO/backend/uploads
sudo setsebool -P httpd_can_network_connect 1

# Ver errores de SELinux
sudo ausearch -m avc -ts recent
```

### Frontend no se actualiza

```bash
cd /opt/proyecto/LUMO/frontend
npm run build
sudo chcon -R -t httpd_sys_content_t dist
sudo systemctl reload nginx
```

## 📊 Monitoreo Post-Deployment

### Logs a Monitorear

```bash
# PM2 (Backend)
pm2 logs lumo-backend

# Nginx Access
sudo tail -f /var/log/nginx/lumo-access.log

# Nginx Error
sudo tail -f /var/log/nginx/lumo-error.log

# Sistema (PM2 en systemd)
sudo journalctl -u pm2-$USER -f
```

### Recursos del Sistema

```bash
# CPU y Memoria del backend
pm2 monit

# Espacio en disco
df -h /opt/proyecto/LUMO

# Procesos Node
ps aux | grep node
```

## 📝 Comandos Útiles

```bash
# Reiniciar todo
pm2 restart all
sudo systemctl restart nginx

# Ver estado
pm2 status
sudo systemctl status nginx

# Ver logs
pm2 logs
sudo tail -f /var/log/nginx/lumo-error.log

# Actualizar proyecto
cd /opt/proyecto/LUMO
./update.sh

# Backup de base de datos
./backup.sh

# Health checks
curl http://localhost:3000/health
curl http://lumo.anima.edu.uy/health
```

## 🎉 Deployment Exitoso

Si todos los checks están ✅, tu aplicación está lista en:

🌐 **http://lumo.anima.edu.uy**

### Siguientes Pasos

1. [ ] Configurar backups automáticos (cron)
2. [ ] Configurar SSL/HTTPS
3. [ ] Configurar monitoreo adicional
4. [ ] Documentar credenciales de acceso
5. [ ] Capacitar a usuarios finales

---

**¡Felicitaciones! LUMO está en producción** 🚀
