// Performance.jsx
// Pantalla de rendimiento y árbol de progreso

import React from 'react';
import TreePreview from '../components/TreePreview';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';

const Performance = () => (
  <div className="p-8 bg-[#f7f8fa] min-h-screen">
    <PageHeader
      title="Rendimiento"
      subtitle="Visualiza el progreso global y por disciplina"
    />
    <div className="mb-8">
      <TreePreview />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatCard label="XP Matemáticas" value="800" icon="➗" />
      <StatCard label="XP Ciencias" value="600" icon="🔬" />
      <StatCard label="XP Historia" value="400" icon="📚" />
      <StatCard label="XP Lengua" value="500" icon="✍️" />
    </div>
  </div>
);

export default Performance;
