#!/bin/bash

echo "================================================"
echo "  Prueba de Conexión a MySQL del SSH"
echo "================================================"
echo ""

# Configuración
SSH_MYSQL_HOST="10.1.0.21"
SSH_MYSQL_PORT="3306"
SSH_MYSQL_USER="sebastian"
SSH_MYSQL_PASS="sqlroot01"

echo "Intentando conectar a: $SSH_MYSQL_HOST:$SSH_MYSQL_PORT"
echo ""

# Crear .env temporal
cat > /tmp/test-ssh-mysql.env << EOF
DATABASE_URL="mysql://$SSH_MYSQL_USER:$SSH_MYSQL_PASS@$SSH_MYSQL_HOST:$SSH_MYSQL_PORT/lumo_db"
EOF

# Intentar conexión con Prisma
cd /workspaces/LUMO/LUMO/backend

echo "Probando conexión..."
DATABASE_URL="mysql://$SSH_MYSQL_USER:$SSH_MYSQL_PASS@$SSH_MYSQL_HOST:$SSH_MYSQL_PORT/lumo_db" npx prisma db pull --schema=/dev/stdin << 'SCHEMA' 2>&1 | head -20
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
SCHEMA

echo ""
echo "================================================"
