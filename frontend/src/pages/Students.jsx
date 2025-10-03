// Students.jsx
// Pantalla de listado de alumnos

import React from 'react';
import StudentCard from '../components/StudentCard';
import PageHeader from '../components/PageHeader';

// TODO: Reemplazar mockStudents por datos reales
const mockStudents = [
  { name: 'Juan Pérez', avatar: 'https://i.pravatar.cc/100?img=1', progress: 80, level: 5 },
  { name: 'Ana López', avatar: 'https://i.pravatar.cc/100?img=2', progress: 65, level: 4 },
  { name: 'Pedro Gómez', avatar: 'https://i.pravatar.cc/100?img=3', progress: 50, level: 3 },
];

const Students = () => (
  <div className="p-8 bg-[#f7f8fa] min-h-screen">
    <PageHeader
      title="Alumnos"
      subtitle="Lista de estudiantes y su progreso"
    />
    <input className="mb-6 px-4 py-2 border border-gray-200 rounded-xl w-full max-w-md bg-white" placeholder="Buscar alumno..." />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockStudents.map((student, idx) => (
        <StudentCard key={idx} {...student} />
      ))}
    </div>
  </div>
);

export default Students;
