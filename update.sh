#!/bin/bash

# 🔄 LUMO - Script de Actualización
# Actualiza el proyecto LUMO sin necesidad de redeployment completo

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║           🔄 LUMO - Script de Actualización          ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar que PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}❌ PM2 no está instalado. Ejecuta ./deploy.sh primero${NC}"
    exit 1
fi

# Detener servicios
echo -e "${YELLOW}🛑 Deteniendo servicios...${NC}"
pm2 stop all

# Actualizar código desde Git (si aplica)
if [ -d ".git" ]; then
    echo -e "${YELLOW}📥 Actualizando código desde repositorio...${NC}"
    git pull origin main || git pull origin master
    echo -e "${GREEN}✅ Código actualizado${NC}"
else
    echo -e "${YELLOW}ℹ️  No es un repositorio Git, omitiendo pull${NC}"
fi

# Actualizar dependencias del backend
echo -e "${YELLOW}📦 Actualizando dependencias del backend...${NC}"
cd backend
npm install --production=false
echo -e "${GREEN}✅ Backend actualizado${NC}"

# Actualizar cliente Prisma
echo -e "${YELLOW}🔧 Actualizando cliente Prisma...${NC}"
npx prisma generate

# Aplicar migraciones si hay
echo -e "${YELLOW}📊 Aplicando migraciones de base de datos...${NC}"
npx prisma migrate deploy
echo -e "${GREEN}✅ Migraciones aplicadas${NC}"

cd ..

# Actualizar dependencias del frontend
echo -e "${YELLOW}📦 Actualizando dependencias del frontend...${NC}"
cd frontend
npm install

# Reconstruir frontend
echo -e "${YELLOW}🏗️  Reconstruyendo frontend...${NC}"
npm run build
echo -e "${GREEN}✅ Frontend reconstruido${NC}"

cd ..

# Reiniciar servicios
echo -e "${YELLOW}🚀 Reiniciando servicios...${NC}"
pm2 restart all

# Guardar estado
pm2 save

echo ""
echo -e "${GREEN}✅ Actualización completada exitosamente${NC}"
echo ""
echo -e "${CYAN}📊 Estado de los servicios:${NC}"
pm2 list

echo ""
echo -e "${YELLOW}📝 Ver logs con: pm2 logs${NC}"
echo ""
