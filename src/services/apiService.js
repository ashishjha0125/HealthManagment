// API Service - Handles communication with the FastAPI backend
// Uses the food_analyzer_v1.pth model via /predict endpoint

const PROD_API_URL = import.meta.env.VITE_API_URL;
const LOCAL_API_URL = window.location.hostname === 'localhost' ? 'http://localhost:8000' : `http://${window.location.hostname}:8000`;
const API_BASE_URL = PROD_API_URL || LOCAL_API_URL;

/**
 * Send food image to backend for AI analysis
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<object>} Prediction result with nutrition data
 */
export const analyzeFoodImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Analysis failed');
    }

    return data;
  } catch (error) {
    // If backend is not running, throw a clear error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Cannot connect to AI server. Please ensure the backend is running: uvicorn main:app --reload'
      );
    }
    throw error;
  }
};

/**
 * Check if the backend API server is healthy
 * @returns {Promise<object>} Health status
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Server not healthy');
    return await response.json();
  } catch {
    return { status: 'Offline' };
  }
};

export default {
  analyzeFoodImage,
  checkApiHealth,
};
