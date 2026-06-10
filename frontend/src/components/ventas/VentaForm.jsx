import { useState, useEffect } from 'react';
import { useProductos } from '../../context/ProductosContext';

const VentaForm = ({ onSubmit }) => {
  const { productos } = useProductos();
  const [esVentaLibre, setEsVentaLibre] = useState(false);
  const [formData, setFormData] = useState({
    producto_id: '',
    descripcion: '',
    precio_unitario: '',
    cantidad: '1',
    fecha: new Date().toISOString().split('T')[0],
    notas: ''
  });
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    if (formData.producto_id && !esVentaLibre) {
      const producto = productos.find(p => p.id === parseInt(formData.producto_id));
      setSelectedProducto(producto);
    } else {
      setSelectedProducto(null);
    }
  }, [formData.producto_id, productos, esVentaLibre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTipoVentaChange = (esLibre) => {
    setEsVentaLibre(esLibre);
    setFormData(prev => ({
      ...prev,
      producto_id: '',
      descripcion: '',
      precio_unitario: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (esVentaLibre) {
      onSubmit({
        es_venta_libre: true,
        descripcion: formData.descripcion,
        precio_unitario: parseFloat(formData.precio_unitario),
        cantidad: parseInt(formData.cantidad),
        fecha: formData.fecha,
        notas: formData.notas
      });
    } else {
      onSubmit({
        es_venta_libre: false,
        producto_id: parseInt(formData.producto_id),
        cantidad: parseInt(formData.cantidad),
        fecha: formData.fecha,
        notas: formData.notas
      });
    }

    // Reset form
    setFormData({
      producto_id: '',
      descripcion: '',
      precio_unitario: '',
      cantidad: '1',
      fecha: new Date().toISOString().split('T')[0],
      notas: ''
    });
  };

  const calcularTotal = () => {
    if (esVentaLibre && formData.precio_unitario && formData.cantidad) {
      return (parseFloat(formData.precio_unitario) * parseInt(formData.cantidad)).toFixed(2);
    }
    if (!esVentaLibre && selectedProducto && formData.cantidad) {
      return (Number(selectedProducto.precio) * parseInt(formData.cantidad)).toFixed(2);
    }
    return '0.00';
  };

  const total = calcularTotal();

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-lg sm:text-xl font-bold mb-4">Registrar Nueva Venta</h3>

      {/* Selector de tipo de venta */}
      <div className="mb-6">
        <label className="label">Tipo de Venta</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => handleTipoVentaChange(false)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              !esVentaLibre
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <span className="block text-lg mb-1">📦</span>
            <span className="font-medium">Producto del catálogo</span>
          </button>
          <button
            type="button"
            onClick={() => handleTipoVentaChange(true)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              esVentaLibre
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <span className="block text-lg mb-1">✏️</span>
            <span className="font-medium">Venta libre</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {esVentaLibre ? (
          <>
            <div>
              <label className="label">Descripción *</label>
              <input
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="input"
                required
                placeholder="Nombre del producto o servicio"
              />
            </div>

            <div>
              <label className="label">Precio Unitario *</label>
              <input
                type="number"
                name="precio_unitario"
                value={formData.precio_unitario}
                onChange={handleChange}
                className="input"
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="label">Producto *</label>
            <select
              name="producto_id"
              value={formData.producto_id}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Seleccionar producto...</option>
              {productos.map(producto => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre} - ${Number(producto.precio).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="label">Cantidad *</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className="input"
            required
            min="1"
          />
        </div>

        <div>
          <label className="label">Fecha *</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">Total</label>
          <div className="input bg-gradient-to-r from-primary-50 to-primary-100 border-primary-300 font-bold text-xl sm:text-2xl text-primary-700">
            ${total}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="label">Notas</label>
          <textarea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            className="input"
            rows={2}
            placeholder="Observaciones adicionales..."
          />
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary w-full">
          Registrar Venta
        </button>
      </div>
    </form>
  );
};

export default VentaForm;