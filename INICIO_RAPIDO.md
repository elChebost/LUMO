# 🚀 Inicio Rápido - LUMO Corregido

## ✅ Correcciones Aplicadas

1. ✅ Advertencias de React Router v7 eliminadas
2. ✅ Mejor manejo del error ERR_BLOCKED_BY_CLIENT
3. ✅ Configuración de API centralizada
4. ✅ CORS mejorado en el backend

---

## 🎯 Para Iniciar

### Paso 1: Iniciar los Servidores

```bash
cd /workspaces/LUMO/LUMO
./start-fixed.sh
```

O manualmente:
```bash
cd /workspaces/LUMO/LUMO
npm run dev
```

### Paso 2: Abrir el Navegador

1. **Abre en modo incógnito** (recomendado para evitar bloqueadores):
   - Chrome/Edge: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`

2. **O desactiva tu bloqueador de anuncios**:
   - Click en el icono del bloqueador
   - Desactívalo para `localhost`

3. **Ve a:** http://localhost:5173/login

---

## ⚠️ Si Recibes ERR_BLOCKED_BY_CLIENT

Este error es causado por **extensiones del navegador** que bloquean peticiones.

### Solución Rápida:
1. Abre el navegador en **modo incógnito**
2. O desactiva **todas las extensiones**
3. O prueba en **otro navegador**

### Verificar Extensiones:
- Chrome: `chrome://extensions/`
- Firefox: `about:addons`
- Edge: `edge://extensions/`

**Extensiones comunes que causan el problema:**
- uBlock Origin
- AdBlock / AdBlock Plus
- Privacy Badger
- Ghostery
- Antivirus con protección web

---

## 🔍 Verificación

### ¿Los servidores están corriendo?

```bash
# Backend (debe mostrar un número)
lsof -ti :4000

# Frontend (debe mostrar un número)
lsof -ti :5173
```

### ¿La API responde?

Abre la consola del navegador (F12) y ejecuta:

```javascript
fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test', password: 'test' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

Si esto funciona = El problema son las extensiones del navegador ✅  
Si esto falla = Revisa que el backend esté corriendo ❌

---

## 📁 Archivos Importantes

- **Configuración API:** `frontend/src/config.js`
- **Variables de entorno:** `frontend/.env`
- **Login mejorado:** `frontend/src/pages/Login.jsx`
- **CORS mejorado:** `backend/app.js`
- **Router actualizado:** `frontend/src/routes/AppRouter.jsx`

---

## 📖 Documentación Completa

Para más detalles, ver:
- `CORRECCIONES_APLICADAS.md` - Resumen completo de cambios
- `SOLUCION_ERR_BLOCKED_BY_CLIENT.md` - Guía detallada del error

---

## 💡 Tips

1. **Siempre usa modo incógnito** para desarrollo (evita problemas con extensiones)
2. **Verifica los logs** en la consola del navegador (F12)
3. **Revisa que ambos servidores estén corriendo** antes de probar
4. **Si cambias código del backend**, reinicia el servidor

---

## 🎉 ¡Todo Listo!

Las correcciones están aplicadas. Solo necesitas:
1. Iniciar los servidores
2. Abrir en modo incógnito o desactivar bloqueador
3. ¡Disfrutar de LUMO sin errores!

---

**Última actualización:** 13 de Octubre de 2025
