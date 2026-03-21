// Helpers - Utility functions used across the app

/**
 * Format a number with commas (e.g., 1234 → "1,234")
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  return num.toLocaleString('en-US');
};

/**
 * Format date to readable string
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time to 12-hour format
 * @param {string|Date} date
 * @returns {string}
 */
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get today's date as YYYY-MM-DD
 * @returns {string}
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Calculate percentage (capped at 100%)
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export const calcPercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.min(Math.round((value / total) * 100), 100);
};

/**
 * Get greeting based on time of day
 * @returns {string}
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate a unique ID
 * @returns {string}
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Debounce function
 * @param {Function} func
 * @param {number} wait - milliseconds
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Convert file to data URL
 * @param {File} file
 * @returns {Promise<string>}
 */
export const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor formula
 * @param {object} params - { weight (kg), height (cm), age, gender }
 * @returns {number} BMR in calories
 */
export const calculateBMR = ({ weight, height, age, gender = 'male' }) => {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
};
