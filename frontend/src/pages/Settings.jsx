import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiLogOut, FiUpload, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api.js';

const Settings = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);
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

    return () => window.removeEventListener('resize', checkMobile);
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
        avatar_url: '/assets/avatar.png'
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

    // ✅ Preview inmediato (antes de subir)
    const previewUrl = URL.createObjectURL(file);
    setUserData(prev => ({ ...prev, avatar_url: previewUrl }));

    // Crear FormData
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      // ✅ Endpoint funcional implementado
      const response = await fetch(`${API_URL}/teachers/1/avatar`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        // ✅ Actualizar con URL del servidor (usa ruta relativa)
        setUserData(prev => ({ 
          ...prev, 
          avatar_url: data.avatar_url 
        }));
        // Liberar memoria del preview
        URL.revokeObjectURL(previewUrl);
      } else {
        // Si falla, revertir al avatar anterior
        loadUserData();
        alert('Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      // Si falla, revertir
      loadUserData();
      alert('Error al subir la imagen');
    }
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
              src={userData?.avatar_url || '/assets/avatar.png'}
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
            onMouseEnter={(e) => {
              setShowTooltip(true);
              e.currentTarget.style.backgroundColor = 'var(--panel-bg)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              setShowTooltip(false);
              e.currentTarget.style.backgroundColor = 'var(--bg-page)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
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
