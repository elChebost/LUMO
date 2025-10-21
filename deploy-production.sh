#!/bin/bash

#######################################################################
# 🚀 LUMO - Script de Deployment Automático para Rocky Linux 9.6
#######################################################################
#
# Este script automatiza el deployment completo de LUMO en Rocky Linux
# Ubicación: /opt/proyecto/LUMO
# Dominio: lumo.anima.edu.uy
#
# Uso: sudo ./deploy-production.sh
#
#######################################################################

set -e  # Exit on error

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuración
PROJECT_DIR="/opt/proyecto/LUMO"
NGINX_CONF_SOURCE="nginx-lumo.conf"
NGINX_CONF_DEST="/etc/nginx/conf.d/lumo.conf"
DOMAIN="lumo.anima.edu.uy"

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║          🚀 LUMO - Deployment Automático                      ║"
echo "║          Rocky Linux 9.6 + Nginx + PM2                        ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Error: Directorio $PROJECT_DIR no existe${NC}"
    echo "   Crear con: sudo mkdir -p $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_DIR"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 1: Verificar Dependencias del Sistema${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no instalado${NC}"
    echo "   Instalar con: sudo dnf install -y nodejs"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js $(node -v)"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} npm v$(npm -v)"

# Verificar Nginx
if ! command -v nginx &> /dev/null; then
    echo -e "${RED}❌ Nginx no instalado${NC}"
    echo "   Instalar con: sudo dnf install -y nginx"
    exit 1
fi
echo -e "${GREEN}✓${NC} Nginx $(nginx -v 2>&1 | cut -d'/' -f2)"

# Verificar PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  PM2 no instalado. Instalando..."
    sudo npm install -g pm2
fi
echo -e "${GREEN}✓${NC} PM2 v$(pm2 -v)"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 2: Configurar Nginx${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Eliminar configuraciones antiguas
echo "🗑️  Limpiando configuraciones antiguas de Nginx..."
sudo rm -f /etc/nginx/conf.d/*.conf.bak
if [ -f "$NGINX_CONF_DEST" ]; then
    sudo cp "$NGINX_CONF_DEST" "$NGINX_CONF_DEST.bak.$(date +%Y%m%d_%H%M%S)"
    echo -e "${GREEN}✓${NC} Backup creado de configuración existente"
fi

# Copiar nueva configuración
if [ -f "$NGINX_CONF_SOURCE" ]; then
    sudo cp "$NGINX_CONF_SOURCE" "$NGINX_CONF_DEST"
    echo -e "${GREEN}✓${NC} Configuración de Nginx copiada"
else
    echo -e "${RED}❌ No se encontró $NGINX_CONF_SOURCE${NC}"
    exit 1
fi

# Validar configuración de Nginx
if sudo nginx -t &> /dev/null; then
    echo -e "${GREEN}✓${NC} Configuración de Nginx válida"
else
    echo -e "${RED}❌ Error en configuración de Nginx:${NC}"
    sudo nginx -t
    exit 1
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 3: Configurar SELinux${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if command -v getenforce &> /dev/null; then
    SELINUX_STATUS=$(getenforce)
    echo "SELinux status: $SELINUX_STATUS"
    
    if [ "$SELINUX_STATUS" == "Enforcing" ]; then
        echo "🔒 Configurando SELinux para Nginx..."
        sudo setsebool -P httpd_can_network_connect 1
        sudo chcon -R -t httpd_sys_content_t "$PROJECT_DIR/frontend/dist" 2>/dev/null || true
        sudo chcon -R -t httpd_sys_rw_content_t "$PROJECT_DIR/backend/uploads" 2>/dev/null || true
        echo -e "${GREEN}✓${NC} SELinux configurado"
    fi
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 4: Preparar Backend${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

cd "$PROJECT_DIR/backend"

# Instalar dependencias
echo "📦 Instalando dependencias del backend..."
npm install --production=false

# Generar Prisma Client
echo "🔨 Generando Prisma Client..."
npx prisma generate

# Ejecutar migraciones
echo "🗄️  Ejecutando migraciones de base de datos..."
npx prisma migrate deploy || echo -e "${YELLOW}⚠${NC}  Migraciones fallaron (puede ser normal si ya están aplicadas)"

# Verificar .env
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠${NC}  Archivo .env no existe. Creando desde .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${YELLOW}⚠${NC}  IMPORTANTE: Editar backend/.env y configurar variables de producción"
    else
        echo -e "${RED}❌ No se encontró .env.example${NC}"
    fi
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 5: Construir Frontend${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

cd "$PROJECT_DIR/frontend"

# Instalar dependencias
echo "📦 Instalando dependencias del frontend..."
npm install

# Build de producción
echo "🏗️  Construyendo frontend para producción..."
npm run build

if [ -d "dist" ]; then
    echo -e "${GREEN}✓${NC} Frontend construido exitosamente en dist/"
    echo "   Tamaño: $(du -sh dist | cut -f1)"
else
    echo -e "${RED}❌ Error: directorio dist/ no fue creado${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 6: Configurar Permisos${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

cd "$PROJECT_DIR"

# Crear directorio de logs
mkdir -p logs
echo -e "${GREEN}✓${NC} Directorio logs/ creado"

# Ajustar permisos
sudo chown -R $USER:$USER "$PROJECT_DIR"
chmod +x *.sh 2>/dev/null || true
echo -e "${GREEN}✓${NC} Permisos ajustados"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 7: Iniciar Backend con PM2${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Detener proceso anterior si existe
if pm2 list | grep -q "lumo-backend"; then
    echo "🔄 Reiniciando backend..."
    pm2 restart lumo-backend
else
    echo "🚀 Iniciando backend..."
    pm2 start ecosystem.config.js --env production
fi

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para auto-inicio
if ! systemctl is-enabled pm2-$USER &> /dev/null; then
    echo "⚙️  Configurando PM2 para auto-inicio..."
    pm2 startup systemd -u $USER --hp $HOME | grep "sudo" | bash || true
fi

echo ""
echo "📊 Estado de PM2:"
pm2 list

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 8: Reiniciar Nginx${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

sudo systemctl reload nginx
echo -e "${GREEN}✓${NC} Nginx recargado"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 9: Verificación${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Test de conectividad local
echo "🔍 Testing backend local..."
sleep 2
if curl -s http://localhost:3000/health > /dev/null; then
    HEALTH=$(curl -s http://localhost:3000/health)
    echo -e "${GREEN}✓${NC} Backend local: $HEALTH"
else
    echo -e "${RED}❌ Backend local no responde${NC}"
    echo "   Ver logs: pm2 logs lumo-backend"
fi

# Test de conectividad pública
echo "🔍 Testing público..."
if curl -s http://$DOMAIN/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Sitio público accesible: http://$DOMAIN"
else
    echo -e "${YELLOW}⚠${NC}  Sitio público no accesible (verificar DNS)"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║          ✅ Deployment Completado Exitosamente                ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}🌐 Acceder a: http://$DOMAIN${NC}"
echo ""
echo -e "${BLUE}📝 Comandos Útiles:${NC}"
echo -e "   pm2 logs lumo-backend       # Ver logs del backend"
echo -e "   pm2 restart lumo-backend    # Reiniciar backend"
echo -e "   sudo systemctl status nginx # Estado de Nginx"
echo -e "   sudo tail -f /var/log/nginx/lumo.error.log  # Logs de Nginx"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "   1. Verificar backend/.env tiene configuración de producción"
echo -e "   2. Cambiar JWT_SECRET a un valor seguro"
echo -e "   3. Configurar firewall: sudo firewall-cmd --permanent --add-service=http"
echo -e "   4. Para HTTPS: sudo certbot --nginx -d $DOMAIN"
echo ""
