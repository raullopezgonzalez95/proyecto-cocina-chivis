import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productosAPI } from '../services/api';

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductosVisibles = async () => {
      try {
        const response = await productosAPI.getVisibles();
        setProductos(response.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductosVisibles();
  }, []);

  if (loading && productos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🍳</div>
          <p className="text-xl text-gray-600">Cargando menú...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Botón discreto para administradores */}
      <Link
        to="/login"
        className="fixed top-4 left-4 bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm flex items-center gap-2 z-50"
      >
        <span>🔐</span>
        <span>Acceso Admin</span>
      </Link>

      {/* Header del Menú */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-6xl">🍳</span>
            <h1 className="text-5xl font-bold">Cocina de Chivis</h1>
          </div>
          <p className="text-xl opacity-90">Deliciosa comida casera</p>
          <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
            <p className="text-sm">📍 Menú del día • {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
      </div>

      {/* Contenido del Menú */}
      <div className="container mx-auto px-4 py-12">
        {productos.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🍽️</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Menú próximamente</h2>
            <p className="text-gray-600">Estamos preparando algo delicioso para ti</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Nuestro Menú</h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Decoración superior */}
                  <div className="h-3 bg-gradient-to-r from-primary-500 via-orange-400 to-yellow-400"></div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-6">
                    {/* Ícono del platillo */}
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-orange-100 rounded-full">
                        <span className="text-4xl">
                          {producto.nombre.toLowerCase().includes('taco') ? '🌮' :
                           producto.nombre.toLowerCase().includes('quesadilla') ? '🧀' :
                           producto.nombre.toLowerCase().includes('torta') ? '🥖' :
                           producto.nombre.toLowerCase().includes('burrito') ? '🌯' :
                           producto.nombre.toLowerCase().includes('enchilada') ? '🫔' :
                           producto.nombre.toLowerCase().includes('pozole') ? '🍲' :
                           producto.nombre.toLowerCase().includes('sopa') ? '🥣' :
                           producto.nombre.toLowerCase().includes('ensalada') ? '🥗' :
                           '🍽️'}
                        </span>
                      </div>
                    </div>

                    {/* Nombre del platillo */}
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                      {producto.nombre}
                    </h3>

                    {/* Descripción */}
                    {producto.descripcion && (
                      <p className="text-gray-600 text-center mb-4 min-h-[3rem] leading-relaxed">
                        {producto.descripcion}
                      </p>
                    )}

                    {/* Separador decorativo */}
                    <div className="flex items-center gap-2 my-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <span className="text-primary-500">✦</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>

                    {/* Precio */}
                    <div className="text-center">
                      <div className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-full shadow-lg">
                        <span className="text-3xl font-bold">${producto.precio.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Información adicional */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Información</h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center justify-center gap-2">
                <span className="text-2xl">📞</span>
                <span>Realiza tu pedido: <strong>(555) 123-4567</strong></span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-2xl">⏰</span>
                <span>Horario: Lunes a Domingo 10:00 AM - 9:00 PM</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-2xl">🚚</span>
                <span>¡Servicio a domicilio disponible!</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer decorativo */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">Hecho con ❤️ en la cocina</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
