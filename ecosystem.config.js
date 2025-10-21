// PM2 Ecosystem Configuration File
// Este archivo configura cómo PM2 gestiona los procesos de LUMO
// Optimizado para Rocky Linux 9.6 en /opt/proyecto/LUMO

module.exports = {
  apps: [
    {
      name: 'lumo-backend',
      script: './backend/app.js',
      cwd: '/opt/proyecto/LUMO',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '127.0.0.1', // Solo escuchar en localhost (Nginx hace el proxy)
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOST: '0.0.0.0',
      },
      error_file: '/opt/proyecto/LUMO/logs/backend-error.log',
      out_file: '/opt/proyecto/LUMO/logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true,
      // Reintentos en caso de fallo
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
    },
  ],
};
