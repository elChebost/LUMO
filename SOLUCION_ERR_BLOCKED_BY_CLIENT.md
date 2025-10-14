# Solución para ERR_BLOCKED_BY_CLIENT

## Problema
El error `ERR_BLOCKED_BY_CLIENT` ocurre cuando una extensión del navegador (generalmente un bloqueador de anuncios) bloquea las peticiones HTTP realizadas por la aplicación.

## Causas Comunes

1. **Bloqueadores de anuncios** (AdBlock, uBlock Origin, etc.)
2. **Extensiones de privacidad** (Privacy Badger, Ghostery, etc.)
3. **Antivirus con protección web**
4. **Configuraciones de seguridad del navegador**

## Soluciones

### Solución 1: Desactivar extensiones temporalmente

1. Abre el navegador en **modo incógnito/privado** (esto generalmente desactiva las extensiones)
2. Prueba la aplicación en ese modo

### Solución 2: Desactivar bloqueador de anuncios para localhost

#### Para uBlock Origin:
1. Haz clic en el icono de uBlock Origin
2. Haz clic en el botón de power (desactivar para este sitio)
3. Recarga la página

#### Para AdBlock/AdBlock Plus:
1. Haz clic en el icono de AdBlock
2. Selecciona "No ejecutar en páginas de este dominio"
3. Recarga la página

### Solución 3: Añadir localhost a la lista blanca

1. Ve a la configuración de tu bloqueador de anuncios
2. Busca "Lista blanca" o "Whitelist"
3. Añade: `localhost`, `127.0.0.1`, o `http://localhost:5173`

### Solución 4: Verificar extensiones instaladas

1. Ve a `chrome://extensions/` (Chrome) o `about:addons` (Firefox)
2. Desactiva temporalmente todas las extensiones
3. Prueba la aplicación
4. Activa las extensiones una por una para identificar cuál causa el problema

### Solución 5: Usar navegador sin extensiones

1. Abre Chrome/Edge con perfil limpio:
   ```bash
   # Chrome
   google-chrome --user-data-dir=/tmp/chrome-clean --disable-extensions
   
   # Edge
   microsoft-edge --user-data-dir=/tmp/edge-clean --disable-extensions
   ```

## Verificación

Después de aplicar una solución, verifica que:

1. El backend esté corriendo: `lsof -ti :4000`
2. El frontend pueda conectarse abriendo la consola del navegador (F12)
3. No haya errores de CORS en la consola

## Configuración Actualizada

Ya se han realizado las siguientes mejoras en el código:

✅ **Frontend**: 
- Configuración centralizada en `src/config.js`
- Mejor manejo de errores con mensajes específicos
- Uso de variables de entorno para la URL de la API

✅ **Backend**:
- CORS configurado para múltiples orígenes
- Puerto por defecto actualizado a 4000
- Headers permitidos explícitamente

✅ **React Router**:
- Flags de futuro agregados para evitar advertencias
- `v7_startTransition` y `v7_relativeSplatPath` activados

## Testing

Para probar la conexión:

```javascript
// En la consola del navegador (F12)
fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

Si este fetch funciona pero el login no, entonces el problema es específico del bloqueador.

## Notas Adicionales

- El error `ERR_BLOCKED_BY_CLIENT` NO es un error de código
- Es un problema del navegador/extensiones del usuario
- La aplicación debe funcionar correctamente en navegadores sin extensiones
