// Configuración de la API
// ======================

// Esta función se ejecuta en RUNTIME (tiempo de ejecución), no en build time
function getApiUrl() {
  // 1. Si hay una variable de entorno explícita en build time, usarla
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl) {
    return envApiUrl;
  }

  // 2. Detectar el hostname actual (RUNTIME - funciona en producción)
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  // 3. Si NO es localhost, usar el mismo dominio con /api
  if (!isLocalhost) {
    return `${window.location.origin}/api`;
  }

  // 4. Si es localhost, usar el backend local
  return 'http://localhost:3000';
}

export const API_URL = getApiUrl();

// Logging para debugging (siempre activado para diagnosticar)
console.log('🔧 LUMO API Configuration:', {
  hostname: window.location.hostname,
  origin: window.location.origin,
  isLocalhost: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  envApiUrl: import.meta.env.VITE_API_URL || 'not set',
  finalApiUrl: API_URL
});

