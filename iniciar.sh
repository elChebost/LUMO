#!/bin/bash

# Script de inicio rápido para LUMO Frontend
# ==========================================

echo "🚀 Iniciando LUMO Frontend..."
echo ""

# Verificar que estamos en la raíz del proyecto
if [ ! -d "frontend" ]; then
    echo "❌ Error: No se encuentra el directorio 'frontend'"
    echo "   Ejecuta este script desde la raíz del proyecto LUMO"
    exit 1
fi

# Ir al directorio frontend
cd frontend

# Verificar si existe .env
if [ ! -f ".env" ]; then
    echo "⚠️  Advertencia: No existe archivo .env"
    echo ""
    
    if [ -f ".env.example" ]; then
        echo "📝 Se encontró .env.example"
        read -p "¿Deseas crear .env desde .env.example? (s/N): " crear_env
        
        if [[ "$crear_env" =~ ^[sS]$ ]]; then
            cp .env.example .env
            echo "✅ Archivo .env creado"
            echo ""
            echo "⚠️  IMPORTANTE: Edita .env y configura VITE_API_URL"
            echo "   nano .env"
            echo ""
            read -p "Presiona Enter para continuar..."
        fi
    fi
fi

# Verificar si existen node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 No se encontraron dependencias instaladas"
    echo "📥 Instalando dependencias..."
    npm install
    echo ""
else
    # Verificar que vite esté disponible
    if ! npx vite --version &> /dev/null; then
        echo "⚠️  Dependencias corruptas detectadas"
        echo "🔧 Reinstalando dependencias..."
        rm -rf node_modules package-lock.json
        npm install
        echo ""
    fi
fi

# Iniciar servidor de desarrollo
echo "✨ Iniciando servidor de desarrollo..."
echo ""
npm run dev
