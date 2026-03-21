// TensorFlow Service - Handles model loading and food image classification
// Uses TensorFlow.js with MobileNet pre-trained model

/**
 * Service for TensorFlow.js operations
 * - Load MobileNet model
 * - Classify food images
 * - Map predictions to food names
 */

// Model instance (singleton)
let modelInstance = null;

/**
 * Load the MobileNet model (lazy singleton)
 * @returns {Promise<object>} Loaded model
 */
export const loadModel = async () => {
  if (modelInstance) return modelInstance;

  try {
    // TODO: Uncomment after npm install
    // const tf = await import('@tensorflow/tfjs');
    // const mobilenet = await import('@tensorflow-models/mobilenet');
    // modelInstance = await mobilenet.load({ version: 2, alpha: 1.0 });
    console.log('[TF Service] MobileNet model loaded');
    return modelInstance;
  } catch (error) {
    console.error('[TF Service] Failed to load model:', error);
    throw error;
  }
};

/**
 * Classify a food image
 * @param {HTMLImageElement} imageElement - Image element to classify
 * @param {number} topK - Number of top predictions to return
 * @returns {Promise<Array>} Array of predictions with className and probability
 */
export const classifyFood = async (imageElement, topK = 5) => {
  const model = await loadModel();
  if (!model) throw new Error('Model not available');

  // const predictions = await model.classify(imageElement, topK);
  // return predictions;
  return [];
};

/**
 * Preprocess image for TensorFlow input
 * @param {File} file - Image file
 * @returns {Promise<HTMLImageElement>} Processed image element
 */
export const preprocessImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Check if TensorFlow.js WebGL backend is available
 * @returns {Promise<boolean>}
 */
export const checkGPUSupport = async () => {
  try {
    // const tf = await import('@tensorflow/tfjs');
    // await tf.setBackend('webgl');
    // await tf.ready();
    // return tf.getBackend() === 'webgl';
    return false;
  } catch {
    return false;
  }
};

export default {
  loadModel,
  classifyFood,
  preprocessImage,
  checkGPUSupport,
};
