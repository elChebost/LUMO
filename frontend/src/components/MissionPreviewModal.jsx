import { FiX, FiAward } from 'react-icons/fi';

const MissionPreviewModal = ({ mission, isOpen, onClose, onSelectRole }) => {
  if (!isOpen || !mission) return null;

  const { title, summary, narrative, previewImage } = mission;

  // Parsear el JSON de narrative para obtener los 3 roles
  let roles = [];
  try {
    const narrativeData = typeof narrative === 'string' ? JSON.parse(narrative) : narrative;
    roles = [
      { id: 'logic', title: narrativeData.logicTitle || 'Rol Lógica', story: narrativeData.logicStory || '', rewardPoints: narrativeData.logicReward || 0 },
      { id: 'creativity', title: narrativeData.creativityTitle || 'Rol Creatividad', story: narrativeData.creativityStory || '', rewardPoints: narrativeData.creativityReward || 0 },
      { id: 'writing', title: narrativeData.writingTitle || 'Rol Escritura', story: narrativeData.writingStory || '', rewardPoints: narrativeData.writingReward || 0 }
    ];
  } catch (e) {
    console.error('Error parsing narrative:', e);
    roles = [
      { id: 'logic', title: 'Rol Lógica', story: 'No disponible', rewardPoints: 0 },
      { id: 'creativity', title: 'Rol Creatividad', story: 'No disponible', rewardPoints: 0 },
      { id: 'writing', title: 'Rol Escritura', story: 'No disponible', rewardPoints: 0 }
    ];
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
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }}
          >
            <FiX size={20} />
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

          {/* Sección de roles */}
          <div>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-md) 0'
            }}>
              Elige tu rol
            </h3>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              margin: '0 0 var(--spacing-lg) 0'
            }}>
              Selecciona el rol con el que deseas completar esta misión. Cada rol tiene su propia historia y recompensa.
            </p>

            {/* Grid de roles */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--spacing-md)'
            }}>
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="card"
                  onClick={() => onSelectRole && onSelectRole(role)}
                  style={{
                    padding: 'var(--spacing-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '2px solid transparent',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                  }}
                >
                  {/* Icono del rol */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-page)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--primary)'
                  }}>
                    <FiAward size={20} />
                  </div>

                  {/* Título del rol */}
                  <h4 style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: '0 0 var(--spacing-xs) 0'
                  }}>
                    {role.title}
                  </h4>

                  {/* Historia del rol */}
                  <p className="line-clamp-3" style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    margin: '0 0 var(--spacing-sm) 0',
                    lineHeight: 1.5,
                    minHeight: '60px'
                  }}>
                    {role.story}
                  </p>

                  {/* Recompensa */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--primary)'
                  }}>
                    <FiAward size={16} />
                    <span>{role.rewardPoints} puntos</span>
                  </div>
                </div>
              ))}
            </div>
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
      `}</style>
    </div>
  );
};

export default MissionPreviewModal;
