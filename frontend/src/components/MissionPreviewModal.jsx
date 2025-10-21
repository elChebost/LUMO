import { FiX } from 'react-icons/fi';
import ActivityAccordion from './ActivityAccordion';

const MissionPreviewModal = ({ mission, isOpen, onClose }) => {
  if (!isOpen || !mission) return null;

  const { title, summary, narrative, previewImage, activities = [] } = mission;

  // ✅ PRIORIDAD 1: Usar activities si existen
  let displayActivities = [];
  
  if (activities && activities.length > 0) {
    // Usar las actividades del nuevo sistema
    displayActivities = activities;
  } else if (narrative) {
    // FALLBACK: Parsear narrative (sistema antiguo) y convertir a actividades
    try {
      const narrativeData = typeof narrative === 'string' ? JSON.parse(narrative) : narrative;
      displayActivities = [
        { 
          id: 'logic', 
          title: narrativeData.logicTitle || 'Rol Lógica', 
          description: narrativeData.logicStory || 'No disponible', 
          type: 'logic',
          points: narrativeData.logicReward || 10 
        },
        { 
          id: 'creativity', 
          title: narrativeData.creativityTitle || 'Rol Creatividad', 
          description: narrativeData.creativityStory || 'No disponible', 
          type: 'creativity',
          points: narrativeData.creativityReward || 10 
        },
        { 
          id: 'writing', 
          title: narrativeData.writingTitle || 'Rol Lengua', 
          description: narrativeData.writingStory || 'No disponible', 
          type: 'writing',
          points: narrativeData.writingReward || 10 
        }
      ];
    } catch (e) {
      console.error('Error parsing narrative:', e);
      displayActivities = [];
    }
  }

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
          maxWidth: '900px',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          animation: 'fadeIn 0.2s ease'
        }}
      >
        {/* Header con imagen y título */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          backgroundColor: 'var(--bg-page)',
          marginBottom: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          overflow: 'hidden'
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
              fontSize: 'var(--text-sm)'
            }}>
              Sin imagen de preview
            </div>
          )}
          
          {/* Botón cerrar */}
          <button
            onClick={onClose}
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
        </div>

        {/* Contenido del modal */}
        <div style={{ padding: '0 var(--spacing-xl) var(--spacing-xl)' }}>
          {/* Título y Summary */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-sm) 0'
            }}>
              {title}
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.6
            }}>
              {summary}
            </p>
          </div>

          {/* Separador */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'var(--border-color)',
            margin: 'var(--spacing-xl) 0'
          }} />

          {/* Acordeón de actividades/roles */}
          <div>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Selecciona tu rol
            </h3>
            {displayActivities.length > 0 ? (
              <ActivityAccordion activities={displayActivities} />
            ) : (
              <div style={{
                padding: 'var(--spacing-2xl)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-page)',
                borderRadius: 'var(--radius-lg)',
                border: '2px dashed var(--border-color)'
              }}>
                <p style={{ margin: 0 }}>
                  Esta misión aún no tiene actividades definidas.
                </p>
              </div>
            )}
          </div>
        </div>
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

          /* Padding más compacto */
          .card > div:last-child {
            padding: var(--spacing-md) !important;
          }

          /* Títulos más pequeños */
          .card h2 {
            font-size: var(--text-xl) !important;
            margin-bottom: var(--spacing-xs) !important;
          }

          .card h3 {
            font-size: var(--text-base) !important;
            margin-bottom: var(--spacing-md) !important;
          }

          /* Texto más compacto */
          .card p {
            font-size: var(--text-sm) !important;
            line-height: 1.5 !important;
          }

          /* Separadores más pequeños */
          .card > div:last-child > div[style*="height: 1px"] {
            margin: var(--spacing-lg) 0 !important;
          }
        }

        @media (max-width: 480px) {
          /* Header con imagen más pequeño */
          .card > div:first-child > div:first-child {
            height: 150px !important;
          }

          /* Botón cerrar más pequeño */
          .card > div:first-child button {
            width: 36px !important;
            height: 36px !important;
            top: var(--spacing-sm) !important;
            right: var(--spacing-sm) !important;
          }

          /* Contenido más compacto */
          .card > div:last-child {
            padding: var(--spacing-sm) !important;
          }

          /* Títulos ultra compactos */
          .card h2 {
            font-size: var(--text-lg) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MissionPreviewModal;
