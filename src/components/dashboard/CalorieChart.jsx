// CalorieChart Component - Displays weekly/daily calorie chart
// Will use react-chartjs-2 + chart.js for data visualization

const CalorieChart = () => {
  // TODO: Integrate with Chart.js
  // - Line chart for weekly calorie trend
  // - Bar chart for daily macro breakdown
  return (
    <div className="chart-card" id="calorie-chart">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Calorie Trend</h3>
      </div>
      <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        📈 Chart will render here
      </div>
    </div>
  );
};

export default CalorieChart;
