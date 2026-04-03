import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(password);
      if (success) {
        navigate('/');
      } else {
        setError('Contraseña incorrecta');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <span className="text-5xl">🍳</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Cocina de Chivis</h1>
          <p className="text-white/80">Panel de Administración</p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="label">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`input ${error ? 'border-red-500' : ''}`}
                placeholder="Ingresa tu contraseña"
                required
                autoFocus
              />
              {error && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <span>❌</span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          {/* Información adicional */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 text-center">
                <strong>Contraseña por defecto:</strong> 1234
              </p>
            </div>
          </div>
        </div>

        {/* Enlace al menú público */}
        <div className="text-center mt-6">
          <a
            href="/menu"
            className="text-white/90 hover:text-white text-sm underline"
          >
            Ver menú público (sin autenticación)
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
