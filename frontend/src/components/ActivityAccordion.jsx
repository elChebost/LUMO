import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiAward } from 'react-icons/fi';

/**
 * ActivityAccordion - Acordeón minimalista para mostrar las 3 actividades/roles
 */
const ActivityAccordion = ({ activities = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleActivity = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Configuración de colores por tipo
  const typeConfig = {
    logic: { label: 'Lógica', color: '#1DD75B', bg: '#E8F5E9', icon: '🧩' },
    creativity: { label: 'Creatividad', color: '#E91E63', bg: '#FCE4EC', icon: '🎨' },
    writing: { label: 'Lengua', color: '#2196F3', bg: '#E3F2FD', icon: '✏️' }
  };

  if (!activities || activities.length === 0) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: '#999',
        fontSize: '14px'
      }}>
        No hay actividades disponibles
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px',
      width: '100%'
    }}>
      {activities.map((activity, index) => {
        const config = typeConfig[activity.type] || typeConfig.logic;
        const isOpen = openIndex === index;

        return (
          <div
            key={activity.id || index}
            style={{
              border: `2px solid ${config.color}`,
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              backgroundColor: isOpen ? config.bg : 'white'
            }}
          >
            {/* Header - Siempre visible */}
            <button
              onClick={() => toggleActivity(index)}
              style={{
                width: '100%',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = config.bg}
              onMouseLeave={(e) => {
                if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{config.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {activity.title}
                  </h4>
                  <span style={{
                    fontSize: '12px',
                    color: '#666',
                    fontWeight: '500'
                  }}>
                    {config.label}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Badge de puntos */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backgroundColor: config.color,
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  <FiAward size={14} />
                  {activity.points} pts
                </div>

                {/* Chevron */}
                {isOpen ? (
                  <FiChevronUp size={20} color={config.color} />
                ) : (
                  <FiChevronDown size={20} color={config.color} />
                )}
              </div>
            </button>

            {/* Content - Solo visible cuando está abierto */}
            {isOpen && (
              <div style={{
                padding: '0 20px 20px 20px',
                animation: 'slideDown 0.3s ease'
              }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#555'
                }}>
                  {activity.description}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes slideDown {
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

export default ActivityAccordion;
