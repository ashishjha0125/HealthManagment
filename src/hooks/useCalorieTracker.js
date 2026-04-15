// useCalorieTracker Hook - Manages daily calorie tracking synced with Supabase
import { useState, useCallback, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

const useCalorieTracker = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);
  
  // Cloud synced goals, fallback to defaults
  const goals = user?.targets || {
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 65,
    water: 8,
  };

  // Fetch meals from Supabase
  const fetchMeals = useCallback(async () => {
    if (!user) {
      setMeals([]);
      setLoadingMeals(false);
      return;
    }
    
    setLoadingMeals(true);
    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setMeals(data || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
      toast.error("Failed to load your meals data.");
    } finally {
      setLoadingMeals(false);
    }
  }, [user]);

  // Initial Sync
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const getTodayKey = () => new Date().toISOString().split('T')[0];

  const todaysMeals = useMemo(() => {
    const today = getTodayKey();
    return meals.filter((meal) => meal.date === today);
  }, [meals]);

  const todaysTotals = useMemo(() => {
    return todaysMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + (Number(meal.calories) || 0),
        protein: acc.protein + (Number(meal.protein) || 0),
        carbs: acc.carbs + (Number(meal.carbs) || 0),
        fat: acc.fat + (Number(meal.fat) || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [todaysMeals]);

  const addMeal = useCallback(async (mealData) => {
    if (!user) {
      toast.error("Please login to save meals.");
      return;
    }

    const newMealPayload = {
      user_id: user.id, // Enforce row level security limits
      date: getTodayKey(),
      timestamp: new Date().toLocaleTimeString(),
      name: mealData.name,
      calories: mealData.calories,
      protein: mealData.protein,
      carbs: mealData.carbs,
      fat: mealData.fat,
      image_url: mealData.image_url || null
    };

    // Optimistic UI Update
    const optimisticMeal = { ...newMealPayload, id: Date.now().toString(), optimistic: true };
    setMeals((prev) => [optimisticMeal, ...prev]);

    try {
      const { data, error } = await supabase
        .from('meals')
        .insert([newMealPayload])
        .select()
        .single();
        
      if (error) throw error;
      
      // Update with exact data from db (replaces optimistic ID)
      setMeals((prev) => prev.map(m => m.id === optimisticMeal.id ? data : m));
      return data;
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error("Cloud Error: Could not save meal.");
      // Revert optimistic insert
      setMeals((prev) => prev.filter(m => m.id !== optimisticMeal.id));
    }
  }, [user]);


  const deleteMeal = useCallback(async (mealId) => {
    if (!user) return;

    // Optimistic removal
    const backupMeals = [...meals];
    setMeals((prev) => prev.filter((meal) => meal.id !== mealId));

    try {
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('id', mealId)
        .eq('user_id', user.id); // extra safety filter

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Failed to delete meal.");
      setMeals(backupMeals); // Restore on fail
    }
  }, [user, meals]);

  const clearAllMeals = useCallback(async () => {
    if (!user) return;
    
    // In actual production apps you rarely allow a drop everything, but we will add it for demo parity.
    try {
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('user_id', user.id);
        
      if (error) throw error;
      setMeals([]);
      toast.success("History Reset");
    } catch (error) {
      console.error("Clear array error:", error);
      toast.error("Failed to reset history.");
    }
  }, [user]);

  const getMealsByDate = useCallback((date) => {
    return meals.filter((meal) => meal.date === date);
  }, [meals]);

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
    loadingMeals,
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
