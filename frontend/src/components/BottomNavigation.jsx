import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard, FiSettings } from 'react-icons/fi';

const navItems = [
  { to: '/dashboard', icon: FiHome, label: 'Inicio' },
  { to: '/students', icon: FiUsers, label: 'Alumnos' },
  { to: '/missions', icon: FiClipboard, label: 'Misiones' },
  { to: '/settings', icon: FiSettings, label: 'Configuración' },
];

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="bottom-navigation">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to || (to === '/dashboard' && location.pathname === '/');
        
        return (
          <NavLink
            key={to}
            to={to}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={24} />
            <span className="bottom-nav-label">{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
