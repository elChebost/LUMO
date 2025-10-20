#!/bin/bash

# 🚀 LUMO - Script de inicio completo
# Este script arranca el backend y frontend simultáneamente

echo "🚀 Iniciando LUMO..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Deteniendo servicios...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit
}

# Capturar Ctrl+C para limpiar procesos
trap cleanup SIGINT SIGTERM

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado. Por favor instálalo primero.${NC}"
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado. Por favor instálalo primero.${NC}"
    exit 1
fi

# Limpiar puertos previos
echo -e "${BLUE}🧹 Limpiando puertos anteriores...${NC}"
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:5173 2>/dev/null | xargs kill -9 2>/dev/null
sleep 1

echo -e "${BLUE}📦 Verificando dependencias...${NC}"

# Instalar dependencias del backend si es necesario
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}📥 Instalando dependencias del backend...${NC}"
    (cd backend && npm install --silent)
fi

# Instalar dependencias del frontend si es necesario
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}📥 Instalando dependencias del frontend...${NC}"
    (cd frontend && npm install --silent)
fi

echo ""
echo -e "${GREEN}✅ Dependencias verificadas${NC}"
echo ""
echo -e "${BLUE}🔌 Iniciando Backend (Puerto 3000)...${NC}"
echo -e "${BLUE}🎨 Iniciando Frontend (Puerto 5173)...${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Iniciar backend en background (directamente node, no npm start)
(cd backend && node app.js) &
BACKEND_PID=$!

# Esperar 3 segundos para que el backend arranque
sleep 3

# Iniciar frontend en background (directamente vite con puerto fijo)
(cd frontend && npx vite --port 5173 --strictPort) &
FRONTEND_PID=$!

sleep 2

echo ""
echo -e "${GREEN}✅ Servicios iniciados:${NC}"
echo "   🔌 Backend:  http://localhost:3000"
echo "   🎨 Frontend: http://localhost:5173"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "📝 Presiona ${YELLOW}Ctrl+C${NC} para detener ambos servicios"
echo ""

# Esperar a que los procesos terminen
wait
