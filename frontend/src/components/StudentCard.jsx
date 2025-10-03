// StudentCard.jsx
// Card para mostrar información básica de un alumno

import React from 'react';



const StudentCard = ({ name, avatar, progress, level }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-5 border border-gray-100 hover:shadow-2xl transition-all duration-200 group cursor-pointer">
    <img src={avatar} alt={name} className="w-14 h-14 rounded-full border-2 border-[#1e88e5] object-cover group-hover:scale-105 transition" />
    <div className="flex-1">
      <div className="font-bold text-lg text-gray-900 group-hover:text-[#1e88e5] transition">{name}</div>
      <div className="text-xs text-gray-500 mb-1">Nivel: {level}</div>
      <div className="w-32 bg-gray-200 rounded h-2 mt-1">
        <div className="bg-[#4caf50] h-2 rounded transition-all" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);

export default StudentCard;
