import React, { useState, useEffect } from 'react';
import { FiUser, FiBell, FiLock, FiLogOut, FiUpload, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

const Settings = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTypes, setNotificationTypes] = useState({
    newMission: true,
    studentSubmission: true,
    studentAchievement: true,
    systemUpdate: false
  });
  const [avatarHover, setAvatarHover] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Cargar datos del usuario
    loadUserData();
    
    // Verificar permisos de notificaciones
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }

    return () => window.removeEventListener('resize', checkMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserData = async () => {
    try {
      // TODO: Cambiar teacherId cuando se implemente auth
      const response = await fetch(`${API_URL}/teachers/1`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Datos por defecto
      setUserData({
        name: 'Elias Diaz',
        email: 'remindevelopment@gmail.com',
        role: 'Profesor',
        avatar_url: '/avatar.png'
      });
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo y tamaño
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede superar los 5MB');
      return;
    }

    // Crear FormData
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      // TODO: Implementar endpoint de upload
      const response = await fetch(`${API_URL}/teachers/1/avatar`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const { avatar_url } = await response.json();
        setUserData(prev => ({ ...prev, avatar_url }));
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error al subir la imagen');
    }
  };

  const handleNotificationToggle = async () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        // Ya está activado, desactivar
        setNotificationsEnabled(false);
      } else if (Notification.permission === 'denied') {
        alert('Los permisos de notificación están bloqueados. Por favor, habilítalos en la configuración del navegador.');
      } else {
        // Solicitar permiso
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          new Notification('LUMO', {
            body: 'Las notificaciones están activadas',
            icon: '/icon.png'
          });
        }
      }
    }
  };

  const handleNotificationTypeChange = (type) => {
    setNotificationTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    // TODO: Guardar preferencias en backend
  };

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
      <div className="card" style={{
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <h3 style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 var(--spacing-md) 0'
        }}>
          <FiUser size={20} style={{ verticalAlign: 'text-bottom', marginRight: 'var(--spacing-xs)' }} />
          Perfil
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-md)'
        }}>
          {/* Avatar con hover upload */}
          <div 
            style={{
              position: 'relative',
              width: isMobile ? '72px' : '96px',
              height: isMobile ? '72px' : '96px'
            }}
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            <img
              src={userData?.avatar_url || '/avatar.png'}
              alt="Avatar"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '3px solid var(--primary)',
                objectFit: 'cover',
                transition: 'opacity 0.2s ease'
              }}
            />
            {avatarHover && (
              <label 
                htmlFor="avatar-upload"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  gap: 'var(--spacing-xs)'
                }}
              >
                <FiUpload size={20} />
                <span>Subir</span>
              </label>
            )}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              {userData?.name || 'Cargando...'}
            </h2>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              margin: 'var(--spacing-xs) 0 0 0'
            }}>
              {userData?.email || ''}
            </p>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--primary)',
              margin: 'var(--spacing-xs) 0 0 0',
              fontWeight: 600
            }}>
              {userData?.role || 'Profesor'}
            </p>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="card" style={{
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <h3 style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 var(--spacing-md) 0'
        }}>
          <FiBell size={20} style={{ verticalAlign: 'text-bottom', marginRight: 'var(--spacing-xs)' }} />
          Notificaciones
        </h3>

        {/* Toggle principal */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--bg-page)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-md)'
        }}>
          <div>
            <p style={{
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Habilitar notificaciones en el dispositivo
            </p>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              margin: 'var(--spacing-xs) 0 0 0'
            }}>
              Recibe alertas en tiempo real
            </p>
          </div>
          <button
            onClick={handleNotificationToggle}
            style={{
              position: 'relative',
              width: '48px',
              height: '26px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: notificationsEnabled ? 'var(--primary)' : 'var(--border-color)',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '3px',
              left: notificationsEnabled ? '25px' : '3px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transition: 'left 0.2s ease'
            }} />
          </button>
        </div>

        {/* Tipos de notificación */}
        {notificationsEnabled && (
          <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--bg-page)',
            borderRadius: 'var(--radius-md)'
          }}>
            <p style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-sm) 0'
            }}>
              Tipos de notificación
            </p>

            {[
              { key: 'newMission', label: 'Nuevas misiones creadas' },
              { key: 'studentSubmission', label: 'Entregas de estudiantes' },
              { key: 'studentAchievement', label: 'Logros de estudiantes' },
              { key: 'systemUpdate', label: 'Actualizaciones del sistema' }
            ].map(({ key, label }) => (
              <label
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  padding: 'var(--spacing-sm) 0',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={notificationTypes[key]}
                  onChange={() => handleNotificationTypeChange(key)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--primary)'
                  }}
                />
                <span style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)'
                }}>
                  {label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Seguridad y Privacidad */}
      <div className="card" style={{
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <h3 style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 var(--spacing-md) 0'
        }}>
          <FiLock size={20} style={{ verticalAlign: 'text-bottom', marginRight: 'var(--spacing-xs)' }} />
          Seguridad y Privacidad
        </h3>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--panel-bg)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-page)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <span>Cambiar contraseña</span>
            <FiInfo size={18} style={{ color: 'var(--text-muted)' }} />
          </button>

          {showTooltip && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + var(--spacing-xs))',
              left: 0,
              right: 0,
              padding: 'var(--spacing-sm) var(--spacing-md)',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              color: 'white',
              fontSize: 'var(--text-xs)',
              borderRadius: 'var(--radius-md)',
              zIndex: 10,
              animation: 'fadeIn 0.2s ease'
            }}>
              Funcionalidad disponible próximamente. Contacta al administrador para cambiar tu contraseña.
            </div>
          )}
        </div>
      </div>

      {/* Cerrar sesión */}
      <button
        onClick={() => navigate('/login')}
        style={{
          width: isMobile ? '100%' : 'auto',
          padding: 'var(--spacing-sm) var(--spacing-lg)',
          backgroundColor: 'transparent',
          border: '1px solid #ef4444',
          borderRadius: 'var(--radius-md)',
          color: '#ef4444',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-xs)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
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

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;
