// RecentMeals Component - Shows list of recently scanned meals

const RecentMeals = () => {
  // TODO: Connect to MealContext
  return (
    <div className="glass-card" id="recent-meals">
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-heading)' }}>
        Recent Meals
      </h3>
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</p>
        <p>No meals scanned yet</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Upload a food image to get started!</p>
      </div>
    </div>
  );
};

export default RecentMeals;
