// Navbar.jsx
// Barra superior sticky, glass, avatar pequeño y botón destacado

import React from 'react';


import { useState, useRef } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú al hacer click fuera
  React.useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <nav className="flex items-center justify-between w-full h-full px-6">
      {/* Logo y título */}
      <div className="flex items-center gap-3">
        <img src="/vite.svg" alt="Logo LUMO" className="w-8 h-8" />
        <span className="text-xl font-bold text-[var(--color-accent)] tracking-wide">LUMO</span>
      </div>
      {/* Buscador (opcional, puede ocultarse en mobile) */}
      <div className="hidden md:flex flex-1 justify-center">
        <input className="rounded-xl px-4 py-2 border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition w-80" placeholder="Buscar..." />
      </div>
      {/* Usuario y menú */}
      <div className="relative flex items-center gap-2" ref={menuRef}>
        <img src="/avatar.png" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[var(--color-accent)] object-cover cursor-pointer" onClick={() => setOpen((v) => !v)} />
        <span className="font-semibold text-[var(--color-gray900)] cursor-pointer select-none" onClick={() => setOpen((v) => !v)}>
          Profesor Sebastián
        </span>
        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[var(--color-gray900)]" onClick={() => setOpen(false)}>
              Ver perfil
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[var(--color-gray900)]" onClick={() => setOpen(false)}>
              Ajustes
            </button>
            <div className="border-t my-1" />
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-danger font-semibold" onClick={() => setOpen(false)}>
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
