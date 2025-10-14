#!/bin/bash

echo "🚀 INICIANDO LUMO - VERSIÓN LIMPIA"
echo "=================================="
echo ""

# Matar procesos en puertos
echo "1. Liberando puertos..."
lsof -ti:4000 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
sleep 1

# Iniciar backend
echo "2. Iniciando backend en puerto 4000..."
cd /workspaces/LUMO/backend
node server.js &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
sleep 3

# Probar backend
echo "3. Probando backend..."
RESPONSE=$(curl -s http://localhost:4000/api/stats)
if [ $? -eq 0 ]; then
    echo "   ✅ Backend responde correctamente"
    echo "   Respuesta: $RESPONSE"
else
    echo "   ❌ Backend NO responde"
    exit 1
fi

# Iniciar frontend
echo "4. Iniciando frontend en puerto 5173..."
cd /workspaces/LUMO/frontend
npm run dev &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"

echo ""
echo "✅ TODO INICIADO"
echo "=================================="
echo "Backend:  http://localhost:4000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Para detener: kill $BACKEND_PID $FRONTEND_PID"
echo ""
