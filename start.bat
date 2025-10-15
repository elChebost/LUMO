@echo off
REM 🚀 LUMO - Script de inicio completo para Windows
REM Este script arranca el backend y frontend simultáneamente

echo.
echo 🚀 Iniciando LUMO...
echo.

REM Verificar que Node.js esté instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor instálalo primero.
    pause
    exit /b 1
)

REM Verificar que npm esté instalado
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado. Por favor instálalo primero.
    pause
    exit /b 1
)

echo 📦 Verificando dependencias...
echo.

REM Instalar dependencias del backend si es necesario
if not exist "backend\node_modules" (
    echo 📥 Instalando dependencias del backend...
    cd backend
    call npm install
    cd ..
)

REM Instalar dependencias del frontend si es necesario
if not exist "frontend\node_modules" (
    echo 📥 Instalando dependencias del frontend...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ✅ Dependencias verificadas
echo.
echo 🔌 Iniciando Backend (Puerto 3000)...
echo 🎨 Iniciando Frontend (Puerto 5173)...
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Iniciar backend en nueva ventana
start "LUMO Backend" cmd /k "cd backend && npm start"

REM Esperar 3 segundos
timeout /t 3 /nobreak >nul

REM Iniciar frontend en nueva ventana
start "LUMO Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Servicios iniciados en ventanas separadas:
echo    🔌 Backend:  http://localhost:3000
echo    🎨 Frontend: http://localhost:5173
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📝 Cierra las ventanas de cmd para detener los servicios
echo.
pause
