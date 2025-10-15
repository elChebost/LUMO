# ⚠️ ERROR: vite: not found

## 🔍 Problema

```
sh: 1: vite: not found
```

## 💡 Causa

Las dependencias de npm no están instaladas correctamente o están corruptas.

## ✅ Solución

### Opción 1: Script Automático (RECOMENDADO)

```bash
# Desde la raíz del proyecto
chmod +x reparar-frontend.sh
./reparar-frontend.sh
```

Este script:
1. Elimina `node_modules` y `package-lock.json`
2. Reinstala todas las dependencias limpias
3. Inicia el servidor automáticamente

### Opción 2: Manual

```bash
cd /workspaces/LUMO/frontend

# Limpiar instalación anterior
rm -rf node_modules package-lock.json

# Reinstalar dependencias
npm install

# Iniciar servidor
npm run dev
```

## 🚀 Después de Instalar

El servidor debería iniciar en:
```
http://localhost:5173
```

## 📋 Verificar Instalación

```bash
cd /workspaces/LUMO/frontend

# Verificar que vite está instalado
npx vite --version

# Debería mostrar algo como: vite/7.1.6
```

## 🐛 Si el Problema Persiste

### 1. Verificar versión de Node.js

```bash
node --version
# Debe ser 18 o superior
```

### 2. Limpiar cache de npm

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 3. Verificar package.json

```bash
cat frontend/package.json | grep vite
```

Debería mostrar:
```json
"vite": "^7.1.6"
```

## ✅ Checklist de Solución

- [ ] Estás en el directorio `/frontend`
- [ ] Eliminaste `node_modules` y `package-lock.json`
- [ ] Ejecutaste `npm install`
- [ ] `npx vite --version` funciona
- [ ] `npm run dev` inicia el servidor
- [ ] Puedes acceder a http://localhost:5173

## 📝 Notas

- **Node.js requerido:** 18 o superior
- **npm requerido:** 9 o superior
- **Tiempo de instalación:** 1-2 minutos
- **Tamaño de node_modules:** ~300MB

---

**Última actualización:** 15 de Octubre 2025
