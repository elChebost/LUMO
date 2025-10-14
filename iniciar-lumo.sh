#!/bin/bash

# Script para iniciar LUMO completo (Backend + Frontend)

echo "🚀 Iniciando LUMO - Plataforma Educativa Gamificada"
echo "=================================================="
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -d "LUMO/backend" ] || [ ! -d "LUMO/frontend" ]; then
    echo "❌ Error: Ejecuta este script desde el directorio raíz del proyecto /workspaces/LUMO"
    exit 1
fi

# Función para manejar Ctrl+C
cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar Backend
echo "📦 Iniciando Backend (Puerto 4000)..."
cd LUMO/backend
node src/index.js &
BACKEND_PID=$!
cd ../..

# Esperar un momento para que el backend inicie
sleep 2

# Iniciar Frontend
echo "🎨 Iniciando Frontend (Puerto 5173)..."
cd LUMO/frontend
npm run dev &
FRONTEND_PID=$!
cd ../..

echo ""
echo "✅ Servidores iniciados correctamente!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Accede a la aplicación:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:4000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔐 Credenciales de prueba:"
echo ""
echo "   📚 DOCENTE:"
echo "      Email:    remindevelopment@gmail.com"
echo "      Password: docentest123"
echo ""
echo "   🎓 ALUMNO:"
echo "      Email:    alumno.ejemplo@gmail.com"
echo "      Password: alumnotest123"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Presiona Ctrl+C para detener los servidores"
echo ""

# Mantener el script corriendo
wait
