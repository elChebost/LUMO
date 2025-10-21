#!/bin/bash

# 🚀 LUMO - Script de Deployment para Rocky Linux 9.6
# Este script automatiza el deployment en /opt/proyecto/LUMO

set -e  # Salir si hay algún error

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                       ║${NC}"
echo -e "${CYAN}║      🚀 LUMO - Deployment para Rocky Linux 9.6       ║${NC}"
echo -e "${CYAN}║           Dominio: lumo.anima.edu.uy                  ║${NC}"
echo -e "${CYAN}║                                                       ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar que estamos en Rocky Linux
if [ -f /etc/rocky-release ]; then
    ROCKY_VERSION=$(cat /etc/rocky-release)
    echo -e "${GREEN}✅ Sistema: $ROCKY_VERSION${NC}"
else
    echo -e "${YELLOW}⚠️  Advertencia: No se detectó Rocky Linux${NC}"
fi

# Verificar que estamos en el directorio correcto
PROJECT_DIR="/opt/proyecto/LUMO"
if [ "$PWD" != "$PROJECT_DIR" ]; then
    if [ -d "$PROJECT_DIR" ]; then
        echo -e "${YELLOW}📂 Cambiando al directorio del proyecto...${NC}"
        cd "$PROJECT_DIR"
    else
        echo -e "${YELLOW}⚠️  Directorio $PROJECT_DIR no existe${NC}"
        echo -e "${YELLOW}ℹ️  Continuando desde directorio actual: $PWD${NC}"
    fi
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 1: Verificando requisitos del sistema${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo -e "${YELLOW}Instalando Node.js v20...${NC}"
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo dnf install -y nodejs
    echo -e "${GREEN}✅ Node.js instalado${NC}"
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js: ${NODE_VERSION}${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm: v${NPM_VERSION}${NC}"

# Verificar Nginx
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}⚠️  Nginx no está instalado${NC}"
    echo -e "${YELLOW}Instalando Nginx...${NC}"
    sudo dnf install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    echo -e "${GREEN}✅ Nginx instalado y iniciado${NC}"
else
    echo -e "${GREEN}✅ Nginx instalado${NC}"
fi

# Verificar PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 PM2 no está instalado. Instalando...${NC}"
    sudo npm install -g pm2
    echo -e "${GREEN}✅ PM2 instalado${NC}"
else
    PM2_VERSION=$(pm2 -v)
    echo -e "${GREEN}✅ PM2: v${PM2_VERSION}${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 2: Configurando SELinux y Firewall${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Configurar SELinux
echo -e "${YELLOW}⚙️  Configurando SELinux...${NC}"
sudo setsebool -P httpd_can_network_connect 1 || true
echo -e "${GREEN}✅ SELinux configurado${NC}"

# Configurar Firewall
echo -e "${YELLOW}🔥 Configurando Firewall...${NC}"
sudo firewall-cmd --permanent --add-service=http || true
sudo firewall-cmd --permanent --add-service=https || true
sudo firewall-cmd --reload || true
echo -e "${GREEN}✅ Firewall configurado${NC}"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 3: Creando estructura de directorios${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Crear directorios necesarios
mkdir -p logs
mkdir -p backend/uploads/avatars
mkdir -p backups
echo -e "${GREEN}✅ Directorios creados${NC}"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 4: Configurando archivos de entorno${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Backend .env
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}📝 Creando backend/.env...${NC}"
    cp backend/.env.example backend/.env
    
    # Actualizar valores para producción
    sed -i 's/NODE_ENV=development/NODE_ENV=production/' backend/.env
    sed -i 's/HOST=0.0.0.0/HOST=127.0.0.1/' backend/.env
    sed -i 's|FRONTEND_URL=http://lumo.anima.edu.uy|FRONTEND_URL=http://lumo.anima.edu.uy|' backend/.env
    
    echo -e "${GREEN}✅ backend/.env creado${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANTE: Actualiza JWT_SECRET en backend/.env antes de producción${NC}"
else
    echo -e "${GREEN}✅ backend/.env ya existe${NC}"
fi

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}📝 Creando frontend/.env...${NC}"
    cp frontend/.env.example frontend/.env
    
    # Configurar API URL para producción
    echo "VITE_API_URL=http://lumo.anima.edu.uy/api" > frontend/.env
    
    echo -e "${GREEN}✅ frontend/.env creado${NC}"
else
    echo -e "${GREEN}✅ frontend/.env ya existe${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 5: Instalando dependencias${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Backend
echo -e "${YELLOW}📥 Instalando dependencias del backend...${NC}"
cd backend
npm install --production=false
echo -e "${GREEN}✅ Backend dependencias instaladas${NC}"
cd ..

# Frontend
echo -e "${YELLOW}📥 Instalando dependencias del frontend...${NC}"
cd frontend
npm install
echo -e "${GREEN}✅ Frontend dependencias instaladas${NC}"
cd ..

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 6: Configurando base de datos${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

cd backend

# Generar cliente Prisma
echo -e "${YELLOW}🔧 Generando cliente Prisma...${NC}"
npx prisma generate
echo -e "${GREEN}✅ Cliente Prisma generado${NC}"

# Aplicar migraciones
if [ ! -f "prisma/dev.db" ]; then
    echo -e "${YELLOW}📊 Creando base de datos y aplicando migraciones...${NC}"
    npx prisma migrate deploy
    echo -e "${GREEN}✅ Base de datos creada${NC}"
    
    # Preguntar por seeds
    echo -e "${YELLOW}🌱 ¿Deseas ejecutar seeds (datos iniciales)? (s/n)${NC}"
    read -t 10 -r response || response="n"
    if [[ $response =~ ^[Ss]$ ]]; then
        npm run seed
        echo -e "${GREEN}✅ Seeds ejecutados${NC}"
    fi
else
    echo -e "${GREEN}✅ Base de datos ya existe${NC}"
fi

cd ..

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 7: Construyendo frontend${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}🏗️  Construyendo frontend para producción...${NC}"
cd frontend
npm run build
echo -e "${GREEN}✅ Frontend construido en frontend/dist${NC}"
cd ..

# Configurar permisos SELinux para el frontend
if [ -d "frontend/dist" ]; then
    echo -e "${YELLOW}🔒 Configurando permisos SELinux...${NC}"
    sudo chcon -R -t httpd_sys_content_t frontend/dist || true
    echo -e "${GREEN}✅ Permisos configurados${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 8: Configurando Nginx${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Copiar configuración de Nginx
if [ -f "nginx-rocky-linux.conf" ]; then
    echo -e "${YELLOW}📝 Copiando configuración de Nginx...${NC}"
    sudo cp nginx-rocky-linux.conf /etc/nginx/conf.d/lumo.conf
    
    # Verificar configuración
    if sudo nginx -t; then
        echo -e "${GREEN}✅ Configuración de Nginx válida${NC}"
        sudo systemctl reload nginx
        echo -e "${GREEN}✅ Nginx recargado${NC}"
    else
        echo -e "${RED}❌ Error en la configuración de Nginx${NC}"
        echo -e "${YELLOW}ℹ️  Revisa /etc/nginx/conf.d/lumo.conf${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Archivo nginx-rocky-linux.conf no encontrado${NC}"
    echo -e "${YELLOW}ℹ️  Configura Nginx manualmente${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 9: Iniciando backend con PM2${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Detener procesos previos
echo -e "${YELLOW}🛑 Deteniendo procesos previos...${NC}"
pm2 delete lumo-backend 2>/dev/null || true

# Iniciar backend
echo -e "${YELLOW}🚀 Iniciando backend con PM2...${NC}"
if [ -f "ecosystem.config.js" ]; then
    pm2 start ecosystem.config.js
else
    pm2 start backend/app.js --name lumo-backend
fi

# Guardar configuración
pm2 save
echo -e "${GREEN}✅ Backend iniciado${NC}"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 10: Configurando inicio automático${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}¿Configurar PM2 para inicio automático? (s/n)${NC}"
read -t 10 -r response || response="n"
if [[ $response =~ ^[Ss]$ ]]; then
    pm2 startup systemd -u $(whoami) --hp $HOME
    echo -e "${GREEN}✅ PM2 configurado${NC}"
    echo -e "${YELLOW}ℹ️  Ejecuta el comando sudo que PM2 muestra arriba${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅ ¡DEPLOYMENT COMPLETADO! ✅${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Mostrar estado de PM2
pm2 list

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  📍 INFORMACIÓN DEL DESPLIEGUE${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}🌐 URLs de acceso:${NC}"
echo -e "   🎨 Frontend:     http://lumo.anima.edu.uy"
echo -e "   ❤️  Health Check: http://lumo.anima.edu.uy/health"
echo -e "   🔌 Backend Local: http://localhost:3000"
echo ""
echo -e "${CYAN}🛠️  Comandos útiles:${NC}"
echo -e "   pm2 list              - Ver estado de servicios"
echo -e "   pm2 logs              - Ver logs en tiempo real"
echo -e "   pm2 restart all       - Reiniciar servicios"
echo -e "   sudo systemctl status nginx - Estado de Nginx"
echo ""
echo -e "${CYAN}📂 Ubicaciones:${NC}"
echo -e "   Proyecto:   $PWD"
echo -e "   Frontend:   $PWD/frontend/dist"
echo -e "   Logs PM2:   $PWD/logs/"
echo -e "   Logs Nginx: /var/log/nginx/lumo-*.log"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "   1. Actualiza JWT_SECRET en backend/.env"
echo -e "   2. Verifica que el dominio apunte a este servidor"
echo -e "   3. Considera configurar SSL con: sudo certbot --nginx -d lumo.anima.edu.uy"
echo ""
echo -e "${GREEN}🎉 ¡LUMO está listo para usar en lumo.anima.edu.uy!${NC}"
echo ""
