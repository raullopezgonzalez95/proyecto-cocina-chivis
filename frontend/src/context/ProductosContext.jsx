import { createContext, useContext, useState, useEffect } from 'react';
import { productosAPI } from '../services/api';

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de ProductosProvider');
  }
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosAPI.getAll();
      setProductos(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar productos');
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  };

  const crearProducto = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosAPI.create(data);
      setProductos([...productos, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear producto');
      console.error('Error al crear producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizarProducto = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosAPI.update(id, data);
      setProductos(productos.map(p => p.id === id ? response.data : p));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar producto');
      console.error('Error al actualizar producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await productosAPI.delete(id);
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar producto');
      console.error('Error al eliminar producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const value = {
    productos,
    loading,
    error,
    cargarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};
