// RecentMeals Component - Shows list of recently scanned meals with Lucide icons
import { useMeals } from '../../context/MealContext';
import { Trash2, UtensilsCrossed, Clock } from 'lucide-react';

const RecentMeals = () => {
  const { todaysMeals, deleteMeal } = useMeals();

  return (
    <div className="glass-card" id="recent-meals">
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-heading)' }}>
        Recent Meals
      </h3>

      {todaysMeals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          <UtensilsCrossed size={40} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
          <p>No meals scanned yet</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Upload a food image to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {todaysMeals.map((meal) => (
            <div
              key={meal.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--accent-primary)',
                }}>
                  <UtensilsCrossed size={18} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.9rem' }}>
                    {meal.name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} /> {meal.timestamp}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-calories)', fontSize: '0.95rem' }}>
                    {meal.calories}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '3px' }}>kcal</span>
                </div>
                <button
                  onClick={() => deleteMeal(meal.id)}
                  title="Delete meal"
                  style={{
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentMeals;
