// History Page - View all food scan history
import { useState } from 'react';
import { useMeals } from '../context/MealContext';
import { Calendar } from 'lucide-react';
import FoodHistory from '../components/food/FoodHistory';
import NutritionOverview from '../components/dashboard/NutritionOverview';
import '../styles/pages/history.css';

const History = () => {
  const { meals, todaysMeals, mealsGroupedByDate, deleteMeal } = useMeals();
  const now = new Date();
  const [filter, setFilter] = useState('today');
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split('T')[0]);

  const getFilteredMeals = () => {
    switch (filter) {
      case 'today':
        return todaysMeals;
      case 'calendar':
        return meals.filter((m) => m.date === selectedDate);
      case 'week': {
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekKey = weekAgo.toISOString().split('T')[0];
        return meals.filter((m) => m.date >= weekKey);
      }
      case 'month': {
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        const monthKey = monthAgo.toISOString().split('T')[0];
        return meals.filter((m) => m.date >= monthKey);
      }
      case 'all':
      default:
        return meals;
    }
  };

  const filteredMeals = getFilteredMeals();

  // Calculate stats for calendar view specifically
  const dayStats = filteredMeals.reduce(
    (acc, m) => {
      acc.calories += m.calories || 0;
      acc.protein += m.protein || 0;
      acc.carbs += m.carbs || 0;
      acc.fat += m.fat || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="page-history" id="page-history">
      <div className="page-history__header">
        <h1 className="page-history__title">Food History</h1>
        <div className="page-history__filters">
          {[
            { key: 'today', label: 'Today' },
            { key: 'calendar', label: 'Calendar' },
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' },
          ].map((f) => (
            <button
              key={f.key}
              className={`page-history__filter-btn ${filter === f.key ? 'page-history__filter-btn--active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.key === 'calendar' && <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {(filter === 'calendar' || filter === 'today') && (
        <div className="history-calendar-controls glass-card" style={{ marginBottom: '2rem', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
          {filter === 'calendar' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Date</label>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="page-profile__input"
                style={{ width: 'auto', padding: '0.5rem 1rem' }}
              />
            </div>
          )}
          
          <div className="history-day-stats" style={{ display: 'flex', gap: '1.5rem', flex: 1, justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Total Calories</p>
              <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 700 }}>{Math.round(dayStats.calories)}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ef4444', fontSize: '0.8rem', textTransform: 'uppercase' }}>Protein</p>
              <p style={{ color: 'var(--text-heading)', fontSize: '1.2rem', fontWeight: 600 }}>{Math.round(dayStats.protein)}g</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#3b82f6', fontSize: '0.8rem', textTransform: 'uppercase' }}>Carbs</p>
              <p style={{ color: 'var(--text-heading)', fontSize: '1.2rem', fontWeight: 600 }}>{Math.round(dayStats.carbs)}g</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#8b5cf6', fontSize: '0.8rem', textTransform: 'uppercase' }}>Fat</p>
              <p style={{ color: 'var(--text-heading)', fontSize: '1.2rem', fontWeight: 600 }}>{Math.round(dayStats.fat)}g</p>
            </div>
          </div>
          
          <div style={{ width: '100%', marginTop: '1rem' }}>
            <NutritionOverview customTotals={dayStats} titleSuffix={filter === 'today' ? 'Today' : selectedDate} />
          </div>
        </div>
      )}

      <FoodHistory meals={filteredMeals} onDelete={deleteMeal} />
    </div>
  );
};

export default History;
