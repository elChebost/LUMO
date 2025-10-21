#!/bin/bash

# 🚀 LUMO - Script de Deployment para Servidor SSH
# Este script automatiza el deployment completo de LUMO

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
echo -e "${CYAN}║            🚀 LUMO - Deployment Script               ║${NC}"
echo -e "${CYAN}║                                                       ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar que estamos en la raíz del proyecto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Este script debe ejecutarse desde la raíz del proyecto LUMO${NC}"
    exit 1
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 1: Verificando requisitos del sistema${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo -e "${YELLOW}Instala Node.js v18 o superior desde https://nodejs.org${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm v$(npm -v)${NC}"

# Verificar Git (opcional pero recomendado)
if command -v git &> /dev/null; then
    echo -e "${GREEN}✅ Git $(git --version | cut -d' ' -f3)${NC}"
else
    echo -e "${YELLOW}⚠️  Git no está instalado (opcional)${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 2: Instalando PM2 (gestor de procesos)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 Instalando PM2 globalmente...${NC}"
    npm install -g pm2
    echo -e "${GREEN}✅ PM2 instalado${NC}"
else
    echo -e "${GREEN}✅ PM2 ya está instalado (v$(pm2 -v))${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 3: Creando directorios necesarios${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Crear directorio de logs
if [ ! -d "logs" ]; then
    mkdir -p logs
    echo -e "${GREEN}✅ Directorio logs/ creado${NC}"
else
    echo -e "${GREEN}✅ Directorio logs/ existe${NC}"
fi

# Crear directorio de uploads si no existe
if [ ! -d "backend/uploads" ]; then
    mkdir -p backend/uploads/avatars
    echo -e "${GREEN}✅ Directorio backend/uploads/ creado${NC}"
else
    echo -e "${GREEN}✅ Directorio backend/uploads/ existe${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 4: Configurando archivos de entorno${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Backend .env
if [ ! -f "backend/.env" ]; then
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo -e "${GREEN}✅ Archivo backend/.env creado desde .env.example${NC}"
        echo -e "${YELLOW}⚠️  IMPORTANTE: Revisa y actualiza backend/.env con tus configuraciones${NC}"
    else
        echo -e "${RED}❌ No se encontró backend/.env.example${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Archivo backend/.env ya existe${NC}"
fi

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    if [ -f "frontend/.env.example" ]; then
        cp frontend/.env.example frontend/.env
        echo -e "${GREEN}✅ Archivo frontend/.env creado desde .env.example${NC}"
        echo -e "${YELLOW}⚠️  IMPORTANTE: Actualiza VITE_API_URL en frontend/.env${NC}"
    else
        echo -e "${RED}❌ No se encontró frontend/.env.example${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Archivo frontend/.env ya existe${NC}"
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
    echo -e "${GREEN}✅ Base de datos creada y migraciones aplicadas${NC}"
    
    # Preguntar si desea ejecutar seeds
    echo -e "${YELLOW}🌱 ¿Deseas ejecutar los seeds iniciales? (s/n)${NC}"
    read -p "Respuesta: " -r REPLY
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo -e "${YELLOW}🌱 Ejecutando seeds...${NC}"
        node seeds/run-all-seeds.js
        echo -e "${GREEN}✅ Seeds ejecutados correctamente${NC}"
    fi
else
    echo -e "${GREEN}✅ Base de datos ya existe${NC}"
    echo -e "${YELLOW}ℹ️  Si necesitas actualizar el esquema, ejecuta: cd backend && npx prisma migrate deploy${NC}"
fi

cd ..

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 7: Construyendo frontend para producción${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}🏗️  Construyendo aplicación frontend...${NC}"
cd frontend
npm run build
echo -e "${GREEN}✅ Frontend construido en frontend/dist${NC}"
cd ..

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 8: Configurando PM2${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Detener procesos previos si existen
echo -e "${YELLOW}🛑 Deteniendo procesos previos...${NC}"
pm2 delete lumo-backend 2>/dev/null || true
pm2 delete lumo-frontend 2>/dev/null || true

# Iniciar con PM2 usando el archivo de configuración
if [ -f "ecosystem.config.js" ]; then
    echo -e "${YELLOW}🚀 Iniciando servicios con PM2 (usando ecosystem.config.js)...${NC}"
    pm2 start ecosystem.config.js
else
    echo -e "${YELLOW}🚀 Iniciando servicios con PM2...${NC}"
    pm2 start backend/app.js --name lumo-backend --time
    pm2 start npm --name lumo-frontend -- run preview --prefix frontend
fi

# Guardar configuración de PM2
pm2 save

echo -e "${GREEN}✅ Servicios iniciados con PM2${NC}"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Paso 9: Configurando inicio automático (opcional)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}¿Deseas configurar PM2 para que inicie automáticamente al arrancar el servidor? (s/n)${NC}"
read -p "Respuesta: " -r REPLY
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${YELLOW}⚙️  Configurando startup de PM2...${NC}"
    pm2 startup systemd -u $(whoami) --hp $HOME
    echo -e "${GREEN}✅ PM2 configurado para inicio automático${NC}"
    echo -e "${YELLOW}ℹ️  Si ves un comando arriba, cópialo y ejecútalo con sudo${NC}"
else
    echo -e "${YELLOW}ℹ️  Inicio automático no configurado${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅ ¡DEPLOYMENT COMPLETADO CON ÉXITO! ✅${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Mostrar estado de PM2
pm2 list

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  📍 INFORMACIÓN DEL SERVIDOR${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}🌐 URLs de acceso:${NC}"
echo -e "   🔌 Backend API:  http://localhost:3000"
echo -e "   🎨 Frontend:     http://localhost:4173"
echo -e "   ❤️  Health Check: http://localhost:3000/health"
echo ""
echo -e "${CYAN}🛠️  Comandos PM2 útiles:${NC}"
echo -e "   pm2 list              - Ver estado de servicios"
echo -e "   pm2 logs              - Ver logs en tiempo real"
echo -e "   pm2 logs lumo-backend - Ver logs del backend"
echo -e "   pm2 logs lumo-frontend- Ver logs del frontend"
echo -e "   pm2 restart all       - Reiniciar todos los servicios"
echo -e "   pm2 stop all          - Detener todos los servicios"
echo -e "   pm2 delete all        - Eliminar todos los servicios"
echo -e "   pm2 monit             - Monitor interactivo"
echo ""
echo -e "${CYAN}📂 Archivos de logs:${NC}"
echo -e "   Backend:  ./logs/backend-*.log"
echo -e "   Frontend: ./logs/frontend-*.log"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "   1. Configura tu firewall para permitir los puertos 3000 y 4173"
echo -e "   2. Actualiza backend/.env con las credenciales de producción"
echo -e "   3. Actualiza frontend/.env con la URL pública del backend"
echo -e "   4. Considera usar un proxy inverso (nginx) para producción"
echo ""
echo -e "${GREEN}🎉 ¡LUMO está listo para usar!${NC}"
echo ""
