// TreePreview.jsx
// Vista previa de árbol de progreso (placeholder)

import React from 'react';

const TreePreview = () => (
  <div className="bg-green-100 rounded p-4 flex flex-col items-center">
    <div className="text-4xl">🌳</div>
    <div className="mt-2 text-gray-700">Árbol de progreso</div>
    <div className="w-full h-2 bg-green-300 rounded mt-2">
      <div className="bg-green-600 h-2 rounded" style={{ width: '60%' }}></div>
    </div>
  </div>
);

export default TreePreview;
