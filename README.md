# 🛍️ API de Productos con Fastify y PostgreSQL (Docker)

Esta aplicación permite gestionar productos mediante una API REST desarrollada con **Fastify**, conectada a una base de datos **PostgreSQL** ejecutada dentro de **Docker**.

---

## 🚀 Iniciar la aplicación

Asegúrate de tener **Docker** y **docker-compose** instalados en tu sistema.

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. Inicia los servicios:
   ```bash
   docker-compose up --build
   ```

3. Abre en tu navegador:
   ```
   http://localhost:8080
   ```

---

## 📦 Endpoints principales

### ➕ Crear un producto (POST)
Crea un nuevo producto con los campos `nombre`, `precio` y `stock`.

```bash
curl -s -X POST http://localhost:3000/productos   -H "Content-Type: application/json"   -d '{"nombre":"Camiseta","precio":12.50,"stock":10}'
```

---

### 📋 Listar todos los productos (GET)
Obtiene todos los productos almacenados en la base de datos.

```bash
curl -s http://localhost:3000/productos
```

---

### ❌ Eliminar un producto (DELETE)
Elimina un producto por su `id`.

```bash
curl -s -X DELETE http://localhost:3000/productos/1
```

---

## 🐘 Consultas directas en PostgreSQL (psql)

Si tu base de datos está corriendo dentro de Docker con el nombre de contenedor **fastify-db**, puedes conectarte así:

### 🔗 Conectarse al contenedor
```bash
docker exec -it fastify-db psql -U postgres -d productos_db
```

---

### 📊 Consultas útiles dentro de `psql`

#### Ver las últimas filas
```sql
SELECT id, nombre, precio, stock, created_at 
FROM productos 
ORDER BY id DESC 
LIMIT 20;
```

#### Contar los registros
```sql
SELECT count(*) FROM productos;
```

#### Ver un producto por ID
```sql
SELECT * FROM productos WHERE id = 1;
```

#### Verificar toda la tabla
```sql
SELECT * FROM productos;
```

#### Borrar todos los registros
```sql
DELETE FROM productos;
```

#### Reiniciar el ID autoincremental
```sql
ALTER SEQUENCE productos_id_seq RESTART WITH 1;
```

#### Salir del shell de psql
```
\q
```

---

## ⚙️ Consultas sin ingresar al shell de `psql`

Puedes ejecutar consultas directamente desde tu terminal sin entrar al shell:

```bash
docker exec -it fastify-db psql -U postgres -d productos_db   -c "SELECT id, nombre, precio, stock FROM productos ORDER BY id DESC LIMIT 10;"
```

---

## 🧠 Comandos útiles

| Acción | Comando |
|--------|----------|
| Ingresar a PostgreSQL dentro del contenedor | `docker exec -it fastify-db psql -U postgres -d productos_db` |
| Ver los últimos registros | `SELECT id, nombre, precio, stock FROM productos ORDER BY id DESC LIMIT 10;` |
| Eliminar todos los productos | `DELETE FROM productos;` |
| Reiniciar IDs | `ALTER SEQUENCE productos_id_seq RESTART WITH 1;` |
| Salir de PostgreSQL | `\q` |

---

## 🧩 Notas finales

- La API corre por defecto en el puerto **3000**.
- Nginx sirve como proxy inverso en el puerto **8080**.
- PostgreSQL está configurado como contenedor **fastify-db** con la base de datos **productos_db**.

---

📌 **Autor:** Ancel López 
📅 **Versión:** 1.0  
🛠️ **Tecnologías:** Fastify · PostgreSQL · Docker · Nginx
