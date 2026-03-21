// Constants - App-wide constant values

export const APP_NAME = 'NutriVision AI';
export const APP_VERSION = '1.0.0';

// TensorFlow Model Config
export const TF_CONFIG = {
  MODEL_VERSION: 2,
  MODEL_ALPHA: 1.0,
  INPUT_SIZE: 224,
  TOP_K_PREDICTIONS: 5,
};

// Default Daily Goals
export const DEFAULT_GOALS = {
  calories: 2000,
  protein: 50,     // grams
  carbs: 250,      // grams
  fat: 65,         // grams
  fiber: 25,       // grams
  sugar: 50,       // grams
  water: 2000,     // ml
};

// Meal Types
export const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack',
};

// Activity Levels (for calorie goal calculation)
export const ACTIVITY_LEVELS = {
  sedentary: { label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
  light: { label: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
  moderate: { label: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
  active: { label: 'Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' },
  very_active: { label: 'Very Active', multiplier: 1.9, description: 'Very hard exercise & physical job' },
};

// Navigation Links
export const NAV_LINKS = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/upload', label: 'Scan Food', icon: 'Camera' },
  { path: '/history', label: 'History', icon: 'ClipboardList' },
  { path: '/profile', label: 'Profile', icon: 'User' },
];

// Supported Image Types
export const SUPPORTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

// Chart Colors (for Chart.js)
export const CHART_COLORS = {
  calories: { main: '#f59e0b', light: 'rgba(245, 158, 11, 0.2)' },
  protein: { main: '#ef4444', light: 'rgba(239, 68, 68, 0.2)' },
  carbs: { main: '#3b82f6', light: 'rgba(59, 130, 246, 0.2)' },
  fat: { main: '#8b5cf6', light: 'rgba(139, 92, 246, 0.2)' },
  fiber: { main: '#10b981', light: 'rgba(16, 185, 129, 0.2)' },
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  MEALS: 'nutrivision_meals',
  USER: 'nutrivision_user',
  GOALS: 'nutrivision_goals',
  SETTINGS: 'nutrivision_settings',
  THEME: 'nutrivision_theme',
};
