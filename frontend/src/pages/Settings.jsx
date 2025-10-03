// Settings.jsx
// Pantalla de configuración y acceso a Prisma Studio

import React from 'react';
import PageHeader from '../components/PageHeader';

const Settings = () => (
  <div className="p-8 bg-[#f7f8fa] min-h-screen">
    <PageHeader
      title="Configuración"
      subtitle="Preferencias del docente y sincronización con Prisma Studio"
    />
    <div className="mb-6">
      <label className="flex items-center gap-2 bg-white rounded-xl p-4 shadow border border-gray-100 w-full max-w-md">
        <input type="checkbox" />
        Modo oscuro
      </label>
    </div>
    <div className="mb-6">
      <label className="block mb-1 font-medium">Parámetros de XP / Recompensas</label>
      <input className="px-4 py-2 border border-gray-200 rounded-xl w-full max-w-md bg-white" placeholder="Ej: 100 XP por misión" />
    </div>
    <div className="mb-6">
      <button className="bg-[#4caf50] hover:bg-[#388e3c] text-white px-6 py-2 rounded-xl font-semibold shadow">Abrir Prisma Studio</button>
    </div>
    <div className="text-xs text-gray-400">(Sincronización visual con Prisma Studio - solo placeholder)</div>
  </div>
);

export default Settings;
