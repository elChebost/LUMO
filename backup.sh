#!/bin/bash

# 💾 LUMO - Script de Backup
# Crea backups de la base de datos y configuraciones

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Directorio de backups
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║            💾 LUMO - Sistema de Backup               ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Crear directorio de backups si no existe
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    echo -e "${GREEN}✅ Directorio de backups creado${NC}"
fi

echo -e "${BLUE}📦 Creando backup con timestamp: ${TIMESTAMP}${NC}"
echo ""

# Crear subdirectorio para este backup
CURRENT_BACKUP="$BACKUP_DIR/backup_$TIMESTAMP"
mkdir -p "$CURRENT_BACKUP"

# Backup de base de datos
if [ -f "backend/prisma/dev.db" ]; then
    echo -e "${YELLOW}💾 Respaldando base de datos...${NC}"
    cp backend/prisma/dev.db "$CURRENT_BACKUP/dev.db"
    echo -e "${GREEN}✅ Base de datos respaldada${NC}"
else
    echo -e "${YELLOW}⚠️  Base de datos no encontrada${NC}"
fi

# Backup de archivos .env
echo -e "${YELLOW}📝 Respaldando archivos de configuración...${NC}"
[ -f "backend/.env" ] && cp backend/.env "$CURRENT_BACKUP/backend.env"
[ -f "frontend/.env" ] && cp frontend/.env "$CURRENT_BACKUP/frontend.env"
echo -e "${GREEN}✅ Archivos .env respaldados${NC}"

# Backup de uploads (avatars, etc.)
if [ -d "backend/uploads" ]; then
    echo -e "${YELLOW}📸 Respaldando archivos subidos...${NC}"
    cp -r backend/uploads "$CURRENT_BACKUP/uploads"
    echo -e "${GREEN}✅ Uploads respaldados${NC}"
fi

# Crear archivo de información
cat > "$CURRENT_BACKUP/backup_info.txt" << EOF
LUMO Backup Information
=======================
Fecha: $(date)
Timestamp: $TIMESTAMP
Hostname: $(hostname)
User: $(whoami)
Node version: $(node -v)
EOF

echo -e "${GREEN}✅ Información del backup guardada${NC}"

# Comprimir backup
echo -e "${YELLOW}🗜️  Comprimiendo backup...${NC}"
cd "$BACKUP_DIR"
tar -czf "backup_$TIMESTAMP.tar.gz" "backup_$TIMESTAMP"
rm -rf "backup_$TIMESTAMP"
cd ..

# Tamaño del backup
BACKUP_SIZE=$(du -h "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" | cut -f1)

echo ""
echo -e "${GREEN}✅ Backup completado exitosamente${NC}"
echo -e "${CYAN}📦 Archivo: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz${NC}"
echo -e "${CYAN}📊 Tamaño: $BACKUP_SIZE${NC}"
echo ""

# Limpiar backups antiguos (mantener últimos 7)
BACKUP_COUNT=$(ls -1 "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | wc -l)
if [ "$BACKUP_COUNT" -gt 7 ]; then
    echo -e "${YELLOW}🧹 Limpiando backups antiguos (manteniendo últimos 7)...${NC}"
    ls -1t "$BACKUP_DIR"/backup_*.tar.gz | tail -n +8 | xargs rm -f
    echo -e "${GREEN}✅ Backups antiguos eliminados${NC}"
fi

# Listar backups disponibles
echo -e "${BLUE}📋 Backups disponibles:${NC}"
ls -lh "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}'
echo ""

echo -e "${CYAN}💡 Tip: Para restaurar un backup, usa:${NC}"
echo -e "   tar -xzf $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
echo -e "   cp backup_$TIMESTAMP/dev.db backend/prisma/"
echo ""
