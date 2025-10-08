import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiUser, FiClipboard } from 'react-icons/fi';

const pageTitle = {
  '/dashboard': { title: 'Panel principal', subtitle: 'Resumen general del curso y accesos rápidos' },
  '/': { title: 'Panel principal', subtitle: 'Resumen general del curso y accesos rápidos' },
  '/students': { title: 'Alumnos', subtitle: 'Gestión y seguimiento de estudiantes' },
  '/missions': { title: 'Misiones', subtitle: 'Administra las misiones del curso' },
  '/settings': { title: 'Configuración', subtitle: 'Ajustes y preferencias' },
};

const API_URL = 'http://localhost:4000';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = pageTitle[location.pathname] || { title: 'LUMO', subtitle: '' };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    }
    if (menuOpen || searchFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, searchFocused]);

  // Búsqueda inteligente
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchValue.length >= 2) {
        try {
          const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(searchValue)}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error en búsqueda:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchValue]);

  const handleSearchSelect = (result) => {
    navigate(result.url);
    setSearchValue('');
    setSearchResults([]);
    setSearchFocused(false);
  };

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

      {/* Buscador centrado con sugerencias */}
      <div style={{
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '400px'
      }}>
        <div ref={searchRef} style={{
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
              pointerEvents: 'none',
              zIndex: 2
            }}
          />
          <input
            type="text"
            placeholder="Buscar alumnos, misiones..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            style={{
              width: '100%',
              height: '40px',
              padding: '0 1rem 0 2.75rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text-primary)',
              transition: 'all var(--transition-fast)',
              borderColor: searchFocused ? 'var(--color-primary)' : 'var(--color-border)',
              boxShadow: searchFocused ? '0 0 0 3px rgba(46, 125, 50, 0.1)' : 'none'
            }}
          />

          {/* Dropdown de resultados */}
          {searchFocused && searchResults.length > 0 && (
            <div className="fade-in" style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              maxHeight: '300px',
              overflowY: 'auto',
              zIndex: 50
            }}>
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleSearchSelect(result)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'background-color var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {result.type === 'student' ? <FiUser size={18} color="var(--color-primary)" /> : <FiClipboard size={18} color="var(--color-primary)" />}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)'
                    }}>
                      {result.title}
                    </p>
                    <p style={{
                      margin: '0.125rem 0 0 0',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-secondary)'
                    }}>
                      {result.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Avatar y menú desplegable */}
      <div style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
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
                  Elias Diaz
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  margin: '0.125rem 0 0 0'
                }}>
                  remindevelopment@gmail.com
                </p>
              </div>
              
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/settings');
                }}
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
                onClick={() => {
                  setMenuOpen(false);
                  // Aquí iría la lógica de logout cuando implementemos auth
                  navigate('/login');
                }}
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
