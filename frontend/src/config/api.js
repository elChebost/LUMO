// Configuración de la API
// ======================

// Detectar automáticamente el entorno
const isProduction = import.meta.env.PROD;
const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';

// Determinar la URL de la API
let apiUrl;

if (import.meta.env.VITE_API_URL) {
  // Si hay una variable de entorno explícita, usarla
  apiUrl = import.meta.env.VITE_API_URL;
} else if (isProduction && !isLocalhost) {
  // En producción (build) y NO en localhost, usar la ruta relativa /api
  apiUrl = `${window.location.origin}/api`;
} else {
  // En desarrollo o localhost, usar el backend local
  apiUrl = 'http://localhost:3000';
}

export const API_URL = apiUrl;

// Logging para debugging (solo en desarrollo)
if (!isProduction) {
  console.log('🔧 API Configuration:', {
    mode: import.meta.env.MODE,
    isProduction,
    isLocalhost,
    hostname: window.location.hostname,
    origin: window.location.origin,
    apiUrl: API_URL
  });
}
