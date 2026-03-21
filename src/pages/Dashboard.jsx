// Dashboard Page - Main overview with stats, charts, and recent meals
import DailySummary from '../components/dashboard/DailySummary';
import CalorieChart from '../components/dashboard/CalorieChart';
import NutritionOverview from '../components/dashboard/NutritionOverview';
import RecentMeals from '../components/dashboard/RecentMeals';
import '../styles/pages/dashboard.css';

const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="page-dashboard" id="page-dashboard">
      <div className="page-dashboard__header">
        <h1 className="page-dashboard__greeting">Good Morning! 👋</h1>
        <p className="page-dashboard__date">{today}</p>
      </div>

      <DailySummary />

      <div className="dashboard-charts">
        <CalorieChart />
        <NutritionOverview />
      </div>

      <RecentMeals />
    </div>
  );
};

export default Dashboard;
