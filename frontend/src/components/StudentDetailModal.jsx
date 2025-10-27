import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import BarChart from './BarChart';

const StudentDetailModal = ({ student, isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen || !student) return null;

  // ✅ Datos REALES del estudiante desde el backend
  const statLogic = student.statLogic || 0;
  const statCreativity = student.statCreativity || 0;
  const statLanguage = student.statLanguage || 0;  // ✅ Cambio de statWriting a statLanguage
  const avgTimeMinutes = student.avgTimeMinutes || 0;
  const missionsCompleted = student.missionsCompleted || 0;

  // ✅ Datos para la gráfica de barras (solo estadísticas reales)
  const chartData = [
    { label: 'Lógica', value: statLogic, color: '#2e7d32' },
    { label: 'Creatividad', value: statCreativity, color: '#1976d2' },
    { label: 'Lengua', value: statLanguage, color: '#f57c00' },  // ✅ Cambio de 'Escritura' a 'Lengua'
  ];

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop con blur */}
      <div 
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: isMobile ? '1rem' : '2rem',
          cursor: 'pointer',
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        {/* Tarjeta flotante */}
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'var(--panel-bg)',
            borderRadius: isMobile ? 'var(--radius-lg)' : 'var(--radius-xl)',
            padding: isMobile ? '1.25rem' : isTablet ? '2rem' : '2.5rem',
            maxWidth: isMobile ? '100%' : '1200px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid var(--border-color)',
            cursor: 'default',
            animation: 'slideUp 0.4s ease-out'
          }}
        >
          {/* Encabezado */}
          <div style={{ 
            marginBottom: isMobile ? '1.25rem' : '2rem',
            animation: 'fadeInDown 0.5s ease-out'
          }}>
            <h1 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 0.5rem 0',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              letterSpacing: '-0.02em'
            }}>
              {student.name}
            </h1>
            <p style={{
              fontSize: isMobile ? '0.8rem' : '1rem',
              color: 'var(--text-secondary)',
              margin: 0,
              fontWeight: 500
            }}>
              {student.email}
              {student.age && ` • ${student.age} años`}
            </p>
          </div>

          {/* Layout principal: Gráfica a la izquierda, Avatar y tarjetas a la derecha */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 320px' : '1fr 400px',
            gap: isMobile ? '1.5rem' : '2.5rem',
            alignItems: 'start'
          }}>
            {/* Columna izquierda: Gráfica de barras */}
            <div style={{
              height: isMobile ? '260px' : isTablet ? '340px' : '400px',
              order: isMobile ? 2 : 1,
              animation: 'fadeInLeft 0.6s ease-out'
            }}>
              <BarChart data={chartData} animated={true} />
            </div>

            {/* Columna derecha: Avatar y tarjetas */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '1rem' : '1.5rem',
              height: '100%',
              order: isMobile ? 1 : 2,
              animation: 'fadeInRight 0.6s ease-out'
            }}>
              {/* Contenedor Avatar */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isMobile ? '0.75rem' : '1rem',
                padding: isMobile ? '1rem' : '2rem',
                backgroundColor: 'transparent',
                position: 'relative'
              }}>
                {/* Nivel - posicionado sobre el avatar */}
                <div style={{
                  position: 'absolute',
                  top: isMobile ? '0rem' : '0.75rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: isMobile ? '6px 16px' : '8px 20px',
                  backgroundColor: '#2e7d32',
                  color: 'white',
                  borderRadius: 'var(--radius-full)',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
                  letterSpacing: '0.5px',
                  zIndex: 2,
                  animation: 'bounceIn 0.8s ease-out'
                }}>
                  NIVEL {student.level || 1}
                </div>

                {/* Avatar - limpio sin bordes, más grande */}
                <div style={{
                  width: isMobile ? '160px' : isTablet ? '200px' : '220px',
                  height: isMobile ? '160px' : isTablet ? '200px' : '220px',
                  marginTop: isMobile ? '1.75rem' : '2.5rem',
                  position: 'relative',
                  animation: 'zoomIn 0.6s ease-out'
                }}>
                  <img
                    src="/assets/avatar.png"
                    alt={student.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))'
                    }}
                  />
                </div>

                {/* Barra de XP */}
                <div style={{
                  width: '100%',
                  marginTop: isMobile ? '0.5rem' : '0.75rem',
                  animation: 'fadeIn 0.8s ease-out'
                }}>
                  <div style={{
                    fontSize: isMobile ? '0.7rem' : '0.875rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '6px',
                    textAlign: 'center',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {student.xp || 0} XP
                  </div>
                  <div style={{
                    width: '100%',
                    height: isMobile ? '8px' : '10px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(((student.xp || 0) % 100), 100)}%`,
                      background: 'linear-gradient(90deg, #2e7d32, #4caf50)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 0 10px rgba(46, 125, 50, 0.5)'
                    }} />
                  </div>
                </div>
              </div>

              {/* Tarjetas de información - 3 tarjetas */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '0.5rem' : '0.75rem'
              }}>
                {/* Tarjeta: Tiempo promedio en la APP */}
                <InfoCard
                  icon={<FiClock size={isMobile ? 18 : 24} style={{ color: '#1976d2' }} />}
                  value={avgTimeMinutes}
                  label="mins"
                  sublabel="promedio"
                  color="#1976d2"
                  delay="0.2s"
                  isMobile={isMobile}
                />

                {/* Tarjeta: Tareas realizadas */}
                <InfoCard
                  icon={<FiCheckCircle size={isMobile ? 18 : 24} style={{ color: '#2e7d32' }} />}
                  value={missionsCompleted}
                  label="tareas"
                  sublabel="realizadas"
                  color="#2e7d32"
                  delay="0.3s"
                  isMobile={isMobile}
                />

                {/* Tarjeta: Experiencia */}
                <InfoCard
                  icon={<FiTrendingUp size={isMobile ? 18 : 24} style={{ color: '#f57c00' }} />}
                  value={student.xp || 0}
                  label="XP"
                  sublabel="experiencia"
                  color="#f57c00"
                  delay="0.4s"
                  isMobile={isMobile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.3);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.05);
          }
          70% {
            transform: translateX(-50%) scale(0.9);
          }
          100% {
            transform: translateX(-50%) scale(1);
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

// Componente de tarjeta de información reutilizable
const InfoCard = ({ icon, value, label, sublabel, color, delay, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        padding: isMobile ? '0.65rem 0.5rem' : '1.25rem',
        backgroundColor: 'white',
        borderRadius: isMobile ? 'var(--radius-sm)' : 'var(--radius-md)',
        boxShadow: isHovered ? '0 8px 24px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${isHovered ? color : 'var(--border-color)'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? '0.25rem' : '0.5rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        animation: `fadeIn 0.6s ease-out ${delay}`,
        animationFillMode: 'backwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        marginBottom: isMobile ? '0.1rem' : '0.25rem',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease'
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: isMobile ? '1.25rem' : '1.75rem',
        fontWeight: 700,
        color: color,
        lineHeight: 1
      }}>
        {value}
      </div>
      <div style={{
        fontSize: isMobile ? '0.65rem' : '0.875rem',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        fontWeight: 600,
        lineHeight: 1.2
      }}>
        {label}
      </div>
      <div style={{
        fontSize: isMobile ? '0.55rem' : '0.65rem',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        fontWeight: 400,
        opacity: 0.8
      }}>
        {sublabel}
      </div>
    </div>
  );
};

export default StudentDetailModal;