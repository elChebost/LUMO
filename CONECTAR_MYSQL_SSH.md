    # 🔧 Pasos para Conectar al MySQL SSH

## ❌ Problema Detectado

El puerto 3306 en el servidor 10.1.0.21 **NO es accesible** desde el devcontainer.

---

## ✅ Solución: Ejecuta en el SERVIDOR SSH (10.1.0.21)

### Paso 1: Verificar configuración actual

```bash
# Ver si MySQL escucha en todas las interfaces
sudo ss -tlnp | grep 3306

# Ver bind-address
mysql -u sebastian -psqlroot01 -e "SHOW VARIABLES LIKE 'bind_address';"
```

**Resultado esperado:**
```
bind_address: 0.0.0.0
```

**Si muestra `127.0.0.1` o `localhost`**, necesitas cambiarlo:

---

### Paso 2: Configurar MySQL para escuchar en todas las interfaces

```bash
# Editar configuración
sudo nano /etc/my.cnf
# O
sudo nano /etc/mysql/my.cnf
```

**Asegúrate que diga:**

```ini
[mysqld]
bind-address = 0.0.0.0
port = 3306
```

**NO debe decir:**
- ❌ `bind-address = 127.0.0.1`
- ❌ `bind-address = localhost`

**Guardar** y reiniciar:

```bash
sudo systemctl restart mysqld
# O
sudo systemctl restart mysql
```

---

### Paso 3: Abrir puerto en el Firewall

#### Para Firewalld (CentOS/RHEL/AlmaLinux)

```bash
# Abrir puerto
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload

# Verificar
sudo firewall-cmd --list-ports
```

#### Para UFW (Ubuntu/Debian)

```bash
# Abrir puerto
sudo ufw allow 3306/tcp

# Verificar
sudo ufw status
```

#### Para iptables

```bash
# Abrir puerto
sudo iptables -I INPUT -p tcp --dport 3306 -j ACCEPT
sudo service iptables save

# Verificar
sudo iptables -L -n | grep 3306
```

---

### Paso 4: Verificar que el puerto esté abierto

```bash
# Debe mostrar: 0.0.0.0:3306
sudo ss -tlnp | grep 3306
```

**Resultado correcto:**
```
LISTEN  0  80  0.0.0.0:3306  0.0.0.0:*  users:(("mysqld",pid=XXX,fd=XX))
```

**Resultado INCORRECTO (solo local):**
```
LISTEN  0  80  127.0.0.1:3306  0.0.0.0:*
```

---

### Paso 5: Crear permisos de acceso remoto

```bash
mysql -u root -p
```

Dentro de MySQL:

```sql
-- Permitir conexión desde cualquier host
GRANT ALL PRIVILEGES ON lumo_db.* TO 'sebastian'@'%' IDENTIFIED BY 'sqlroot01';
FLUSH PRIVILEGES;

-- Verificar
SELECT user, host FROM mysql.user WHERE user='sebastian';

-- Debe mostrar:
-- sebastian | %
-- O
-- sebastian | 10.0.1.%

EXIT;
```

---

## 🔄 Una vez configurado en el servidor

Vuelve al devcontainer y ejecuta:

```bash
# Probar conexión
cd /workspaces/LUMO/LUMO/backend
npx prisma db push

# Si funciona, iniciar proyecto
cd /workspaces/LUMO/LUMO
npm run dev
```

---

## 🎯 Comandos Resumen (ejecutar en el servidor SSH)

```bash
# 1. Verificar bind-address
mysql -u sebastian -psqlroot01 -e "SHOW VARIABLES LIKE 'bind_address';"

# 2. Si NO es 0.0.0.0, editar configuración
sudo nano /etc/my.cnf
# Agregar: bind-address = 0.0.0.0

# 3. Reiniciar MySQL
sudo systemctl restart mysqld

# 4. Abrir firewall
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload

# 5. Verificar puerto
sudo ss -tlnp | grep 3306

# 6. Dar permisos remotos
mysql -u root -p
# Ejecutar: GRANT ALL PRIVILEGES ON lumo_db.* TO 'sebastian'@'%' IDENTIFIED BY 'sqlroot01';
# Ejecutar: FLUSH PRIVILEGES;
```

---

## 💡 Alternativa: Usar Docker (si no puedes configurar el servidor)

Si no tienes permisos para modificar firewall o MySQL:

```bash
# Detener el servidor y volver a Docker
cd /workspaces/LUMO/LUMO/backend
nano .env
# Cambiar a: DATABASE_URL="mysql://sebastian:sqlroot01@127.0.0.1:3306/lumo_db"

# Iniciar Docker MySQL
docker start lumo-mysql

# Aplicar migraciones
npx prisma db push
```

---

**Ejecuta los comandos del "Paso 1" en el servidor SSH y cópiame el resultado para ayudarte.**
