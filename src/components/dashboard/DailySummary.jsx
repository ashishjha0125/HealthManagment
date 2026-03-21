// DailySummary Component - Shows today's nutrition summary stats
import '../../styles/components/dashboard.css';

const DailySummary = () => {
  // TODO: Connect to MealContext for real data
  const stats = [
    { label: 'Calories', value: '0', goal: '2,000', unit: 'kcal', type: 'calories', percent: 0 },
    { label: 'Protein', value: '0', goal: '50', unit: 'g', type: 'protein', percent: 0 },
    { label: 'Carbs', value: '0', goal: '250', unit: 'g', type: 'carbs', percent: 0 },
    { label: 'Fat', value: '0', goal: '65', unit: 'g', type: 'fat', percent: 0 },
  ];

  return (
    <div className="dashboard-stats" id="daily-summary">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.type}>
          <div className={`stat-card__icon stat-card__icon--${stat.type}`}>
            {stat.type === 'calories' && '🔥'}
            {stat.type === 'protein' && '🥩'}
            {stat.type === 'carbs' && '🍞'}
            {stat.type === 'fat' && '🥑'}
          </div>
          <div className="stat-card__value">
            {stat.value}<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}> {stat.unit}</span>
          </div>
          <div className="stat-card__label">{stat.label} (Goal: {stat.goal})</div>
          <div className="stat-card__progress">
            <div
              className={`stat-card__progress-fill stat-card__progress-fill--${stat.type}`}
              style={{ width: `${stat.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailySummary;
