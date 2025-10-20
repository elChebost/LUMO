# Script de migracion de base de datos
# Este script mueve la base de datos a la ubicacion correcta y la configura

Write-Host "Iniciando migracion de base de datos..." -ForegroundColor Cyan

# Navegar al directorio backend
$backendPath = Join-Path $PSScriptRoot "backend"
Set-Location $backendPath

# Rutas de archivos
$oldDbPath = "prisma\prisma\dev.db"
$newDbPath = "prisma\dev.db"

# 1. Copiar base de datos existente si existe en la ubicacion antigua
if (Test-Path $oldDbPath) {
    Write-Host "Base de datos encontrada en ubicacion antigua: $oldDbPath" -ForegroundColor Yellow
    
    if (Test-Path $newDbPath) {
        Write-Host "Ya existe una base de datos en la nueva ubicacion." -ForegroundColor Yellow
        $response = Read-Host "Deseas sobrescribirla con la base de datos antigua? (s/n)"
        
        if ($response -eq "s" -or $response -eq "S") {
            Copy-Item $oldDbPath $newDbPath -Force
            Write-Host "Base de datos copiada a nueva ubicacion" -ForegroundColor Green
        } else {
            Write-Host "Manteniendo base de datos actual" -ForegroundColor Yellow
        }
    } else {
        Copy-Item $oldDbPath $newDbPath
        Write-Host "Base de datos copiada a nueva ubicacion" -ForegroundColor Green
    }
} else {
    Write-Host "No se encontro base de datos en ubicacion antigua" -ForegroundColor Blue
}

# 2. Verificar archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "Creando archivo .env desde .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Archivo .env creado" -ForegroundColor Green
} else {
    Write-Host "Archivo .env ya existe" -ForegroundColor Green
}

# 3. Generar cliente de Prisma
Write-Host ""
Write-Host "Generando cliente de Prisma..." -ForegroundColor Cyan
npm run prisma:generate

# 4. Ejecutar migraciones
Write-Host ""
Write-Host "Ejecutando migraciones..." -ForegroundColor Cyan
npm run prisma:migrate

# 5. Preguntar si desea poblar la base de datos
Write-Host ""
$seedResponse = Read-Host "Deseas poblar la base de datos con datos de prueba? (s/n)"

if ($seedResponse -eq "s" -or $seedResponse -eq "S") {
    Write-Host "Poblando base de datos..." -ForegroundColor Cyan
    npm run seed
    Write-Host "Base de datos poblada" -ForegroundColor Green
}

Write-Host ""
Write-Host "Migracion completada exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Siguiente paso: Eliminar archivo .db del control de versiones" -ForegroundColor Yellow
Write-Host "   Ejecuta: git rm --cached backend/prisma/prisma/dev.db" -ForegroundColor Gray
Write-Host "   Luego: git commit -m 'fix: Remove database from version control'" -ForegroundColor Gray
Write-Host "   Y: git push" -ForegroundColor Gray
Write-Host ""
