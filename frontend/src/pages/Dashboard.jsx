// Dashboard.jsx
// Pantalla principal del docente con resumen y accesos rápidos

import React from 'react';
import StatCard from '../components/StatCard';
import StudentCard from '../components/StudentCard';
import MissionCard from '../components/MissionCard';
import NotificationPanel from '../components/NotificationPanel';
import PageHeader from '../components/PageHeader';

const Dashboard = () => (
  <div className="p-8 bg-[#f7f8fa] min-h-screen">
    <PageHeader
      title="Panel principal"
      subtitle="Resumen general del curso y accesos rápidos"
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="col-span-2 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="XP Promedio" value="1200" icon="⭐" />
          <StatCard label="Tareas Entregadas" value="34/40" icon="📦" />
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Alumnos destacados</h2>
          <div className="flex gap-4">
            <StudentCard name="Juan Pérez" avatar="https://i.pravatar.cc/100?img=1" progress={80} level={5} />
            <StudentCard name="Ana López" avatar="https://i.pravatar.cc/100?img=2" progress={65} level={4} />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Misiones activas</h2>
          <div className="flex gap-4">
            <MissionCard title="Misión 1" description="Resolver ejercicios de álgebra" deadline="10/10/2025" status="Activa" />
            <MissionCard title="Misión 2" description="Presentar proyecto de ciencias" deadline="15/10/2025" status="Activa" />
          </div>
        </div>
      </div>
      <div>
        <NotificationPanel />
      </div>
    </div>
  </div>
);

export default Dashboard;
