// MealContext - Global state for meal/food tracking
import { createContext, useContext } from 'react';
import useCalorieTracker from '../hooks/useCalorieTracker';

const MealContext = createContext(null);

/**
 * MealProvider - Wraps app to provide meal tracking state
 * Provides: meals, todaysMeals, todaysTotals, goals, addMeal, deleteMeal, etc.
 */
export const MealProvider = ({ children }) => {
  const tracker = useCalorieTracker();

  return (
    <MealContext.Provider value={tracker}>
      {children}
    </MealContext.Provider>
  );
};

/**
 * Custom hook to access meal context
 * @returns {object} Meal tracking state and actions
 */
export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealProvider');
  }
  return context;
};

export default MealContext;
