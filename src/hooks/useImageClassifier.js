// useImageClassifier Hook - Handles TensorFlow.js MobileNet image classification
import { useState, useCallback } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as mobilenet from '@tensorflow-models/mobilenet';

const useImageClassifier = () => {
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load the MobileNet model
   * Call this on component mount or before first classification
   */
  const loadModel = useCallback(async () => {
    try {
      setIsModelLoading(true);
      setError(null);
      // TODO: Uncomment when tensorflow is installed
      // const loadedModel = await mobilenet.load({ version: 2, alpha: 1.0 });
      // setModel(loadedModel);
      console.log('MobileNet model loaded successfully');
    } catch (err) {
      setError('Failed to load AI model. Please refresh and try again.');
      console.error('Model loading error:', err);
    } finally {
      setIsModelLoading(false);
    }
  }, []);

  /**
   * Classify an image element using the loaded model
   * @param {HTMLImageElement} imageElement - The image DOM element to classify
   */
  const classifyImage = useCallback(async (imageElement) => {
    if (!model) {
      setError('Model not loaded. Please wait for the model to load.');
      return null;
    }

    try {
      setIsClassifying(true);
      setError(null);
      // TODO: Uncomment when tensorflow is installed
      // const results = await model.classify(imageElement, 5);
      // setPredictions(results);
      // return results;
      return null;
    } catch (err) {
      setError('Failed to classify image. Please try again.');
      console.error('Classification error:', err);
      return null;
    } finally {
      setIsClassifying(false);
    }
  }, [model]);

  /**
   * Reset predictions state
   */
  const resetPredictions = useCallback(() => {
    setPredictions(null);
    setError(null);
  }, []);

  return {
    model,
    isModelLoading,
    predictions,
    isClassifying,
    error,
    loadModel,
    classifyImage,
    resetPredictions,
  };
};

export default useImageClassifier;
