import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiUser, FiClipboard } from 'react-icons/fi';
import { clearAuth, getUser } from '../utils/auth';
import { API_URL } from '../config/api.js';

const pageTitle = {
  '/dashboard': { title: 'Panel principal', subtitle: 'Resumen general del curso y accesos rápidos' },
  '/': { title: 'Panel principal', subtitle: 'Resumen general del curso y accesos rápidos' },
  '/students': { title: 'Alumnos', subtitle: 'Gestión y seguimiento de estudiantes' },
  '/missions': { title: 'Misiones', subtitle: 'Administra las misiones del curso' },
  '/settings': { title: 'Configuración', subtitle: 'Ajustes y preferencias' },
};

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
  
  // ✅ Obtener usuario autenticado
  const user = getUser();

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

  // ✅ Búsqueda desactivada temporalmente - endpoint /api/search no existe aún
  // Mostrar mensaje informativo cuando el usuario escribe
  useEffect(() => {
    if (searchValue.length >= 2) {
      setSearchResults([
        {
          id: 'info-1',
          type: 'info',
          title: 'Búsqueda no disponible',
          subtitle: 'Esta funcionalidad estará disponible próximamente',
          url: '#'
        }
      ]);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  /* ⚠️ Código original - se reactiva cuando se implemente /api/search
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchValue.length >= 2) {
        try {
          // Usar apiUrl para normalizar y evitar duplicar '/api' si API_URL ya lo contiene
          const response = await fetch(apiUrl(`/search?q=${encodeURIComponent(searchValue)}`));
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
  */

  const handleSearchSelect = (result) => {
    // Ignorar clicks en el mensaje informativo
    if (result.type === 'info') {
      return;
    }
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
      padding: '0 var(--spacing-2xl)',
      gap: 'var(--spacing-2xl)'
    }}>
      {/* Título de la página (NO clickeable, espacio vacío para descripción eliminada) */}
      <div style={{ 
        flex: '0 0 auto'
      }}>
        <h2 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: 0,
          lineHeight: 1.2
        }}>
          {currentPage.title}
        </h2>
        {/* Descripción eliminada - espacio vacío */}
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
              left: 'var(--spacing-sm)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
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
              padding: '0 var(--spacing-md) 0 2.75rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              backgroundColor: 'var(--panel-bg)',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease',
              borderColor: searchFocused ? 'var(--primary)' : 'var(--border-color)',
              boxShadow: searchFocused ? '0 0 0 3px rgba(29, 215, 91, 0.1)' : 'none'
            }}
          />

          {/* Dropdown de resultados */}
          {searchFocused && searchResults.length > 0 && (
            <div className="fade-in" style={{
              position: 'absolute',
              top: 'calc(100% + var(--spacing-sm))',
              left: 0,
              right: 0,
              backgroundColor: 'var(--panel-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              maxHeight: '300px',
              overflowY: 'auto',
              zIndex: 50
            }}>
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleSearchSelect(result)}
                  style={{
                    padding: 'var(--spacing-md) var(--spacing-md)',
                    cursor: result.type === 'info' ? 'default' : 'pointer',
                    borderBottom: '1px solid var(--border-color)',
                    transition: 'background-color 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)'
                  }}
                  onMouseEnter={(e) => {
                    if (result.type !== 'info') {
                      e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {result.type === 'student' ? <FiUser size={18} color="var(--primary)" /> : <FiClipboard size={18} color="var(--primary)" />}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: 0,
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--text-primary)'
                    }}>
                      {result.title}
                    </p>
                    <p style={{
                      margin: '0.125rem 0 0 0',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)'
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
        gap: 'var(--spacing-md)'
      }}>
        <div ref={menuRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              cursor: 'pointer',
              padding: 'var(--spacing-xs)',
              borderRadius: 'var(--radius-md)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-page)';
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
                border: '2px solid var(--primary)',
                objectFit: 'cover'
              }}
            />
            <FiChevronDown 
              size={16} 
              style={{ 
                color: 'var(--text-muted)',
                transition: 'transform 0.15s ease',
                transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }} 
            />
          </div>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="fade-in" style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + var(--spacing-sm))',
              minWidth: '200px',
              backgroundColor: 'var(--panel-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              padding: 'var(--spacing-sm)',
              zIndex: 50
            }}>
              <div style={{
                padding: 'var(--spacing-md) var(--spacing-md)',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  {user?.name || 'Usuario'}
                </p>
                <p style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  margin: '0.125rem 0 0 0'
                }}>
                  {user?.email || 'usuario@email.com'}
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
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Configuración
              </button>

              <div style={{
                height: '1px',
                backgroundColor: 'var(--border-color)',
                margin: 'var(--spacing-sm) 0'
              }} />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  // ✅ Limpiar sesión y redirigir al login
                  clearAuth();
                  navigate('/login');
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--danger)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'background-color 0.15s ease'
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
