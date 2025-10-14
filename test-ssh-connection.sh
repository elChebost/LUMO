#!/bin/bash

echo "================================================"
echo "  Diagnóstico de Conexión a MySQL SSH"
echo "================================================"
echo ""

HOST="10.1.0.21"
PORT="3306"

echo "1. Probando conectividad de red al host..."
if ping -c 2 $HOST &>/dev/null; then
    echo "   ✓ Host $HOST es alcanzable por ping"
else
    echo "   ✗ Host $HOST NO responde a ping (puede estar bloqueado)"
fi

echo ""
echo "2. Probando conectividad al puerto MySQL..."
if timeout 5 bash -c "echo > /dev/tcp/$HOST/$PORT" 2>/dev/null; then
    echo "   ✓ Puerto $PORT está abierto y accesible"
else
    echo "   ✗ Puerto $PORT NO es accesible"
    echo "   Posibles causas:"
    echo "     - Firewall bloqueando el puerto"
    echo "     - MySQL bind-address incorrecto"
    echo "     - MySQL no escuchando en 0.0.0.0"
fi

echo ""
echo "3. Información de red del devcontainer..."
echo "   IP del devcontainer:"
hostname -I | awk '{print "   " $1}'

echo ""
echo "================================================"
echo "  Comandos para ejecutar en el SERVIDOR SSH"
echo "================================================"
echo ""
echo "Ejecuta estos comandos en 10.1.0.21 y cópiame el resultado:"
echo ""
echo "# Ver si MySQL escucha en todas las interfaces"
echo "sudo ss -tlnp | grep 3306"
echo ""
echo "# Ver bind-address actual"
echo "mysql -u sebastian -psqlroot01 -e \"SHOW VARIABLES LIKE 'bind_address';\""
echo ""
echo "# Ver firewall (si aplica)"
echo "sudo firewall-cmd --list-ports  # Para firewalld"
echo "sudo ufw status                 # Para ufw"
echo ""
