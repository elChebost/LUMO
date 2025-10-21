#!/bin/bash

# 🔍 LUMO - Script de Verificación para Rocky Linux 9.6
# Verifica que el deployment esté completo y funcionando

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║    🔍 LUMO - Verificación de Deployment Rocky Linux  ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Función para check exitoso
check_ok() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para check fallido
check_fail() {
    echo -e "${RED}❌ $1${NC}"
    ((ERRORS++))
}

# Función para advertencia
check_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  1. Verificando Sistema Operativo${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -f /etc/rocky-release ]; then
    check_ok "Rocky Linux detectado: $(cat /etc/rocky-release)"
else
    check_warn "No es Rocky Linux, pero puede funcionar"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  2. Verificando Software Requerido${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    check_ok "Node.js $NODE_VERSION"
else
    check_fail "Node.js NO instalado"
fi

# npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    check_ok "npm v$NPM_VERSION"
else
    check_fail "npm NO instalado"
fi

# PM2
if command -v pm2 &> /dev/null; then
    PM2_VERSION=$(pm2 -v)
    check_ok "PM2 v$PM2_VERSION"
else
    check_fail "PM2 NO instalado"
fi

# Nginx
if command -v nginx &> /dev/null; then
    NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)
    check_ok "Nginx $NGINX_VERSION"
    
    # Verificar que está corriendo
    if sudo systemctl is-active nginx &> /dev/null; then
        check_ok "Nginx está corriendo"
    else
        check_fail "Nginx NO está corriendo"
    fi
