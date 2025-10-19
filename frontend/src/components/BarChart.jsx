import React, { useState, useEffect } from 'react';

const BarChart = ({ data, animated = true }) => {
  const [animatedHeights, setAnimatedHeights] = useState(data.map(() => 0));
  const [isHovered, setIsHovered] = useState(null);
  
  useEffect(() => {
    if (animated) {
      // Animación escalonada para cada barra
      data.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedHeights(prev => {
            const newHeights = [...prev];
            newHeights[index] = data[index].value;
            return newHeights;
          });
        }, index * 150); // Retraso de 150ms entre cada barra
      });
    } else {
      setAnimatedHeights(data.map(item => item.value));
    }
  }, [data, animated]);

  // Encontrar el valor máximo para escalar las barras
  const maxValue = Math.max(...data.map(item => item.value), 1);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'clamp(1rem, 3vw, 2rem)',
      backgroundColor: '#f5f7fa',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Patrón de fondo decorativo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(0, 0, 0, 0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      {/* Título de la gráfica */}
      <div style={{ 
        marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
        position: 'relative',
        zIndex: 1
      }}>
        <h3 style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          fontWeight: 700,
          color: '#374151',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            width: '4px',
            height: '16px',
            backgroundColor: '#2e7d32',
            borderRadius: '2px'
          }} />
          Estadísticas del Alumno
        </h3>
      </div>

      {/* Contenedor de las barras */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 'calc(100% - 60px)',
        gap: 'clamp(0.5rem, 2vw, 1rem)',
        paddingBottom: '1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {data.map((item, index) => {
          const heightPercentage = maxValue > 0 ? (animatedHeights[index] / maxValue) * 100 : 0;
          const color = item.color || '#2e7d32';
          const isActive = isHovered === index;
          
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                maxWidth: '70px',
                position: 'relative'
              }}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {/* Valor encima de la barra */}
              <div style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: 700,
                color: color,
                marginBottom: '0.5rem',
                minHeight: '24px',
                opacity: heightPercentage > 0 ? 1 : 0,
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.2) translateY(-4px)' : 'scale(1)',
                textShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none'
              }}>
                {Math.round(animatedHeights[index])}
              </div>

              {/* Barra */}
              <div
                style={{
                  width: '100%',
                  height: `${heightPercentage}%`,
                  minHeight: heightPercentage > 0 ? '8px' : '0',
                  background: `linear-gradient(180deg, ${color} 0%, ${color}dd 100%)`,
                  borderRadius: '10px 10px 6px 6px',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: isActive 
                    ? `0 8px 20px ${color}66, 0 0 0 2px ${color}33`
                    : `0 4px 8px ${color}33`,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isActive ? 'scaleX(1.1)' : 'scaleX(1)',
                  cursor: 'pointer'
                }}
              >
                {/* Efecto de brillo en la barra */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
                  borderRadius: '10px 10px 0 0',
                  opacity: isActive ? 0.6 : 1,
                  transition: 'opacity 0.3s ease'
                }} />

                {/* Animación de pulso */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `linear-gradient(to top, ${color}, transparent)`,
                    animation: 'pulse 1s ease-in-out infinite',
                    opacity: 0.3
                  }} />
                )}
              </div>

              {/* Label debajo de la barra */}
              <div style={{
                fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
                fontWeight: 600,
                color: isActive ? color : 'var(--text-secondary)',
                marginTop: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                textAlign: 'center',
                lineHeight: 1.2,
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default BarChart;
