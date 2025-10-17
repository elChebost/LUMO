import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiEdit2, FiEye, FiClock } from 'react-icons/fi';

const MissionCard = ({ mission, loading = false, onClick }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="card" style={{
        width: '280px',
        height: '180px',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100px',
          backgroundColor: 'var(--bg-page)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{
          padding: 'var(--spacing-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xs)'
        }}>
          <div style={{
            width: '80%',
            height: '16px',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-page)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
          <div style={{
            width: '100%',
            height: '12px',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-page)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>
    );
  }

  const { id, title, summary, previewImage, status } = mission || {};
  
  const isActive = status === 'activa' || status === 'active';

  const handleClick = () => {
    if (onClick) {
      onClick(mission);
    } else if (id) {
      navigate(`/missions/${id}`);
    }
  };

  return (
    <div 
      className="card"
      onClick={handleClick}
      style={{
        width: '280px',
        height: '180px',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
      }}
    >
      {/* Imagen de preview (100px) */}
      <div style={{
        width: '100%',
        height: '100px',
        backgroundColor: 'var(--bg-page)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {previewImage ? (
          <img 
            src={previewImage} 
            alt={title}
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
            fontSize: 'var(--text-xs)'
          }}>
            Sin imagen
          </div>
        )}
        
        {/* Badge de estado */}
        <div style={{
          position: 'absolute',
          top: 'var(--spacing-sm)',
          right: 'var(--spacing-sm)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: isActive 
            ? 'rgba(29, 215, 91, 0.95)' 
            : 'rgba(158, 158, 158, 0.95)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'white',
          textTransform: 'capitalize',
          backdropFilter: 'blur(4px)'
        }}>
          {isActive ? 'Activa' : 'Cerrada'}
        </div>
      </div>

      {/* Contenido (título y summary) */}
      <div style={{
        padding: 'var(--spacing-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xs)',
        flex: 1
      }}>
        {/* Título */}
        <h3 style={{
          fontSize: 'var(--text-base)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {title}
        </h3>

        {/* Summary */}
        <p className="line-clamp-2" style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          margin: 0,
          lineHeight: 1.4
        }}>
          {summary || 'Sin descripción'}
        </p>
      </div>
    </div>
  );
};

export default MissionCard;

