import React from 'react';
import { FiChevronUp, FiChevronDown, FiTrash2, FiGripVertical } from 'react-icons/fi';

/**
 * ActivityEditor - Editor individual de actividad para el formulario
 */

const ActivityEditor = ({
  activity,
  index,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const activityTypes = [
    { value: 'logic', label: '🧩 Lógica', color: '#1DD75B' },
    { value: 'creativity', label: '🎨 Creatividad', color: '#E91E63' },
    { value: 'writing', label: '✏️ Lengua', color: '#2196F3' }
  ];

  const currentType = activityTypes.find(t => t.value === activity.type) || activityTypes[0];

  return (
    <div style={{
      padding: 'var(--spacing-md)',
      backgroundColor: 'var(--bg-page)',
      borderRadius: 'var(--radius-md)',
      border: `2px solid ${currentType.color}20`,
      marginBottom: 'var(--spacing-sm)',
      position: 'relative'
    }}>
      {/* Header con orden y controles */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--spacing-md)',
        paddingBottom: 'var(--spacing-sm)',
        borderBottom: `1px solid ${currentType.color}20`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)'
        }}>
          <FiGripVertical size={18} color="var(--text-muted)" />
          <span style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            color: currentType.color
          }}>
            Actividad #{index + 1}
          </span>
        </div>

        {/* Botones de control */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-xs)'
        }}>
          {/* Mover arriba */}
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            style={{
              padding: 'var(--spacing-xs)',
              backgroundColor: canMoveUp ? 'transparent' : 'var(--muted-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              cursor: canMoveUp ? 'pointer' : 'not-allowed',
              opacity: canMoveUp ? 1 : 0.4,
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (canMoveUp) {
                e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                e.currentTarget.style.borderColor = currentType.color;
                e.currentTarget.style.color = currentType.color;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <FiChevronUp size={16} />
          </button>

          {/* Mover abajo */}
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            style={{
              padding: 'var(--spacing-xs)',
              backgroundColor: canMoveDown ? 'transparent' : 'var(--muted-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              cursor: canMoveDown ? 'pointer' : 'not-allowed',
              opacity: canMoveDown ? 1 : 0.4,
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (canMoveDown) {
                e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                e.currentTarget.style.borderColor = currentType.color;
                e.currentTarget.style.color = currentType.color;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <FiChevronDown size={16} />
          </button>

          {/* Eliminar */}
          <button
            type="button"
            onClick={onRemove}
            style={{
              padding: 'var(--spacing-xs)',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFEBEE';
              e.currentTarget.style.borderColor = '#D32F2F';
              e.currentTarget.style.color = '#D32F2F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Formulario de actividad */}
      <div style={{
        display: 'grid',
        gap: 'var(--spacing-md)'
      }}>
        {/* Título */}
        <div>
          <label style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-xs)',
            display: 'block'
          }}>
            Título de la actividad
          </label>
          <input
            type="text"
            value={activity.title}
            onChange={(e) => onChange(activity.id, 'title', e.target.value)}
            placeholder="Ej: Descifra el enigma matemático"
            style={{
              width: '100%',
              padding: 'var(--spacing-sm)',
              fontSize: 'var(--text-base)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--panel-bg)',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = currentType.color;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${currentType.color}20`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Tipo y Puntos (fila) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 'var(--spacing-md)'
        }}>
          {/* Tipo */}
          <div>
            <label style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-xs)',
              display: 'block'
            }}>
              Tipo de actividad
            </label>
            <select
              value={activity.type}
              onChange={(e) => onChange(activity.id, 'type', e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                fontSize: 'var(--text-base)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--panel-bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = currentType.color;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {activityTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Puntos */}
          <div>
            <label style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-xs)',
              display: 'block'
            }}>
              Puntos
            </label>
            <input
              type="number"
              value={activity.points}
              onChange={(e) => onChange(activity.id, 'points', parseInt(e.target.value) || 0)}
              min="0"
              max="100"
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                fontSize: 'var(--text-base)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--panel-bg)',
                color: 'var(--text-primary)',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = currentType.color;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${currentType.color}20`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-xs)',
            display: 'block'
          }}>
            Descripción
          </label>
          <textarea
            value={activity.description}
            onChange={(e) => onChange(activity.id, 'description', e.target.value)}
            placeholder="Describe la actividad que los alumnos deben realizar..."
            rows="4"
            style={{
              width: '100%',
              padding: 'var(--spacing-sm)',
              fontSize: 'var(--text-base)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--panel-bg)',
              color: 'var(--text-primary)',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = currentType.color;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${currentType.color}20`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityEditor;
