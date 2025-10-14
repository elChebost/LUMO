#!/bin/bash

# Script de verificación del sistema LUMO

echo "🔍 VERIFICACIÓN DEL SISTEMA LUMO"
echo "================================"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1"
        return 1
    fi
}

# 1. Verificar estructura de directorios
echo "📁 Verificando estructura de archivos..."
[ -d "LUMO/backend" ] && check "Directorio backend existe" || check "Directorio backend NO encontrado"
[ -d "LUMO/frontend" ] && check "Directorio frontend existe" || check "Directorio frontend NO encontrado"
[ -f "LUMO/backend/prisma/schema.prisma" ] && check "Schema de Prisma existe" || check "Schema de Prisma NO encontrado"
[ -f "LUMO/backend/.env" ] && check "Archivo .env existe" || check "Archivo .env NO encontrado"
echo ""

# 2. Verificar base de datos
echo "🗄️  Verificando base de datos SQLite..."
[ -f "LUMO/backend/prisma/dev.db" ] && check "Base de datos dev.db existe" || check "Base de datos NO encontrada"

if [ -f "LUMO/backend/prisma/dev.db" ]; then
    SIZE=$(du -h LUMO/backend/prisma/dev.db | cut -f1)
    echo -e "   ${YELLOW}→${NC} Tamaño: $SIZE"
fi
echo ""

# 3. Verificar configuración de Prisma
echo "⚙️  Verificando configuración Prisma..."
if grep -q 'provider = "sqlite"' LUMO/backend/prisma/schema.prisma; then
    check "Provider configurado como SQLite"
else
    check "Provider NO es SQLite"
fi

if grep -q 'DATABASE_URL="file:./dev.db"' LUMO/backend/.env; then
    check "DATABASE_URL configurado correctamente"
else
    check "DATABASE_URL necesita revisión"
fi
echo ""

# 4. Verificar dependencias
echo "📦 Verificando dependencias..."
[ -d "LUMO/backend/node_modules" ] && check "Dependencias backend instaladas" || check "Dependencias backend FALTANTES"
[ -d "LUMO/frontend/node_modules" ] && check "Dependencias frontend instaladas" || check "Dependencias frontend FALTANTES"
echo ""

# 5. Verificar servidores
echo "🚀 Verificando servidores..."

# Backend
if curl -s http://localhost:4000/api/stats > /dev/null 2>&1; then
    check "Backend corriendo en puerto 4000"
    STUDENTS=$(curl -s http://localhost:4000/api/stats | grep -o '"totalStudents":[0-9]*' | grep -o '[0-9]*')
    MISSIONS=$(curl -s http://localhost:4000/api/stats | grep -o '"totalMissions":[0-9]*' | grep -o '[0-9]*')
    echo -e "   ${YELLOW}→${NC} Estudiantes: $STUDENTS"
    echo -e "   ${YELLOW}→${NC} Misiones: $MISSIONS"
else
    check "Backend NO está corriendo"
    echo -e "   ${YELLOW}→${NC} Inicia con: cd LUMO/backend && node src/index.js"
fi

# Frontend
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    check "Frontend corriendo en puerto 5173"
else
    check "Frontend NO está corriendo"
    echo -e "   ${YELLOW}→${NC} Inicia con: cd LUMO/frontend && npm run dev"
fi
echo ""

# 6. Verificar usuarios de prueba
echo "👥 Verificando usuarios de prueba..."
if [ -f "LUMO/backend/prisma/dev.db" ]; then
    cd LUMO/backend
    
    # Verificar usuario docente
    DOCENTE=$(npx prisma db execute --stdin <<SQL 2>/dev/null
SELECT COUNT(*) as count FROM User WHERE email = 'remindevelopment@gmail.com' AND role = 'docente';
SQL
)
    
    # Verificar usuario alumno
    ALUMNO=$(npx prisma db execute --stdin <<SQL 2>/dev/null
SELECT COUNT(*) as count FROM User WHERE email = 'alumno.ejemplo@gmail.com' AND role = 'alumno';
SQL
)
    
    cd ../..
    
    if curl -s -X POST http://localhost:4000/api/auth/login \
        -H "Content-Type: application/json" \
        -d '{"email":"remindevelopment@gmail.com","password":"docentest123"}' \
        | grep -q '"role":"docente"'; then
        check "Usuario DOCENTE existe y puede iniciar sesión"
    else
        check "Usuario DOCENTE no puede iniciar sesión"
    fi
    
    if curl -s -X POST http://localhost:4000/api/auth/login \
        -H "Content-Type: application/json" \
        -d '{"email":"alumno.ejemplo@gmail.com","password":"alumnotest123"}' \
        | grep -q '"role":"alumno"'; then
        check "Usuario ALUMNO existe y puede iniciar sesión"
    else
        check "Usuario ALUMNO no puede iniciar sesión"
    fi
else
    echo -e "${YELLOW}⚠${NC} Base de datos no encontrada. Ejecuta: cd LUMO/backend && npx prisma db push && node prisma/seed.js"
fi
echo ""

# 7. Resumen final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMEN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "LUMO/backend/prisma/dev.db" ] && \
   curl -s http://localhost:4000/api/stats > /dev/null 2>&1 && \
   curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ ¡SISTEMA COMPLETAMENTE OPERATIVO!${NC}"
    echo ""
    echo "🌐 Accede a la aplicación:"
    echo "   http://localhost:5173"
    echo ""
    echo "🔐 Credenciales:"
    echo "   Docente: remindevelopment@gmail.com / docentest123"
    echo "   Alumno:  alumno.ejemplo@gmail.com / alumnotest123"
else
    echo -e "${YELLOW}⚠ SISTEMA PARCIALMENTE OPERATIVO${NC}"
    echo ""
    echo "📝 Para completar la instalación:"
    echo ""
    
    if [ ! -f "LUMO/backend/prisma/dev.db" ]; then
        echo "1. Crear base de datos:"
        echo "   cd LUMO/backend"
        echo "   npx prisma db push"
        echo "   node prisma/seed.js"
        echo ""
    fi
    
    if ! curl -s http://localhost:4000/api/stats > /dev/null 2>&1; then
        echo "2. Iniciar backend:"
        echo "   cd LUMO/backend"
        echo "   node src/index.js"
        echo ""
    fi
    
    if ! curl -s http://localhost:5173 > /dev/null 2>&1; then
        echo "3. Iniciar frontend:"
        echo "   cd LUMO/frontend"
        echo "   npm run dev"
        echo ""
    fi
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentación:"
echo "   • RESUMEN.md - Guía rápida"
echo "   • INSTRUCCIONES_SQLITE.md - Guía completa"
echo "   • README_LUMO.md - README del proyecto"
echo ""
