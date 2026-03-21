// FoodHistory Component - List of all previously scanned food items
import '../../styles/components/history.css';

const FoodHistory = ({ meals = [] }) => {
  // TODO: Connect to MealContext for real meal data

  if (meals.length === 0) {
    return (
      <div className="history-empty" id="food-history-empty">
        <div className="history-empty__icon">📭</div>
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
      {meals.map((meal, index) => (
        <div className="history-item" key={index}>
          <img
            className="history-item__image"
            src={meal.imageUrl}
            alt={meal.name}
          />
          <div className="history-item__info">
            <p className="history-item__name">{meal.name}</p>
            <p className="history-item__time">{meal.timestamp}</p>
          </div>
          <div className="history-item__nutrients">
            <div className="history-item__nutrient">
              <div className="history-item__nutrient-value">{meal.calories}</div>
              <div className="history-item__nutrient-label">kcal</div>
            </div>
            <div className="history-item__nutrient">
              <div className="history-item__nutrient-value">{meal.protein}g</div>
              <div className="history-item__nutrient-label">protein</div>
            </div>
            <div className="history-item__nutrient">
              <div className="history-item__nutrient-value">{meal.carbs}g</div>
              <div className="history-item__nutrient-label">carbs</div>
            </div>
          </div>
          <button className="history-item__delete" title="Delete meal">
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default FoodHistory;
