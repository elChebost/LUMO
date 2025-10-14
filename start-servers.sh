#!/bin/bash

echo "🚀 Iniciando servidores LUMO..."
echo ""

# Detener procesos anteriores si existen
echo "🧹 Limpiando procesos anteriores..."
lsof -ti:4000 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

echo "✅ Puertos liberados"
echo ""

# Iniciar servidores
echo "🔧 Iniciando backend y frontend..."
npm run dev
