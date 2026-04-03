# Cocina de Chivis - Sistema de Gestión de Ventas

Sistema fullstack completo para gestionar un negocio de comida. Permite administrar productos, registrar ventas y generar reportes de ingresos.

## Tecnologías

### Backend
- Node.js + Express
- PostgreSQL (pg)
- express-validator

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router
- Axios

## Características

- **Gestión de Productos:** Crear, editar, eliminar y listar productos
- **Registro de Ventas:** Registrar ventas con fecha, cantidad y notas
- **Historial de Ventas:** Visualizar todas las ventas con filtros por fecha y producto
- **Reportes:** Estadísticas de ventas por producto, ingresos totales y más
- **Persistencia:** Base de datos PostgreSQL con esquema automático
- **UI Moderna:** Interfaz responsive con Tailwind CSS

## Instalación

### Instalación Completa
```bash
npm install
npm run install:all
```

Esto instalará las dependencias del proyecto root, backend y frontend.

## Ejecución

### Desarrollo (Backend + Frontend simultáneamente)
```bash
npm run dev
```

Esto iniciará:
- Backend en http://localhost:5001
- Frontend en http://localhost:5173

### Ejecución por Separado

#### Solo Backend
```bash
npm run dev:backend
```

#### Solo Frontend
```bash
npm run dev:frontend
```

## Estructura del Proyecto

```
proyecto-cocina-chivis/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # Configuración de SQLite
│   │   ├── models/
│   │   │   ├── Producto.js       # Modelo de productos
│   │   │   └── Venta.js          # Modelo de ventas
│   │   ├── controllers/
│   │   │   ├── productosController.js
│   │   │   └── ventasController.js
│   │   ├── routes/
│   │   │   ├── productos.js      # Rutas de productos
│   │   │   └── ventas.js         # Rutas de ventas
│   │   └── index.js              # Server principal
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── productos/
│   │   │   └── ventas/
│   │   ├── context/
│   │   │   ├── ProductosContext.jsx
│   │   │   └── VentasContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Productos.jsx
│   │   │   ├── Ventas.jsx
│   │   │   └── Reportes.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── package.json
```

## API Endpoints

### Productos
- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/:id` - Obtener un producto
- `POST /api/productos` - Crear producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto (soft delete)

### Ventas
- `GET /api/ventas` - Listar ventas (con filtros opcionales)
  - Query params: `fecha_inicio`, `fecha_fin`, `producto_id`
- `POST /api/ventas` - Registrar nueva venta
- `DELETE /api/ventas/:id` - Eliminar venta
- `GET /api/ventas/reporte` - Obtener reporte de ventas

## Uso del Sistema

### 1. Gestión de Productos
1. Navega a "Productos"
2. Click en "Nuevo Producto"
3. Completa el formulario (nombre, descripción, precio)
4. Guarda el producto

### 2. Registro de Ventas
1. Navega a "Ventas"
2. Selecciona un producto del dropdown
3. Ingresa la cantidad y fecha
4. Opcionalmente agrega notas
5. Click en "Registrar Venta"

### 3. Consulta de Reportes
1. Navega a "Reportes"
2. Visualiza las estadísticas generales
3. Aplica filtros por rango de fechas
4. Consulta ventas por producto

## Notas Técnicas

- La base de datos se crea automáticamente al iniciar el backend
- Las ventas guardan el precio del producto al momento de la venta (histórico)
- Los productos eliminados se marcan como inactivos (soft delete)
- La aplicación usa workspaces de npm para gestionar el monorepo
- El frontend tiene proxy configurado para /api al backend

## Scripts Disponibles

En el root del proyecto:
- `npm run dev` - Inicia backend y frontend simultáneamente
- `npm run dev:backend` - Solo backend
- `npm run dev:frontend` - Solo frontend
- `npm run install:all` - Instala todas las dependencias

## Variables de Entorno

### Backend (.env)
```
PORT=5001
HOST=localhost
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=cocina_chivis
```

### Backend Docker (.env.docker)
```
NODE_ENV=development
PORT=5001
HOST=0.0.0.0
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=cocina_chivis
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api
```

## Licencia

Este proyecto fue creado para uso personal.







# Docker

## ✅ Implementación Completada: Proyecto Dockerizado

He completado exitosamente la dockerización del proyecto full-stack de cocina Chivis. Aquí está el resumen:

### 🎯 **Lo que se logró:**

1. **Cambio de base de datos**: Migré de SQLite a PostgreSQL para mejor escalabilidad en contenedores
2. **Arquitectura multi-contenedor**: Backend, frontend y PostgreSQL en contenedores separados
3. **Configuración para desarrollo**: Hot-reload habilitado con volúmenes montados
4. **Persistencia de datos**: Volumen nombrado para datos de PostgreSQL

### 🐳 **Servicios corriendo:**
- **Backend**: `http://localhost:5001` (API REST con Express + PostgreSQL)
- **Frontend**: `http://localhost:5173` (React + Vite con hot-reload)
- **PostgreSQL**: `localhost:5432` (base de datos persistente)

### 📁 **Archivos creados/modificados:**
- docker-compose.yml - Orquestación de servicios
- Dockerfile - Imagen del backend
- Dockerfile - Imagen del frontend
- package.json - Dependencias actualizadas (pg en lugar de better-sqlite3)
- database.js - Configuración PostgreSQL
- models - Modelos actualizados para async/await
- controllers - Controladores actualizados
- .env.docker - Variables de entorno para Docker
- .dockerignore files - Optimización de builds

### 🚀 **Cómo usar:**

```bash
# Construir e iniciar servicios
docker-compose up --build

# O en background
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f
```

### 🔍 **Verificación realizada:**
- ✅ Builds exitosos sin errores
- ✅ Todos los contenedores iniciados correctamente
- ✅ API backend responde (productos endpoint)
- ✅ Frontend Vite dev server funcionando
- ✅ PostgreSQL healthy y accesible

### 📝 **Consideraciones adicionales:**
- **Migración de datos**: Si tienes datos en SQLite, necesitarás un script para migrarlos a PostgreSQL
- **Seguridad**: Las credenciales de DB están en .env.docker - no commitear este archivo
- **Producción**: Este setup es para desarrollo; para prod necesitarías builds optimizados y nginx

¿Quieres que pruebe alguna funcionalidad específica o haga ajustes adicionales?