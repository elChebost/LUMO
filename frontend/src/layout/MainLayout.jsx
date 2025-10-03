import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import NotificationFAB from '../components/NotificationFAB';

const MainLayout = ({ children }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      backgroundColor: 'var(--color-bg)',
      display: 'flex'
    }}>
      {/* Sidebar fija a la izquierda */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: 'var(--sidebar-width)',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 30,
        overflowY: 'auto'
      }}>
        <Sidebar />
      </aside>

      {/* Contenido principal: navbar arriba, main content centrado */}
      <div style={{
        marginLeft: 'var(--sidebar-width)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        transition: 'margin-left var(--transition-normal)'
      }}>
        {/* Navbar sticky superior */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          width: '100%',
          height: 'var(--navbar-height)',
          backgroundColor: 'var(--color-card-bg)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Navbar />
        </header>

        {/* Main container centrado */}
        <main style={{
          flex: 1,
          padding: '2rem',
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto'
        }}>
          {children}
        </main>
      </div>

      {/* FAB de notificaciones */}
      <NotificationFAB />
    </div>
  );
};

export default MainLayout;
