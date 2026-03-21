// UserContext - Global state for user profile and settings
import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext(null);

const DEFAULT_USER = {
  name: 'User',
  email: '',
  age: null,
  weight: null,
  height: null,
  activityLevel: 'moderate', // sedentary, light, moderate, active, very_active
  goals: {
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 65,
  },
};

/**
 * UserProvider - Wraps app to provide user profile state
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('nutrivision_user', DEFAULT_USER);

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const updateGoals = (goalUpdates) => {
    setUser((prev) => ({
      ...prev,
      goals: { ...prev.goals, ...goalUpdates },
    }));
  };

  const resetUser = () => {
    setUser(DEFAULT_USER);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, updateGoals, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to access user context
 * @returns {object} User state and actions
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
