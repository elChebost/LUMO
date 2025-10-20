# 🗄️ Guía de Configuración de Base de Datos - LUMO

## ⚠️ PROBLEMA RESUELTO: Bases de datos diferentes entre dispositivos

### 🔍 Causa del problema
La base de datos SQLite (`dev.db`) estaba siendo versionada en Git, lo que causaba que cada dispositivo sobrescribiera la base de datos del otro al hacer `git pull`.

---

## ✅ Solución implementada

### 1. **Base de datos excluida de Git**
- Archivos `.db`, `.db-shm`, y `.db-wal` ahora están en `.gitignore`
- La base de datos es **local** a cada dispositivo
- Cada desarrollador mantiene su propia copia de datos

### 2. **Configuración estandarizada**
- Archivo `.env.example` como plantilla
- Ruta de base de datos simplificada: `./prisma/dev.db`

---

## 🚀 Configuración inicial en un nuevo dispositivo

### **Primer uso o después de clonar el repositorio:**

```powershell
# 1. Navegar a la carpeta backend
cd backend

# 2. Copiar la configuración de ejemplo
copy .env.example .env

# 3. Instalar dependencias
npm install

# 4. Generar el cliente de Prisma
npm run prisma:generate

# 5. Ejecutar migraciones (crea la base de datos)
npm run prisma:migrate

# 6. Poblar la base de datos con datos iniciales
npm run seed
```

---

## 🔄 Sincronización del esquema (NO de los datos)

### **Cuando alguien del equipo actualiza el schema.prisma:**

1. **Hacer pull de los cambios:**
```powershell
git pull
```

2. **Actualizar tu base de datos local:**
```powershell
cd backend
npm run prisma:migrate
npm run prisma:generate
```

3. **Si es necesario, re-poblar datos:**
```powershell
npm run seed
```

---

## 📝 Reglas importantes

### ✅ **SÍ versionar en Git:**
- `prisma/schema.prisma` - Esquema de la base de datos
- `prisma/migrations/*` - Historial de migraciones
- `.env.example` - Plantilla de configuración
- Scripts de seeds - Para datos iniciales

### ❌ **NO versionar en Git:**
- `*.db` - Archivo de base de datos SQLite
- `*.db-shm`, `*.db-wal` - Archivos temporales de SQLite
- `.env` - Variables de entorno (pueden contener datos sensibles)

---

## 🛠️ Comandos útiles

### **Ver la base de datos con interfaz gráfica:**
```powershell
cd backend
npm run prisma:studio
```

### **Resetear base de datos local (⚠️ BORRA TODOS LOS DATOS):**
```powershell
cd backend
Remove-Item prisma/dev.db
npm run prisma:migrate
npm run seed
```

### **Crear nueva migración después de cambiar schema.prisma:**
```powershell
cd backend
npm run prisma:migrate
```

---

## 🔧 Solución de problemas comunes

### **"La página no se renderiza / los datos no cargan"**
Posible causa: Base de datos desactualizada o corrupta.

**Solución:**
```powershell
cd backend
Remove-Item prisma/dev.db -ErrorAction SilentlyContinue
Remove-Item prisma/prisma/dev.db -ErrorAction SilentlyContinue
npm run prisma:migrate
npm run seed
```

### **"Error: Can't reach database server"**
Verifica que el archivo `.env` existe y tiene la ruta correcta:
```
DATABASE_URL="file:./prisma/dev.db"
```

### **"Prisma Client no está actualizado"**
```powershell
cd backend
npm run prisma:generate
```

---

## 📊 Estructura de archivos de base de datos

```
backend/
├── .env                          # ❌ NO versionar (tu configuración local)
├── .env.example                  # ✅ Versionar (plantilla)
└── prisma/
    ├── schema.prisma             # ✅ Versionar (esquema compartido)
    ├── dev.db                    # ❌ NO versionar (datos locales)
    ├── migrations/               # ✅ Versionar (historial de cambios)
    │   └── [timestamps]/
    └── prisma/
        └── dev.db                # ❌ NO versionar (archivo legacy)
```

---

## 💡 Mejores prácticas

1. **Antes de hacer push:**
   - Verifica que no estás incluyendo archivos `.db`
   - Ejecuta: `git status` para revisar cambios

2. **Después de hacer pull:**
   - Ejecuta migraciones si hubo cambios en schema: `npm run prisma:migrate`
   - Regenera el cliente: `npm run prisma:generate`

3. **Para datos de prueba consistentes:**
   - Usa los scripts de seed: `npm run seed`
   - Documenta cambios en los seeds si añades nuevos datos de prueba

4. **Para producción:**
   - Considera usar PostgreSQL o MySQL en lugar de SQLite
   - Usa variables de entorno seguras
   - Nunca versiones el archivo `.env` con credenciales reales

---

## 🎯 Siguiente paso recomendado

### **Limpiar el archivo .db del repositorio Git:**

```powershell
# Eliminar del historial de Git (mantener archivo local)
git rm --cached backend/prisma/prisma/dev.db
git rm --cached backend/prisma/dev.db -ErrorAction SilentlyContinue

# Hacer commit de los cambios
git add .
git commit -m "fix: Remove database file from version control"

# Subir cambios
git push
```

Después de esto, cada dispositivo manejará su propia base de datos independiente.

---

**Creado:** Octubre 2025  
**Última actualización:** Octubre 2025
