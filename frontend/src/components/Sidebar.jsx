import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard } from 'react-icons/fi';

const navItems = [
  { to: '/dashboard', icon: FiHome, label: 'Inicio' },
  { to: '/students', icon: FiUsers, label: 'Alumnos' },
  { to: '/missions', icon: FiClipboard, label: 'Misiones' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '1.5rem 1rem'
    }}>
      {/* Logo LUMO imagen */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <img src={'/src/assets/icon_text.png'} alt="LUMO" style={{ width: 120, margin: '0 auto' }} />
      </div>

      {/* Navegación */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || (to === '/dashboard' && location.pathname === '/');
          
          return (
            <NavLink
              key={to}
              to={to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                backgroundColor: isActive ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 125, 50, 0.05)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }
              }}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />
    </div>
  );
};

export default Sidebar;
