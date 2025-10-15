import { useState, useEffect } from 'react';
import { useApi } from './useApi';

/**
 * Hook personalizado para gestionar la lista de misiones
 * @returns {object} Objeto con missions, loading, error y función refresh
 */
export const useMissions = () => {
  const [missions, setMissions] = useState([]);
  const { get, loading, error } = useApi();

  const fetchMissions = async () => {
    try {
      const data = await get('/api/missions');
      setMissions(data);
    } catch (err) {
      console.error('Error al cargar misiones:', err);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return {
    missions,
    loading,
    error,
    refresh: fetchMissions
  };
};
