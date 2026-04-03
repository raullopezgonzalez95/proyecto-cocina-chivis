import { useState, useEffect } from 'react';
import { useVentas } from '../../context/VentasContext';

const ReporteVentas = () => {
  const { reporte, loading, cargarReporte } = useVentas();
  const [filtros, setFiltros] = useState({
    fecha_inicio: '',
    fecha_fin: ''
  });

  useEffect(() => {
    cargarReporte();
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const aplicarFiltros = () => {
    const filtrosLimpios = {};
    if (filtros.fecha_inicio) filtrosLimpios.fecha_inicio = filtros.fecha_inicio;
    if (filtros.fecha_fin) filtrosLimpios.fecha_fin = filtros.fecha_fin;
    cargarReporte(filtrosLimpios);
  };

  const limpiarFiltros = () => {
    setFiltros({
      fecha_inicio: '',
      fecha_fin: ''
    });
    cargarReporte();
  };

  if (loading && !reporte) {
    return <div className="text-center py-8">Cargando reporte...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Filtros de Fecha</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Fecha Inicio</label>
            <input
              type="date"
              name="fecha_inicio"
              value={filtros.fecha_inicio}
              onChange={handleFiltroChange}
              className="input"
            />
          </div>
          <div>
            <label className="label">Fecha Fin</label>
            <input
              type="date"
              name="fecha_fin"
              value={filtros.fecha_fin}
              onChange={handleFiltroChange}
              className="input"
            />
          </div>
          <div className="flex flex-col justify-end gap-2">
            <button onClick={aplicarFiltros} className="btn btn-primary">
              Aplicar
            </button>
            <button onClick={limpiarFiltros} className="btn btn-secondary">
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {reporte && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <h3 className="text-sm font-medium mb-2 opacity-90">Total de Ventas</h3>
              <p className="text-3xl lg:text-4xl font-bold">{reporte.totales.total_ventas}</p>
            </div>
            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <h3 className="text-sm font-medium mb-2 opacity-90">Unidades Vendidas</h3>
              <p className="text-3xl lg:text-4xl font-bold">{reporte.totales.total_cantidad}</p>
            </div>
            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-medium mb-2 opacity-90">Ingresos Totales</h3>
              <p className="text-3xl lg:text-4xl font-bold">${reporte.totales.total_ingresos}</p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4">Ventas por Producto</h3>

            {/* Vista Desktop - Tabla */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      N° Ventas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Cantidad Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Precio Promedio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ingresos Totales
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reporte.productos.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No hay datos de ventas para el período seleccionado
                      </td>
                    </tr>
                  ) : (
                    reporte.productos.map((producto) => (
                      <tr key={producto.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">
                          {producto.nombre}
                        </td>
                        <td className="px-6 py-4">
                          {producto.numero_ventas}
                        </td>
                        <td className="px-6 py-4">
                          {producto.cantidad_total}
                        </td>
                        <td className="px-6 py-4">
                          ${producto.precio_promedio}
                        </td>
                        <td className="px-6 py-4 font-bold text-primary-600">
                          ${producto.ingresos_totales}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Vista Mobile - Cards */}
            <div className="lg:hidden space-y-4">
              {reporte.productos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay datos de ventas para el período seleccionado
                </div>
              ) : (
                reporte.productos.map((producto, index) => (
                  <div key={producto.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-gray-900 flex-1">{producto.nombre}</h4>
                      <span className="text-sm font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">N° Ventas</p>
                        <p className="text-xl font-bold text-blue-600">{producto.numero_ventas}</p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">Cant. Total</p>
                        <p className="text-xl font-bold text-green-600">{producto.cantidad_total}</p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">Precio Prom.</p>
                        <p className="text-xl font-bold text-purple-600">${producto.precio_promedio}</p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">Ingresos</p>
                        <p className="text-xl font-bold text-primary-600">${producto.ingresos_totales}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReporteVentas;
