# CLAUDE.md — Cocina de Chivis

## Project Overview

Fullstack web app for managing sales and inventory of a small food business. Monorepo with npm workspaces.

## Tech Stack

- **Backend:** Node.js + Express + PostgreSQL (`pg` driver), ES modules
- **Frontend:** React 18 + Vite + React Router v6 + Axios + Tailwind CSS
- **DevOps:** Docker Compose (3 services: postgres, backend, frontend)
- **Deployment:** Railway (`railway.toml`)

## Project Structure

```
proyecto-cocina-chivis/
├── backend/src/
│   ├── config/database.js       # PostgreSQL pool + schema init
│   ├── models/                  # Producto.js, Venta.js (raw SQL)
│   ├── controllers/             # productosController.js, ventasController.js
│   ├── routes/                  # productos.js, ventas.js
│   └── index.js                 # Express entry point (port 5001)
├── frontend/src/
│   ├── context/                 # AuthContext, ProductosContext, VentasContext
│   ├── components/              # layout/, auth/, productos/, ventas/
│   ├── pages/                   # Home, Productos, Ventas, Reportes, Menu, Login
│   ├── services/api.js          # Axios instance
│   └── App.jsx                  # Router + provider hierarchy
├── frontend/server.js           # Production Express server (SPA + runtime env inject)
├── docker-compose.yml
├── .env.docker
└── package.json                 # Root workspace config
```

## Common Commands

```bash
# Development
npm run dev                  # Start backend + frontend concurrently
npm run dev:backend          # Backend only (node --watch, port 5001)
npm run dev:frontend         # Frontend only (Vite, port 5173)

# Build & production
npm run build:frontend       # Vite build → dist/
npm run start:backend        # node src/index.js
npm run install:all          # Install all workspace deps

# Docker
docker-compose up --build    # Build and start all services
docker-compose down          # Stop all services
docker-compose logs -f       # Stream logs
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET | /api/productos | List active products |
| GET | /api/productos/visibles/menu | Menu-visible products |
| GET | /api/productos/:id | Get product |
| POST | /api/productos | Create product |
| PUT | /api/productos/:id | Update product |
| DELETE | /api/productos/:id | Soft delete product |
| GET | /api/ventas | List sales (filters: fecha_inicio, fecha_fin, producto_id) |
| POST | /api/ventas | Register sale |
| DELETE | /api/ventas/:id | Delete sale |
| GET | /api/ventas/reporte | Aggregated report |

## Environment Variables

**Backend:**
```env
PORT=5001
HOST=0.0.0.0
DB_HOST=localhost        # 'postgres' in Docker
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=cocina_chivis
```

**Frontend (Vite):**
```env
VITE_API_URL=http://localhost:5001/api
```

- In production, `server.js` injects `VITE_API_URL` at runtime via `__VITE_API_URL__` placeholder replacement in `dist/index.html`.

## Key Conventions

- **Language:** Spanish naming throughout (productos, ventas, reportes…)
- **JS style:** camelCase for variables/functions, PascalCase for React components
- **DB columns:** snake_case
- **SQL:** Parameterized queries (`$1, $2`) — no string interpolation
- **Soft deletes:** Products use `activo = false`, never hard-deleted
- **ES Modules:** Backend uses `"type": "module"` — use `import/export`, not `require`
- **Auth:** Simple password-based via `AuthContext` (localStorage), password is `'1234'`

## Architecture Notes

- Frontend dev proxy: `/api` → `http://localhost:5001` (configured in `vite.config.js`)
- Database schema auto-initializes on backend startup (`config/database.js`)
- Context API for global state (no Redux/Zustand)
- MVC pattern on backend: Routes → Controllers → Models → PostgreSQL
