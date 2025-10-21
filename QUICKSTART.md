# 🚀 LUMO - Quick Start Guide

## 🎯 Inicio Rápido

### Modo Desarrollo (Local)

```bash
# Clonar el proyecto
git clone <repository-url>
cd LUMO

# Dar permisos de ejecución
chmod +x run.sh

# Ejecutar en modo desarrollo
./run.sh dev
```

Acceder a:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

### Modo Producción (Servidor SSH)

```bash
# Conectar al servidor
ssh usuario@tu-servidor.com

# Subir el proyecto
git clone <repository-url>
cd LUMO

# Dar permisos
chmod +x deploy.sh run.sh update.sh

# Deployment completo (primera vez)
./deploy.sh

# O simplemente ejecutar
./run.sh
```

Acceder a:
- Frontend: http://tu-servidor:4173
- Backend: http://tu-servidor:3000

---

## 📦 Scripts Disponibles

### `./deploy.sh`
Script completo de deployment para primera instalación:
- Instala PM2
- Configura entorno
- Instala dependencias
- Configura base de datos
- Construye frontend
- Inicia servicios

### `./run.sh [mode]`
Ejecuta LUMO en el modo especificado:
- `./run.sh` o `./run.sh production` - Modo producción con PM2
- `./run.sh dev` - Modo desarrollo

### `./update.sh`
Actualiza el proyecto sin reinstalar todo:
- Actualiza código (git pull)
- Actualiza dependencias
- Aplica migraciones
- Reconstruye frontend
- Reinicia servicios

---

## 🛠️ Comandos PM2 Básicos

```bash
pm2 list              # Ver servicios
pm2 logs              # Ver logs en tiempo real
pm2 restart all       # Reiniciar servicios
pm2 stop all          # Detener servicios
pm2 monit             # Monitor de recursos
```

---

## 📚 Documentación Completa

Ver `DEPLOYMENT.md` para:
- Configuración detallada
- Nginx como proxy inverso
- SSL/HTTPS con Let's Encrypt
- Solución de problemas
- Optimización

---

## 🆘 Problemas Comunes

### El servidor no inicia
```bash
pm2 logs
pm2 restart all
```

### Puertos ocupados
```bash
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:4173 | xargs kill -9
./run.sh
```

### Actualizar proyecto
```bash
./update.sh
```

---

## 📞 Soporte

Para más ayuda, consulta:
- `DEPLOYMENT.md` - Guía completa de deployment
- `README.md` - Documentación del proyecto
- Logs: `pm2 logs` o `./logs/`

¡Disfruta usando LUMO! 🎉
