import React from 'react';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '0' }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        margin: '0 0 0.5rem 0'
      }}>
        Perfil del Alumno
      </h1>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        margin: '0 0 2rem 0'
      }}>
        Detalles del alumno ID: {id}
      </p>

      <div style={{
        padding: '3rem',
        textAlign: 'center',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)'
      }}>
        <p style={{
          color: 'var(--color-text-secondary)',
          fontSize: '0.875rem'
        }}>
          Página de perfil de alumno en construcción
        </p>
      </div>
    </div>
  );
};

export default StudentProfile;