// NutritionOverview Component - Pie/doughnut chart for macro ratios

const NutritionOverview = () => {
  // TODO: Integrate with Chart.js Doughnut chart
  return (
    <div className="chart-card" id="nutrition-overview">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Macro Split</h3>
      </div>
      <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        🥧 Macro pie chart will render here
      </div>
    </div>
  );
};

export default NutritionOverview;
