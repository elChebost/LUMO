# 🚀 GUÍA SIMPLE - MySQL con Docker

## ✅ Lo que Tienes Ahora (FUNCIONAL Y SIMPLE)

Tu proyecto usa **MySQL en Docker** - la forma más fácil y práctica para desarrollo.

---

## 🎯 Todo lo que Necesitas Saber

### Para INICIAR el proyecto:

```bash
cd /workspaces/LUMO/LUMO
./start.sh
```

Eso es todo. El script hace automáticamente:
- ✅ Inicia MySQL si está detenido
- ✅ Inicia el backend (puerto 5000)
- ✅ Inicia el frontend (puerto 5174)

---

### Para VER/EDITAR datos:

```bash
cd /workspaces/LUMO/LUMO/backend
npx prisma studio
```

Abre una interfaz web en `http://localhost:5555`

---

### Para DETENER el proyecto:

Presiona `Ctrl+C` en la terminal donde está corriendo.

---

## 📊 Ventajas de Esta Configuración

| Ventaja | Explicación |
|---------|-------------|
| ✅ **Simple** | Un solo comando para iniciar todo |
| ✅ **Funcional** | Todo está configurado y probado |
| ✅ **Independiente** | No necesitas configurar nada en servidores |
| ✅ **Rápido** | Inicia en segundos |
| ✅ **Sin sudo** | No necesitas permisos especiales |

---

## 🔧 Si Necesitas Resetear Todo

```bash
# Eliminar contenedor MySQL
docker stop lumo-mysql
docker rm lumo-mysql

# Recrear desde cero
cd /workspaces/LUMO/LUMO
./start.sh
```

El script detecta que no existe y lo crea automáticamente.

---

## 📁 Archivos Importantes

- **`/workspaces/LUMO/LUMO/start.sh`** - Script de inicio (usa este)
- **`/workspaces/LUMO/LUMO/backend/.env`** - Configuración de MySQL
- **`/workspaces/LUMO/README_MYSQL.md`** - Documentación completa

---

## ❓ Preguntas Frecuentes

**P: ¿Los datos se guardan?**  
R: Sí, mientras no elimines el contenedor Docker.

**P: ¿Qué pasa si reinicio el devcontainer?**  
R: Solo ejecuta `./start.sh` y todo vuelve a funcionar.

**P: ¿Necesito configurar algo en el servidor SSH?**  
R: No. Esta configuración es 100% independiente.

**P: ¿Es esto "profesional"?**  
R: Sí, muchas empresas usan Docker para desarrollo. Para producción usarías un MySQL dedicado, pero para desarrollo esto es perfecto.

---

## ✅ Resumen

Tu configuración actual es:

- ✅ **Funcional** - Todo está probado y funciona
- ✅ **Simple** - Un comando para iniciar
- ✅ **Completa** - Base de datos con todas las tablas
- ✅ **Lista para desarrollar** - Puedes empezar ahora mismo

**Para iniciar:**

```bash
cd /workspaces/LUMO/LUMO
./start.sh
```

¡Eso es todo! 🎉

---

## 🎨 URLs del Proyecto

- Frontend: http://localhost:5174
- Backend: http://localhost:5000  
- Base de datos (Prisma Studio): http://localhost:5555

---

**¿Listo para desarrollar? Solo ejecuta `./start.sh` y empieza a codear.** 🚀
