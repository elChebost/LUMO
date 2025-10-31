import React, { useState } from 'react';
import TutorialModal from '../components/TutorialModal';
import { ASSETS } from '../utils/assets';

const TutorialModalDemo = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        gap: '2rem'
      }}
    >
      {/* Logo */}
      <img 
        src={ASSETS.ICON_TEXT} 
        alt="LUMO" 
        style={{ 
          width: 200, 
          marginBottom: '1rem',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))' 
        }} 
      />

      {/* Título */}
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: '1rem',
          lineHeight: 1.2
        }}>
          Vista Previa del Modal
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#666',
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          Este modal se mostrará automáticamente cuando un usuario inicie sesión en la plataforma.
        </p>
      </div>

      {/* Botón para mostrar modal */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: '1rem 2.5rem',
          fontSize: '1.125rem',
          fontWeight: 700,
          color: '#fff',
          backgroundColor: '#2E7D32',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
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
        Mostrar Modal de Tutorial
      </button>

      {/* Información adicional */}
      <div 
        style={{
          maxWidth: '700px',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E0E0E0'
        }}
      >
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#1a1a1a',
          marginBottom: '1rem'
        }}>
          Características del Modal
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9375rem',
            color: '#666'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2E7D32'
            }}></span>
            Diseño fiel al estilo de la página de login
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9375rem',
            color: '#666'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2E7D32'
            }}></span>
            Dos botones distintivos con animaciones suaves
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9375rem',
            color: '#666'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2E7D32'
            }}></span>
            Responsive para móviles y tablets
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9375rem',
            color: '#666'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2E7D32'
            }}></span>
            Los botones solo cierran el modal (para vista previa)
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9375rem',
            color: '#666'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2E7D32'
            }}></span>
            Se puede cerrar haciendo clic fuera del modal o en la X
          </li>
        </ul>
      </div>

      {/* Modal */}
      <TutorialModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default TutorialModalDemo;
