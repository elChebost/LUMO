import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const MissionCard = ({ mission, loading = false, onClick }) => {
  if (loading) {
    return (
      <div className="card" style={{
        width: '320px',
        height: '200px',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '120px',
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

  const { nombre, descripcionBreve, imagenURL, estado, fechaInicio, fechaFin } = mission || {};
  
  const getEstadoColor = () => {
    switch (estado) {
      case 'activa': return 'rgba(29, 215, 91, 0.95)';
      case 'proxima': return 'rgba(255, 193, 7, 0.95)';
      case 'finalizada': return 'rgba(158, 158, 158, 0.95)';
      default: return 'rgba(100, 100, 100, 0.95)';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      
      // Si es futura, mostrar "Comienza el..."
      if (date > now && estado === 'proxima') {
        return `Comienza el ${format(date, "d 'de' MMMM", { locale: es })}`;
      }
      
      // Si es la fecha de fin, mostrar "Finaliza el..."
      return `Hasta el ${format(date, "d 'de' MMMM", { locale: es })}`;
    } catch {
      return '';
    }
  };

  return (
    <div 
      className="mission-card card"
      onClick={() => onClick && onClick(mission)}
      style={{
        width: '320px',
        minHeight: '200px',
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
      {/* Imagen de preview (120px) */}
      <div style={{
        width: '100%',
        height: '120px',
        backgroundColor: 'var(--bg-page)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {imagenURL ? (
          <img 
            src={imagenURL} 
            alt={nombre}
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
          padding: '5px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: getEstadoColor(),
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'white',
          textTransform: 'capitalize',
          backdropFilter: 'blur(4px)'
        }}>
          {estado}
        </div>
      </div>

      {/* Contenido */}
      <div style={{
        padding: 'var(--spacing-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)',
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
          {nombre}
        </h3>

        {/* Descripción breve */}
        <p className="line-clamp-2" style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          margin: 0,
          lineHeight: 1.4,
          minHeight: '2.8em'
        }}>
          {descripcionBreve || 'Sin descripción'}
        </p>

        {/* Fecha */}
        {(fechaInicio || fechaFin) && (
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            marginTop: 'auto',
            paddingTop: 'var(--spacing-xs)',
            borderTop: '1px solid var(--border-color)'
          }}>
            {estado === 'proxima' ? formatDate(fechaInicio) : formatDate(fechaFin)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionCard;

