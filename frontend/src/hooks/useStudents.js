import { useState, useEffect } from 'react';
import { useApi } from './useApi';

/**
 * Hook personalizado para gestionar la lista de alumnos
 * @returns {object} Objeto con alumnos, loading, error y función refresh
 */
export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const { get, loading, error } = useApi();

  const fetchStudents = async () => {
    try {
      const data = await get('/api/students');
      setStudents(data);
    } catch (err) {
      console.error('Error al cargar alumnos:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    error,
    refresh: fetchStudents
  };
};
