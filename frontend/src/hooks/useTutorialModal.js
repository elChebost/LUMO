import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar el modal de tutorial
 * Permite abrir el modal presionando la tecla "T" desde cualquier página
 * 
 * @param {boolean} autoShow - Si debe mostrarse automáticamente al montar (para Dashboard)
 * @returns {object} - { showModal, setShowModal }
 */
const useTutorialModal = (autoShow = false) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // ✅ Auto-mostrar si viene desde login (solo para Dashboard)
    if (autoShow) {
      const shouldShowTutorial = sessionStorage.getItem('showTutorialModal');
      if (shouldShowTutorial === 'true') {
        setShowModal(true);
        sessionStorage.removeItem('showTutorialModal');
      }
    }

    // ✅ Listener global para tecla "T"
    const handleKeyPress = (e) => {
      if (e.key === 't' || e.key === 'T') {
        // Solo abrir si no está escribiendo en un input/textarea
        const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
        if (!isTyping) {
          setShowModal(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [autoShow]);

  return { showModal, setShowModal };
};

export default useTutorialModal;
