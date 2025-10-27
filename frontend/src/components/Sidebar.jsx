import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard } from 'react-icons/fi';

const navItems = [
  { to: '/dashboard', icon: FiHome, label: 'Inicio' },
  { to: '/students', icon: FiUsers, label: 'Alumnos' },
  { to: '/missions', icon: FiClipboard, label: 'Misiones' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: 'var(--spacing-xl) var(--spacing-md)'
    }}>
      {/* Logo LUMO clickeable → Dashboard */}
      <div 
        onClick={() => navigate('/dashboard')}
        style={{
          textAlign: 'center',
          marginBottom: 'var(--spacing-2xl)',
          paddingBottom: 'var(--spacing-xl)',
          borderBottom: '1px solid var(--border-color)',
          cursor: 'pointer',
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        <img src={'/assets/icon_text.png'} alt="LUMO" style={{ width: 120, margin: '0 auto' }} />
      </div>

      {/* Navegación */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)'
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
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'rgba(29, 215, 91, 0.1)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(29, 215, 91, 0.05)';
                  e.currentTarget.style.color = 'var(--primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
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
