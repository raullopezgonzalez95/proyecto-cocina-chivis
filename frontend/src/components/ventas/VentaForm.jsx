import { useState, useEffect } from 'react';
import { useProductos } from '../../context/ProductosContext';

const VentaForm = ({ onSubmit }) => {
  const { productos } = useProductos();
  const [formData, setFormData] = useState({
    producto_id: '',
    cantidad: '1',
    fecha: new Date().toISOString().split('T')[0],
    notas: ''
  });
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    if (formData.producto_id) {
      const producto = productos.find(p => p.id === parseInt(formData.producto_id));
      setSelectedProducto(producto);
    } else {
      setSelectedProducto(null);
    }
  }, [formData.producto_id, productos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      producto_id: parseInt(formData.producto_id),
      cantidad: parseInt(formData.cantidad)
    });
    // Reset form
    setFormData({
      producto_id: '',
      cantidad: '1',
      fecha: new Date().toISOString().split('T')[0],
      notas: ''
    });
  };

  const total = selectedProducto && formData.cantidad
    ? (selectedProducto.precio * parseInt(formData.cantidad))
    : '0.00';

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-lg sm:text-xl font-bold mb-4">Registrar Nueva Venta</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                {producto.nombre} - ${producto.precio}
              </option>
            ))}
          </select>
        </div>

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
