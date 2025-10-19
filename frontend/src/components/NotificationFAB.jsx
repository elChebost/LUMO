import React, { useState, useEffect } from 'react';
import { FiSend, FiEdit } from 'react-icons/fi';
import NotificationPanel from './NotificationPanel';
import NotificationComposer from './NotificationComposer';
import { useNotifications } from '../hooks/useNotifications';

const NotificationFAB = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { unreadCount } = useNotifications(user.id);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* FAB Principal - Avión de papel (toggle panel) */}
      <button
        onClick={() => setShowPanel(!showPanel)}
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
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: '#D32F2F',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '10px',
            minWidth: '20px',
            textAlign: 'center',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* FAB Redacción (Solo visible cuando panel abierto) */}
      {showPanel && (
        <button
          onClick={() => setShowComposer(true)}
          style={{
            position: 'fixed',
            bottom: isMobile ? '150px' : '5rem',
            right: isMobile ? '1rem' : '2rem',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#0FB64A',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 12px rgba(15, 182, 74, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 998,
            animation: 'fadeInUp 0.3s ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = '#0A9B3E';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#0FB64A';
          }}
        >
          <FiEdit size={20} />
        </button>
      )}

      {/* Modales */}
      {showPanel && (
        <NotificationPanel onClose={() => setShowPanel(false)} />
      )}
      {showComposer && (
        <NotificationComposer onClose={() => setShowComposer(false)} />
      )}
    </>
  );
};

export default NotificationFAB;
