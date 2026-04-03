import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'bg-primary-700' : 'hover:bg-primary-700';
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      logout();
      navigate('/login');
      setMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2" onClick={closeMobileMenu}>
            <span className="text-2xl">🍳</span>
            <span className="hidden sm:inline">Cocina de Chivis</span>
            <span className="sm:hidden">Chivis</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/')}`}
            >
              Inicio
            </Link>
            <a
              href="/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md transition-colors hover:bg-primary-700 flex items-center gap-1"
            >
              Menú
              <span className="text-xs">↗</span>
            </a>
            <Link
              to="/productos"
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/productos')}`}
            >
              Productos
            </Link>
            <Link
              to="/ventas"
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/ventas')}`}
            >
              Ventas
            </Link>
            <Link
              to="/reportes"
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/reportes')}`}
            >
              Reportes
            </Link>

            <div className="ml-4 pl-4 border-l border-primary-500">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md transition-colors hover:bg-primary-700 flex items-center gap-2"
                title="Cerrar sesión"
              >
                <span>Salir</span>
                <span>🚪</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-primary-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-md transition-colors ${isActive('/')}`}
            >
              🏠 Inicio
            </Link>
            <a
              href="/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 rounded-md transition-colors hover:bg-primary-700"
            >
              🍽️ Menú (nueva pestaña)
            </a>
            <Link
              to="/productos"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-md transition-colors ${isActive('/productos')}`}
            >
              📦 Productos
            </Link>
            <Link
              to="/ventas"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-md transition-colors ${isActive('/ventas')}`}
            >
              💳 Ventas
            </Link>
            <Link
              to="/reportes"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-md transition-colors ${isActive('/reportes')}`}
            >
              📈 Reportes
            </Link>
            <div className="pt-2 mt-2 border-t border-primary-500">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-md transition-colors hover:bg-primary-700 flex items-center gap-2"
              >
                <span>🚪</span>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
