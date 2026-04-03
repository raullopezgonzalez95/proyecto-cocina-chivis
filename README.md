# Cocina de Chivis - Sistema de Gestión de Ventas

Sistema fullstack completo para gestionar un negocio de comida. Permite administrar productos, registrar ventas y generar reportes de ingresos.

## Tecnologías

### Backend
- Node.js + Express
- SQLite (better-sqlite3)
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
- **Persistencia:** Base de datos SQLite con esquema automático
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
NODE_ENV=development
DB_PATH=./database.sqlite
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api
```

## Licencia

Este proyecto fue creado para uso personal.
