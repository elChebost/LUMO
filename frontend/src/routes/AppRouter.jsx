import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import StudentProfile from '../pages/StudentProfile';
import Missions from '../pages/Missions';
import MissionEdit from '../pages/MissionEdit';
import Performance from '../pages/Performance';
import Settings from '../pages/Settings';

const AppRouter = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentProfile />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/missions/:id/edit" element={<MissionEdit />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default AppRouter;

