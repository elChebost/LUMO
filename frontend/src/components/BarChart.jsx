import React, { useState, useEffect } from 'react';

const BarChart = ({ data, animated = true }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem'
      }}>
        No hay datos para mostrar
      </div>
    );
  }

  // Encontrar el valor máximo para escalar las barras
  const maxValue = Math.max(...data.map(item => item.value), 100);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f9fa',
      borderRadius: isMobile ? 'var(--radius-md)' : 'var(--radius-lg)',
      padding: isMobile ? '1rem' : '1.5rem',
      border: '1px solid var(--border-color)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '0.75rem' : '1rem'
    }}>
      {/* Título */}
      <h3 style={{
        margin: 0,
        fontSize: isMobile ? '0.95rem' : '1.125rem',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }}>
        Habilidades del Alumno
      </h3>

      {/* Contenedor de barras */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        gap: isMobile ? '0.5rem' : '1rem',
        paddingTop: isMobile ? '0.5rem' : '1rem'
      }}>
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          
          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isMobile ? '0.5rem' : '0.75rem',
                minWidth: isMobile ? '50px' : '60px'
              }}
            >
              {/* Valor numérico encima de la barra */}
              <div style={{
                fontSize: isMobile ? '1rem' : '1.25rem',
                fontWeight: 700,
                color: item.color,
                animation: animated ? `fadeIn 0.6s ease-out ${index * 0.1}s backwards` : 'none'
              }}>
                {item.value}
              </div>

              {/* Barra */}
              <div style={{
                width: '100%',
                height: isMobile ? '140px' : '200px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '100%',
                  height: `${heightPercentage}%`,
                  backgroundColor: item.color,
                  borderRadius: 'var(--radius-md)',
                  transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: animated ? `growUp 1.2s ease-out ${index * 0.15}s backwards` : 'none',
                  boxShadow: `0 -4px 12px ${item.color}40`
                }} />
              </div>

              {/* Etiqueta */}
              <div style={{
                fontSize: isMobile ? '0.7rem' : '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                textAlign: 'center',
                wordBreak: 'break-word'
              }}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes growUp {
          from {
            height: 0%;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

export default BarChart;
