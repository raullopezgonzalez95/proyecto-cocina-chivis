import { useState } from 'react';
import { useVentas } from '../../context/VentasContext';
import { useProductos } from '../../context/ProductosContext';

const VentasList = () => {
  const { ventas, loading, eliminarVenta, cargarVentas } = useVentas();
  const { productos } = useProductos();
  const [filtros, setFiltros] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    producto_id: ''
  });

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
    if (filtros.producto_id) filtrosLimpios.producto_id = filtros.producto_id;
    cargarVentas(filtrosLimpios);
  };

  const limpiarFiltros = () => {
    setFiltros({
      fecha_inicio: '',
      fecha_fin: '',
      producto_id: ''
    });
    cargarVentas();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta venta?')) {
      try {
        await eliminarVenta(id);
      } catch (error) {
        alert('Error al eliminar venta');
      }
    }
  };

  const formatFecha = (fecha) => {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFechaCorta = (fecha) => {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short'
    });
  };

  if (loading && ventas.length === 0) {
    return <div className="text-center py-8">Cargando ventas...</div>;
  }

  return (
    <div>
      <div className="card mb-6">
        <h3 className="text-lg font-bold mb-4">Filtros</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div>
            <label className="label">Producto</label>
            <select
              name="producto_id"
              value={filtros.producto_id}
              onChange={handleFiltroChange}
              className="input"
            >
              <option value="">Todos los productos</option>
              {productos.map(producto => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
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

      {/* Vista Desktop - Tabla */}
      <div className="hidden lg:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio Unit.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Notas
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ventas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No hay ventas registradas
                  </td>
                </tr>
              ) : (
                ventas.map((venta) => (
                  <tr key={venta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatFecha(venta.fecha)}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {venta.producto_nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {venta.cantidad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${venta.precio_unitario.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-primary-600">
                      ${venta.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {venta.notas || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(venta.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vista Mobile - Cards */}
      <div className="lg:hidden space-y-4">
        {ventas.length === 0 ? (
          <div className="card text-center py-8 text-gray-500">
            No hay ventas registradas
          </div>
        ) : (
          ventas.map((venta) => (
            <div key={venta.id} className="card">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{venta.producto_nombre}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    📅 {formatFechaCorta(venta.fecha)}
                  </p>
                  {venta.notas && (
                    <p className="text-sm text-gray-600 mt-1 italic">"{venta.notas}"</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Cantidad</p>
                  <p className="text-lg font-semibold">{venta.cantidad}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Precio Unit.</p>
                  <p className="text-lg font-semibold">${venta.precio_unitario.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3">
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-primary-600">
                    ${venta.total.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(venta.id)}
                  className="btn btn-danger text-sm px-3 py-2"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VentasList;
