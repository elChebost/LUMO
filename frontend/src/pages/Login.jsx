import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { isAuthenticated } from '../utils/auth';
import './Login.css'; // Importar estilos CSS
import { API_URL, apiUrl } from '../config/api.js';
import { ASSETS } from '../utils/assets';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirigir al dashboard si ya está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
  const response = await fetch(apiUrl('/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      // ✅ Guardar token y usuario en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // ✅ Marcar que debe mostrarse el modal de tutorial en el dashboard
      sessionStorage.setItem('showTutorialModal', 'true');
      
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch {
      setError('Error de conexión. Por favor, intenta de nuevo.');
      setLoading(false);
    }
  };

  // Ref para la imagen
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [imgPosX, setImgPosX] = useState(0);

  // Animación automática de desplazamiento lateral muy lento
  useEffect(() => {
    let direction = 1; // 1 = derecha, -1 = izquierda
    let position = 0;

    const animate = () => {
      // Movimiento muy lento: incremento de 0.02% por frame
      position += direction * 0.02;

      // Cambiar dirección en los extremos (-30% a 0%)
      if (position <= -30) {
        direction = 1;
      } else if (position >= 0) {
        direction = -1;
      }

      setImgPosX(position);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {/* Mitad izquierda - Formulario login */}
      <div
        className="login-form-container"
        style={{
          flex: '0 0 50%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          padding: '2rem',
          overflowY: 'auto',
          paddingTop: '3rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '1rem',
          }}
        >
        {/* Logo imagen */}
        <img src={ASSETS.ICON_TEXT} alt="LUMO" style={{ width: 180, marginBottom: 24 }} />
        <p style={{ fontSize: '1rem', color: '#666', margin: 0, marginBottom: 16 }}>Portal Docente</p>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
          Iniciar sesión
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '2rem' }}>
          Ingresa tus credenciales para acceder
        </p>
        {/* Error Alert */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.875rem 1rem',
            backgroundColor: '#FEE',
            border: '1px solid #FCC',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <FiAlertCircle size={20} color="#D32F2F" />
            <span style={{ fontSize: '0.875rem', color: '#D32F2F' }}>{error}</span>
          </div>
        )}
        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Email */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>
              Correo electrónico
            </label>
            <div style={{ position: 'relative' }}>
              <FiMail
                size={18}
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }}
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="ejemplo@correo.com"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 1rem 0 3rem',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#2E7D32';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E0E0E0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <FiLock
                size={18}
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }}
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 1rem 0 3rem',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#2E7D32';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E0E0E0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              fontSize: '1rem', 
              fontWeight: 700, 
              color: '#fff', 
              backgroundColor: '#2E7D32', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 2px 8px rgba(46,125,50,0.10)', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              transition: 'background 0.2s', 
              marginBottom: '1rem' 
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          {/* Credenciales de prueba - MEJORADAS */}
          <div style={{
            padding: '1rem',
            backgroundColor: '#E8F5E8',
            borderRadius: '8px',
            border: '2px solid #4CAF50',
            marginTop: '0.5rem',
            boxShadow: '0 2px 8px rgba(76,175,80,0.15)'
          }}>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#2E7D32',
              margin: '0 0 0.75rem 0',
              textAlign: 'center'
            }}>
              🧪 CREDENCIALES DE PRUEBA (VERIFICADAS)
            </p>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #C8E6C9',
              marginBottom: '0.75rem'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#1B5E20',
                margin: '0.25rem 0',
                fontFamily: 'monospace',
                fontWeight: 600
              }}>
                📧 Email: <strong style={{ color: '#2E7D32' }}>admin@test.com</strong>
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: '#1B5E20',
                margin: '0.25rem 0',
                fontFamily: 'monospace',
                fontWeight: 600
              }}>
                🔑 Password: <strong style={{ color: '#2E7D32' }}>123456</strong>
              </p>
            </div>
            
            {/* Botón para autocompletar */}
            <button
              type="button"
              onClick={() => {
                setEmail('admin@test.com');
                setPassword('123456');
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#2E7D32',
                backgroundColor: '#ffffff',
                border: '1px solid #4CAF50',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#F1F8E9';
                e.target.style.borderColor = '#2E7D32';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.borderColor = '#4CAF50';
              }}
            >
              ⚡ Llenar automáticamente
            </button>
          </div>

        </form>
      </div>
      </div>

      {/* Mitad derecha - Imagen portada con desplazamiento lateral */}
      <div
        ref={containerRef}
        className="login-image-container"
        style={{
          flex: '0 0 50%',
          position: 'relative',
          overflow: 'hidden',
          height: '100vh',
        }}
      >
        <img
          ref={imgRef}
          src={ASSETS.PORTADA}
          alt="LUMO Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 'auto',
            minWidth: '130%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `translateX(${imgPosX}%)`,
            transition: 'transform 0.1s linear',
          }}
        />
      </div>
    </div>
  );
};

export default Login;
