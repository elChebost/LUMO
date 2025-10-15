import { useState, useEffect } from 'react';
import { useApi } from './useApi';

/**
 * Hook personalizado para obtener una misión individual
 * @param {number} missionId - ID de la misión
 * @returns {object} Objeto con mission, loading, error y función refresh
 */
export const useMission = (missionId) => {
  const [mission, setMission] = useState(null);
  const { get, loading, error } = useApi();

  const fetchMission = async () => {
    if (!missionId) return;
    
    try {
      const data = await get(`/api/missions/${missionId}`);
      setMission(data);
    } catch (err) {
      console.error('Error al cargar misión:', err);
    }
  };

  useEffect(() => {
    fetchMission();
  }, [missionId]);

  return {
    mission,
    loading,
    error,
    refresh: fetchMission
  };
};
