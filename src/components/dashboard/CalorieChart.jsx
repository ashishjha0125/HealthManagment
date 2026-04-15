// CalorieChart Component - Day-wise calorie trend for the current month
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useMeals } from '../../context/MealContext';
import useTheme from '../../hooks/useTheme';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CalorieChart = () => {
  const { meals, goals } = useMeals();
  const { isDark } = useTheme();

  const chartData = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = now.getDate();

    const labels = [];
    const caloriesByDay = [];
    const goalLine = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      labels.push(day);
      const dayCalories = meals
        .filter((m) => m.date === dateStr)
        .reduce((sum, m) => sum + (m.calories || 0), 0);
      caloriesByDay.push(day <= today ? dayCalories : null);
      goalLine.push(goals.calories);
    }

    const accentColor = isDark ? '#a78bfa' : '#7c3aed';
    const areaFill = isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.08)';

    return {
      labels,
      datasets: [
        {
          label: 'Calories',
          data: caloriesByDay,
          borderColor: accentColor,
          backgroundColor: areaFill,
          borderWidth: 2.5,
          pointBackgroundColor: accentColor,
          pointBorderColor: isDark ? '#1e293b' : '#fff',
          pointBorderWidth: 2,
          pointRadius: (ctx) => {
            const val = ctx.dataset.data[ctx.dataIndex];
            return val && val > 0 ? 4 : 2;
          },
          pointHoverRadius: 6,
          tension: 0.35,
          fill: true,
          spanGaps: false,
        },
        {
          label: 'Goal',
          data: goalLine,
          borderColor: isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(245, 158, 11, 0.5)',
          borderWidth: 1.5,
          borderDash: [6, 4],
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
        },
      ],
    };
  }, [meals, goals, isDark]);

  const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const gridColor = isDark ? 'rgba(148, 163, 184, 0.07)' : 'rgba(148, 163, 184, 0.12)';
  const tickColor = isDark ? '#94a3b8' : '#64748b';
  const legendColor = isDark ? '#94a3b8' : '#64748b';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: { color: legendColor, font: { size: 11, family: 'Inter' }, boxWidth: 12, boxHeight: 2, padding: 15 },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#f1f5f9' : '#0f172a',
        bodyColor: isDark ? '#e2e8f0' : '#1e293b',
        borderColor: isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        titleFont: { family: 'Space Grotesk', weight: '600' },
        bodyFont: { family: 'Inter' },
        callbacks: {
          title: (items) => `Day ${items[0].label}`,
          label: (item) => {
            if (item.dataset.label === 'Goal') return `Goal: ${item.raw} kcal`;
            return item.raw !== null ? `Consumed: ${item.raw} kcal` : 'No data';
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor, drawBorder: false },
        ticks: { color: tickColor, font: { size: 10, family: 'Inter' }, maxTicksLimit: 15 },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: gridColor, drawBorder: false },
        ticks: {
          color: tickColor,
          font: { size: 10, family: 'Inter' },
          callback: (val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val,
        },
        border: { display: false },
      },
    },
  };

  return (
    <div className="chart-card" id="calorie-chart">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Calorie Trend</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{monthName}</span>
      </div>
      <div style={{ height: '260px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CalorieChart;
