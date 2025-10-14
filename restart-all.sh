#!/bin/bash

echo "🔄 REINICIANDO TODO LIMPIO..."
echo ""

# Ir al directorio correcto
cd /workspaces/LUMO

# Matar procesos suavemente
echo "1️⃣ Deteniendo servidores..."
pkill -15 -f "nodemon" 2>/dev/null
sleep 2

# Limpiar puertos
echo "2️⃣ Liberando puertos..."
lsof -ti:4000 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

# Regenerar Prisma
echo "3️⃣ Regenerando Prisma Client..."
npx --workspace backend prisma generate

# Iniciar servidores
echo "4️⃣ Iniciando servidores..."
npm run dev

