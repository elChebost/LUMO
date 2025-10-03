// Notifications.jsx
// Pantalla de notificaciones recientes

import React from 'react';
import NotificationPanel from '../components/NotificationPanel';
import PageHeader from '../components/PageHeader';

const Notifications = () => (
  <div className="p-8 bg-[#f7f8fa] min-h-screen">
    <PageHeader
      title="Notificaciones"
      subtitle="Eventos recientes y mensajes importantes"
    />
    <NotificationPanel />
  </div>
);

export default Notifications;
