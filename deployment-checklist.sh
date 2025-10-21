#!/bin/bash

#######################################################################
# ✅ LUMO - Checklist de Verificación Post-Deployment
#######################################################################
#
# Este script verifica que el deployment esté correcto
# Ejecutar: ./deployment-checklist.sh
#
#######################################################################

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

PASS=0
FAIL=0
WARN=0

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║          ✅ LUMO - Checklist de Verificación                  ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

PROJECT_DIR="/opt/proyecto/LUMO"
DOMAIN="lumo.anima.edu.uy"

# Función para check exitoso
pass() {
    echo -e "${GREEN}✓ PASS${NC} - $1"
    ((PASS++))
}

# Función para check fallido
fail() {
    echo -e "${RED}✗ FAIL${NC} - $1"
    ((FAIL++))
}

# Función para advertencia
warn() {
    echo -e "${YELLOW}⚠ WARN${NC} - $1"
    ((WARN++))
}

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  1. Sistema Operativo y Dependencias${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Rocky Linux
if [ -f /etc/rocky-release ]; then
    VERSION=$(cat /etc/rocky-release)
    pass "Rocky Linux detected: $VERSION"
else
    warn "Not Rocky Linux, but may work"
fi

# Node.js
if command -v node &> /dev/null; then
    NODE_VER=$(node -v)
    pass "Node.js installed: $NODE_VER"
else
    fail "Node.js NOT installed"
fi

# npm
if command -v npm &> /dev/null; then
    NPM_VER=$(npm -v)
    pass "npm installed: v$NPM_VER"
else
    fail "npm NOT installed"
fi

# Nginx
if command -v nginx &> /dev/null; then
    NGINX_VER=$(nginx -v 2>&1 | cut -d'/' -f2)
    pass "Nginx installed: $NGINX_VER"
else
    fail "Nginx NOT installed"
fi

# PM2
if command -v pm2 &> /dev/null; then
    PM2_VER=$(pm2 -v)
    pass "PM2 installed: v$PM2_VER"
else
    fail "PM2 NOT installed"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  2. Estructura del Proyecto${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -d "$PROJECT_DIR" ]; then
    pass "Project directory exists: $PROJECT_DIR"
else
    fail "Project directory NOT found: $PROJECT_DIR"
fi

if [ -d "$PROJECT_DIR/backend" ]; then
    pass "Backend directory exists"
else
    fail "Backend directory NOT found"
fi

if [ -d "$PROJECT_DIR/frontend" ]; then
    pass "Frontend directory exists"
else
    fail "Frontend directory NOT found"
fi

if [ -d "$PROJECT_DIR/frontend/dist" ]; then
    SIZE=$(du -sh "$PROJECT_DIR/frontend/dist" 2>/dev/null | cut -f1)
    pass "Frontend built (dist/ exists, size: $SIZE)"
else
    fail "Frontend NOT built (dist/ missing)"
fi

if [ -f "$PROJECT_DIR/ecosystem.config.js" ]; then
    pass "PM2 config exists (ecosystem.config.js)"
else
    fail "PM2 config NOT found"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  3. Configuración de Nginx${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -f "/etc/nginx/conf.d/lumo.conf" ]; then
    pass "Nginx config exists: /etc/nginx/conf.d/lumo.conf"
else
    fail "Nginx config NOT found"
fi

if sudo nginx -t &> /dev/null; then
    pass "Nginx configuration is valid"
else
    fail "Nginx configuration has ERRORS"
    sudo nginx -t
fi

if sudo systemctl is-active nginx &> /dev/null; then
    pass "Nginx is running"
else
    fail "Nginx is NOT running"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  4. Backend Configuration${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -f "$PROJECT_DIR/backend/.env" ]; then
    pass "Backend .env exists"
    
    # Check critical variables
    if grep -q "JWT_SECRET" "$PROJECT_DIR/backend/.env"; then
        SECRET=$(grep "JWT_SECRET" "$PROJECT_DIR/backend/.env" | cut -d'=' -f2 | tr -d '"' | tr -d "'")
        if [[ "$SECRET" == *"REPLACE"* ]] || [[ "$SECRET" == *"change"* ]] || [[ "$SECRET" == *"DEFAULT"* ]]; then
            warn "JWT_SECRET uses default/placeholder value - CHANGE IN PRODUCTION"
        else
            pass "JWT_SECRET is configured (appears customized)"
        fi
    else
        fail "JWT_SECRET not found in .env"
    fi
    
    if grep -q "FRONTEND_URL" "$PROJECT_DIR/backend/.env"; then
        FRONTEND_URL=$(grep "FRONTEND_URL" "$PROJECT_DIR/backend/.env" | cut -d'=' -f2)
        if [[ "$FRONTEND_URL" == *"$DOMAIN"* ]]; then
            pass "FRONTEND_URL configured correctly: $FRONTEND_URL"
        else
            warn "FRONTEND_URL may be incorrect: $FRONTEND_URL"
        fi
    else
        warn "FRONTEND_URL not configured"
    fi
else
    fail "Backend .env NOT found"
fi

if [ -f "$PROJECT_DIR/backend/prisma/dev.db" ] || [ -f "$PROJECT_DIR/backend/prisma/prisma/dev.db" ]; then
    pass "Database file exists"
else
    fail "Database file NOT found"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  5. PM2 Process${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if pm2 list | grep -q "lumo-backend"; then
    if pm2 list | grep -q "lumo-backend.*online"; then
        pass "Backend running in PM2 (status: online)"
    else
        fail "Backend registered in PM2 but NOT online"
    fi
else
    fail "Backend NOT running in PM2"
fi

# Check port 3000
if sudo netstat -tulpn 2>/dev/null | grep -q ":3000" || sudo ss -tulpn 2>/dev/null | grep -q ":3000"; then
    pass "Port 3000 is listening"
else
    fail "Port 3000 is NOT listening"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  6. SELinux & Firewall${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if command -v getenforce &> /dev/null; then
    SELINUX=$(getenforce)
    if [ "$SELINUX" == "Enforcing" ]; then
        pass "SELinux is Enforcing (production ready)"
        
        if getsebool httpd_can_network_connect 2>/dev/null | grep -q "on"; then
            pass "SELinux httpd_can_network_connect is ON"
        else
            fail "SELinux httpd_can_network_connect is OFF"
        fi
    else
        warn "SELinux is not Enforcing: $SELINUX"
    fi
else
    warn "SELinux not available"
fi

if command -v firewall-cmd &> /dev/null; then
    if sudo firewall-cmd --list-services | grep -q "http"; then
        pass "Firewall allows HTTP"
    else
        warn "Firewall does NOT allow HTTP"
    fi
    
    if sudo firewall-cmd --list-services | grep -q "https"; then
        pass "Firewall allows HTTPS (ready for SSL)"
    else
        warn "Firewall does NOT allow HTTPS"
    fi
else
    warn "firewall-cmd not available"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  7. Connectivity Tests${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Backend local health
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    HEALTH=$(curl -s http://localhost:3000/health)
    pass "Backend local health check: $HEALTH"
else
    fail "Backend local health check FAILED"
fi

# API through Nginx
if curl -s http://$DOMAIN/api/health > /dev/null 2>&1; then
    pass "API accessible through Nginx: http://$DOMAIN/api/health"
else
    warn "API NOT accessible through Nginx (check DNS)"
fi

# Frontend through Nginx
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN/ 2>/dev/null || echo "000")
if [ "$HTTP_CODE" == "200" ]; then
    pass "Frontend accessible: http://$DOMAIN/ (HTTP $HTTP_CODE)"
else
    warn "Frontend NOT accessible: http://$DOMAIN/ (HTTP $HTTP_CODE)"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  8. Logs Check${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# PM2 logs
echo "Last 10 lines of PM2 logs:"
pm2 logs lumo-backend --lines 10 --nostream 2>/dev/null || warn "Cannot read PM2 logs"

echo ""

# Nginx error log
if [ -f "/var/log/nginx/lumo.error.log" ]; then
    ERROR_COUNT=$(wc -l < /var/log/nginx/lumo.error.log)
    if [ "$ERROR_COUNT" -eq 0 ]; then
        pass "Nginx error log is empty (no errors)"
    else
        warn "Nginx error log has $ERROR_COUNT lines (check: sudo tail /var/log/nginx/lumo.error.log)"
    fi
else
    warn "Nginx error log not found"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  9. Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TOTAL=$((PASS + FAIL + WARN))

echo -e "${GREEN}✓ PASS: $PASS${NC}"
echo -e "${YELLOW}⚠ WARN: $WARN${NC}"
echo -e "${RED}✗ FAIL: $FAIL${NC}"
echo -e "  TOTAL: $TOTAL checks"
echo ""

if [ $FAIL -eq 0 ] && [ $WARN -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ ALL CHECKS PASSED - Deployment is PERFECT!                ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}🌐 Access: http://$DOMAIN${NC}"
    exit 0
elif [ $FAIL -eq 0 ]; then
    echo -e "${YELLOW}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  ⚠️  Deployment OK with warnings                               ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}Review warnings above${NC}"
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ Deployment has ERRORS - Review failures above             ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}📝 See: DEPLOYMENT-STEPS.md for troubleshooting${NC}"
    exit 1
fi
