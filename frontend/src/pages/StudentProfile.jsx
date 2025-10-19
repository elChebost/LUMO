import React from 'react';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { id } = useParams();

  return (
    <div style={{ 
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        color: 'red',
        fontSize: '3rem',
        fontWeight: 'bold'
      }}>
        🎨 TEST - ARCHIVO BÁSICO FUNCIONANDO
      </h1>
      <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
        ID del alumno: {id}
      </p>
      <p style={{ fontSize: '1rem', color: 'gray', marginTop: '2rem' }}>
        Si ves este mensaje, el archivo se está cargando correctamente
      </p>
    </div>
  );
};

export default StudentProfile;
