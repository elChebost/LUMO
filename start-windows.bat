@echo off
REM 🚀 LUMO - Script de inicio para Windows
REM Este script arranca el backend y frontend simultáneamente

echo.
echo ================================
echo 🚀 Iniciando LUMO
echo ================================
echo.

REM Matar procesos previos en los puertos
echo 🧹 Limpiando puertos anteriores...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do taskkill /F /PID %%a >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo 📦 Verificando dependencias...

REM Verificar e instalar dependencias del backend
if not exist "backend\node_modules\" (
    echo 📥 Instalando dependencias del backend...
    cd backend
    call npm install --silent
    cd ..
)

REM Verificar e instalar dependencias del frontend
if not exist "frontend\node_modules\" (
    echo 📥 Instalando dependencias del frontend...
    cd frontend
    call npm install --silent
    cd ..
)

echo.
echo ✅ Dependencias verificadas
echo.
echo 🔌 Iniciando Backend ^(Puerto 3000^)...
echo 🎨 Iniciando Frontend ^(Puerto 5173^)...
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Iniciar backend en nueva ventana
start "LUMO Backend" cmd /k "cd backend && node app.js"

REM Esperar 3 segundos
timeout /t 3 /nobreak >nul

REM Iniciar frontend en nueva ventana
start "LUMO Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 2 /nobreak >nul

echo.
echo ✅ Servicios iniciados:
echo    🔌 Backend:  http://localhost:3000
echo    🎨 Frontend: http://localhost:5173
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📝 Para detener los servicios, cierra las ventanas de Backend y Frontend
echo.
pause
