import ProductosList from '../components/productos/ProductosList';

const Productos = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
        <p className="text-gray-600 mt-2">
          Administra tu catálogo de productos
        </p>
      </div>
      <ProductosList />
    </div>
  );
};

export default Productos;
