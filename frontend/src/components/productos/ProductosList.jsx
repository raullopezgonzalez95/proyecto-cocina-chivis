import { useState } from 'react';
import { useProductos } from '../../context/ProductosContext';
import ProductoForm from './ProductoForm';

const ProductosList = () => {
  const { productos, loading, crearProducto, actualizarProducto, eliminarProducto } = useProductos();
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreate = () => {
    setEditingProducto(null);
    setShowModal(true);
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (editingProducto) {
        await actualizarProducto(editingProducto.id, data);
      } else {
        await crearProducto(data);
      }
      setShowModal(false);
      setEditingProducto(null);
    } catch (error) {
      alert('Error al guardar producto');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await eliminarProducto(id);
      } catch (error) {
        alert('Error al eliminar producto');
      }
    }
  };

  const filteredProductos = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && productos.length === 0) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input flex-1 sm:max-w-md"
        />
        <button onClick={handleCreate} className="btn btn-primary whitespace-nowrap">
          + Nuevo Producto
        </button>
      </div>

      {/* Vista Desktop - Tabla */}
      <div className="hidden lg:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Visibilidad
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProductos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? 'No se encontraron productos' : 'No hay productos registrados'}
                  </td>
                </tr>
              ) : (
                filteredProductos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {producto.nombre}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {producto.descripcion || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${producto.precio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {producto.visible_en_menu ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          👁️ En menú
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          🔒 Oculto
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleEdit(producto)}
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(producto.id)}
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
        {filteredProductos.length === 0 ? (
          <div className="card text-center py-8 text-gray-500">
            {searchTerm ? 'No se encontraron productos' : 'No hay productos registrados'}
          </div>
        ) : (
          filteredProductos.map((producto) => (
            <div key={producto.id} className="card">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{producto.nombre}</h3>
                    {producto.visible_en_menu ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        👁️
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        🔒
                      </span>
                    )}
                  </div>
                  {producto.descripcion && (
                    <p className="text-sm text-gray-600 mt-1">{producto.descripcion}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <div className="text-2xl font-bold text-primary-600">
                  ${producto.precio}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(producto)}
                    className="btn btn-secondary text-sm px-3 py-1"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(producto.id)}
                    className="btn btn-danger text-sm px-3 py-1"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProducto ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <ProductoForm
              producto={editingProducto}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowModal(false);
                setEditingProducto(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosList;
