#!/bin/bash

# 🚀 LUMO - Script de inicio para servidor SSH
# Este script configura y ejecuta LUMO en modo producción usando PM2

set -e  # Salir si hay algún error

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Banner
echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                       ║${NC}"
echo -e "${CYAN}║            � LUMO - Sistema Educativo               ║${NC}"
echo -e "${CYAN}║            Deployment Script para Servidor SSH        ║${NC}"
echo -e "${CYAN}║                                                       ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado.${NC}"
    echo -e "${YELLOW}Por favor instala Node.js v18+ desde https://nodejs.org${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js detectado: ${NODE_VERSION}${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado.${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm detectado: v${NPM_VERSION}${NC}"
echo ""

# Detectar modo de ejecución
MODE="${1:-production}"

if [ "$MODE" = "dev" ]; then
    echo -e "${YELLOW}🔧 Modo: DESARROLLO${NC}"
    USE_PM2=false
else
    echo -e "${CYAN}🌐 Modo: PRODUCCIÓN${NC}"
    USE_PM2=true
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 1: Verificando PM2${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$USE_PM2" = true ]; then
    # Verificar si PM2 está instalado
    if ! command -v pm2 &> /dev/null; then
        echo -e "${YELLOW}📦 PM2 no está instalado. Instalando...${NC}"
        npm install -g pm2
        echo -e "${GREEN}✅ PM2 instalado correctamente${NC}"
    else
        PM2_VERSION=$(pm2 -v)
        echo -e "${GREEN}✅ PM2 ya está instalado: v${PM2_VERSION}${NC}"
    fi
else
    echo -e "${YELLOW}ℹ️  Modo desarrollo: PM2 no es necesario${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 2: Instalando dependencias${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Instalar dependencias del backend
if [ ! -d "backend/node_modules" ] || [ "$2" = "--force-install" ]; then
    echo -e "${YELLOW}📥 Instalando dependencias del backend...${NC}"
    cd backend
    npm install --production=false
    cd ..
    echo -e "${GREEN}✅ Dependencias del backend instaladas${NC}"
else
    echo -e "${GREEN}✅ Dependencias del backend ya están instaladas${NC}"
fi

# Instalar dependencias del frontend
if [ ! -d "frontend/node_modules" ] || [ "$2" = "--force-install" ]; then
    echo -e "${YELLOW}📥 Instalando dependencias del frontend...${NC}"
    cd frontend
    npm install
    cd ..
    echo -e "${GREEN}✅ Dependencias del frontend instaladas${NC}"
else
    echo -e "${GREEN}✅ Dependencias del frontend ya están instaladas${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 3: Configurando entorno${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Verificar archivo .env del backend
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Archivo backend/.env no encontrado${NC}"
    if [ -f "backend/.env.example" ]; then
        echo -e "${YELLOW}📝 Creando backend/.env desde .env.example...${NC}"
        cp backend/.env.example backend/.env
        echo -e "${GREEN}✅ Archivo backend/.env creado${NC}"
        echo -e "${YELLOW}⚠️  Por favor revisa y actualiza backend/.env con tus configuraciones${NC}"
    else
        echo -e "${RED}❌ No se encontró backend/.env.example${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Archivo backend/.env encontrado${NC}"
fi

# Verificar archivo .env del frontend
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  Archivo frontend/.env no encontrado${NC}"
    if [ -f "frontend/.env.example" ]; then
        echo -e "${YELLOW}📝 Creando frontend/.env desde .env.example...${NC}"
        cp frontend/.env.example frontend/.env
        echo -e "${GREEN}✅ Archivo frontend/.env creado${NC}"
        echo -e "${YELLOW}⚠️  Por favor actualiza frontend/.env con la URL de tu servidor${NC}"
    else
        echo -e "${RED}❌ No se encontró frontend/.env.example${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Archivo frontend/.env encontrado${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 4: Configurando base de datos${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

cd backend

# Generar cliente Prisma
echo -e "${YELLOW}🔧 Generando cliente Prisma...${NC}"
npx prisma generate

# Verificar si la base de datos existe
if [ ! -f "prisma/dev.db" ]; then
    echo -e "${YELLOW}📊 Base de datos no encontrada. Ejecutando migraciones...${NC}"
    npx prisma migrate deploy
    echo -e "${GREEN}✅ Migraciones aplicadas${NC}"
    
    echo -e "${YELLOW}🌱 ¿Deseas ejecutar seeds iniciales? (s/n)${NC}"
    read -t 10 -r response || response="n"
    if [[ "$response" =~ ^[Ss]$ ]]; then
        echo -e "${YELLOW}🌱 Ejecutando seeds...${NC}"
        node seeds/run-all-seeds.js
        echo -e "${GREEN}✅ Seeds ejecutados${NC}"
    else
        echo -e "${YELLOW}ℹ️  Seeds omitidos (puedes ejecutarlos luego con: cd backend && npm run seed)${NC}"
    fi
else
    echo -e "${GREEN}✅ Base de datos encontrada${NC}"
fi

cd ..

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 5: Construyendo frontend${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$USE_PM2" = true ]; then
    echo -e "${YELLOW}🏗️  Construyendo aplicación frontend...${NC}"
    cd frontend
    npm run build
    cd ..
    echo -e "${GREEN}✅ Frontend construido en frontend/dist${NC}"
else
    echo -e "${YELLOW}ℹ️  Modo desarrollo: construcción no necesaria${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 6: Iniciando servicios${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$USE_PM2" = true ]; then
    # Detener procesos previos si existen
    echo -e "${YELLOW}🛑 Deteniendo procesos previos de PM2...${NC}"
    pm2 delete lumo-backend 2>/dev/null || true
    pm2 delete lumo-frontend 2>/dev/null || true
    
    # Iniciar backend con PM2
    echo -e "${YELLOW}🚀 Iniciando backend con PM2...${NC}"
    pm2 start backend/app.js --name lumo-backend --time
    
    # Iniciar frontend con PM2 (servidor estático)
    echo -e "${YELLOW}🚀 Iniciando frontend con PM2...${NC}"
    pm2 start npm --name lumo-frontend -- run preview --prefix frontend
    
    # Guardar configuración de PM2
    pm2 save
    
    # Configurar PM2 para iniciar al arrancar el sistema
    echo -e "${YELLOW}⚙️  Configurando PM2 para inicio automático...${NC}"
    pm2 startup systemd -u $(whoami) --hp $HOME 2>/dev/null || echo -e "${YELLOW}ℹ️  Ejecuta el comando sugerido arriba para habilitar inicio automático${NC}"
    
    echo ""
    echo -e "${GREEN}✅ Servicios iniciados con PM2${NC}"
    echo ""
    
    # Mostrar estado de PM2
    pm2 list
    
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ LUMO está corriendo en modo PRODUCCIÓN${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${CYAN}📍 Servicios:${NC}"
    echo -e "   🔌 Backend API:  http://localhost:3000"
    echo -e "   🎨 Frontend:     http://localhost:4173"
    echo ""
    echo -e "${CYAN}🛠️  Comandos útiles:${NC}"
    echo -e "   pm2 list              - Ver estado de servicios"
    echo -e "   pm2 logs              - Ver logs en tiempo real"
    echo -e "   pm2 logs lumo-backend - Ver logs del backend"
    echo -e "   pm2 logs lumo-frontend- Ver logs del frontend"
    echo -e "   pm2 restart all       - Reiniciar todos los servicios"
    echo -e "   pm2 stop all          - Detener todos los servicios"
    echo -e "   pm2 delete all        - Eliminar todos los servicios"
    echo ""
    
else
    # Modo desarrollo
    echo -e "${YELLOW}🔧 Iniciando en modo DESARROLLO...${NC}"
    echo ""
    echo -e "${GREEN}✅ Servicios iniciados${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}🔧 LUMO está corriendo en modo DESARROLLO${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${CYAN}� Servicios:${NC}"
    echo -e "   🔌 Backend API:  http://localhost:3000"
    echo -e "   🎨 Frontend:     http://localhost:5173"
    echo ""
    echo -e "${YELLOW}Presiona Ctrl+C para detener los servicios${NC}"
    echo ""
    
    # Función para limpiar al salir
    cleanup() {
        echo ""
        echo -e "${YELLOW}🛑 Deteniendo servicios...${NC}"
        kill $(jobs -p) 2>/dev/null || true
        exit
    }
    
    trap cleanup SIGINT SIGTERM
    
    # Iniciar backend y frontend en background
    (cd backend && node app.js) &
    BACKEND_PID=$!
    
    sleep 2
    
    (cd frontend && npm run dev) &
    FRONTEND_PID=$!
    
    # Esperar a que terminen
    wait
fi
