import { useState } from 'react';
import { useVentas } from '../context/VentasContext';
import VentaForm from '../components/ventas/VentaForm';
import VentasList from '../components/ventas/VentasList';

const Ventas = () => {
  const { crearVenta } = useVentas();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (data) => {
    try {
      await crearVenta(data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert('Error al registrar venta');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Registro de Ventas</h1>
        <p className="text-gray-600 mt-2">
          Registra nuevas ventas y consulta el historial
        </p>
      </div>

      {showSuccess && (
        <div className="card bg-green-50 border border-green-200 text-green-800">
          ✅ Venta registrada exitosamente
        </div>
      )}

      <VentaForm onSubmit={handleSubmit} />

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Historial de Ventas</h2>
        <VentasList />
      </div>
    </div>
  );
};

export default Ventas;
