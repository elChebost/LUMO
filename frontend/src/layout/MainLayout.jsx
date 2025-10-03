// MainLayout.jsx
// Layout general con Sidebar y Navbar

import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


const MainLayout = ({ children }) => (
  <div className="min-h-screen w-full bg-[var(--color-bg)] font-sans">
    {/* Sidebar encasillado a la izquierda */}
    <div className="fixed top-0 left-0 h-screen w-[var(--sidebar-width)] bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border)] shadow-lg z-30 hidden md:flex flex-col">
      <Sidebar />
    </div>
    {/* Contenido principal: navbar arriba, main content a la derecha de sidebar */}
    <div className="md:ml-[var(--sidebar-width)] flex flex-col min-h-screen transition-all duration-300">
      <header className="sticky top-0 z-20 w-full h-[var(--navbar-height)] bg-[var(--color-card-bg)] shadow-[var(--shadow-navbar)] flex items-center">
        <Navbar />
      </header>
      <main className="flex-1 px-6 md:px-8 py-8 max-w-1280 mx-auto w-full bg-[var(--color-bg)]">
        {children}
      </main>
    </div>
  </div>
);

export default MainLayout;
