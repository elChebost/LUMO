@echo off
REM 🚀 LUMO - Script de inicio completo para Windows (VERSIÓN MEJORADA)
REM Este script arranca el backend y frontend simultáneamente usando rutas completas

echo.
echo 🚀 Iniciando LUMO...
echo.

REM Definir rutas de Node.js y npm
set NODE_PATH="C:\Program Files\nodejs\node.exe"
set NPM_PATH="C:\Program Files\nodejs\npm.cmd"

REM Verificar que Node.js esté instalado
if not exist %NODE_PATH% (
    echo ❌ Node.js no está instalado en la ruta esperada.
    echo 📝 Busca la instalación de Node.js...
    where node >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Node.js no encontrado. Por favor instálalo primero.
        pause
        exit /b 1
    ) else (
        echo ✅ Node.js encontrado en PATH
        set NODE_PATH=node
        set NPM_PATH=npm
    )
) else (
    echo ✅ Node.js encontrado en: %NODE_PATH%
)

echo 📦 Verificando dependencias...
echo.

REM Instalar dependencias del backend si es necesario
if not exist "backend\node_modules" (
    echo 📥 Instalando dependencias del backend...
    cd backend
    call %NPM_PATH% install
    cd ..
)

REM Instalar dependencias del frontend si es necesario
if not exist "frontend\node_modules" (
    echo 📥 Instalando dependencias del frontend...
    cd frontend
    call %NPM_PATH% install
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

REM Iniciar backend en nueva ventana usando ruta completa
start "LUMO Backend" cmd /k "cd backend && %NODE_PATH% app.js"

REM Esperar 3 segundos
timeout /t 3 /nobreak >nul

REM Iniciar frontend en nueva ventana usando ruta completa
start "LUMO Frontend" cmd /k "cd frontend && %NPM_PATH% run dev"

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