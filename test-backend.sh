#!/bin/bash

echo "🧪 PROBANDO BACKEND..."
echo ""

# Verificar puerto
echo "1️⃣ Verificando puerto 4000..."
if lsof -i :4000 >/dev/null 2>&1; then
    echo "   ✅ Puerto 4000 está abierto"
else
    echo "   ❌ Puerto 4000 NO está abierto"
    exit 1
fi

echo ""
echo "2️⃣ Probando endpoints..."

# Probar /api/users
echo "   📡 GET /api/users"
USERS=$(curl -s http://localhost:4000/api/users 2>&1)
if echo "$USERS" | grep -q "error\|Connection refused"; then
    echo "   ❌ Error: $USERS"
else
    echo "   ✅ Respuesta: $(echo $USERS | head -c 100)..."
fi

echo ""

# Probar /api/missions
echo "   📡 GET /api/missions"
MISSIONS=$(curl -s http://localhost:4000/api/missions 2>&1)
if echo "$MISSIONS" | grep -q "error\|Connection refused"; then
    echo "   ❌ Error: $MISSIONS"
else
    echo "   ✅ Respuesta: $(echo $MISSIONS | head -c 100)..."
fi

echo ""

# Probar /api/stats
echo "   📡 GET /api/stats"
STATS=$(curl -s http://localhost:4000/api/stats 2>&1)
if echo "$STATS" | grep -q "error\|Connection refused"; then
    echo "   ❌ Error: $STATS"
else
    echo "   ✅ Respuesta: $STATS"
fi

echo ""
echo "✅ Pruebas completadas"
