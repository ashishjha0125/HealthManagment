// FoodResult Component - Displays the AI prediction result with nutritional breakdown
import { Flame, Beef, Wheat, Droplets, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import '../../styles/components/food-result.css';

const FoodResult = ({ result = null, onAddMeal }) => {
  if (!result) return null;

  const { prediction, nutrition } = result;
  const confidenceColor =
    prediction.confidence >= 70 ? 'var(--color-success)' :
    prediction.confidence >= 40 ? 'var(--color-warning)' :
    'var(--color-danger)';

  const ConfidenceIcon = prediction.confidence >= 50 ? CheckCircle : AlertTriangle;

  // Format food name: replace underscores with spaces and capitalize
  const formatFoodName = (name) =>
    name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="food-result glass-card animate-fadeInUp" id="food-result">
      {/* Header */}
      <div className="food-result__header">
        <div className="food-result__badge" style={{ background: confidenceColor }}>
          <ConfidenceIcon size={16} />
          <span>{prediction.confidence}% Match</span>
        </div>
        <h3 className="food-result__title">
          🎯 AI Detection Result
        </h3>
      </div>

      {/* Food Name */}
      <div className="food-result__food-name">
        <span className="food-result__label-text">Detected Food</span>
        <h2 className="food-result__name">{formatFoodName(prediction.label)}</h2>
      </div>

      {/* Nutrition Grid */}
      <div className="food-result__nutrition-grid">
        <div className="food-result__nutrient food-result__nutrient--calories">
          <div className="food-result__nutrient-icon">
            <Flame size={20} />
          </div>
          <div className="food-result__nutrient-info">
            <span className="food-result__nutrient-value">{nutrition.calories}</span>
            <span className="food-result__nutrient-label">Calories</span>
          </div>
        </div>

        <div className="food-result__nutrient food-result__nutrient--protein">
          <div className="food-result__nutrient-icon">
            <Beef size={20} />
          </div>
          <div className="food-result__nutrient-info">
            <span className="food-result__nutrient-value">{nutrition.protein}g</span>
            <span className="food-result__nutrient-label">Protein</span>
          </div>
        </div>

        <div className="food-result__nutrient food-result__nutrient--carbs">
          <div className="food-result__nutrient-icon">
            <Wheat size={20} />
          </div>
          <div className="food-result__nutrient-info">
            <span className="food-result__nutrient-value">{nutrition.carbs}g</span>
            <span className="food-result__nutrient-label">Carbs</span>
          </div>
        </div>

        <div className="food-result__nutrient food-result__nutrient--fat">
          <div className="food-result__nutrient-icon">
            <Droplets size={20} />
          </div>
          <div className="food-result__nutrient-info">
            <span className="food-result__nutrient-value">{nutrition.fat}g</span>
            <span className="food-result__nutrient-label">Fat</span>
          </div>
        </div>
      </div>

      {/* Serving info */}
      <p className="food-result__serving">
        📏 Serving size: {nutrition.unit || 'per 100g'}
      </p>

      {/* Confidence bar */}
      <div className="food-result__confidence-section">
        <div className="food-result__confidence-header">
          <span>AI Confidence</span>
          <span style={{ color: confidenceColor, fontWeight: 600 }}>{prediction.confidence}%</span>
        </div>
        <div className="food-result__confidence-bar">
          <div
            className="food-result__confidence-fill"
            style={{
              width: `${prediction.confidence}%`,
              background: confidenceColor,
            }}
          />
        </div>
      </div>

      {/* Add to tracker button */}
      {onAddMeal && (
        <button
          className="btn btn--primary food-result__add-btn"
          onClick={() => onAddMeal({
            name: formatFoodName(prediction.label),
            calories: nutrition.calories,
            protein: nutrition.protein,
            carbs: nutrition.carbs,
            fat: nutrition.fat,
            confidence: prediction.confidence,
          })}
          type="button"
        >
          <Plus size={18} />
          Add to Today's Meals
        </button>
      )}
    </div>
  );
};

export default FoodResult;
