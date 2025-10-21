#!/bin/bash

# 🔧 Script para reemplazar URLs hardcodeadas por rutas relativas
# Este script reemplaza http://localhost:3000 y http://localhost:4000 por /api o rutas relativas

echo "🔍 Buscando URLs hardcodeadas en el frontend..."
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Contador
COUNT=0

# Archivos a modificar
FILES=$(find frontend/src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \))

echo -e "${BLUE}Archivos encontrados:${NC}"
echo "$FILES" | wc -l

echo ""
echo -e "${YELLOW}Reemplazando URLs...${NC}"
echo ""

# Reemplazar en archivos .js, .jsx, .ts, .tsx
for file in $FILES; do
    if [ -f "$file" ]; then
        # Backup
        cp "$file" "$file.bak"
        
        # Reemplazar const API_URL = 'http://localhost:3000/api' por import
        if grep -q "const API_URL = 'http://localhost:3000" "$file"; then
            echo -e "${GREEN}✓${NC} $file - Reemplazando API_URL con import"
            ((COUNT++))
            
            # Añadir import si no existe
            if ! grep -q "import { API_URL } from" "$file"; then
                # Calcular la ruta relativa correcta
                depth=$(echo "$file" | grep -o "/" | wc -l)
                if [[ "$file" == *"/pages/"* ]]; then
                    sed -i "1i import { API_URL } from '../config/api.js';" "$file"
                elif [[ "$file" == *"/components/"* ]]; then
                    sed -i "1i import { API_URL } from '../config/api.js';" "$file"
                elif [[ "$file" == *"/hooks/"* ]]; then
                    sed -i "1i import { API_URL } from '../config/api.js';" "$file"
                else
                    sed -i "1i import { API_URL } from './config/api.js';" "$file"
                fi
            fi
            
            # Eliminar la línea const API_URL = ...
            sed -i "/const API_URL = 'http:\/\/localhost:[0-9]*\(\/api\)\?';/d" "$file"
        fi
        
        # Reemplazar http://localhost:3000/api por /api
        if grep -q "http://localhost:3000/api" "$file"; then
            sed -i "s|http://localhost:3000/api|/api|g" "$file"
            echo -e "${GREEN}✓${NC} $file - http://localhost:3000/api → /api"
            ((COUNT++))
        fi
        
        # Reemplazar http://localhost:4000/api por /api
        if grep -q "http://localhost:4000/api" "$file"; then
            sed -i "s|http://localhost:4000/api|/api|g" "$file"
            echo -e "${GREEN}✓${NC} $file - http://localhost:4000/api → /api"
            ((COUNT++))
        fi
        
        # Reemplazar http://localhost:3000 (sin /api) por ''
        if grep -q "http://localhost:3000[^/]" "$file" || grep -q "http://localhost:3000'" "$file" || grep -q 'http://localhost:3000"' "$file"; then
            sed -i "s|http://localhost:3000||g" "$file"
            echo -e "${GREEN}✓${NC} $file - http://localhost:3000 → (removed)"
            ((COUNT++))
        fi
    fi
done

# Caso especial: vite.config.js
if [ -f "frontend/vite.config.js" ]; then
    if grep -q "http://localhost:4000" "frontend/vite.config.js"; then
        sed -i "s|http://localhost:4000|http://localhost:3000|g" "frontend/vite.config.js"
        echo -e "${GREEN}✓${NC} frontend/vite.config.js - puerto corregido"
        ((COUNT++))
    fi
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Completado: $COUNT archivos modificados${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Los archivos .bak contienen respaldos de los originales"
echo ""
