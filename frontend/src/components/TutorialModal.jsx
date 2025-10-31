import React from 'react';
import { FiX, FiBook, FiCheckCircle } from 'react-icons/fi';

const TutorialModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
        animation: 'fadeInModal 0.3s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '2.5rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid #E0E0E0',
          position: 'relative',
          animation: 'slideUpModal 0.3s ease-out'
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#f5f5f5',
            color: '#666',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            padding: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e0e0e0';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <FiX size={18} />
        </button>

        {/* Contenido del modal */}
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          {/* Pregunta principal */}
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            ¿Lo tienes?
          </h2>

          {/* Texto descriptivo */}
          <p style={{
            fontSize: '1rem',
            color: '#666',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            Aprende con nuestro tutorial
          </p>

          {/* Botones */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%'
          }}>
            {/* Botón principal: ¡Lo tengo! */}
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#fff',
                backgroundColor: '#2E7D32',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1B5E20';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(46, 125, 50, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2E7D32';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(46, 125, 50, 0.3)';
              }}
            >
              <FiCheckCircle size={24} />
              ¡Lo tengo!
            </button>

            {/* Botón secundario: Ver tutorial */}
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#2E7D32',
                backgroundColor: 'transparent',
                border: '2px solid #2E7D32',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E8F5E8';
                e.currentTarget.style.borderColor = '#1B5E20';
                e.currentTarget.style.color = '#1B5E20';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#2E7D32';
                e.currentTarget.style.color = '#2E7D32';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FiBook size={24} />
              Ver tutorial
            </button>
          </div>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes fadeInModal {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUpModal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive móvil */
        @media (max-width: 640px) {
          .tutorial-modal-content {
            padding: 2rem 1.5rem !important;
            border-radius: 12px !important;
          }

          .tutorial-modal-title {
            font-size: 1.75rem !important;
          }

          .tutorial-modal-text {
            font-size: 0.9375rem !important;
          }

          .tutorial-modal-button {
            padding: 0.875rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TutorialModal;
