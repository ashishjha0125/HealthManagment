// FoodHistory Component - List of all previously scanned food items with Lucide icons
import { Trash2, UtensilsCrossed, Inbox } from 'lucide-react';
import '../../styles/components/history.css';

const FoodHistory = ({ meals = [], onDelete }) => {
  if (meals.length === 0) {
    return (
      <div className="history-empty" id="food-history-empty">
        <Inbox size={64} className="history-empty__icon" style={{ opacity: 0.3 }} />
        <h3 className="history-empty__title">No Food History Yet</h3>
        <p className="history-empty__text">
          Start scanning your meals to build your nutrition diary. 
          All your data is stored locally on your device.
        </p>
      </div>
    );
  }

  return (
    <div className="history-list" id="food-history">
      {meals.map((meal) => (
        <div className="history-item glass-card" key={meal.id}>
          <div style={{
            width: '42px',
            height: '42px',
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
          <div className="history-item__info">
            <p className="history-item__name">{meal.name}</p>
            <p className="history-item__time">{meal.date} • {meal.timestamp}</p>
          </div>
          <div className="history-item__nutrients">
            <div className="history-item__nutrient">
              <div className="history-item__nutrient-value" style={{ color: 'var(--color-calories)' }}>
                {meal.calories}
              </div>
              <div className="history-item__nutrient-label">kcal</div>
            </div>
            <div className="history-item__nutrient">
              <div className="history-item__nutrient-value" style={{ color: 'var(--color-protein)' }}>
                {meal.protein}g
              </div>
              <div className="history-item__nutrient-label">protein</div>
            </div>
            <div className="history-item__nutrient">
              <div className="history-item__nutrient-value" style={{ color: 'var(--color-carbs)' }}>
                {meal.carbs}g
              </div>
              <div className="history-item__nutrient-label">carbs</div>
            </div>
            <div className="history-item__nutrient">
              <div className="history-item__nutrient-value" style={{ color: 'var(--color-fat)' }}>
                {meal.fat}g
              </div>
              <div className="history-item__nutrient-label">fat</div>
            </div>
          </div>
          {onDelete && (
            <button
              className="history-item__delete"
              title="Delete meal"
              onClick={() => onDelete(meal.id)}
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FoodHistory;
