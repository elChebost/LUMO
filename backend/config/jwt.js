// Configuración JWT
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'lumo_secret_key_2025',
  expiresIn: '7d' // Token válido por 7 días
};

export default jwtConfig;
