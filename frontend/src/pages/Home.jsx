import { Link } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import { useVentas } from '../context/VentasContext';
import { useEffect, useState } from 'react';

const Home = () => {
  const { productos } = useProductos();
  const { ventas } = useVentas();
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalVentas: 0,
    ingresosHoy: 0,
    ventasHoy: 0
  });

  useEffect(() => {
    const hoy = new Date().toISOString().split('T')[0];
    const ventasHoy = ventas.filter(v => v.fecha === hoy);
    const ingresosHoy = ventasHoy.reduce((sum, v) => sum + v.total, 0);

    setStats({
      totalProductos: productos.length,
      totalVentas: ventas.length,
      ingresosHoy: ingresosHoy,
      ventasHoy: ventasHoy.length
    });
  }, [productos, ventas]);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Bienvenido a Cocina de Chivis
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Sistema de gestión de ventas de comida
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Productos</p>
              <p className="text-3xl font-bold mt-2">{stats.totalProductos}</p>
            </div>
            <div className="text-5xl opacity-50">🍕</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Ventas</p>
              <p className="text-3xl font-bold mt-2">{stats.totalVentas}</p>
            </div>
            <div className="text-5xl opacity-50">📊</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Ventas Hoy</p>
              <p className="text-3xl font-bold mt-2">{stats.ventasHoy}</p>
            </div>
            <div className="text-5xl opacity-50">🛒</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Ingresos Hoy</p>
              <p className="text-3xl font-bold mt-2">${stats.ingresosHoy}</p>
            </div>
            <div className="text-5xl opacity-50">💰</div>
          </div>
        </div>
      </div>

      {/* Destacado: Menú para Clientes */}
      <a href="/menu" target="_blank" rel="noopener noreferrer" className="block">
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-primary-700">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6 flex-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl">🍽️</div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">Ver Menú para Clientes</h3>
                <p className="text-white/90 text-sm sm:text-base">
                  Vista pública del menú - Se abre en nueva pestaña
                </p>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl">↗</div>
          </div>
        </div>
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/productos" className="card hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-500">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📦</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Gestión de Productos</h3>
              <p className="text-gray-600 text-sm">
                Administra tu catálogo de productos. Crea, edita y elimina artículos.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/ventas" className="card hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-500">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💳</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Registro de Ventas</h3>
              <p className="text-gray-600 text-sm">
                Registra nuevas ventas y consulta el historial completo con filtros.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/reportes" className="card hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-500">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📈</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Reportes</h3>
              <p className="text-gray-600 text-sm">
                Visualiza estadísticas y reportes de ventas por producto.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Primeros Pasos</h3>
        <ol className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>Dirígete a <Link to="/productos" className="underline font-medium">Productos</Link> para agregar tus artículos de comida</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>Usa <Link to="/ventas" className="underline font-medium">Ventas</Link> para registrar cada venta que realices</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>Consulta <Link to="/reportes" className="underline font-medium">Reportes</Link> para ver el desempeño de tus productos</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
