// useCalorieTracker Hook - Manages daily calorie & macro tracking
import { useState, useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

const useCalorieTracker = () => {
  const [meals, setMeals] = useLocalStorage('nutrivision_meals', []);
  const [goals] = useLocalStorage('nutrivision_goals', {
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 65,
  });

  /**
   * Get today's date string for filtering
   */
  const getTodayKey = () => new Date().toISOString().split('T')[0];

  /**
   * Get meals for today only
   */
  const todaysMeals = useMemo(() => {
    const today = getTodayKey();
    return meals.filter((meal) => meal.date === today);
  }, [meals]);

  /**
   * Calculate today's total nutrition
   */
  const todaysTotals = useMemo(() => {
    return todaysMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fat: acc.fat + (meal.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [todaysMeals]);

  /**
   * Add a new meal entry
   */
  const addMeal = useCallback((mealData) => {
    const newMeal = {
      id: Date.now().toString(),
      date: getTodayKey(),
      timestamp: new Date().toLocaleTimeString(),
      ...mealData,
    };
    setMeals((prev) => [newMeal, ...prev]);
    return newMeal;
  }, [setMeals]);

  /**
   * Delete a meal entry by ID
   */
  const deleteMeal = useCallback((mealId) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== mealId));
  }, [setMeals]);

  /**
   * Clear all meals
   */
  const clearAllMeals = useCallback(() => {
    setMeals([]);
  }, [setMeals]);

  /**
   * Get meals for a specific date
   */
  const getMealsByDate = useCallback((date) => {
    return meals.filter((meal) => meal.date === date);
  }, [meals]);

  /**
   * Get meals grouped by date
   */
  const mealsGroupedByDate = useMemo(() => {
    const grouped = {};
    meals.forEach((meal) => {
      if (!grouped[meal.date]) {
        grouped[meal.date] = [];
      }
      grouped[meal.date].push(meal);
    });
    return grouped;
  }, [meals]);

  return {
    meals,
    todaysMeals,
    todaysTotals,
    goals,
    addMeal,
    deleteMeal,
    clearAllMeals,
    getMealsByDate,
    mealsGroupedByDate,
  };
};

export default useCalorieTracker;
