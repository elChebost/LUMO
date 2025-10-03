// MissionCard.jsx
// Card para mostrar información de una misión

import React from 'react';



const MissionCard = ({ title, description, deadline, status }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-2xl transition-all duration-200 group cursor-pointer">
    <div className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#1e88e5] transition">{title}</div>
    <div className="text-gray-600 text-sm mb-2">{description}</div>
    <div className="text-xs text-gray-400">Límite: {deadline}</div>
    <div className="mt-2">
      <span className={`px-2 py-1 rounded text-xs font-semibold ${status === 'Activa' ? 'bg-[#e8f5e9] text-[#388e3c]' : 'bg-gray-200 text-gray-600'}`}>{status}</span>
    </div>
  </div>
);

export default MissionCard;
