export const chartConfig = {
  colors: {
    primary: ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'],
    success: ['#22c55e', '#4ade80', '#86efac', '#bbf7d0'],
    warning: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'],
    error: ['#ef4444', '#f87171', '#fca5a5', '#fecaca'],
    neutral: ['#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb']
  },
  
  gradients: {
    area: {
      primary: [
        { offset: '0%', color: '#6366f1', opacity: 0.4 },
        { offset: '50%', color: '#6366f1', opacity: 0.2 },
        { offset: '100%', color: '#6366f1', opacity: 0 }
      ],
      success: [
        { offset: '0%', color: '#22c55e', opacity: 0.4 },
        { offset: '50%', color: '#22c55e', opacity: 0.2 },
        { offset: '100%', color: '#22c55e', opacity: 0 }
      ]
    }
  },

  tooltip: {
    contentStyle: {
      background: 'rgba(17, 24, 39, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0.5rem',
      padding: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(8px)'
    }
  },

  chartCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '1.5rem',
    padding: '2rem',
    backdropFilter: 'blur(10px)'
  }
}; 