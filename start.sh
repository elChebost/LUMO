#!/bin/bash

echo "🚀 Iniciando LUMO..."

# Iniciar backend
echo "📡 Iniciando backend en puerto 4000..."
cd /workspaces/LUMO/LUMO/backend
node src/index.js &
BACKEND_PID=$!

# Esperar un momento
sleep 2

# Iniciar frontend  
echo "🎨 Iniciando frontend en puerto 5173..."
cd /workspaces/LUMO/LUMO/frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servicios iniciados:"
echo "   Backend:  http://localhost:4000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Para detener, presiona Ctrl+C"

# Esperar a que el usuario presione Ctrl+C
wait
