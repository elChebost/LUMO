import React from 'react';
import { FiX, FiMail, FiUser, FiTrendingUp, FiStar, FiCalendar } from 'react-icons/fi';

const StudentDetailModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative'
      }}>
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666',
            padding: '0.5rem'
          }}
        >
          <FiX />
        </button>

        {/* Contenido */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row'
        }}>
          {/* Datos del estudiante */}
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#2E7D32',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FiUser />
              {student.name}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Email */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: '#F5F5F5',
                borderRadius: '8px'
              }}>
                <FiMail style={{ color: '#2E7D32', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: '600' }}>EMAIL</div>
                  <div style={{ fontSize: '0.875rem', color: '#333' }}>{student.email}</div>
                </div>
              </div>

              {/* Edad */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: '#F5F5F5',
                borderRadius: '8px'
              }}>
                <FiCalendar style={{ color: '#2E7D32', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: '600' }}>EDAD</div>
                  <div style={{ fontSize: '0.875rem', color: '#333' }}>{student.age} años</div>
                </div>
              </div>

              {/* Nivel */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: '#E8F5E8',
                borderRadius: '8px',
                border: '1px solid #C8E6C9'
              }}>
                <FiTrendingUp style={{ color: '#2E7D32', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#1B5E20', fontWeight: '600' }}>NIVEL</div>
                  <div style={{ fontSize: '1.25rem', color: '#2E7D32', fontWeight: 'bold' }}>
                    Nivel {student.level}
                  </div>
                </div>
              </div>

              {/* XP */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: '#FFF3E0',
                borderRadius: '8px',
                border: '1px solid #FFCC02'
              }}>
                <FiStar style={{ color: '#FF8F00', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#E65100', fontWeight: '600' }}>EXPERIENCIA</div>
                  <div style={{ fontSize: '1.25rem', color: '#FF8F00', fontWeight: 'bold' }}>
                    {student.xp} XP
                  </div>
                </div>
              </div>

              {/* Horario */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: '#F5F5F5',
                borderRadius: '8px'
              }}>
                <FiCalendar style={{ color: '#2E7D32', fontSize: '1.1rem' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: '600' }}>HORARIO</div>
                  <div style={{ fontSize: '0.875rem', color: '#333' }}>{student.schedule}</div>
                </div>
              </div>

              {/* Información adicional */}
              {student.teacher && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#E3F2FD',
                  borderRadius: '8px',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#1565C0', fontWeight: '600', marginBottom: '0.25rem' }}>
                    PROFESOR
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1976D2' }}>
                    {student.teacher.name}
                  </div>
                </div>
              )}

              {student.classroom && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F3E5F5',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#7B1FA2', fontWeight: '600', marginBottom: '0.25rem' }}>
                    AULA
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#8E24AA' }}>
                    {student.classroom.name}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #4CAF50',
              backgroundColor: '#F5F5F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={student.profile?.avatar || '/src/assets/avatar.png'}
                alt={`Avatar de ${student.name}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{
                display: 'none',
                fontSize: '3rem',
                color: '#4CAF50'
              }}>
                <FiUser />
              </div>
            </div>
            
            {/* Stats del perfil */}
            {student.profile && (
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
                minWidth: '150px'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: '600', marginBottom: '0.5rem' }}>
                  ESTADÍSTICAS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>EXP: </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#FF8F00' }}>
                      {student.profile.exp}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>MONEDAS: </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#FFD700' }}>
                      {student.profile.coins}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;