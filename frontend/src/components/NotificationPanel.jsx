// NotificationPanel.jsx
// Panel lateral o modal para notificaciones recientes

import React from 'react';

const NotificationPanel = () => (
  <div className="p-4 bg-white rounded shadow w-80">
    <h2 className="font-bold mb-2">Notificaciones</h2>
    <ul className="space-y-2">
      <li className="bg-gray-100 p-2 rounded">Nueva entrega de Juan</li>
      <li className="bg-gray-100 p-2 rounded">Mensaje de Ana</li>
      <li className="bg-gray-100 p-2 rounded">Logro desbloqueado por Pedro</li>
    </ul>
    <button className="mt-4 text-blue-500">Limpiar notificaciones</button>
  </div>
);

export default NotificationPanel;
