import React, { useState, useEffect } from 'react';
import { FiX, FiSearch, FiSend, FiAlertCircle } from 'react-icons/fi';

const API_URL = 'http://localhost:3000/api';

const NotificationComposer = ({ isOpen, onClose, onSent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [recipientType, setRecipientType] = useState('individual'); // 'individual' | 'group'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);

  // Buscar estudiantes por CI
  useEffect(() => {
    const searchStudents = async () => {
      if (recipientType === 'individual' && searchTerm.length >= 2) {
        setSearching(true);
        try {
          const response = await fetch(`${API_URL}/students?search=${searchTerm}`);
          const data = await response.json();
          setSearchResults(data.slice(0, 5)); // Max 5 resultados
        } catch (err) {
          console.error('Error searching students:', err);
          setSearchResults([]);
        } finally {
          setSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(searchStudents, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, recipientType]);

  // Agregar destinatario
  const addRecipient = (student) => {
    if (!selectedRecipients.find(r => r.id === student.id)) {
      setSelectedRecipients([...selectedRecipients, student]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  // Remover destinatario
  const removeRecipient = (id) => {
    setSelectedRecipients(selectedRecipients.filter(r => r.id !== id));
  };

  // Enviar notificación
  const handleSend = async () => {
    if (!message.trim()) {
      setError('El mensaje no puede estar vacío');
      return;
    }

    if (recipientType === 'individual' && selectedRecipients.length === 0) {
      setError('Debes seleccionar al menos un destinatario');
      return;
    }

    if (recipientType === 'group' && !searchTerm.trim()) {
      setError('Debes especificar el nombre del grupo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const notificationData = {
        message: message.trim(),
        teacherId: 1, // TODO: Obtener del auth
        recipientType,
        ...(recipientType === 'individual' 
          ? { studentIds: selectedRecipients.map(r => r.id) }
          : { groupName: searchTerm.trim() }
        )
      };

      const response = await fetch(`${API_URL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar notificación');
      }

      // Limpiar formulario
      setMessage('');
      setSelectedRecipients([]);
      setSearchTerm('');
      
      if (onSent) {
        onSent();
      }
      
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--spacing-lg)'
      }}
    >
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Nueva Notificación
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: 'var(--spacing-sm)',
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-page)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div style={{ padding: 'var(--spacing-lg)' }}>
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-md)'
            }}>
              <FiAlertCircle style={{ color: '#c00', flexShrink: 0 }} />
              <span style={{ fontSize: 'var(--text-sm)', color: '#c00' }}>{error}</span>
            </div>
          )}

          {/* Tipo de destinatario */}
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--spacing-xs)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              Enviar a
            </label>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <button
                onClick={() => {
                  setRecipientType('individual');
                  setSearchTerm('');
                  setSelectedRecipients([]);
                }}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm)',
                  backgroundColor: recipientType === 'individual' ? 'var(--primary)' : 'transparent',
                  color: recipientType === 'individual' ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${recipientType === 'individual' ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Individual
              </button>
              <button
                onClick={() => {
                  setRecipientType('group');
                  setSearchTerm('');
                  setSelectedRecipients([]);
                }}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm)',
                  backgroundColor: recipientType === 'group' ? 'var(--primary)' : 'transparent',
                  color: recipientType === 'group' ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${recipientType === 'group' ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Grupo
              </button>
            </div>
          </div>

          {/* Búsqueda de destinatarios */}
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--spacing-xs)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              {recipientType === 'individual' ? 'Buscar por CI' : 'Nombre del Grupo'}
            </label>
            <div style={{ position: 'relative' }}>
              <FiSearch 
                size={16} 
                style={{
                  position: 'absolute',
                  left: 'var(--spacing-sm)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={recipientType === 'individual' ? 'Ej: 1234567-8' : 'Ej: 1° Primaria A'}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 36px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  backgroundColor: 'var(--panel-bg)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(29, 215, 91, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              
              {/* Resultados de búsqueda */}
              {recipientType === 'individual' && searchResults.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: 'var(--spacing-xs)',
                  backgroundColor: 'var(--panel-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 10,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {searchResults.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => addRecipient(student)}
                      style={{
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        cursor: 'pointer',
                        borderBottom: '1px solid var(--border-color)',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '2px'
                      }}>
                        {student.name}
                      </div>
                      <div style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)'
                      }}>
                        CI: {student.ci} • {student.email}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {searching && (
              <div style={{
                marginTop: 'var(--spacing-xs)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)'
              }}>
                Buscando...
              </div>
            )}
          </div>

          {/* Destinatarios seleccionados */}
          {recipientType === 'individual' && selectedRecipients.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{
                display: 'block',
                marginBottom: 'var(--spacing-xs)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}>
                Destinatarios ({selectedRecipients.length})
              </label>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-xs)'
              }}>
                {selectedRecipients.map((recipient) => (
                  <div
                    key={recipient.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)',
                      padding: '4px 8px 4px 12px',
                      backgroundColor: 'var(--bg-page)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)'
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)' }}>{recipient.name}</span>
                    <button
                      onClick={() => removeRecipient(recipient.id)}
                      style={{
                        padding: '2px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                      }}
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mensaje */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--spacing-xs)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              Mensaje <span style={{ color: '#c00' }}>*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: 'var(--spacing-sm)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                backgroundColor: 'var(--panel-bg)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'all 0.2s ease',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(29, 215, 91, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div style={{
              marginTop: 'var(--spacing-xs)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              textAlign: 'right'
            }}>
              {message.length} caracteres
            </div>
          </div>

          {/* Botones de acción */}
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {loading ? 'Enviando...' : (
                <>
                  <FiSend size={16} />
                  Enviar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationComposer;
