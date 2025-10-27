/**
 * Helper para generar rutas de assets que funcionen en desarrollo y producción
 * @param {string} path - Ruta del asset dentro de /assets (ej: 'avatar.png')
 * @returns {string} - Ruta completa del asset
 */
export const getAssetUrl = (path) => {
  // Asegurarse de que la ruta no empiece con /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Asegurarse de que la ruta no empiece con 'assets/'
  const assetPath = cleanPath.startsWith('assets/') ? cleanPath : `assets/${cleanPath}`;
  
  // En producción y desarrollo, Vite copia public/ a la raíz de dist/
  // Usar ruta absoluta para evitar problemas con rutas relativas
  return `/${assetPath}`;
};

/**
 * URLs de assets comunes
 */
export const ASSETS = {
  AVATAR_DEFAULT: getAssetUrl('avatar.png'),
  ICON: getAssetUrl('icon.png'),
  ICON_TEXT: getAssetUrl('icon_text.png'),
  PORTADA: getAssetUrl('portada.png'),
};
