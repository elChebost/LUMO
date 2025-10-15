#!/bin/bash

# 🚀 LUMO - Script de inicio simple y directo
# Este script arranca backend y frontend sin bucles infinitos

echo "🚀 Iniciando LUMO..."
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Función para limpiar al salir
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Deteniendo servicios...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no instalado${NC}"
    exit 1
fi

# Matar procesos previos en los puertos
echo -e "${BLUE}🧹 Limpiando puertos anteriores...${NC}"
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:5173 2>/dev/null | xargs kill -9 2>/dev/null
sleep 1

# Verificar dependencias backend
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}📥 Instalando dependencias del backend...${NC}"
    (cd backend && npm install --silent)
fi

# Verificar dependencias frontend
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}📥 Instalando dependencias del frontend...${NC}"
    (cd frontend && npm install --silent)
fi

echo ""
echo -e "${GREEN}✅ Dependencias listas${NC}"
echo ""

# Iniciar backend
echo -e "${BLUE}🔌 Iniciando Backend en puerto 3000...${NC}"
(cd backend && node app.js) &
BACKEND_PID=$!

# Esperar a que el backend arranque
sleep 3

# Iniciar frontend
echo -e "${BLUE}🎨 Iniciando Frontend en puerto 5173...${NC}"
(cd frontend && npx vite --port 5173 --strictPort) &
FRONTEND_PID=$!

# Esperar un poco
sleep 2

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Servicios iniciados correctamente:${NC}"
echo ""
echo -e "   🔌 Backend API:  ${BLUE}http://localhost:3000${NC}"
echo -e "   🎨 Frontend:     ${BLUE}http://localhost:5173${NC}"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📝 Presiona Ctrl+C para detener ambos servicios${NC}"
echo ""

# Esperar a que terminen
wait
