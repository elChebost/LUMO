import React, { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

const NotificationFAB = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <>
      {/* FAB Principal - Avión de papel */}
      <button
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: isMobile ? '80px' : '2rem',
          right: isMobile ? '1rem' : '2rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#1DD75B',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(29, 215, 91, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 998,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#0FB64A';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#1DD75B';
        }}
      >
        <FiSend size={24} />
      </button>

      {/* Mensaje "Próximamente" */}
      {showMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '150px' : '5.5rem',
            right: isMobile ? '1rem' : '2rem',
            backgroundColor: 'var(--panel-bg)',
            color: 'var(--text-primary)',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            zIndex: 999,
            animation: 'fadeInUp 0.3s ease-out',
            whiteSpace: 'nowrap',
          }}
        >
          🚀 Próximamente
        </div>
      )}
    </>
  );
};

export default NotificationFAB;
