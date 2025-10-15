# 🎬 EJEMPLOS DE USO - Scripts de Inicio LUMO

## 📋 Todos los scripts creados

```
LUMO/
├── start.sh .............. Script Bash (Linux/Mac/WSL) ⭐ RECOMENDADO
├── start.bat ............. Script Windows
├── package.json .......... Scripts npm multiplataforma
└── INICIO_RAPIDO.md ...... Documentación completa
```

---

## 🚀 EJEMPLO 1: Inicio Rápido (Linux/Mac/WSL)

### Primera vez:
```bash
cd /workspaces/LUMO
chmod +x start.sh
./start.sh
```

### Output esperado:
```
🚀 Iniciando LUMO...

📦 Verificando dependencias...
✅ Dependencias verificadas

🔌 Iniciando Backend (Puerto 3000)...
🎨 Iniciando Frontend (Puerto 5173)...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Servicios iniciados:
   🔌 Backend:  http://localhost:3000
   🎨 Frontend: http://localhost:5173

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Presiona Ctrl+C para detener ambos servicios

> backend@1.0.0 start
> node app.js

Servidor corriendo en puerto 3000
SQLite conectado con Prisma

  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Para detener:
```
Presiona Ctrl+C
```

---

## 🪟 EJEMPLO 2: Windows (archivo .bat)

### Primera vez:
```cmd
cd C:\Users\TuUsuario\LUMO
start.bat
```

### Output esperado:
Se abrirán **2 ventanas de cmd**:

**Ventana 1 - LUMO Backend:**
```
Servidor corriendo en puerto 3000
SQLite conectado con Prisma
```

**Ventana 2 - LUMO Frontend:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Para detener:
```
Cierra ambas ventanas de cmd
```

---

## 📦 EJEMPLO 3: npm scripts (Multiplataforma)

### Primera vez (instalar npm-run-all):
```bash
cd /workspaces/LUMO
npm install
```

### Arrancar:
```bash
npm start
```

### Output esperado:
```
> lumo-fullstack@1.0.0 start
> npm-run-all --parallel start:backend start:frontend

> lumo-fullstack@1.0.0 start:backend
> cd backend && npm start

> lumo-fullstack@1.0.0 start:frontend
> cd frontend && npm run dev

> backend@1.0.0 start
> node app.js

Servidor corriendo en puerto 3000
SQLite conectado con Prisma

  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Otros comandos disponibles:
```bash
npm run dev            # Igual que npm start
npm run install:all    # Instalar dependencias de ambos proyectos
npm run start:backend  # Solo arrancar backend
npm run start:frontend # Solo arrancar frontend
```

---

## 🎯 Workflow Recomendado

### Para desarrollo diario:

```bash
# Llegar al proyecto
cd /workspaces/LUMO

# Arrancar todo
./start.sh

# Esperar a ver:
# ✅ Servicios iniciados:
#    🔌 Backend:  http://localhost:3000
#    🎨 Frontend: http://localhost:5173

# Abrir navegador en http://localhost:5173

# Desarrollar normalmente...

# Al terminar, presionar Ctrl+C
```

---

## 🔧 Casos de Uso Específicos

### Caso 1: Solo quiero el backend
```bash
cd /workspaces/LUMO/backend
npm start
```

### Caso 2: Solo quiero el frontend
```bash
cd /workspaces/LUMO/frontend
npm run dev
```

### Caso 3: Quiero ver solo los logs del backend
```bash
# En una terminal:
./start.sh

# En otra terminal:
cd /workspaces/LUMO/backend
tail -f logs.txt  # Si tienes logs a archivo
```

### Caso 4: Quiero arrancar en puertos diferentes

**Backend en puerto 4000:**
```bash
cd /workspaces/LUMO/backend
PORT=4000 npm start
```

**Frontend apuntando al nuevo puerto:**
```bash
cd /workspaces/LUMO/frontend
VITE_API_URL=http://localhost:4000 npm run dev
```

### Caso 5: Reinstalar todo desde cero
```bash
cd /workspaces/LUMO

# Limpiar todo
rm -rf backend/node_modules
rm -rf frontend/node_modules
rm -rf node_modules

# Reinstalar
npm run install:all

# O usar el script que lo hace automático
./start.sh
```

---

## 📊 Comparación de Métodos

| Método | Ventajas | Desventajas |
|--------|----------|-------------|
| **start.sh** | ✅ Rápido<br>✅ Un solo comando<br>✅ Instala dependencias auto<br>✅ Colores bonitos | ❌ Solo Linux/Mac/WSL |
| **start.bat** | ✅ Nativo en Windows<br>✅ Ventanas separadas<br>✅ Instala dependencias auto | ❌ Solo Windows<br>⚠️ No muestra logs juntos |
| **npm start** | ✅ Multiplataforma<br>✅ Estándar de npm<br>✅ Fácil de entender | ⚠️ Requiere npm install primero<br>⚠️ Logs mezclados pueden confundir |
| **Manual** | ✅ Control total<br>✅ Ver logs separados | ❌ Requiere 2 terminales<br>❌ Más pasos |

---

## 🎓 Tips y Trucos

### Tip 1: Alias en tu shell
Agrega a tu `~/.bashrc` o `~/.zshrc`:

```bash
alias lumo="cd /workspaces/LUMO && ./start.sh"
```

Ahora desde cualquier lugar:
```bash
lumo
```

### Tip 2: Abrir automáticamente el navegador
Modifica `start.sh`, agrega después de iniciar frontend:

```bash
# Esperar 5 segundos a que Vite arranque
sleep 5

# Abrir navegador automáticamente
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5173
elif command -v open &> /dev/null; then
    open http://localhost:5173
fi
```

### Tip 3: Ver logs en tiempo real
```bash
# Terminal 1
./start.sh

# Terminal 2 - Ver solo backend
cd backend && npm start 2>&1 | grep -v "GET\|POST"

# Terminal 3 - Ver solo frontend
cd frontend && npm run dev 2>&1 | grep "Local:"
```

### Tip 4: Script de "reinicio rápido"
Crea `restart.sh`:

```bash
#!/bin/bash
pkill -f "node app.js"
pkill -f "vite"
sleep 2
./start.sh
```

---

## 🆘 Troubleshooting Común

### Problema: "Address already in use"

**Solución para puerto 3000 (Backend):**
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <número> /F
```

**Solución para puerto 5173 (Frontend):**
```bash
# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <número> /F
```

### Problema: "./start.sh: Permission denied"

**Solución:**
```bash
chmod +x start.sh
```

### Problema: "npm-run-all: command not found"

**Solución:**
```bash
cd /workspaces/LUMO
npm install
```

### Problema: El frontend no conecta con el backend

**Verificar:**
1. Backend está corriendo: `curl http://localhost:3000/api/students`
2. Puerto correcto en config: `cat frontend/src/config/api.js`
3. CORS configurado: Verificar `backend/app.js`

---

## 🎉 ¡Todo Listo!

Ahora tienes **3 formas diferentes** de arrancar tu proyecto. Elige la que más te guste:

```bash
./start.sh          # ⭐ Recomendado para Linux/Mac/WSL
start.bat           # ⭐ Recomendado para Windows
npm start           # ⭐ Multiplataforma estándar
```

**¿Dudas?** Consulta [INICIO_RAPIDO.md](./INICIO_RAPIDO.md) para más detalles.
