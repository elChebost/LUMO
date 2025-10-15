import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { isAuthenticated } from '../utils/auth';

// ✅ Puerto correcto (3000)
const API_URL = 'http://localhost:3000';

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
      const response = await fetch(`${API_URL}/api/auth/login`, {
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
      
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Error de conexión. Por favor, intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Mitad izquierda - Formulario de login */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: '#2E7D32',
              letterSpacing: '0.05em',
              margin: '0 0 0.5rem 0'
            }}>
              LUMO
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#666',
              margin: 0
            }}>
              Portal Docente
            </p>
          </div>

          {/* Título */}
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Iniciar sesión
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '2rem'
          }}>
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
              <span style={{
                fontSize: '0.875rem',
                color: '#D32F2F'
              }}>
                {error}
              </span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Correo electrónico
              </label>
              <div style={{ position: 'relative' }}>
                <FiMail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#999',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2E7D32';
                    e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <FiLock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#999',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2E7D32';
                    e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: loading ? '#ccc' : '#2E7D32',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#1B5E20';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(46, 125, 50, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#2E7D32';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Credenciales de prueba */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
            border: '1px solid #E0E0E0'
          }}>
            <p style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#666',
              margin: '0 0 0.5rem 0'
            }}>
              Credenciales de prueba:
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#666',
              margin: '0.25rem 0',
              fontFamily: 'monospace'
            }}>
              Email: remindevelopment@gmail.com
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#666',
              margin: '0.25rem 0',
              fontFamily: 'monospace'
            }}>
              Contraseña: testing1234
            </p>
          </div>
        </div>
      </div>

      {/* Mitad derecha - Imagen de presentación */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Patrón decorativo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                           radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }} />

        {/* Contenido */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Bienvenido a LUMO
          </h2>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.9,
            lineHeight: 1.6,
            marginBottom: '3rem'
          }}>
            Plataforma de gamificación educativa que transforma el aprendizaje en una aventura emocionante.
          </p>

          {/* Features */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            textAlign: 'left'
          }}>
            {[
              { title: 'Gestión de Alumnos', desc: 'Monitorea el progreso y desempeño de cada estudiante' },
              { title: 'Misiones Interactivas', desc: 'Crea y asigna tareas gamificadas' },
              { title: 'Estadísticas en Tiempo Real', desc: 'Visualiza métricas y analíticas del curso' }
            ].map((feature, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {idx + 1}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    margin: '0 0 0.25rem 0'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    opacity: 0.8,
                    margin: 0
                  }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
