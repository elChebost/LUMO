import React, { useState, useEffect } from 'react';
import { FiBell, FiEdit } from 'react-icons/fi';
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
      {/* FAB Panel Notificaciones (Campana) */}
      <button
        onClick={() => setShowPanel(true)}
        style={{
          position: 'fixed',
          bottom: isMobile ? '80px' : '2rem',
          right: isMobile ? '1rem' : '2rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#2E7D32',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 998,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#1B5E20';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#2E7D32';
        }}
      >
        <FiBell size={24} />
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

      {/* FAB Composer (Editar) */}
      <button
        onClick={() => setShowComposer(true)}
        style={{
          position: 'fixed',
          bottom: isMobile ? '150px' : '5rem',
          right: isMobile ? '1rem' : '2rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#7B1FA2',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(123, 31, 162, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 998,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#6A1B9A';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#7B1FA2';
        }}
      >
        <FiEdit size={24} />
      </button>

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
