import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import NotificationFAB from '../components/NotificationFAB';

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Layout para móvil
    return (
      <div className="mobile-layout">
        {/* Contenido principal */}
        <main className="mobile-main">
          <Outlet />
        </main>

        {/* Navegación inferior */}
        <BottomNavigation />

        {/* FAB de notificaciones */}
        <NotificationFAB />
      </div>
    );
  }

  // Layout para desktop (original)
  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      backgroundColor: 'var(--bg-page)',
      display: 'flex'
    }}>
      {/* Sidebar fija a la izquierda */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--panel-bg)',
        borderRight: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-soft)',
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
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Navbar sticky superior */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          width: '100%',
          height: 'var(--navbar-height)',
          backgroundColor: 'var(--panel-bg)',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Navbar />
        </header>

        {/* Main container centrado */}
        <main style={{
          flex: 1,
          padding: 'var(--spacing-2xl)',
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto'
        }}>
          <Outlet />
        </main>
      </div>

      {/* FAB de notificaciones */}
      <NotificationFAB />
    </div>
  );
};

export default MainLayout;
