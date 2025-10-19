import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ActivityCard from './ActivityCard';

/**
 * ActivityCarousel - Carrusel de actividades con navegación
 */

const ActivityCarousel = ({ activities = [], onSelect }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navegación
  const nextStep = () => {
    if (currentStep < activities.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevStep();
      if (e.key === 'ArrowRight') nextStep();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, activities.length]);

  if (!activities || activities.length === 0) {
    return (
      <div style={{
        padding: 'var(--spacing-2xl)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        backgroundColor: 'var(--bg-page)',
        borderRadius: 'var(--radius-lg)',
        border: '2px dashed var(--border-color)'
      }}>
        <p style={{ margin: 0, fontSize: 'var(--text-base)' }}>
          No hay actividades disponibles
        </p>
      </div>
    );
  }

  const currentActivity = activities[currentStep];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-lg)'
    }}>
      {/* Header con indicador de paso */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 'var(--spacing-sm)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <h3 style={{
          fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0
        }}>
          Actividades ({activities.length})
        </h3>
        
        <span style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          backgroundColor: 'var(--bg-page)',
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          borderRadius: 'var(--radius-md)'
        }}>
          Paso {currentStep + 1}/{activities.length}
        </span>
      </div>

      {/* Carrusel */}
      <div style={{
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Actividad actual */}
        <div style={{
          transition: 'all 0.3s ease',
          opacity: 1,
          transform: 'translateX(0)'
        }}>
          <ActivityCard activity={currentActivity} />
        </div>
      </div>

      {/* Controles de navegación */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-md)',
        paddingTop: 'var(--spacing-sm)'
      }}>
        {/* Botón Anterior */}
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            backgroundColor: currentStep === 0 ? 'var(--muted-bg)' : 'transparent',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 0 ? 0.5 : 1,
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (currentStep > 0) {
              e.currentTarget.style.backgroundColor = 'var(--bg-page)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--primary)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <FiChevronLeft size={18} />
          {!isMobile && 'Anterior'}
        </button>

        {/* Indicadores de paso */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-xs)',
          alignItems: 'center'
        }}>
          {activities.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentStep(index)}
              style={{
                width: currentStep === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentStep === index ? 'var(--primary)' : 'var(--border-color)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              aria-label={`Ir a actividad ${index + 1}`}
            />
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          type="button"
          onClick={nextStep}
          disabled={currentStep === activities.length - 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            backgroundColor: currentStep === activities.length - 1 ? 'var(--muted-bg)' : 'transparent',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            cursor: currentStep === activities.length - 1 ? 'not-allowed' : 'pointer',
            opacity: currentStep === activities.length - 1 ? 0.5 : 1,
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (currentStep < activities.length - 1) {
              e.currentTarget.style.backgroundColor = 'var(--bg-page)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--primary)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          {!isMobile && 'Siguiente'}
          <FiChevronRight size={18} />
        </button>
      </div>

      {/* Botón de selección (opcional) */}
      {onSelect && (
        <button
          type="button"
          onClick={() => onSelect(currentActivity)}
          style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginTop: 'var(--spacing-sm)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Seleccionar esta actividad
        </button>
      )}
    </div>
  );
};

export default ActivityCarousel;
