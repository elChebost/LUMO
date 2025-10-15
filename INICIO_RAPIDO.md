# 🚀 INICIO RÁPIDO - LUMO FRONTEND

## ⚡ Comando Rápido

```bash
# Desde la raíz del proyecto
./iniciar.sh
```

**O manualmente:**

```bash
cd frontend
npm run dev
```

---

## 📍 IMPORTANTE: Ubicación de los Comandos

### ❌ NO ejecutar desde la raíz:
```bash
# ❌ ESTO NO FUNCIONA (no hay package.json en raíz)
npm run dev
```

### ✅ SÍ ejecutar desde /frontend:
```bash
# ✅ CORRECTO
cd frontend
npm run dev
```

---

## 🔧 Primera Vez

### 1. Configurar Variables de Entorno

```bash
cd frontend
cp .env.example .env
nano .env  # o cualquier editor
```

Edita `.env`:
```env
VITE_API_URL=http://localhost:4000
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Iniciar Servidor

```bash
npm run dev
```

### 4. Abrir Navegador

```
http://localhost:5173
```

---

## 📋 Scripts Disponibles

**Todos ejecutados desde `/frontend`:**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (puerto 5173)

# Producción
npm run build        # Construir para producción
npm run preview      # Previsualizar build

# Calidad
npm run lint         # Ejecutar ESLint
```

---

## 🐛 Solución de Problemas

### Error: "Could not read package.json"

**Causa:** Estás en el directorio raíz, no en `/frontend`

**Solución:**
```bash
cd frontend
npm run dev
```

### Error: "Cannot find module"

**Causa:** Dependencias no instaladas

**Solución:**
```bash
cd frontend
npm install
npm run dev
```

### Error: "vite: not found"

**Causa:** Dependencias corruptas o mal instaladas

**Solución rápida:**
```bash
# Desde la raíz
chmod +x reparar-frontend.sh
./reparar-frontend.sh
```

**O manual:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Ver `SOLUCION_VITE_NOT_FOUND.md` para más detalles.

### Error: "EADDRINUSE: address already in use"

**Causa:** Puerto 5173 ya está en uso

**Solución:**
```bash
# Matar proceso en puerto 5173
lsof -ti :5173 | xargs kill -9

# Reiniciar
npm run dev
```

### Error: "Failed to fetch from backend"

**Causa:** Backend no está corriendo o URL incorrecta

**Solución:**
1. Verifica que el backend esté corriendo
2. Revisa `.env` → `VITE_API_URL`
3. Abre DevTools (F12) para ver errores

---

## 🔗 Backend

Este frontend espera un backend corriendo en:
```
http://localhost:4000
```

Configura la URL en `frontend/.env`:
```env
VITE_API_URL=http://localhost:4000
```

Ver `README.md` para más detalles sobre la API esperada.

---

## 📦 Estructura del Proyecto

```
LUMO/
├── iniciar.sh           # Script de inicio rápido ⭐
├── README.md            # Documentación completa
├── BITACORA_TECNICA.md # Documentación técnica
└── frontend/            # DIRECTORIO PRINCIPAL
    ├── .env            # Tu configuración
    ├── .env.example    # Plantilla
    ├── package.json    # Dependencias ⭐
    ├── vite.config.js  # Configuración de Vite
    └── src/            # Código fuente
```

---

## ✅ Checklist Inicial

- [ ] `cd frontend`
- [ ] Copiar `.env.example` a `.env`
- [ ] Editar `.env` con URL del backend
- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Abrir http://localhost:5173
- [ ] Verificar conexión con backend

---

## 🎯 Credenciales de Prueba

### Docente:
- Email: `remindevelopment@gmail.com`
- Password: `docentest123`

### Alumno:
- Email: `alumno.ejemplo@gmail.com`
- Password: `alumnotest123`

---

**¿Más información?** Lee `README.md` en la raíz del proyecto.

**Fecha:** 15 de Octubre 2025
