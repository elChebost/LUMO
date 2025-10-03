// Missions.jsx
// Pantalla de listado de misiones

import React from 'react';
import MissionCard from '../components/MissionCard';
import PageHeader from '../components/PageHeader';

// TODO: Reemplazar mockMissions por datos reales
const mockMissions = [
  { title: 'Misión 1', description: 'Resolver ejercicios de álgebra', deadline: '10/10/2025', status: 'Activa' },
  { title: 'Misión 2', description: 'Presentar proyecto de ciencias', deadline: '15/10/2025', status: 'Activa' },
  { title: 'Misión 3', description: 'Leer capítulo 5 de historia', deadline: '20/10/2025', status: 'Cerrada' },
];

const Missions = () => (
  <div className="p-8 bg-[#f7f8fa] min-h-screen">
    <PageHeader
      title="Panel de Misiones"
      subtitle="Administra las misiones activas y sus entregas"
    />
    <button className="mb-6 bg-[#1e88e5] hover:bg-[#1565c0] text-white px-6 py-2 rounded-xl font-semibold shadow">Crear nueva misión</button>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockMissions.map((mission, idx) => (
        <MissionCard key={idx} {...mission} />
      ))}
    </div>
  </div>
);

export default Missions;
