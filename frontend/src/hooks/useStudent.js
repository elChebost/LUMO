import { useState, useEffect } from 'react';
import { useApi } from './useApi';

/**
 * Hook personalizado para obtener un alumno individual
 * @param {number} studentId - ID del alumno
 * @returns {object} Objeto con student, loading, error y función refresh
 */
export const useStudent = (studentId) => {
  const [student, setStudent] = useState(null);
  const { get, loading, error } = useApi();

  const fetchStudent = async () => {
    if (!studentId) return;
    
    try {
      const data = await get(`/api/students/${studentId}`);
      setStudent(data);
    } catch (err) {
      console.error('Error al cargar alumno:', err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  return {
    student,
    loading,
    error,
    refresh: fetchStudent
  };
};
