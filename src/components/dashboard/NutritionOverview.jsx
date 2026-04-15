// NutritionOverview - Doughnut chart for macro ratios (theme-aware)
import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMeals } from '../../context/MealContext';
import useTheme from '../../hooks/useTheme';

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionOverview = ({ customTotals, titleSuffix }) => {
  const { todaysTotals } = useMeals();
  const { isDark } = useTheme();
  
  // Use passed custom totals or default to today's totals
  const totalsToUse = customTotals || todaysTotals;
  const hasData = totalsToUse.protein > 0 || totalsToUse.carbs > 0 || totalsToUse.fat > 0;

  const emptyColor = isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(148, 163, 184, 0.1)';
  const emptyBorder = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.15)';

  const chartData = useMemo(() => ({
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [{
      data: hasData ? [totalsToUse.protein, totalsToUse.carbs, totalsToUse.fat] : [1, 1, 1],
      backgroundColor: hasData
        ? ['rgba(239, 68, 68, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(139, 92, 246, 0.8)']
        : [emptyColor, emptyColor, emptyColor],
      borderColor: hasData ? ['#ef4444', '#3b82f6', '#8b5cf6'] : [emptyBorder, emptyBorder, emptyBorder],
      borderWidth: 2,
      hoverBorderWidth: 3,
      hoverOffset: 8,
    }],
  }), [totalsToUse, hasData, emptyColor, emptyBorder]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 11, family: 'Inter' },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
      tooltip: {
        enabled: hasData,
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#f1f5f9' : '#0f172a',
        bodyColor: isDark ? '#e2e8f0' : '#1e293b',
        borderColor: isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => {
            const total = totalsToUse.protein + totalsToUse.carbs + totalsToUse.fat;
            const pct = total > 0 ? ((ctx.raw / total) * 100).toFixed(1) : 0;
            return `${ctx.label}: ${ctx.raw}g (${pct}%)`;
          },
        },
      },
    },
  };

  const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.save();
      const topY = height / 2 - 12;

      ctx.fillStyle = isDark ? '#f1f5f9' : '#0f172a';
      ctx.font = "bold 22px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(hasData ? `${Math.round(totalsToUse.calories)}` : '0', width / 2, topY);

      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = "500 11px 'Inter', sans-serif";
      ctx.fillText(titleSuffix === undefined ? 'kcal today' : 'kcal', width / 2, topY + 22);
      ctx.restore();
    },
  };

  return (
    <div className="chart-card" id="nutrition-overview">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Macro Split</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{titleSuffix || 'Today'}</span>
      </div>
      <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Doughnut key={isDark ? 'dark' : 'light'} data={chartData} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
};

export default NutritionOverview;
