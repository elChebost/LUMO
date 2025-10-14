import React from 'react';

const Performance = () => {
  return (
    <div style={{ padding: '0' }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        margin: '0 0 0.5rem 0'
      }}>
        Rendimiento
      </h1>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        margin: '0 0 2rem 0'
      }}>
        Estadísticas y métricas del curso
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
          Página de rendimiento en construcción
        </p>
      </div>
    </div>
  );
};

export default Performance;
