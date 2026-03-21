// Storage Service - Handles localStorage operations for persistent data
const STORAGE_KEYS = {
  MEALS: 'nutrivision_meals',
  USER_PROFILE: 'nutrivision_user',
  GOALS: 'nutrivision_goals',
  SETTINGS: 'nutrivision_settings',
};

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to store
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to save "${key}":`, error);
    return false;
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} Stored data or default value
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`[Storage] Failed to load "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key to remove
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to remove "${key}":`, error);
    return false;
  }
};

/**
 * Clear all NutriVision data from localStorage
 */
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};

/**
 * Get storage usage info
 * @returns {object} Storage usage details
 */
export const getStorageInfo = () => {
  let totalSize = 0;
  Object.values(STORAGE_KEYS).forEach((key) => {
    const item = localStorage.getItem(key);
    if (item) totalSize += item.length;
  });

  return {
    usedBytes: totalSize * 2, // UTF-16 encoding
    usedKB: ((totalSize * 2) / 1024).toFixed(2),
    keys: STORAGE_KEYS,
  };
};

export { STORAGE_KEYS };
export default {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
  clearAllData,
  getStorageInfo,
  STORAGE_KEYS,
};
