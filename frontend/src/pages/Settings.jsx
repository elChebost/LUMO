import React, { useState, useEffect } from 'react';
import { FiUser, FiBell, FiLock, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const settingsSections = [
    {
      icon: FiUser,
      title: 'Perfil',
      description: 'Actualiza tu información personal',
      action: () => console.log('Perfil')
    },
    {
      icon: FiBell,
      title: 'Notificaciones',
      description: 'Configura tus preferencias de notificaciones',
      action: () => console.log('Notificaciones')
    },
    {
      icon: FiLock,
      title: 'Seguridad y Privacidad',
      description: 'Cambia tu contraseña y gestiona la privacidad',
      action: () => console.log('Seguridad')
    }
  ];

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div className={isMobile ? 'mobile-page-header' : ''} style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
        <h1 style={{
          fontSize: isMobile ? '1.5rem' : '2rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 0.5rem 0'
        }}>
          Configuración
        </h1>
        {!isMobile && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            margin: 0
          }}>
            Ajustes y preferencias del sistema
          </p>
        )}
      </div>

      {/* Perfil del usuario */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: isMobile ? '1.25rem' : '1.5rem',
        marginBottom: isMobile ? '1rem' : '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '1rem' : '1.25rem'
        }}>
          <img
            src="/avatar.png"
            alt="Avatar"
            style={{
              width: isMobile ? '60px' : '80px',
              height: isMobile ? '60px' : '80px',
              borderRadius: '50%',
              border: '3px solid var(--color-primary)',
              objectFit: 'cover'
            }}
          />
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0
            }}>
              Elias Diaz
            </h2>
            <p style={{
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              color: 'var(--color-text-secondary)',
              margin: '0.25rem 0 0 0'
            }}>
              remindevelopment@gmail.com
            </p>
            <p style={{
              fontSize: isMobile ? '0.75rem' : '0.8rem',
              color: 'var(--color-primary)',
              margin: '0.25rem 0 0 0',
              fontWeight: 600
            }}>
              Profesor
            </p>
          </div>
        </div>
      </div>

      {/* Secciones de configuración */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: isMobile ? '0.75rem' : '1rem',
        marginBottom: isMobile ? '1.5rem' : '2rem'
      }}>
        {settingsSections.map(({ icon: Icon, title, description, action }) => (
          <div
            key={title}
            onClick={action}
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: isMobile ? '1.25rem' : '1.5rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                padding: isMobile ? '0.75rem' : '1rem',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-primary)'
              }}>
                <Icon size={isMobile ? 20 : 24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 0.5rem 0'
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize: isMobile ? '0.8rem' : '0.875rem',
                  color: 'var(--color-text-secondary)',
                  margin: 0
                }}>
                  {description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cerrar sesión */}
      <button
        onClick={() => navigate('/login')}
        style={{
          width: isMobile ? '100%' : 'auto',
          padding: isMobile ? '1rem 1.5rem' : '0.875rem 1.5rem',
          backgroundColor: 'transparent',
          border: '1px solid var(--color-danger)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-danger)',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(211, 47, 47, 0.1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <FiLogOut size={18} />
        Cerrar sesión
      </button>
    </div>
  );
};

export default Settings;
