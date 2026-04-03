import { useState, useEffect } from 'react';

const ProductoForm = ({ producto, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    visible_en_menu: true
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        visible_en_menu: producto.visible_en_menu !== undefined ? producto.visible_en_menu === 1 : true
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      precio: parseFloat(formData.precio)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Nombre *</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="input"
          required
          maxLength={255}
        />
      </div>

      <div>
        <label className="label">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="input"
          rows={3}
        />
      </div>

      <div>
        <label className="label">Precio *</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="input"
          required
          min="0.01"
          step="0.01"
        />
      </div>

      <div className="col-span-full">
        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <input
            type="checkbox"
            id="visible_en_menu"
            name="visible_en_menu"
            checked={formData.visible_en_menu}
            onChange={handleChange}
            className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
          />
          <label htmlFor="visible_en_menu" className="flex-1 cursor-pointer">
            <span className="font-medium text-gray-900">Visible en menú público</span>
            <p className="text-sm text-gray-600 mt-1">
              Si está activado, este producto aparecerá en el menú para clientes. Desactiva esta opción para productos internos como materia prima (huevo, aceite, etc.)
            </p>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {producto ? 'Actualizar' : 'Crear'} Producto
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;
