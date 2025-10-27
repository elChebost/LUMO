#!/bin/bash

# 🚀 Script de Deployment Automatizado - LUMO
# Este script construye el frontend y reinicia los servicios

set -e  # Detener si hay algún error

echo "🚀 Iniciando deployment de LUMO..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Directorio del proyecto
PROJECT_DIR="/opt/proyecto/LUMO"

# Verificar que estamos en el directorio correcto
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Error: Directorio $PROJECT_DIR no encontrado${NC}"
    exit 1
fi

cd "$PROJECT_DIR"

echo -e "${YELLOW}📦 Paso 1: Construyendo Frontend...${NC}"
cd frontend
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend construido exitosamente${NC}"
else
    echo -e "${RED}❌ Error al construir el frontend${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📋 Paso 2: Verificando archivos generados...${NC}"
if [ -d "dist/assets" ]; then
    echo -e "${GREEN}✅ Directorio dist/assets/ existe${NC}"
    echo "   Archivos en assets/:"
    ls -lh dist/assets/ | grep -E '\.(png|jpg|jpeg|gif|svg)$' || echo "   No hay imágenes"
else
    echo -e "${RED}❌ Error: No se encontró dist/assets/${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🔧 Paso 3: Ajustando permisos...${NC}"
sudo chown -R nginx:nginx dist/
sudo chmod -R 755 dist/
echo -e "${GREEN}✅ Permisos ajustados${NC}"

echo ""
echo -e "${YELLOW}🔄 Paso 4: Reiniciando servicios...${NC}"

# Verificar configuración de nginx
echo "   Verificando configuración de Nginx..."
sudo nginx -t
if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✅ Configuración de Nginx válida${NC}"
    sudo systemctl reload nginx
    echo -e "${GREEN}   ✅ Nginx recargado${NC}"
else
    echo -e "${RED}   ❌ Error en configuración de Nginx${NC}"
    exit 1
fi

# Reiniciar backend con PM2
cd "$PROJECT_DIR"
echo "   Reiniciando backend con PM2..."
pm2 restart lumo-backend
if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✅ Backend reiniciado${NC}"
else
    echo -e "${RED}   ❌ Error al reiniciar backend${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🧪 Paso 5: Verificando deployment...${NC}"

# Verificar que nginx responde
echo "   Verificando que el sitio responde..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/)
if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}   ✅ Sitio web responde correctamente (HTTP 200)${NC}"
else
    echo -e "${RED}   ❌ Sitio web no responde correctamente (HTTP $HTTP_STATUS)${NC}"
fi

# Verificar que los assets son accesibles
echo "   Verificando assets..."
for asset in icon.png avatar.png icon_text.png portada.png; do
    ASSET_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/assets/$asset)
    if [ "$ASSET_STATUS" = "200" ]; then
        echo -e "${GREEN}   ✅ /assets/$asset accesible${NC}"
    else
        echo -e "${YELLOW}   ⚠️  /assets/$asset no accesible (HTTP $ASSET_STATUS)${NC}"
    fi
done

# Verificar que el backend responde
echo "   Verificando API backend..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/health || echo "000")
if [ "$API_STATUS" = "200" ]; then
    echo -e "${GREEN}   ✅ API backend responde correctamente${NC}"
else
    echo -e "${YELLOW}   ⚠️  API backend no responde (HTTP $API_STATUS)${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Deployment completado exitosamente!${NC}"
echo ""
echo "📊 Estado de los servicios:"
pm2 status
echo ""
echo "🌐 Sitio disponible en: http://lumo.anima.edu.uy"
echo "📝 Ver logs: pm2 logs lumo-backend"
echo "📝 Logs nginx: sudo tail -f /var/log/nginx/lumo.access.log"
