import { createContext, useContext, useState, useEffect } from 'react';
import { ventasAPI } from '../services/api';

const VentasContext = createContext();

export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error('useVentas debe usarse dentro de VentasProvider');
  }
  return context;
};

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarVentas = async (filtros = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ventasAPI.getAll(filtros);
      setVentas(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar ventas');
      console.error('Error al cargar ventas:', err);
    } finally {
      setLoading(false);
    }
  };

  const crearVenta = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ventasAPI.create(data);
      setVentas([response.data, ...ventas]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear venta');
      console.error('Error al crear venta:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarVenta = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await ventasAPI.delete(id);
      setVentas(ventas.filter(v => v.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar venta');
      console.error('Error al eliminar venta:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cargarReporte = async (filtros = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ventasAPI.getReporte(filtros);
      setReporte(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar reporte');
      console.error('Error al cargar reporte:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const value = {
    ventas,
    reporte,
    loading,
    error,
    cargarVentas,
    crearVenta,
    eliminarVenta,
    cargarReporte
  };

  return (
    <VentasContext.Provider value={value}>
      {children}
    </VentasContext.Provider>
  );
};
