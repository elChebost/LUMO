#!/bin/bash

# 🔄 LUMO - Script de Restauración desde Backup
# Restaura la base de datos y configuraciones desde un backup

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║          🔄 LUMO - Restauración desde Backup         ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar directorio de backups
if [ ! -d "backups" ]; then
    echo -e "${RED}❌ No se encontró el directorio de backups${NC}"
    exit 1
fi

# Listar backups disponibles
echo -e "${BLUE}📋 Backups disponibles:${NC}"
echo ""
backups=(backups/backup_*.tar.gz)
if [ ! -e "${backups[0]}" ]; then
    echo -e "${RED}❌ No se encontraron backups${NC}"
    exit 1
fi

i=1
for backup in "${backups[@]}"; do
    size=$(du -h "$backup" | cut -f1)
    echo -e "   ${CYAN}[$i]${NC} $(basename "$backup") ($size)"
    ((i++))
done
echo ""

# Seleccionar backup
echo -e "${YELLOW}Selecciona el número del backup a restaurar (o 0 para cancelar):${NC}"
read -p "Opción: " selection

if [ "$selection" = "0" ] || [ -z "$selection" ]; then
    echo -e "${YELLOW}Restauración cancelada${NC}"
    exit 0
fi

# Validar selección
if [ "$selection" -lt 1 ] || [ "$selection" -gt "${#backups[@]}" ]; then
    echo -e "${RED}❌ Selección inválida${NC}"
    exit 1
fi

# Obtener archivo de backup seleccionado
selected_backup="${backups[$((selection-1))]}"
echo ""
echo -e "${YELLOW}⚠️  ADVERTENCIA: Esta operación sobrescribirá los datos actuales${NC}"
echo -e "${YELLOW}Backup seleccionado: $(basename "$selected_backup")${NC}"
echo ""
read -p "¿Estás seguro? (escribe 'SI' para confirmar): " confirmation

if [ "$confirmation" != "SI" ]; then
    echo -e "${YELLOW}Restauración cancelada${NC}"
    exit 0
fi

# Detener servicios
echo ""
echo -e "${YELLOW}🛑 Deteniendo servicios...${NC}"
if command -v pm2 &> /dev/null; then
    pm2 stop all 2>/dev/null || true
fi

# Crear backup del estado actual antes de restaurar
echo -e "${YELLOW}💾 Creando backup de seguridad del estado actual...${NC}"
SAFETY_BACKUP="backups/safety_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$SAFETY_BACKUP"
[ -f "backend/prisma/dev.db" ] && cp backend/prisma/dev.db "$SAFETY_BACKUP/"
[ -f "backend/.env" ] && cp backend/.env "$SAFETY_BACKUP/"
[ -f "frontend/.env" ] && cp frontend/.env "$SAFETY_BACKUP/"
echo -e "${GREEN}✅ Backup de seguridad creado en $SAFETY_BACKUP${NC}"

# Extraer backup
echo -e "${YELLOW}📦 Extrayendo backup...${NC}"
TEMP_DIR="backups/temp_restore"
mkdir -p "$TEMP_DIR"
tar -xzf "$selected_backup" -C "$TEMP_DIR"

# Obtener nombre del directorio extraído
EXTRACTED_DIR=$(ls -1 "$TEMP_DIR" | head -n 1)

# Restaurar base de datos
if [ -f "$TEMP_DIR/$EXTRACTED_DIR/dev.db" ]; then
    echo -e "${YELLOW}💾 Restaurando base de datos...${NC}"
    cp "$TEMP_DIR/$EXTRACTED_DIR/dev.db" backend/prisma/dev.db
    echo -e "${GREEN}✅ Base de datos restaurada${NC}"
fi

# Restaurar archivos .env
echo -e "${YELLOW}📝 ¿Deseas restaurar los archivos .env? (s/n)${NC}"
read -r restore_env
if [[ "$restore_env" =~ ^[Ss]$ ]]; then
    [ -f "$TEMP_DIR/$EXTRACTED_DIR/backend.env" ] && cp "$TEMP_DIR/$EXTRACTED_DIR/backend.env" backend/.env
    [ -f "$TEMP_DIR/$EXTRACTED_DIR/frontend.env" ] && cp "$TEMP_DIR/$EXTRACTED_DIR/frontend.env" frontend/.env
    echo -e "${GREEN}✅ Archivos .env restaurados${NC}"
else
    echo -e "${YELLOW}ℹ️  Archivos .env no restaurados${NC}"
fi

# Restaurar uploads
if [ -d "$TEMP_DIR/$EXTRACTED_DIR/uploads" ]; then
    echo -e "${YELLOW}📸 ¿Deseas restaurar los archivos subidos? (s/n)${NC}"
    read -r restore_uploads
    if [[ "$restore_uploads" =~ ^[Ss]$ ]]; then
        rm -rf backend/uploads
        cp -r "$TEMP_DIR/$EXTRACTED_DIR/uploads" backend/uploads
        echo -e "${GREEN}✅ Uploads restaurados${NC}"
    fi
fi

# Limpiar archivos temporales
rm -rf "$TEMP_DIR"

# Regenerar cliente Prisma
echo -e "${YELLOW}🔧 Regenerando cliente Prisma...${NC}"
cd backend
npx prisma generate
cd ..
echo -e "${GREEN}✅ Cliente Prisma regenerado${NC}"

# Reiniciar servicios
echo -e "${YELLOW}🚀 Reiniciando servicios...${NC}"
if command -v pm2 &> /dev/null; then
    pm2 restart all
else
    echo -e "${YELLOW}ℹ️  Inicia los servicios manualmente con: ./run.sh${NC}"
fi

echo ""
echo -e "${GREEN}✅ Restauración completada exitosamente${NC}"
echo ""
echo -e "${CYAN}📝 Notas:${NC}"
echo -e "   - Backup de seguridad guardado en: $SAFETY_BACKUP"
echo -e "   - Si algo salió mal, puedes restaurar desde ahí"
echo ""
echo -e "${CYAN}🛠️  Verifica que todo funcione correctamente:${NC}"
echo -e "   pm2 logs"
echo -e "   curl http://localhost:3000/health"
echo ""
