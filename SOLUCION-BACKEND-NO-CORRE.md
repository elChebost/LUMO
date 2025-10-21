# 🆘 Solución: Backend NO está corriendo (ERR_CONNECTION_REFUSED)

## 🔍 Diagnóstico del Problema

**Error**: `POST http://localhost:3000/api/auth/login net::ERR_CONNECTION_REFUSED`

**Causa**: El backend de LUMO NO está corriendo en el servidor de producción.

---

## ✅ Solución Paso a Paso

### Paso 1: Conectarse al Servidor

```bash
ssh usuario@lumo.anima.edu.uy
```

### Paso 2: Verificar Estado del Backend

```bash
cd /opt/proyecto/LUMO

# Ejecutar script de verificación
chmod +x check-backend-production.sh
./check-backend-production.sh
```

### Paso 3: Verificar si PM2 está instalado

```bash
pm2 list
```

**Si PM2 NO está instalado:**
```bash
sudo npm install -g pm2
```

### Paso 4: Iniciar el Backend

#### Opción A: Iniciar con PM2 (Recomendado)

```bash
cd /opt/proyecto/LUMO

# Instalar dependencias del backend
cd backend
npm install

# Volver al directorio principal
cd ..

# Iniciar con PM2
pm2 start ecosystem.config.js

# Guardar configuración de PM2
pm2 save

# Hacer que PM2 inicie al arrancar el sistema
pm2 startup
# Ejecutar el comando que PM2 te muestra
```

#### Opción B: Iniciar manualmente (temporal, para testing)

```bash
cd /opt/proyecto/LUMO/backend

# Instalar dependencias
npm install

# Iniciar backend
npm start
```

### Paso 5: Verificar que está corriendo

```bash
# Ver procesos PM2
pm2 list

# Debería mostrar algo como:
# ┌─────┬──────────────┬─────────┬─────────┬───────────┐
# │ id  │ name         │ mode    │ status  │ cpu       │
# ├─────┼──────────────┼─────────┼─────────┼───────────┤
# │ 0   │ lumo-backend │ cluster │ online  │ 0%        │
# └─────┴──────────────┴─────────┴─────────┴───────────┘

# Test de conectividad
curl http://localhost:3000/health

# Debería responder: {"status":"ok","service":"LUMO Backend","timestamp":"..."}
```

### Paso 6: Verificar logs (si hay errores)

```bash
# Ver logs en tiempo real
pm2 logs lumo-backend

# Ver últimas 50 líneas
pm2 logs lumo-backend --lines 50

# Ver solo errores
pm2 logs lumo-backend --err
```

---

## 🐛 Problemas Comunes

### Problema 1: Puerto 3000 ya en uso

**Síntoma**: Error `EADDRINUSE`

**Solución**:
```bash
# Encontrar el proceso usando el puerto 3000
sudo lsof -i :3000

# O con netstat
sudo netstat -tulpn | grep :3000

# Matar el proceso
sudo kill -9 <PID>

# Reiniciar backend
pm2 restart lumo-backend
```

### Problema 2: Base de datos no existe

**Síntoma**: Error `P1003` o `Database file doesn't exist`

**Solución**:
```bash
cd /opt/proyecto/LUMO/backend

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Seed inicial (opcional)
npm run seed

# Reiniciar backend
pm2 restart lumo-backend
```

### Problema 3: Permisos de archivos

**Síntoma**: Error `EACCES` o `Permission denied`

**Solución**:
```bash
# Ajustar permisos del proyecto
sudo chown -R $USER:$USER /opt/proyecto/LUMO

# Permisos de la base de datos
chmod 644 /opt/proyecto/LUMO/backend/prisma/dev.db

# Permisos de directorios
chmod 755 /opt/proyecto/LUMO/backend/uploads
```

### Problema 4: Variables de entorno faltantes

**Síntoma**: Backend inicia pero falla al autenticar

**Solución**:
```bash
cd /opt/proyecto/LUMO/backend

# Verificar que existe .env
ls -la .env

# Si no existe, copiar del ejemplo
cp .env.example .env

# Editar .env
nano .env

# Asegurar que tenga:
# PORT=3000
# HOST=127.0.0.1
# FRONTEND_URL=http://lumo.anima.edu.uy
# JWT_SECRET=<tu-secret-seguro>
# DATABASE_URL="file:./prisma/dev.db"

# Reiniciar backend
pm2 restart lumo-backend
```

### Problema 5: Node.js no instalado o versión incorrecta

**Síntoma**: `command not found: node` o errores de sintaxis

**Solución**:
```bash
# Verificar versión
node -v

# Debe ser v18 o superior
# Si no está instalado o es antigua:
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# Verificar instalación
node -v
npm -v
```

---

## 🔄 Script Rápido de Inicio

Crea un archivo `start-backend.sh`:

```bash
#!/bin/bash

echo "🚀 Iniciando Backend LUMO..."
echo ""

cd /opt/proyecto/LUMO/backend

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 2. Generar Prisma Client
echo "🔨 Generando Prisma Client..."
npx prisma generate

# 3. Ejecutar migraciones
echo "🗄️  Ejecutando migraciones..."
npx prisma migrate deploy

# 4. Volver al directorio principal
cd ..

# 5. Iniciar con PM2
echo "🎯 Iniciando con PM2..."
pm2 start ecosystem.config.js

# 6. Guardar configuración
pm2 save

# 7. Verificar estado
echo ""
echo "✅ Estado actual:"
pm2 list

echo ""
echo "🔍 Test de conectividad:"
sleep 2
curl http://localhost:3000/health

echo ""
echo "✅ Backend iniciado correctamente"
echo "📝 Ver logs: pm2 logs lumo-backend"
```

**Usar el script:**
```bash
cd /opt/proyecto/LUMO
chmod +x start-backend.sh
./start-backend.sh
```

---

## 📊 Checklist de Verificación

Después de iniciar el backend, verifica:

- [ ] PM2 muestra el proceso como "online": `pm2 list`
- [ ] Puerto 3000 está escuchando: `sudo netstat -tulpn | grep :3000`
- [ ] Health check responde: `curl http://localhost:3000/health`
- [ ] Nginx puede conectarse: `curl http://127.0.0.1:3000/health`
- [ ] No hay errores en logs: `pm2 logs lumo-backend --lines 20`
- [ ] Frontend puede conectarse: Abrir `http://lumo.anima.edu.uy` e intentar login

---

## 🎯 Resumen

El problema `ERR_CONNECTION_REFUSED` significa que **el backend no está corriendo**.

**Solución rápida:**
```bash
ssh usuario@lumo.anima.edu.uy
cd /opt/proyecto/LUMO
pm2 start ecosystem.config.js
pm2 save
```

**Verificar:**
```bash
pm2 list
curl http://localhost:3000/health
```

**Ver logs:**
```bash
pm2 logs lumo-backend
```

---

## 📞 Si el problema persiste

1. Ejecuta el script de verificación:
   ```bash
   ./check-backend-production.sh
   ```

2. Copia la salida completa de:
   ```bash
   pm2 logs lumo-backend --lines 50 --nostream
   ```

3. Verifica el archivo de configuración:
   ```bash
   cat backend/.env
   ```

4. Verifica Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```
