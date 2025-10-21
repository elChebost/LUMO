#!/bin/bash

# 🔍 LUMO - Script de Diagnóstico
# Verifica la configuración y estado del sistema

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║          🔍 LUMO - Diagnóstico del Sistema           ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Función para verificar comando
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✅ $1 está instalado${NC}"
        if [ ! -z "$2" ]; then
            version=$($2)
            echo -e "   Versión: $version"
        fi
        return 0
    else
        echo -e "${RED}❌ $1 NO está instalado${NC}"
        return 1
    fi
}

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1 existe${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 NO existe${NC}"
        return 1
    fi
}

# Función para verificar directorio
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅ $1 existe${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 NO existe${NC}"
        return 1
    fi
}

# Función para verificar puerto
check_port() {
    if command -v lsof &> /dev/null; then
        if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo -e "${GREEN}✅ Puerto $1 está en uso (servicio corriendo)${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠️  Puerto $1 está libre (servicio no corriendo)${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️  No se puede verificar puerto $1 (lsof no disponible)${NC}"
        return 2
    fi
}

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  1. Requisitos del Sistema${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

check_command "node" "node -v"
check_command "npm" "npm -v"
check_command "pm2" "pm2 -v"
check_command "git" "git --version"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  2. Estructura de Directorios${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

check_dir "backend"
check_dir "frontend"
check_dir "logs"
check_dir "backups"
check_dir "backend/node_modules"
check_dir "frontend/node_modules"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  3. Archivos de Configuración${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

check_file "backend/.env"
check_file "frontend/.env"
check_file "ecosystem.config.js"
check_file "package.json"
check_file "backend/package.json"
check_file "frontend/package.json"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  4. Scripts de Deployment${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

for script in run.sh deploy.sh update.sh stop.sh backup.sh restore.sh; do
    if check_file "$script"; then
        if [ -x "$script" ]; then
            echo -e "   ${GREEN}✓ Tiene permisos de ejecución${NC}"
        else
            echo -e "   ${YELLOW}⚠️  Sin permisos de ejecución (ejecuta: chmod +x $script)${NC}"
        fi
    fi
done

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  5. Base de Datos${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

check_file "backend/prisma/dev.db"
check_file "backend/prisma/schema.prisma"
check_dir "backend/prisma/migrations"

if [ -f "backend/prisma/dev.db" ]; then
    size=$(du -h backend/prisma/dev.db | cut -f1)
    echo -e "   Tamaño: $size"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  6. Estado de los Puertos${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

check_port 3000
check_port 4173
check_port 5173

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  7. Estado de PM2${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if command -v pm2 &> /dev/null; then
    pm2 list
    echo ""
    echo -e "${CYAN}Procesos PM2:${NC}"
    pm2 jlist 2>/dev/null | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | while read name; do
        if [ ! -z "$name" ]; then
            echo -e "${GREEN}✅ Proceso: $name${NC}"
        fi
    done
else
    echo -e "${YELLOW}⚠️  PM2 no está instalado${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  8. Recursos del Sistema${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${CYAN}Memoria:${NC}"
if command -v free &> /dev/null; then
    free -h
else
    echo -e "${YELLOW}⚠️  Comando 'free' no disponible${NC}"
fi

echo ""
echo -e "${CYAN}Espacio en Disco:${NC}"
df -h . 2>/dev/null || echo -e "${YELLOW}⚠️  No se puede verificar espacio en disco${NC}"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  9. Health Check${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if command -v curl &> /dev/null; then
    echo -e "${CYAN}Verificando backend...${NC}"
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health 2>/dev/null)
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✅ Backend responde correctamente (HTTP 200)${NC}"
        health_data=$(curl -s http://localhost:3000/health 2>/dev/null)
        echo -e "   $health_data"
    else
        echo -e "${RED}❌ Backend no responde o error (HTTP $response)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  curl no disponible, no se puede verificar health check${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  10. Resumen${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Contar problemas
problems=0

# Verificar requisitos críticos
if ! command -v node &> /dev/null; then ((problems++)); fi
if ! command -v npm &> /dev/null; then ((problems++)); fi
if [ ! -f "backend/.env" ]; then ((problems++)); fi
if [ ! -f "frontend/.env" ]; then ((problems++)); fi
if [ ! -d "backend/node_modules" ]; then ((problems++)); fi
if [ ! -d "frontend/node_modules" ]; then ((problems++)); fi

if [ $problems -eq 0 ]; then
    echo -e "${GREEN}✅ ¡Todo está configurado correctamente!${NC}"
    echo ""
    echo -e "${CYAN}Puedes iniciar LUMO con:${NC}"
    echo -e "   ${YELLOW}./run.sh${NC} (producción)"
    echo -e "   ${YELLOW}./run.sh dev${NC} (desarrollo)"
else
    echo -e "${RED}⚠️  Se encontraron $problems problema(s) que necesitan atención${NC}"
    echo ""
    echo -e "${CYAN}Recomendaciones:${NC}"
    if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
        echo -e "   ${YELLOW}1. Instala Node.js desde https://nodejs.org${NC}"
    fi
    if [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
        echo -e "   ${YELLOW}2. Ejecuta ./deploy.sh para instalar dependencias${NC}"
    fi
    if [ ! -f "backend/.env" ] || [ ! -f "frontend/.env" ]; then
        echo -e "   ${YELLOW}3. Configura los archivos .env${NC}"
    fi
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  Para más ayuda, consulta:${NC}"
echo -e "   ${BLUE}• README.md${NC} - Documentación completa"
echo -e "   ${BLUE}• DEPLOYMENT.md${NC} - Guía de deployment"
echo -e "   ${BLUE}• QUICKSTART.md${NC} - Guía rápida"
echo -e "   ${BLUE}• COMMANDS.md${NC} - Comandos útiles"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
