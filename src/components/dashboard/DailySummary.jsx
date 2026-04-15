// DailySummary Component - Shows today's nutrition summary stats with Lucide icons
import { Flame, Beef, Wheat, Droplets } from 'lucide-react';
import { useMeals } from '../../context/MealContext';
import '../../styles/components/dashboard.css';

const DailySummary = () => {
  const { todaysTotals, goals } = useMeals();

  const stats = [
    {
      label: 'Calories',
      value: todaysTotals.calories,
      goal: goals.calories,
      unit: 'kcal',
      type: 'calories',
      percent: Math.min((todaysTotals.calories / goals.calories) * 100, 100),
      icon: Flame,
    },
    {
      label: 'Protein',
      value: todaysTotals.protein,
      goal: goals.protein,
      unit: 'g',
      type: 'protein',
      percent: Math.min((todaysTotals.protein / goals.protein) * 100, 100),
      icon: Beef,
    },
    {
      label: 'Carbs',
      value: todaysTotals.carbs,
      goal: goals.carbs,
      unit: 'g',
      type: 'carbs',
      percent: Math.min((todaysTotals.carbs / goals.carbs) * 100, 100),
      icon: Wheat,
    },
    {
      label: 'Fat',
      value: todaysTotals.fat,
      goal: goals.fat,
      unit: 'g',
      type: 'fat',
      percent: Math.min((todaysTotals.fat / goals.fat) * 100, 100),
      icon: Droplets,
    },
  ];

  return (
    <div className="dashboard-stats" id="daily-summary">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div className="stat-card" key={stat.type}>
            <div className={`stat-card__icon stat-card__icon--${stat.type}`}>
              <Icon size={20} />
            </div>
            <div className="stat-card__value">
              {Math.round(stat.value)}<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}> {stat.unit}</span>
            </div>
            <div className="stat-card__label">{stat.label} (Goal: {stat.goal})</div>
            <div className="stat-card__progress">
              <div
                className={`stat-card__progress-fill stat-card__progress-fill--${stat.type}`}
                style={{ width: `${stat.percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailySummary;
