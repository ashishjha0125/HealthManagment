// GoalSettings Component - Set daily calorie and macro goals

const GoalSettings = () => {
  // TODO: Connect to UserContext for goal management
  return (
    <div className="glass-card" id="goal-settings">
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-heading)' }}>
        🎯 Daily Goals
      </h3>
      {/* Goal input fields will be implemented here */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Set your daily calorie and macro goals here.
      </p>
    </div>
  );
};

export default GoalSettings;
