// Customization.jsx
// Pantalla para customizar mascota o entorno

import React from 'react';
import PageHeader from '../components/PageHeader';

const Customization = () => (
  <div className="p-8 bg-[#f7f8fa] min-h-screen">
    <PageHeader
      title="Customización"
      subtitle="Personaliza la mascota o el entorno del aula"
    />
    <div className="bg-yellow-100 rounded-xl p-8 flex flex-col items-center shadow border border-yellow-200">
      <div className="text-6xl mb-2">🐉</div>
      <div className="mb-4 text-gray-700">Personaliza tu mascota o entorno del aula aquí.</div>
      <button className="bg-[#1e88e5] hover:bg-[#1565c0] text-white px-6 py-2 rounded-xl font-semibold shadow">Editar recompensas visuales</button>
    </div>
  </div>
);

export default Customization;
