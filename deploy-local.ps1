# 🚀 Script de Deployment Local - LUMO (Windows)
# Este script construye el frontend para pruebas locales

Write-Host "🚀 Construyendo LUMO (Desarrollo Local)..." -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path ".\frontend")) {
    Write-Host "❌ Error: No se encontró el directorio frontend" -ForegroundColor Red
    Write-Host "   Ejecuta este script desde la raíz del proyecto LUMO" -ForegroundColor Yellow
    exit 1
}

# Construir Frontend
Write-Host "📦 Construyendo Frontend..." -ForegroundColor Yellow
Set-Location .\frontend

try {
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Frontend construido exitosamente" -ForegroundColor Green
    } else {
        throw "Error al construir"
    }
} catch {
    Write-Host "❌ Error al construir el frontend" -ForegroundColor Red
    exit 1
}

# Verificar archivos generados
Write-Host ""
Write-Host "📋 Verificando archivos generados..." -ForegroundColor Yellow

if (Test-Path ".\dist\assets") {
    Write-Host "✅ Directorio dist/assets/ existe" -ForegroundColor Green
    Write-Host "   Archivos de imágenes en assets/:" -ForegroundColor Cyan
    Get-ChildItem ".\dist\assets\*.png", ".\dist\assets\*.jpg", ".\dist\assets\*.jpeg", ".\dist\assets\*.gif", ".\dist\assets\*.svg" -ErrorAction SilentlyContinue | ForEach-Object {
        $size = [math]::Round($_.Length / 1KB, 2)
        Write-Host "   - $($_.Name) ($size KB)" -ForegroundColor White
    }
} else {
    Write-Host "❌ Error: No se encontró dist/assets/" -ForegroundColor Red
    exit 1
}

# Listar todos los archivos en dist/assets
Write-Host ""
Write-Host "📦 Contenido completo de dist/assets/:" -ForegroundColor Cyan
Get-ChildItem ".\dist\assets" | ForEach-Object {
    $size = if ($_.PSIsContainer) { "DIR" } else { "$([math]::Round($_.Length / 1KB, 2)) KB" }
    Write-Host "   $($_.Name.PadRight(30)) $size" -ForegroundColor White
}

Set-Location ..

Write-Host ""
Write-Host "🎉 Build completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Los archivos están listos en ./frontend/dist/" -ForegroundColor White
Write-Host "   2. Para desarrollo local: npm run dev desde ./frontend/" -ForegroundColor White
Write-Host "   3. Para producción: sube ./frontend/dist/ al servidor" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Archivos de assets generados correctamente en:" -ForegroundColor Cyan
Write-Host "   ./frontend/dist/assets/" -ForegroundColor White
