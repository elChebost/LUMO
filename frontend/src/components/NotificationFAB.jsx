import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiX, FiCheck } from 'react-icons/fi';

// Hook simulado de notificaciones - se reemplazará con datos reales
const useNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Juan Pérez entregó la Misión 1',
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
      read: false
    },
    {
      id: 2,
      message: 'Ana López alcanzó el nivel 5',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
    {
      id: 3,
      message: 'Nueva pregunta en el foro',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return { notifications, markAsRead, markAllAsRead, unreadCount };
};

const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return 'Ahora';
  if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} h`;
  return `Hace ${Math.floor(seconds / 86400)} d`;
};

const NotificationFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const panelRef = useRef(null);
  const fabRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar panel al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        panelRef.current && 
        !panelRef.current.contains(e.target) &&
        fabRef.current &&
        !fabRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Botón flotante */}
      <button
        ref={fabRef}
        onClick={() => setIsOpen(!isOpen)}
        className="notification-fab"
        style={{
          position: 'fixed',
          bottom: isMobile ? 'calc(70px + 1rem)' : '24px',
          right: isMobile ? '16px' : '24px',
          width: isMobile ? '48px' : '56px',
          height: isMobile ? '48px' : '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          boxShadow: 'var(--shadow-lg)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--transition-fast)',
          zIndex: 40
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <FiBell size={isMobile ? 20 : 24} />
        
        {/* Badge con contador */}
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: isMobile ? '2px' : '4px',
            right: isMobile ? '2px' : '4px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-danger)',
            color: 'white',
            fontSize: '0.625rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fade-in"
          style={{
            position: 'fixed',
            bottom: isMobile ? 'calc(70px + 3.5rem)' : '90px',
            right: isMobile ? '8px' : '24px',
            left: isMobile ? '8px' : 'auto',
            width: isMobile ? 'auto' : '360px',
            maxHeight: isMobile ? '60vh' : '420px',
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 40
          }}
        >
          {/* Header del panel */}
          <div style={{
            padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-card-bg)'
          }}>
            <div>
              <h3 style={{
                fontSize: isMobile ? '0.95rem' : '1rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: 0
              }}>
                Notificaciones
              </h3>
              {unreadCount > 0 && (
                <p style={{
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  color: 'var(--color-text-secondary)',
                  margin: '0.125rem 0 0 0'
                }}>
                  {unreadCount} sin leer
                </p>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  title="Marcar todas como leídas"
                  style={{
                    padding: '0.375rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    color: 'var(--color-text-secondary)',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}
                >
                  <FiCheck size={18} />
                </button>
              )}
              
              <button
                onClick={() => setIsOpen(false)}
                title="Cerrar"
                style={{
                  padding: '0.375rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Lista de notificaciones */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem'
          }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '2rem 1rem',
                textAlign: 'center',
                color: 'var(--color-text-secondary)'
              }}>
                <FiBell size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.3 }} />
                <p style={{ margin: 0, fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                  No hay notificaciones
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  style={{
                    padding: isMobile ? '0.75rem' : '0.875rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '0.5rem',
                    backgroundColor: notification.read ? 'transparent' : 'rgba(46, 125, 50, 0.05)',
                    borderLeft: notification.read 
                      ? '3px solid transparent' 
                      : '3px solid var(--color-primary)',
                    cursor: notification.read ? 'default' : 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    if (!notification.read) {
                      e.currentTarget.style.backgroundColor = 'rgba(46, 125, 50, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!notification.read) {
                      e.currentTarget.style.backgroundColor = 'rgba(46, 125, 50, 0.05)';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: notification.read 
                        ? 'transparent' 
                        : 'var(--color-primary)',
                      marginTop: '0.375rem',
                      flexShrink: 0
                    }} />
                    
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: isMobile ? '0.8rem' : '0.875rem',
                        color: 'var(--color-text-primary)',
                        margin: 0,
                        fontWeight: notification.read ? 400 : 600,
                        lineHeight: 1.4
                      }}>
                        {notification.message}
                      </p>
                      <p style={{
                        fontSize: isMobile ? '0.7rem' : '0.75rem',
                        color: 'var(--color-text-secondary)',
                        margin: '0.25rem 0 0 0'
                      }}>
                        {formatTimeAgo(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationFAB;