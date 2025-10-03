// Sidebar.jsx
// Sidebar de navegación principal para el POV Docente

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard, FiBarChart2, FiSettings } from 'react-icons/fi';

const navItems = [
  { to: '/', icon: <FiHome size={22} />, label: 'Inicio' },
  { to: '/students', icon: <FiUsers size={22} />, label: 'Alumnos' },
  { to: '/missions', icon: <FiClipboard size={22} />, label: 'Misiones' },
  { to: '/performance', icon: <FiBarChart2 size={22} />, label: 'Rendimiento' },
  { to: '/settings', icon: <FiSettings size={22} />, label: 'Configuración' },
];


const Sidebar = () => (
  <div className="flex flex-col items-center px-4 py-8 h-full w-full">
    {/* Logo o nombre del sistema */}
    <div className="mb-10 text-2xl font-extrabold tracking-wide text-[var(--color-accent)] drop-shadow">LUMO</div>
    {/* Info del docente */}
    <div className="flex flex-col items-center mb-10">
      <img src="/avatar.png" alt="Avatar docente" className="w-16 h-16 rounded-full border-4 border-[var(--color-accent)] shadow mb-2 object-cover" />
      <span className="font-semibold text-base text-[var(--color-gray900)]">Profesor Sebastián</span>
    </div>
    {/* Navegación */}
    <nav className="flex flex-col gap-2 w-full">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-xl font-medium text-[14px] transition-all duration-200 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] ${isActive ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-semibold' : 'text-[var(--color-gray600)]'}`
          }
          title={label}
        >
          {icon}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
    <div className="flex-1" />
  </div>
);

export default Sidebar;
