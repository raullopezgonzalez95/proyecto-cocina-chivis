import axios from 'axios';

const api = axios.create({
  baseURL: window.__VITE_API_URL__ || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para logging
api.interceptors.request.use(
  (config) => {
    console.log(`🔵 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`🟢 ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`🔴 ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
    return Promise.reject(error);
  }
);

// Servicios de productos
export const productosAPI = {
  getAll: () => api.get('/productos'),
  getVisibles: () => api.get('/productos/visibles/menu'),
  getById: (id) => api.get(`/productos/${id}`),
  create: (data) => api.post('/productos', data),
  update: (id, data) => api.put(`/productos/${id}`, data),
  delete: (id) => api.delete(`/productos/${id}`)
};

// Servicios de ventas
export const ventasAPI = {
  getAll: (params) => api.get('/ventas', { params }),
  create: (data) => api.post('/ventas', data),
  delete: (id) => api.delete(`/ventas/${id}`),
  getReporte: (params) => api.get('/ventas/reporte', { params })
};

export default api;
