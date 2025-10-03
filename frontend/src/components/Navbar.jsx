import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

const pageTitle = {
  '/dashboard': { title: 'Panel principal', subtitle: 'Resumen general del curso y accesos rápidos' },
  '/': { title: 'Panel principal', subtitle: 'Resumen general del curso y accesos rápidos' },
  '/students': { title: 'Alumnos', subtitle: 'Gestión y seguimiento de estudiantes' },
  '/missions': { title: 'Misiones', subtitle: 'Administra las misiones del curso' },
  '/performance': { title: 'Rendimiento', subtitle: 'Estadísticas y métricas del curso' },
  '/settings': { title: 'Configuración', subtitle: 'Ajustes y preferencias' },
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const menuRef = useRef(null);
  const location = useLocation();

  const currentPage = pageTitle[location.pathname] || { title: 'LUMO', subtitle: '' };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: '0 2rem',
      gap: '2rem'
    }}>
      {/* Título y subtítulo de la página */}
      <div style={{ flex: '0 0 auto' }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: 0,
          lineHeight: 1.2
        }}>
          {currentPage.title}
        </h2>
        {currentPage.subtitle && (
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-secondary)',
            margin: '0.125rem 0 0 0',
            lineHeight: 1.4
          }}>
            {currentPage.subtitle}
          </p>
        )}
      </div>

      {/* Buscador centrado */}
      <div style={{
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '400px'
      }}>
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <FiSearch 
            size={18} 
            style={{
              position: 'absolute',
              left: '0.875rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-secondary)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              width: '100%',
              height: '40px',
              padding: '0 1rem 0 2.75rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text-primary)',
              transition: 'all var(--transition-fast)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-border)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Botón principal y avatar */}
      <div style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        {/* Botón principal */}
        <button style={{
          height: '44px',
          padding: '0 1.5rem',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          Nueva Misión
        </button>

        {/* Avatar y menú desplegable */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: 'var(--radius-md)',
              transition: 'background-color var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <img
              src="/avatar.png"
              alt="Avatar"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid var(--color-primary)',
                objectFit: 'cover'
              }}
            />
            <FiChevronDown 
              size={16} 
              style={{ 
                color: 'var(--color-text-secondary)',
                transition: 'transform var(--transition-fast)',
                transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }} 
            />
          </div>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="fade-in" style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 0.5rem)',
              minWidth: '200px',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              padding: '0.5rem',
              zIndex: 50
            }}>
              <div style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '0.5rem'
              }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: 0
                }}>
                  Profesor Sebastián
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  margin: '0.125rem 0 0 0'
                }}>
                  profesor@lumo.edu
                </p>
              </div>
              
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.625rem 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Ver perfil
              </button>

              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.625rem 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Configuración
              </button>

              <div style={{
                height: '1px',
                backgroundColor: 'var(--color-border)',
                margin: '0.5rem 0'
              }} />

              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.625rem 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-danger)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'background-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(211, 47, 47, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
