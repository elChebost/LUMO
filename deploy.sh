#!/bin/bash

# Script de despliegue para LUMO
# Este script compila el frontend y prepara todo para producción

set -e  # Detener si hay algún error

echo "🚀 Iniciando despliegue de LUMO..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Compilar el frontend
echo -e "${BLUE}📦 Compilando frontend...${NC}"
cd /workspaces/LUMO/LUMO/frontend
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend compilado exitosamente${NC}"
    echo -e "   Archivos en: ./dist/"
else
    echo "❌ Error al compilar el frontend"
    exit 1
fi

echo ""

# 2. Información sobre el backend
echo -e "${BLUE}📡 Preparando backend...${NC}"
echo -e "${YELLOW}⚠️  Asegúrate de que el backend esté corriendo en producción${NC}"
echo "   Puedes usar PM2 para mantenerlo activo:"
echo "   $ npm install -g pm2"
echo "   $ cd /workspaces/LUMO/LUMO/backend"
echo "   $ pm2 start src/index.js --name lumo-backend"
echo "   $ pm2 save"
echo "   $ pm2 startup"

echo ""

# 3. Instrucciones de despliegue
echo -e "${BLUE}📋 Próximos pasos para desplegar en el servidor:${NC}"
echo ""
echo "1. Copiar archivos al servidor:"
echo "   $ scp -r LUMO/frontend/dist usuario@lumo.anima.edu.uy:/var/www/lumo/frontend/"
echo "   $ scp -r LUMO/backend usuario@lumo.anima.edu.uy:/var/www/lumo/"
echo ""
echo "2. Configurar el servidor web (Nginx o Apache):"
echo "   Nginx:"
echo "   $ sudo cp nginx.conf /etc/nginx/sites-available/lumo"
echo "   $ sudo ln -s /etc/nginx/sites-available/lumo /etc/nginx/sites-enabled/"
echo "   $ sudo nginx -t"
echo "   $ sudo systemctl reload nginx"
echo ""
echo "   Apache:"
echo "   $ sudo cp apache.conf /etc/apache2/sites-available/lumo.conf"
echo "   $ sudo a2enmod rewrite proxy proxy_http"
echo "   $ sudo a2ensite lumo"
echo "   $ sudo systemctl reload apache2"
echo ""
echo "3. Iniciar el backend con PM2:"
echo "   $ cd /var/www/lumo/backend"
echo "   $ npm install"
echo "   $ pm2 start src/index.js --name lumo-backend"
echo ""
echo "4. Configurar la base de datos:"
echo "   $ cd /var/www/lumo/backend"
echo "   $ npx prisma migrate deploy"
echo "   $ node prisma/seed.js"
echo ""
echo -e "${GREEN}✅ Build completado!${NC}"
echo -e "   El frontend compilado está en: ${BLUE}LUMO/frontend/dist/${NC}"

