#!/bin/bash

# 🔧 Script de migración de base de datos
# Este script mueve la base de datos a la ubicación correcta y la configura

echo "🔄 Iniciando migración de base de datos..."

# Navegar al directorio backend
cd "$(dirname "$0")/backend"

# Rutas de archivos
OLD_DB_PATH="prisma/prisma/dev.db"
NEW_DB_PATH="prisma/dev.db"

# 1. Copiar base de datos existente si existe en la ubicación antigua
if [ -f "$OLD_DB_PATH" ]; then
    echo "📋 Base de datos encontrada en ubicación antigua: $OLD_DB_PATH"
    
    if [ -f "$NEW_DB_PATH" ]; then
        echo "⚠️  Ya existe una base de datos en la nueva ubicación."
        read -p "¿Deseas sobrescribirla con la base de datos antigua? (s/n): " response
        
        if [ "$response" = "s" ] || [ "$response" = "S" ]; then
            cp "$OLD_DB_PATH" "$NEW_DB_PATH"
            echo "✅ Base de datos copiada a nueva ubicación"
        else
            echo "⏭️  Manteniendo base de datos actual"
        fi
    else
        cp "$OLD_DB_PATH" "$NEW_DB_PATH"
        echo "✅ Base de datos copiada a nueva ubicación"
    fi
else
    echo "ℹ️  No se encontró base de datos en ubicación antigua"
fi

# 2. Verificar archivo .env
if [ ! -f ".env" ]; then
    echo "📝 Creando archivo .env desde .env.example..."
    cp ".env.example" ".env"
    echo "✅ Archivo .env creado"
else
    echo "✅ Archivo .env ya existe"
fi

# 3. Generar cliente de Prisma
echo ""
echo "🔨 Generando cliente de Prisma..."
npm run prisma:generate

# 4. Ejecutar migraciones
echo ""
echo "📦 Ejecutando migraciones..."
npm run prisma:migrate

# 5. Preguntar si desea poblar la base de datos
echo ""
read -p "¿Deseas poblar la base de datos con datos de prueba? (s/n): " seed_response

if [ "$seed_response" = "s" ] || [ "$seed_response" = "S" ]; then
    echo "🌱 Poblando base de datos..."
    npm run seed
    echo "✅ Base de datos poblada"
fi

echo ""
echo "✅ ¡Migración completada exitosamente!"
echo ""
echo "📝 Siguiente paso: Eliminar archivo .db del control de versiones"
echo "   Ejecuta: git rm --cached backend/prisma/prisma/dev.db"
echo "   Luego: git commit -m 'fix: Remove database from version control'"
echo "   Y: git push"
echo ""
