// StatCard.jsx
// Card para mostrar una métrica o estadística

import React from 'react';



const StatCard = ({ label, value, icon }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 border border-gray-100 hover:shadow-2xl transition-all duration-200 cursor-pointer">
    <span className="text-3xl text-[#1e88e5] drop-shadow-sm">{icon}</span>
    <div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
      <div className="font-bold text-2xl text-gray-900">{value}</div>
    </div>
  </div>
);

export default StatCard;
