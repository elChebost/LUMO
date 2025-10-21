#!/bin/bash

# 🔍 Script para verificar el estado del backend en producción

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Verificando Backend LUMO en Producción"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Verificar si PM2 está instalado
echo "1️⃣  Verificando PM2..."
if command -v pm2 &> /dev/null; then
    echo "   ✅ PM2 instalado: $(pm2 -v)"
else
    echo "   ❌ PM2 NO instalado"
    echo ""
    echo "   Instalar con: sudo npm install -g pm2"
    exit 1
fi

echo ""

# 2. Verificar si el proceso está corriendo
echo "2️⃣  Verificando proceso backend..."
if pm2 list | grep -q "lumo-backend"; then
    echo "   ✅ Proceso encontrado en PM2"
    pm2 list | grep "lumo-backend"
    
    # Ver si está online
    if pm2 list | grep -q "lumo-backend.*online"; then
        echo "   ✅ Backend está ONLINE"
    else
        echo "   ❌ Backend está registrado pero NO está online"
        echo ""
        echo "   Ver logs con: pm2 logs lumo-backend"
    fi
else
    echo "   ❌ Backend NO encontrado en PM2"
    echo ""
    echo "   Iniciar con: pm2 start ecosystem.config.js"
fi

echo ""

# 3. Verificar puerto 3000
echo "3️⃣  Verificando puerto 3000..."
if command -v netstat &> /dev/null; then
    if netstat -tulpn 2>/dev/null | grep -q ":3000"; then
        echo "   ✅ Puerto 3000 está escuchando"
        netstat -tulpn 2>/dev/null | grep ":3000"
    else
        echo "   ❌ Puerto 3000 NO está escuchando"
    fi
elif command -v ss &> /dev/null; then
    if ss -tulpn 2>/dev/null | grep -q ":3000"; then
        echo "   ✅ Puerto 3000 está escuchando"
        ss -tulpn 2>/dev/null | grep ":3000"
    else
        echo "   ❌ Puerto 3000 NO está escuchando"
    fi
else
    echo "   ⚠️  No se puede verificar (netstat/ss no disponible)"
fi

echo ""

# 4. Test de conectividad local
echo "4️⃣  Test de conectividad local..."
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    RESPONSE=$(curl -s http://localhost:3000/health)
    echo "   ✅ Backend responde: $RESPONSE"
else
    echo "   ❌ Backend NO responde en localhost:3000"
fi

echo ""

# 5. Verificar logs recientes
echo "5️⃣  Últimas líneas del log..."
if pm2 list | grep -q "lumo-backend"; then
    pm2 logs lumo-backend --lines 10 --nostream
else
    echo "   ⚠️  No hay logs (PM2 no corriendo)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Comandos Útiles:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  pm2 list                    # Ver todos los procesos"
echo "  pm2 logs lumo-backend       # Ver logs en tiempo real"
echo "  pm2 restart lumo-backend    # Reiniciar backend"
echo "  pm2 start ecosystem.config.js  # Iniciar backend"
echo "  pm2 stop lumo-backend       # Detener backend"
echo ""
