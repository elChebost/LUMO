# Credenciales de Acceso - LUMO

## Acceso para Docente

### Opción 1 (Nuevo usuario creado):
- **Email:** `profesor@lumo.cl`
- **Contraseña:** `pass123`

### Opción 2 (Usuario original):
- **Email:** `remindevelopment@gmail.com`
- **Contraseña:** `docentest123`

## Acceso para Alumno

- **Email:** `alumno.ejemplo@gmail.com`
- **Contraseña:** (verificar en la base de datos)

## URLs de la Aplicación

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000
- **Endpoint de Login:** http://localhost:4000/api/auth/login

## Estado del Sistema

✅ **Backend:** Corriendo en puerto 4000 (PID: 81022)
✅ **Frontend:** Corriendo en puerto 5173 (PID: 64763)
✅ **Base de Datos:** SQLite en `/workspaces/LUMO/LUMO/backend/prisma/dev.db`

## Comandos Útiles

### Verificar si los servidores están corriendo:
```bash
# Verificar backend
lsof -i :4000

# Verificar frontend
lsof -i :5173
```

### Reiniciar el backend:
```bash
# Detener procesos en puerto 4000
lsof -i :4000 | grep -v COMMAND | awk '{print $2}' | xargs -r kill -9

# Iniciar backend
cd /workspaces/LUMO
nohup node LUMO/backend/src/index.js > backend.log 2>&1 &
```

### Ver usuarios en la base de datos:
```bash
sqlite3 LUMO/backend/prisma/dev.db "SELECT id, firstName, lastName, email, role FROM User;"
```

## Solución de Problemas

### Error: EADDRINUSE (puerto ya en uso)
El puerto 4000 ya está en uso. Ejecutar:
```bash
lsof -i :4000 | grep -v COMMAND | awk '{print $2}' | xargs -r kill -9
```

### Error: Failed to fetch / ERR_CONNECTION_REFUSED
El backend no está corriendo. Ejecutar:
```bash
nohup node LUMO/backend/src/index.js > backend.log 2>&1 &
```

### Credenciales incorrectas
Usar las credenciales listadas arriba. Si necesitas crear un nuevo usuario:
```bash
sqlite3 LUMO/backend/prisma/dev.db "INSERT INTO User (firstName, lastName, name, role, email, password, xp, level, lastActivity, createdAt) VALUES ('Nombre', 'Apellido', 'Nombre Completo', 'docente', 'email@ejemplo.com', 'contraseña', 0, 1, datetime('now'), datetime('now'));"
```
