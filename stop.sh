#!/bin/bash

# 🛑 LUMO - Script para detener servicios
# Detiene todos los servicios de LUMO de forma limpia

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}🛑 Deteniendo servicios de LUMO...${NC}"
echo ""

# Verificar si PM2 está instalado y corriendo
if command -v pm2 &> /dev/null; then
    # Detener servicios de LUMO
    echo -e "${YELLOW}Deteniendo servicios con PM2...${NC}"
    pm2 stop lumo-backend 2>/dev/null || true
    pm2 stop lumo-frontend 2>/dev/null || true
    
    echo -e "${YELLOW}¿Deseas eliminar los servicios de PM2? (s/n)${NC}"
    read -t 10 -r response || response="n"
    if [[ "$response" =~ ^[Ss]$ ]]; then
        pm2 delete lumo-backend 2>/dev/null || true
        pm2 delete lumo-frontend 2>/dev/null || true
        pm2 save
        echo -e "${GREEN}✅ Servicios eliminados de PM2${NC}"
    else
        echo -e "${YELLOW}ℹ️  Servicios detenidos pero no eliminados${NC}"
        echo -e "${YELLOW}   Para reiniciar: pm2 restart all${NC}"
    fi
else
    echo -e "${YELLOW}PM2 no está instalado o no hay servicios corriendo${NC}"
fi

# Matar procesos de Node en los puertos de LUMO (fallback)
echo -e "${YELLOW}Verificando puertos 3000 y 4173...${NC}"
if command -v lsof &> /dev/null; then
    lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
    lsof -ti:4173 2>/dev/null | xargs kill -9 2>/dev/null || true
    lsof -ti:5173 2>/dev/null | xargs kill -9 2>/dev/null || true
elif command -v netstat &> /dev/null; then
    # Alternativa en sistemas sin lsof
    PID_3000=$(netstat -tulpn 2>/dev/null | grep :3000 | awk '{print $7}' | cut -d'/' -f1)
    PID_4173=$(netstat -tulpn 2>/dev/null | grep :4173 | awk '{print $7}' | cut -d'/' -f1)
    PID_5173=$(netstat -tulpn 2>/dev/null | grep :5173 | awk '{print $7}' | cut -d'/' -f1)
    
    [ ! -z "$PID_3000" ] && kill -9 $PID_3000 2>/dev/null || true
    [ ! -z "$PID_4173" ] && kill -9 $PID_4173 2>/dev/null || true
    [ ! -z "$PID_5173" ] && kill -9 $PID_5173 2>/dev/null || true
fi

echo ""
echo -e "${GREEN}✅ Servicios de LUMO detenidos${NC}"
echo ""

# Mostrar estado final si PM2 está disponible
if command -v pm2 &> /dev/null; then
    pm2 list
fi
