// PageHeader.jsx
// Header reutilizable para cada pantalla

import React from 'react';


const PageHeader = ({ title, subtitle }) => (
  <header className="mb-10 pb-4 border-b border-gray-200 flex flex-col gap-1">
    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight drop-shadow-sm">{title}</h1>
    {subtitle && <p className="text-gray-500 text-lg md:text-xl font-medium mt-1">{subtitle}</p>}
  </header>
);

export default PageHeader;
