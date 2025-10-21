import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiClock, FiEdit2, FiSave, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const API_URL = 'http://localhost:3000/api';

const MissionModal = ({ mission, isOpen, onClose, onSave, mode = 'view' }) => {
  const [isEditing, setIsEditing] = useState(mode === 'edit' || mode === 'create');
  const [formData, setFormData] = useState({
    nombre: '',
    descripcionBreve: '',
    historia: '',
    fechaInicio: '',
    fechaFin: '',
    imagenURL: '',
    estado: 'inactiva',
    roles: [
      { emoji: '🧩', nombre: '', descripcion: '' },
      { emoji: '🎨', nombre: '', descripcion: '' },
      { emoji: '✏️', nombre: '', descripcion: '' }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (mission) {
      // Convertir fechas ISO a formato de input datetime-local
      const fechaInicioLocal = mission.fechaInicio 
        ? new Date(mission.fechaInicio).toISOString().slice(0, 16)
        : '';
      const fechaFinLocal = mission.fechaFin 
        ? new Date(mission.fechaFin).toISOString().slice(0, 16)
        : '';

      setFormData({
        nombre: mission.nombre || '',
        descripcionBreve: mission.descripcionBreve || '',
        historia: mission.historia || '',
        fechaInicio: fechaInicioLocal,
        fechaFin: fechaFinLocal,
        imagenURL: mission.imagenURL || '',
        estado: mission.estado || 'inactiva',
        roles: mission.roles || [
          { emoji: '🧩', nombre: '', descripcion: '' },
          { emoji: '🎨', nombre: '', descripcion: '' },
          { emoji: '✏️', nombre: '', descripcion: '' }
        ]
      });
    }
    // Resetear estado de edición al abrir
    setIsEditing(mode === 'edit' || mode === 'create');
    setShowDeleteConfirm(false);
  }, [mission, mode, isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    // Resetear estado de edición al cerrar
    setIsEditing(false);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!mission?.id) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/missions/${mission.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar la misión');
      }

      if (onSave) await onSave();
      handleClose();
    } catch (err) {
      setError(err.message);
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (index, field, value) => {
    setFormData(prev => {
      const newRoles = [...prev.roles];
      newRoles[index] = { ...newRoles[index], [field]: value };
      return { ...prev, roles: newRoles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = mission?.id 
        ? `${API_URL}/missions/${mission.id}` 
        : `${API_URL}/missions`;
      
      const method = mission?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          teacherId: 1 // Temporal - cambiar cuando se implemente auth
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al guardar la misión');
      }

      if (onSave) await onSave();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No definida';
    try {
      return format(new Date(dateString), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es });
    } catch {
      return 'Fecha inválida';
    }
  };

  const getEstadoBadgeColor = (estado) => {
    switch (estado) {
      case 'activa': return 'rgba(29, 215, 91, 0.95)';
      case 'proxima': return 'rgba(255, 193, 7, 0.95)';
      case 'finalizada': return 'rgba(158, 158, 158, 0.95)';
      default: return 'rgba(100, 100, 100, 0.95)';
    }
  };

  return (
    <div 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--spacing-lg)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          animation: 'fadeIn 0.2s ease'
        }}
      >
        {/* Header con imagen */}
        <div style={{ position: 'relative' }}>
          {/* Imagen de portada */}
          <div style={{
            width: '100%',
            height: '250px',
            backgroundColor: 'var(--bg-page)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {isEditing ? (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--spacing-lg)',
                gap: 'var(--spacing-sm)'
              }}>
                <input
                  type="text"
                  name="imagenURL"
                  value={formData.imagenURL}
                  onChange={handleChange}
                  placeholder="URL de la imagen"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 'var(--text-sm)'
                  }}
                />
                {formData.imagenURL && (
                  <img 
                    src={formData.imagenURL} 
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '150px',
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                )}
              </div>
            ) : (
              formData.imagenURL ? (
                <img 
                  src={formData.imagenURL} 
                  alt={formData.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  fontSize: 'var(--text-sm)'
                }}>
                  Sin imagen
                </div>
              )
            )}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: 'var(--spacing-md)',
              right: 'var(--spacing-md)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#1e293b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <FiX size={20} strokeWidth={2.5} />
          </button>

          {/* Botón editar */}
          {!isEditing && mode !== 'create' && (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                position: 'absolute',
                top: 'var(--spacing-md)',
                right: 'calc(var(--spacing-md) + 56px)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--color-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(4px)',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <FiEdit2 size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Contenido */}
        <form onSubmit={handleSubmit} style={{ padding: 'var(--spacing-xl)' }}>
          {error && (
            <div style={{
              padding: 'var(--spacing-md)',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: 'var(--radius-md)',
              color: '#c00',
              marginBottom: 'var(--spacing-lg)'
            }}>
              {error}
            </div>
          )}

          {/* Título y estado */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-lg)',
            gap: 'var(--spacing-md)',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              {isEditing ? (
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre de la misión"
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--border-color)',
                    backgroundColor: 'var(--panel-bg)',
                    color: 'var(--text-primary)'
                  }}
                />
              ) : (
                <h2 style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  {formData.nombre}
                </h2>
              )}
            </div>

            {/* Estado */}
            <div>
              {isEditing ? (
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid var(--border-color)',
                    backgroundColor: 'var(--panel-bg)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <option value="activa">Activa</option>
                  <option value="proxima">Próxima</option>
                  <option value="inactiva">Inactiva</option>
                  <option value="finalizada">Finalizada</option>
                </select>
              ) : (
                <span style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: getEstadoBadgeColor(formData.estado),
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'white',
                  textTransform: 'capitalize'
                }}>
                  {formData.estado}
                </span>
              )}
            </div>
          </div>

          {/* Fechas */}
          <div className="dates-container" style={{
            display: 'grid',
            gridTemplateColumns: isEditing ? '1fr' : '1fr 1fr',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-xl)',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--bg-page)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <FiCalendar size={18} style={{ color: 'var(--text-secondary)' }} />
              {isEditing ? (
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Fecha de inicio
                  </label>
                  <input
                    type="datetime-local"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-xs) var(--spacing-sm)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'white',
                      fontSize: 'var(--text-sm)'
                    }}
                  />
                </div>
              ) : (
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                  <strong>Inicia:</strong> {formatDate(formData.fechaInicio)}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <FiClock size={18} style={{ color: 'var(--text-secondary)' }} />
              {isEditing ? (
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Fecha de fin
                  </label>
                  <input
                    type="datetime-local"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-xs) var(--spacing-sm)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'white',
                      fontSize: 'var(--text-sm)'
                    }}
                  />
                </div>
              ) : (
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                  <strong>Finaliza:</strong> {formatDate(formData.fechaFin)}
                </span>
              )}
            </div>
          </div>

          {/* Descripción breve */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--spacing-sm)'
            }}>
              Descripción
            </h3>
            {isEditing ? (
              <textarea
                name="descripcionBreve"
                value={formData.descripcionBreve}
                onChange={handleChange}
                placeholder="Descripción breve de la misión"
                required
                rows={3}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--panel-bg)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.6,
                  resize: 'vertical'
                }}
              />
            ) : (
              <p style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.6
              }}>
                {formData.descripcionBreve}
              </p>
            )}
          </div>

          {/* Separador */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'var(--border-color)',
            margin: 'var(--spacing-xl) 0'
          }} />

          {/* Historia */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-md)'
            }}>
              Historia
            </h3>
            {isEditing ? (
              <textarea
                name="historia"
                value={formData.historia}
                onChange={handleChange}
                placeholder="Historia narrativa completa de la misión"
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--panel-bg)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  resize: 'vertical'
                }}
              />
            ) : (
              <p style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: 1.8,
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--bg-page)',
                borderRadius: 'var(--radius-md)'
              }}>
                {formData.historia}
              </p>
            )}
          </div>

          {/* Roles */}
          <div>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Roles
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-lg)'
            }}>
              {formData.roles.map((rol, index) => (
                <div 
                  key={index}
                  style={{
                    padding: 'var(--spacing-lg)',
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    marginBottom: isEditing ? 'var(--spacing-md)' : 'var(--spacing-sm)'
                  }}>
                    <span style={{ fontSize: '2rem' }}>{rol.emoji}</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={rol.nombre}
                        onChange={(e) => handleRoleChange(index, 'nombre', e.target.value)}
                        placeholder="Nombre del rol"
                        required
                        style={{
                          flex: 1,
                          padding: 'var(--spacing-sm) var(--spacing-md)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'white',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 600
                        }}
                      />
                    ) : (
                      <h4 style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: 0
                      }}>
                        {rol.nombre}
                      </h4>
                    )}
                  </div>
                  {isEditing ? (
                    <textarea
                      value={rol.descripcion}
                      onChange={(e) => handleRoleChange(index, 'descripcion', e.target.value)}
                      placeholder="Descripción del rol"
                      required
                      rows={2}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'white',
                        fontSize: 'var(--text-sm)',
                        resize: 'vertical'
                      }}
                    />
                  ) : (
                    <p style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      lineHeight: 1.6
                    }}>
                      {rol.descripcion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          {isEditing && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginTop: 'var(--spacing-xl)',
              paddingTop: 'var(--spacing-xl)',
              borderTop: '1px solid var(--border-color)',
              flexWrap: 'wrap'
            }}>
              {/* Botón eliminar - solo en modo edición de misión existente */}
              {mode !== 'create' && mission?.id && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={loading}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #dc2626',
                    backgroundColor: 'transparent',
                    color: '#dc2626',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    opacity: loading ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#fee', e.currentTarget.style.borderColor = '#b91c1c')}
                  onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = 'transparent', e.currentTarget.style.borderColor = '#dc2626')}
                >
                  <FiTrash2 size={16} />
                  Eliminar
                </button>
              )}

              {/* Botones de acción derecha */}
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                marginLeft: 'auto',
                flexWrap: 'wrap'
              }}>
                {mode !== 'create' && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setShowDeleteConfirm(false);
                    }}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-xl)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-page)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-xl)',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    opacity: loading ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)')}
                  onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
                >
                  <FiSave size={18} />
                  {loading ? 'Guardando...' : 'Guardar Misión'}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Confirmación de eliminación */}
        {showDeleteConfirm && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: 'var(--spacing-2xl)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '400px',
              width: '90%',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-md)'
              }}>
                ¿Eliminar misión?
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-xl)',
                lineHeight: 1.6
              }}>
                Esta acción no se puede deshacer. Se eliminará permanentemente la misión <strong>"{mission?.nombre}"</strong> y todo su progreso asociado.
              </p>
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={loading}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'white',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.5 : 1
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  <FiTrash2 size={16} />
                  {loading ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* 📱 Responsive Mobile */
        @media (max-width: 768px) {
          .card {
            max-width: 100% !important;
            margin: 0 !important;
            border-radius: var(--radius-md) !important;
          }

          .dates-container {
            grid-template-columns: 1fr !important;
          }

          /* Ajustar padding en móviles */
          .card form {
            padding: var(--spacing-md) !important;
          }

          /* Botones más compactos */
          .card button {
            font-size: var(--text-xs) !important;
            padding: var(--spacing-xs) var(--spacing-sm) !important;
          }

          /* Títulos más pequeños */
          .card h2 {
            font-size: var(--text-xl) !important;
          }

          .card h3 {
            font-size: var(--text-base) !important;
          }

          /* Textarea más compacto */
          .card textarea {
            font-size: var(--text-sm) !important;
          }

          /* Inputs más pequeños */
          .card input {
            font-size: var(--text-sm) !important;
            padding: var(--spacing-xs) var(--spacing-sm) !important;
          }
        }

        @media (max-width: 480px) {
          /* Header con imagen más pequeño */
          .card > div:first-child > div:first-child {
            height: 150px !important;
          }

          /* Botones header más pequeños */
          .card > div:first-child button {
            width: 36px !important;
            height: 36px !important;
            top: var(--spacing-sm) !important;
            right: var(--spacing-sm) !important;
          }

          .card > div:first-child button:nth-of-type(2) {
            right: calc(var(--spacing-sm) + 44px) !important;
          }

          /* Roles en columna completa */
          .card form > div:last-of-type > div {
            padding: var(--spacing-md) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MissionModal;
