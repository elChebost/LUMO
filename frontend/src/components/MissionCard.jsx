import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiEdit2, FiEye, FiClock } from 'react-icons/fi';

const MissionCard = ({ mission, loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{
        height: '120px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div style={{
          width: '70%',
          height: '16px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-bg)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{
          width: '90%',
          height: '12px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-bg)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{
          width: '40%',
          height: '12px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-bg)',
          animation: 'pulse 1.5s ease-in-out infinite',
          marginTop: 'auto'
        }} />
      </div>
    );
  }

  const { id, title, description, dueDate, status } = mission || {};
  
  const isActive = status === 'activa';
  const formattedDate = dueDate ? new Date(dueDate).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) : 'Sin fecha';

  return (
    <div style={{
      height: '120px',
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '1rem',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all var(--transition-fast)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {/* Badge de estado en esquina superior derecha */}
      <div style={{
        position: 'absolute',
        top: '0.75rem',
        right: '0.75rem',
        padding: '0.25rem 0.625rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: isActive 
          ? 'rgba(46, 125, 50, 0.1)' 
          : 'rgba(117, 117, 117, 0.1)',
        border: `1px solid ${isActive ? 'rgba(46, 125, 50, 0.2)' : 'rgba(117, 117, 117, 0.2)'}`,
        fontSize: '0.6875rem',
        fontWeight: 600,
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
        textTransform: 'capitalize'
      }}>
        {isActive ? 'Activa' : 'Cerrada'}
      </div>

      {/* Título */}
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        margin: '0 0 0.5rem 0',
        paddingRight: '5rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {title}
      </h3>

      {/* Descripción */}
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        margin: '0 0 auto 0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        lineHeight: 1.4
      }}>
        {description}
      </p>

      {/* Footer con fecha y acciones */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '0.75rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--color-border)'
      }}>
        {/* Fecha de entrega */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '0.75rem',
          color: 'var(--color-text-secondary)'
        }}>
          <FiCalendar size={14} />
          <span>{formattedDate}</span>
        </div>

        {/* Acciones */}
        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (id) navigate(`/missions/${id}`);
            }}
            title="Ver detalles"
            style={{
              padding: '0.375rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border)',
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
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            <FiEye size={14} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (id) navigate(`/missions/${id}/edit`);
            }}
            title="Editar"
            style={{
              padding: '0.375rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border)',
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
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            <FiEdit2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;

