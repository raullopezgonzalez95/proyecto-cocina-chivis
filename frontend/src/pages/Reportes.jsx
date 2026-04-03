import ReporteVentas from '../components/ventas/ReporteVentas';

const Reportes = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reportes de Ventas</h1>
        <p className="text-gray-600 mt-2">
          Visualiza estadísticas y análisis de ventas
        </p>
      </div>
      <ReporteVentas />
    </div>
  );
};

export default Reportes;
