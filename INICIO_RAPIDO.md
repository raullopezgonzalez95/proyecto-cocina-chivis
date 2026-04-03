# 🚀 Inicio Rápido - Cocina de Chivis

## Instalación y Ejecución (3 minutos)

### 1. Instalar Dependencias
```bash
cd /Users/meltsan/Desktop/proyecto-cocina-chivis
npm install
npm run install:all
```

### 2. Iniciar el Sistema
```bash
npm run dev
```

Esto iniciará:
- ✅ **Backend:** http://localhost:5001
- ✅ **Frontend:** http://localhost:5173

### 3. Abrir en el Navegador
Abre tu navegador en: **http://localhost:5173**

---

## 📱 Flujo de Uso Rápido

### Paso 1: Crear Productos
1. Click en **"Productos"** en el menú
2. Click en **"+ Nuevo Producto"**
3. Completa el formulario:
   - Nombre: "Tacos"
   - Descripción: "Tacos de carne asada"
   - Precio: 45.00
4. Click en **"Crear Producto"**

### Paso 2: Registrar Ventas
1. Click en **"Ventas"** en el menú
2. Selecciona un producto del dropdown
3. Ingresa la cantidad (ej: 3)
4. Selecciona la fecha
5. Click en **"Registrar Venta"**

### Paso 3: Ver Reportes
1. Click en **"Reportes"** en el menú
2. Visualiza las estadísticas de ventas
3. Aplica filtros por fecha si lo deseas

---

## 🔧 Comandos Útiles

### Backend
```bash
# Iniciar solo el backend
node backend/src/index.js
```

### Frontend
```bash
# Iniciar solo el frontend
npm run dev --workspace=frontend
```

### Base de Datos
La base de datos SQLite se crea automáticamente en:
```
backend/database.sqlite
```

---

## 🧪 Probar la API Directamente

### Crear un producto:
```bash
curl -X POST http://localhost:5001/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Tacos","descripcion":"Deliciosos tacos","precio":45.00}'
```

### Listar productos:
```bash
curl http://localhost:5001/api/productos
```

### Registrar una venta:
```bash
curl -X POST http://localhost:5001/api/ventas \
  -H "Content-Type: application/json" \
  -d '{"producto_id":1,"cantidad":3,"fecha":"2026-04-03"}'
```

### Ver reporte:
```bash
curl http://localhost:5001/api/ventas/reporte
```

---

## ✅ Estado del Sistema

El sistema ha sido completamente implementado y probado con:
- ✅ 3 productos de ejemplo creados (Tacos, Quesadillas, Tortas)
- ✅ 2 ventas de ejemplo registradas
- ✅ Base de datos funcionando correctamente
- ✅ API REST completa y funcional
- ✅ Frontend con todas las páginas implementadas

---

## 📝 Notas Importantes

- **Puerto del Backend:** 5001
- **Puerto del Frontend:** 5173
- **Base de datos:** Se crea automáticamente al iniciar el backend
- **Datos de prueba:** Ya hay productos y ventas de ejemplo en la base de datos

---

## 🆘 Solución de Problemas

### El puerto 5001 está ocupado:
```bash
# Matar el proceso en el puerto 5001
lsof -ti :5001 | xargs kill -9
```

### Error al instalar dependencias:
```bash
# Limpiar e instalar de nuevo
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
npm run install:all
```

### La base de datos no funciona:
```bash
# Eliminar la base de datos y reiniciar
rm backend/database.sqlite
node backend/src/index.js
```
