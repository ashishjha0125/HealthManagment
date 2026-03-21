// History Page - View all food scan history
import FoodHistory from '../components/food/FoodHistory';
import '../styles/pages/history.css';

const History = () => {
  // TODO: Get meals from MealContext
  const meals = [];

  return (
    <div className="page-history" id="page-history">
      <div className="page-history__header">
        <h1 className="page-history__title">Food History</h1>
        <div className="page-history__filters">
          <button className="page-history__filter-btn page-history__filter-btn--active">Today</button>
          <button className="page-history__filter-btn">This Week</button>
          <button className="page-history__filter-btn">This Month</button>
          <button className="page-history__filter-btn">All Time</button>
        </div>
      </div>

      <FoodHistory meals={meals} />
    </div>
  );
};

export default History;
