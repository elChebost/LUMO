#!/bin/bash

# SOLUCIÓN: vite: not found
# =========================

echo "🔧 Solucionando error 'vite: not found'..."
echo ""

cd /workspaces/LUMO/frontend

echo "📦 Eliminando node_modules y package-lock.json..."
rm -rf node_modules package-lock.json

echo ""
echo "📥 Reinstalando dependencias limpias..."
npm install

echo ""
echo "✅ Dependencias reinstaladas!"
echo ""
echo "🚀 Iniciando servidor de desarrollo..."
npm run dev
