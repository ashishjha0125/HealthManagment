// Calorie Service - Maps food classifications to calorie/nutrition data
import { FOOD_DATABASE } from '../utils/foodDatabase';

/**
 * Look up nutritional info for a detected food item
 * @param {string} foodName - Name of the detected food (from MobileNet)
 * @returns {object|null} Nutritional information
 */
export const getNutritionInfo = (foodName) => {
  if (!foodName) return null;

  const normalizedName = foodName.toLowerCase().trim();

  // Exact match
  if (FOOD_DATABASE[normalizedName]) {
    return { ...FOOD_DATABASE[normalizedName], name: normalizedName };
  }

  // Partial match - search for keywords
  const matchedKey = Object.keys(FOOD_DATABASE).find((key) =>
    normalizedName.includes(key) || key.includes(normalizedName)
  );

  if (matchedKey) {
    return { ...FOOD_DATABASE[matchedKey], name: matchedKey };
  }

  // Default estimate if no match found
  return {
    name: foodName,
    calories: 200,
    protein: 8,
    carbs: 25,
    fat: 8,
    fiber: 2,
    serving: '1 serving (estimated)',
    note: 'Estimated values - food not found in database',
  };
};

/**
 * Calculate total nutrition from multiple food items
 * @param {Array} foodItems - Array of food items with nutrition data
 * @returns {object} Combined nutritional totals
 */
export const calculateTotalNutrition = (foodItems) => {
  return foodItems.reduce(
    (totals, item) => ({
      calories: totals.calories + (item.calories || 0),
      protein: totals.protein + (item.protein || 0),
      carbs: totals.carbs + (item.carbs || 0),
      fat: totals.fat + (item.fat || 0),
      fiber: totals.fiber + (item.fiber || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
};

/**
 * Get the best matching food name from MobileNet predictions
 * MobileNet returns ImageNet class names, this maps them to food names
 * @param {Array} predictions - MobileNet prediction results
 * @returns {object} Best food match with confidence
 */
export const getBestFoodMatch = (predictions) => {
  if (!predictions || predictions.length === 0) return null;

  // Filter for food-related predictions
  const foodPrediction = predictions[0]; // Highest confidence prediction

  return {
    foodName: foodPrediction.className,
    confidence: (foodPrediction.probability * 100).toFixed(1),
    allPredictions: predictions.map((p) => ({
      name: p.className,
      confidence: (p.probability * 100).toFixed(1),
    })),
  };
};

export default {
  getNutritionInfo,
  calculateTotalNutrition,
  getBestFoodMatch,
};
