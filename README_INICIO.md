# 🚀 INICIO RÁPIDO - LUMO

## ▶️ Arrancar el Proyecto (Lo Más Simple)

### 1️⃣ Primera Vez (Instalación)

```bash
# Instalar dependencias del backend
cd /workspaces/LUMO/backend
npm install
npx prisma generate
npx prisma migrate dev --name init

# Instalar dependencias del frontend  
cd /workspaces/LUMO/frontend
npm install
```

---

### 2️⃣ Arrancar Backend + Frontend

#### **Opción A: Automático (1 comando)**

```bash
cd /workspaces/LUMO
./start.sh
```

#### **Opción B: Manual (2 terminales)**

**Terminal 1 - Backend:**
```bash
cd /workspaces/LUMO/backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd /workspaces/LUMO/frontend
npm run dev
```

---

## 🌐 Abrir la Aplicación

- **Frontend (App)**: http://localhost:5173
- **Backend (API)**: http://localhost:3000
- **Base de Datos**: `npx prisma studio` → http://localhost:5555

---

## 👤 Login Inicial

Necesitas crear un usuario primero:

```bash
# Con curl (terminal)
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@lumo.com",
    "password": "admin123",
    "role": "admin"
  }'
```

Luego en http://localhost:5173:
- **Email**: admin@lumo.com
- **Password**: admin123

---

## 🛑 Detener el Proyecto

- **Script automático**: `Ctrl + C`
- **Manual**: `Ctrl + C` en cada terminal

---

## 📚 Más Información

- `INICIO_RAPIDO.md` - Guía completa con troubleshooting
- `ANALISIS_BACKEND.md` - Todos los endpoints disponibles  
- `INTEGRACION_AUTH_COMPLETA.md` - Sistema de autenticación

---

**¿Primer arranque?** Ejecuta esto:

```bash
cd /workspaces/LUMO/backend
npm install && npx prisma generate && npx prisma migrate dev --name init
cd ../frontend
npm install
cd ..
./start.sh
```

¡Listo! 🎉
