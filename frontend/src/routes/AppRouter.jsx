import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import Missions from '../pages/Missions';
import MissionEdit from '../pages/MissionEdit';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import { isAuthenticated } from '../utils/auth';

/**
 * Componente para proteger rutas que requieren autenticación
 */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Ruta de login sin layout */}
      <Route path="/login" element={<Login />} />
      
      {/* ✅ Rutas protegidas con autenticación */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="missions" element={<Missions />} />
        <Route path="missions/:id/edit" element={<MissionEdit />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

