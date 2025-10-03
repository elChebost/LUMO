// AppRouter.jsx
// Define las rutas principales del POV Docente

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import Missions from '../pages/Missions';
import Notifications from '../pages/Notifications';
import Performance from '../pages/Performance';
import Customization from '../pages/Customization';
import Settings from '../pages/Settings';

const AppRouter = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default AppRouter;
