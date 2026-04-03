import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import Reportes from './pages/Reportes';
import Menu from './pages/Menu';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ProductosProvider } from './context/ProductosContext';
import { VentasProvider } from './context/VentasContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductosProvider>
          <VentasProvider>
            <Routes>
              {/* Rutas públicas sin autenticación */}
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<Login />} />

              {/* Rutas administrativas protegidas con navbar */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout><Home /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/productos"
                element={
                  <ProtectedRoute>
                    <Layout><Productos /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ventas"
                element={
                  <ProtectedRoute>
                    <Layout><Ventas /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reportes"
                element={
                  <ProtectedRoute>
                    <Layout><Reportes /></Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </VentasProvider>
        </ProductosProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