else
    check_fail "Nginx NO instalado"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  3. Verificando Estructura del Proyecto${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

PROJECT_DIR="/opt/proyecto/LUMO"

# Verificar directorio principal
if [ -d "$PROJECT_DIR" ]; then
    check_ok "Directorio del proyecto: $PROJECT_DIR"
    cd "$PROJECT_DIR"
else
    check_fail "Directorio $PROJECT_DIR NO existe"
    PROJECT_DIR="$PWD"
    check_warn "Usando directorio actual: $PROJECT_DIR"
fi

# Verificar subdirectorios
if [ -d "backend" ]; then
    check_ok "Directorio backend/"
else
    check_fail "Directorio backend/ NO existe"
fi

if [ -d "frontend" ]; then
    check_ok "Directorio frontend/"
else
    check_fail "Directorio frontend/ NO existe"
fi

if [ -d "frontend/dist" ]; then
    check_ok "Frontend construido (dist/)"
else
    check_fail "Frontend NO construido (falta dist/)"
fi

if [ -d "logs" ]; then
    check_ok "Directorio logs/"
else
    check_warn "Directorio logs/ NO existe"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  4. Verificando Archivos de Configuración${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Backend .env
if [ -f "backend/.env" ]; then
    check_ok "backend/.env existe"
    
    # Verificar variables críticas
    if grep -q "FRONTEND_URL" backend/.env; then
        check_ok "FRONTEND_URL configurado"
    else
        check_warn "FRONTEND_URL NO configurado en backend/.env"
    fi
    
    if grep -q "JWT_SECRET" backend/.env; then
        DEFAULT_SECRET="lumo_super_secret_jwt_key_2024"
        if grep -q "$DEFAULT_SECRET" backend/.env; then
            check_warn "JWT_SECRET usa valor por defecto (cámbialo en producción)"
        else
            check_ok "JWT_SECRET personalizado"
        fi
    fi
else
    check_fail "backend/.env NO existe"
fi

# Frontend .env
if [ -f "frontend/.env" ]; then
    check_ok "frontend/.env existe"
    
    if grep -q "VITE_API_URL" frontend/.env; then
        API_URL=$(grep "VITE_API_URL" frontend/.env | cut -d'=' -f2)
        check_ok "VITE_API_URL: $API_URL"
        
        if [[ "$API_URL" == *"lumo.anima.edu.uy/api"* ]]; then
            check_ok "API URL apunta correctamente al dominio"
        else
            check_warn "API URL no apunta a lumo.anima.edu.uy/api"
        fi
    fi
else
    check_fail "frontend/.env NO existe"
fi

# Nginx config
if [ -f "/etc/nginx/conf.d/lumo.conf" ]; then
    check_ok "Configuración Nginx: /etc/nginx/conf.d/lumo.conf"
    
    # Verificar sintaxis
    if sudo nginx -t &> /dev/null; then
        check_ok "Configuración de Nginx es válida"
    else
        check_fail "Configuración de Nginx tiene errores"
    fi
else
    check_fail "Configuración Nginx NO encontrada"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  5. Verificando Base de Datos${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -f "backend/prisma/dev.db" ]; then
    DB_SIZE=$(du -h backend/prisma/dev.db | cut -f1)
    check_ok "Base de datos existe ($DB_SIZE)"
else
    check_fail "Base de datos NO existe"
fi

if [ -f "backend/prisma/schema.prisma" ]; then
    check_ok "Schema Prisma existe"
else
    check_fail "Schema Prisma NO existe"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  6. Verificando Backend (PM2)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if command -v pm2 &> /dev/null; then
    # Ver si el proceso está corriendo
    if pm2 list | grep -q "lumo-backend.*online"; then
        check_ok "Backend corriendo en PM2"
        
        # Verificar puerto
        if sudo netstat -tulpn 2>/dev/null | grep -q ":3000"; then
            check_ok "Puerto 3000 está escuchando"
        elif sudo ss -tulpn 2>/dev/null | grep -q ":3000"; then
            check_ok "Puerto 3000 está escuchando"
        else
            check_fail "Puerto 3000 NO está escuchando"
        fi
    else
        check_fail "Backend NO está corriendo en PM2"
    fi
else
    check_fail "PM2 no disponible"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  7. Verificando SELinux y Firewall${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# SELinux
if command -v getenforce &> /dev/null; then
    SELINUX_STATUS=$(getenforce)
    check_ok "SELinux: $SELINUX_STATUS"
    
    if getsebool httpd_can_network_connect 2>/dev/null | grep -q "on"; then
        check_ok "SELinux: httpd_can_network_connect habilitado"
    else
        check_fail "SELinux: httpd_can_network_connect NO habilitado"
    fi
else
    check_warn "SELinux no disponible (puede no ser necesario)"
fi

# Firewall
if command -v firewall-cmd &> /dev/null; then
    if sudo firewall-cmd --list-services | grep -q "http"; then
        check_ok "Firewall: HTTP permitido"
    else
        check_warn "Firewall: HTTP NO permitido"
    fi
    
    if sudo firewall-cmd --list-services | grep -q "https"; then
        check_ok "Firewall: HTTPS permitido"
    else
        check_warn "Firewall: HTTPS NO permitido (para futuro SSL)"
    fi
else
    check_warn "firewall-cmd no disponible"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  8. Verificando Conectividad${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Health check local
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    HEALTH=$(curl -s http://localhost:3000/health)
    check_ok "Health check local: $HEALTH"
else
    check_fail "Health check local FALLÓ"
fi

# Health check público
if curl -s http://lumo.anima.edu.uy/health > /dev/null 2>&1; then
    check_ok "Health check público: http://lumo.anima.edu.uy/health"
else
    check_warn "Health check público FALLÓ (verifica DNS/dominio)"
fi

# Frontend público
if curl -s -o /dev/null -w "%{http_code}" http://lumo.anima.edu.uy | grep -q "200"; then
    check_ok "Frontend accesible: http://lumo.anima.edu.uy"
else
    check_warn "Frontend NO accesible (verifica Nginx)"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  9. Verificando CORS${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Test CORS preflight
CORS_TEST=$(curl -s -o /dev/null -w "%{http_code}" \
    -X OPTIONS http://localhost:3000/api/auth/login \
    -H "Origin: http://lumo.anima.edu.uy" \
    -H "Access-Control-Request-Method: POST")

if [ "$CORS_TEST" = "204" ] || [ "$CORS_TEST" = "200" ]; then
    check_ok "CORS preflight responde correctamente"
else
    check_fail "CORS preflight FALLÓ (código: $CORS_TEST)"
fi

# Verificar allowedOrigins en app.js
if grep -q "lumo.anima.edu.uy" backend/app.js; then
    check_ok "Backend permite origin lumo.anima.edu.uy"
else
    check_fail "Backend NO permite origin lumo.anima.edu.uy"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  10. Resumen${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ ¡TODO ESTÁ PERFECTO!${NC}"
    echo -e "${GREEN}   LUMO está completamente funcional en Rocky Linux 9.6${NC}"
    echo ""
    echo -e "${CYAN}🌐 Accede a: http://lumo.anima.edu.uy${NC}"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Deployment funcional con advertencias${NC}"
    echo -e "${YELLOW}   Errores: $ERRORS | Advertencias: $WARNINGS${NC}"
    echo ""
    echo -e "${CYAN}🌐 La aplicación debería funcionar, pero revisa las advertencias${NC}"
else
    echo -e "${RED}❌ Se encontraron problemas críticos${NC}"
    echo -e "${RED}   Errores: $ERRORS | Advertencias: $WARNINGS${NC}"
    echo ""
    echo -e "${YELLOW}📝 Revisa los errores marcados con ❌ arriba${NC}"
    echo -e "${YELLOW}📖 Consulta: DEPLOYMENT-ROCKY-LINUX.md${NC}"
    echo -e "${YELLOW}🆘 Troubleshooting: CORS-TROUBLESHOOTING.md${NC}"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  Comandos Útiles${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${BLUE}pm2 logs lumo-backend${NC}           # Ver logs del backend"
echo -e "  ${BLUE}sudo tail -f /var/log/nginx/lumo-error.log${NC}  # Logs de Nginx"
echo -e "  ${BLUE}curl http://lumo.anima.edu.uy/health${NC}  # Health check"
echo -e "  ${BLUE}pm2 restart lumo-backend${NC}       # Reiniciar backend"
echo -e "  ${BLUE}sudo systemctl reload nginx${NC}    # Recargar Nginx"
echo ""

exit $ERRORS
