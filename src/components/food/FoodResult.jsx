// FoodResult Component - Displays the AI prediction result for uploaded food

const FoodResult = ({ result = null }) => {
  // TODO: Display TensorFlow classification results
  // - Food name
  // - Confidence score
  // - Estimated calories & macros
  if (!result) return null;

  return (
    <div className="glass-card animate-fadeInUp" id="food-result">
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-heading)' }}>
        🎯 AI Detection Result
      </h3>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-heading)' }}>
            {result?.foodName || 'Unknown Food'}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Confidence: {result?.confidence || '0'}%
          </p>
        </div>
      </div>
      {/* Nutritional breakdown will go here */}
    </div>
  );
};

export default FoodResult;
