import { useState, useEffect } from 'react';
import { Hand } from 'lucide-react';
import DailySummary from '../components/dashboard/DailySummary';
import CalorieChart from '../components/dashboard/CalorieChart';
import NutritionOverview from '../components/dashboard/NutritionOverview';
import WaterTracker from '../components/dashboard/WaterTracker';
import RecentMeals from '../components/dashboard/RecentMeals';
import '../styles/pages/dashboard.css';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const hour = time.getHours();
  let greeting = "Good Evening!";
  if (hour >= 5 && hour < 12) greeting = "Good Morning!";
  else if (hour >= 12 && hour < 17) greeting = "Good Afternoon!";
  else if (hour >= 21 || hour < 5) greeting = "Good Night!";

  return (
    <div className="page-dashboard" id="page-dashboard">
      <div className="page-dashboard__header">
        <h1 className="page-dashboard__greeting">
          {greeting} <Hand size={28} style={{ display: 'inline', verticalAlign: 'middle', animation: 'wave-hand 2s infinite' }} />
        </h1>
        <p className="page-dashboard__date">
          <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{timeStr}</span> &nbsp;&bull;&nbsp; {dateStr}
        </p>
      </div>

      <DailySummary />
      <WaterTracker />

      <div className="dashboard-charts">
        <CalorieChart />
        <NutritionOverview />
      </div>

      <RecentMeals />
    </div>
  );
};

export default Dashboard;
