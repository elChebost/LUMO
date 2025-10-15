# 🚀 GUÍA DE INICIO RÁPIDO - LUMO

## 🎯 Opciones para arrancar el proyecto

He creado **3 formas diferentes** para arrancar Backend + Frontend simultáneamente:

---

## ✅ OPCIÓN 1: Script Bash (Linux/Mac/WSL) - **RECOMENDADO**

### Uso:
```bash
./start.sh
```

### Características:
- ✅ Arranca ambos servicios en la misma terminal
- ✅ Verifica e instala dependencias automáticamente
- ✅ Muestra logs de ambos servicios juntos
- ✅ Presiona `Ctrl+C` para detener todo
- ✅ Colores bonitos en terminal

### Primera vez:
```bash
cd /workspaces/LUMO
chmod +x start.sh
./start.sh
```

---

## ✅ OPCIÓN 2: Script Windows (.bat)

### Uso:
```cmd
start.bat
```

### Características:
- ✅ Abre 2 ventanas separadas (Backend y Frontend)
- ✅ Verifica e instala dependencias automáticamente
- ✅ Cierra las ventanas para detener los servicios
- ✅ Ideal para Windows nativo

### Primera vez:
```cmd
cd C:\ruta\a\LUMO
start.bat
```

---

## ✅ OPCIÓN 3: npm scripts (Todas las plataformas)

### Instalación (solo primera vez):
```bash
cd /workspaces/LUMO
npm install
```

### Uso:
```bash
npm start
```

### Características:
- ✅ Usa `npm-run-all` para ejecutar ambos en paralelo
- ✅ Muestra logs de ambos servicios en la misma terminal
- ✅ Presiona `Ctrl+C` para detener todo
- ✅ Multiplataforma (funciona igual en Linux/Mac/Windows)

### Comandos disponibles:
```bash
npm start              # Arrancar backend + frontend
npm run dev            # Igual que npm start
npm run install:all    # Instalar dependencias de ambos
npm run start:backend  # Solo backend
npm run start:frontend # Solo frontend
```

---

## 🔧 Comparación de Opciones

| Característica | Script Bash | Script Windows | npm scripts |
|----------------|-------------|----------------|-------------|
| **Linux/Mac** | ✅ Mejor opción | ❌ No funciona | ✅ Funciona |
| **Windows** | ⚠️ Requiere WSL | ✅ Mejor opción | ✅ Funciona |
| **Instalación** | No requiere | No requiere | Requiere `npm install` |
| **Ventanas separadas** | ❌ Una sola | ✅ Dos ventanas | ❌ Una sola |
| **Logs mezclados** | ✅ Sí | ❌ No | ✅ Sí |
| **Colores** | ✅ Sí | ⚠️ Limitado | ⚠️ Limitado |

---

## 📝 Después de arrancar

Sin importar qué opción uses, verás:

```
✅ Servicios iniciados:
   🔌 Backend:  http://localhost:3000
   🎨 Frontend: http://localhost:5173
```

### Abre tu navegador en:
**http://localhost:5173**

---

## 🛑 Para detener los servicios

### Script Bash / npm scripts:
```
Presiona Ctrl+C en la terminal
```

### Script Windows:
```
Cierra las ventanas de cmd que se abrieron
```

---

## ⚠️ Troubleshooting

### Error: "puerto ya en uso"

**Backend (puerto 3000)**:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <número> /F
```

**Frontend (puerto 5173)**:
```bash
# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <número> /F
```

### Error: "command not found: npm"

Instala Node.js desde: https://nodejs.org/

### Error: "Permission denied" en start.sh

```bash
chmod +x start.sh
```

### Error: npm-run-all no encontrado

```bash
cd /workspaces/LUMO
npm install
```

---

## 🎯 Mi Recomendación

**Para desarrollo en Linux/Mac/WSL (tu caso actual):**
```bash
./start.sh
```

**Para desarrollo en Windows nativo:**
```cmd
start.bat
```

**Para CI/CD o scripts automatizados:**
```bash
npm start
```

---

## 📂 Archivos Creados

```
LUMO/
├── start.sh ................. Script Bash (Linux/Mac/WSL)
├── start.bat ................ Script Windows
├── package.json ............. Scripts npm
└── INICIO_RAPIDO.md ......... Esta guía
```

---

## ✨ Características de los Scripts

### ✅ Verificación automática de dependencias
Si `node_modules` no existe, los instala automáticamente.

### ✅ Arranque secuencial inteligente
1. Arranca el backend primero
2. Espera 3 segundos
3. Arranca el frontend

Esto evita errores de conexión del frontend cuando el backend aún no está listo.

### ✅ Limpieza al salir
Al presionar `Ctrl+C`, ambos procesos se detienen correctamente.

---

## 🚀 ¡Pruébalo ahora!

```bash
cd /workspaces/LUMO
./start.sh
```

**¡Listo!** 🎉 Tu aplicación estará corriendo en segundos.
