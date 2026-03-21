// CalorieDisplay Component - Shows calorie count with a visual ring/gauge

const CalorieDisplay = ({ consumed = 0, goal = 2000 }) => {
  const percentage = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);

  // TODO: Implement SVG circular progress ring

  return (
    <div className="glass-card" id="calorie-display" style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
        Calories Remaining
      </h3>
      <div style={{ 
        fontSize: '3rem', 
        fontWeight: 700, 
        fontFamily: "'Space Grotesk', sans-serif",
        color: percentage > 90 ? 'var(--color-danger)' : 'var(--color-calories)',
        marginBottom: '0.5rem'
      }}>
        {remaining}
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        {consumed} consumed / {goal} kcal goal
      </p>
      <div style={{ 
        height: '6px', 
        background: 'var(--bg-tertiary)', 
        borderRadius: '999px', 
        marginTop: '1rem',
        overflow: 'hidden'
      }}>
        <div style={{ 
          height: '100%', 
          width: `${percentage}%`,
          background: percentage > 90 ? 'var(--gradient-danger)' : 'var(--gradient-warning)',
          borderRadius: '999px',
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  );
};

export default CalorieDisplay;
