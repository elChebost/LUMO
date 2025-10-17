import React, { useState } from 'react';
import { FiX, FiCheck, FiTrash2, FiInbox } from 'react-icons/fi';
import { useNotifications } from '../hooks/useNotifications';

const NotificationPanel = ({ isOpen, onClose }) => {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [selectedNotification, setSelectedNotification] = useState(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const handleDelete = async (notificationId, e) => {
    e.stopPropagation();
    await deleteNotification(notificationId);
    if (selectedNotification?.id === notificationId) {
      setSelectedNotification(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        zIndex: 1000,
        padding: 'var(--spacing-lg)'
      }}
    >
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          animation: 'slideInRight 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lista de notificaciones (320px) */}
        <div style={{
          width: '320px',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header de lista */}
          <div style={{
            padding: 'var(--spacing-md)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0
              }}>
                Notificaciones
              </h3>
              {unreadCount > 0 && (
                <span style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)'
                }}>
                  {unreadCount} sin leer
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                padding: 'var(--spacing-xs)',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Botón marcar todas como leídas */}
          {unreadCount > 0 && (
            <div style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <button
                onClick={markAllAsRead}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--spacing-xs)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <FiCheck size={14} />
                Marcar todas como leídas
              </button>
            </div>
          )}

          {/* Lista de notificaciones */}
          <div style={{
            flex: 1,
            overflowY: 'auto'
          }}>
            {loading ? (
              <div style={{
                padding: 'var(--spacing-lg)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: 'var(--text-sm)'
              }}>
                Cargando notificaciones...
              </div>
            ) : notifications.length === 0 ? (
              <div style={{
                padding: 'var(--spacing-xl)',
                textAlign: 'center'
              }}>
                <FiInbox size={48} style={{ 
                  color: 'var(--text-muted)', 
                  marginBottom: 'var(--spacing-md)' 
                }} />
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                  margin: 0
                }}>
                  No hay notificaciones
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    padding: 'var(--spacing-md)',
                    borderBottom: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    backgroundColor: notification.isRead ? 'transparent' : 'rgba(29, 215, 91, 0.05)',
                    transition: 'background-color 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = notification.isRead ? 'transparent' : 'rgba(29, 215, 91, 0.05)';
                  }}
                >
                  {/* Indicador de no leída */}
                  {!notification.isRead && (
                    <div style={{
                      position: 'absolute',
                      left: 'var(--spacing-sm)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)'
                    }} />
                  )}

                  <div style={{
                    paddingLeft: !notification.isRead ? 'var(--spacing-md)' : 0
                  }}>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: notification.isRead ? 400 : 600,
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--spacing-xs)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {notification.message.substring(0, 50)}
                      {notification.message.length > 50 && '...'}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)'
                    }}>
                      {formatDate(notification.createdAt)}
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={(e) => handleDelete(notification.id, e)}
                    style={{
                      position: 'absolute',
                      right: 'var(--spacing-sm)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      padding: 'var(--spacing-xs)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      opacity: 0,
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contenido de notificación seleccionada */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {selectedNotification ? (
            <>
              {/* Header del contenido */}
              <div style={{
                padding: 'var(--spacing-lg)',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {formatDate(selectedNotification.createdAt)}
                </div>
              </div>

              {/* Mensaje completo */}
              <div style={{
                flex: 1,
                padding: 'var(--spacing-lg)',
                overflowY: 'auto'
              }}>
                <p style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedNotification.message}
                </p>
              </div>

              {/* Footer con acciones */}
              <div style={{
                padding: 'var(--spacing-md)',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={(e) => handleDelete(selectedNotification.id, e)}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: '#ef4444',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fee';
                    e.currentTarget.style.borderColor = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <FiTrash2 size={16} />
                  Eliminar
                </button>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--spacing-xl)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <FiInbox size={64} style={{ 
                  color: 'var(--text-muted)', 
                  marginBottom: 'var(--spacing-md)' 
                }} />
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                  margin: 0
                }}>
                  Selecciona una notificación para ver su contenido
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Mostrar botón eliminar al hacer hover en el item */
        div:hover > button[style*="opacity: 0"] {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default NotificationPanel;
