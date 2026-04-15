// Upload Page - Upload food images for AI calorie detection
// Connects ImageUploader → API → FoodResult flow
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import ImageUploader from '../components/food/ImageUploader';
import FoodResult from '../components/food/FoodResult';
import { useMeals } from '../context/MealContext';
import { analyzeFoodImage, checkApiHealth } from '../services/apiService';
import '../styles/pages/upload.css';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking'); // 'online' | 'offline' | 'checking'

  const { addMeal } = useMeals();

  // Check backend status on mount
  useEffect(() => {
    const checkServer = async () => {
      setServerStatus('checking');
      const health = await checkApiHealth();
      setServerStatus(health.status === 'Online' ? 'online' : 'offline');
    };
    checkServer();
  }, []);

  // Handle image selection
  const handleImageSelected = useCallback(
    async (file) => {
      setSelectedFile(file);
      setAnalysisResult(null);
      setError(null);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Auto-analyze
      setIsAnalyzing(true);
      try {
        const result = await analyzeFoodImage(file);
        setAnalysisResult(result);
        toast.success(`Detected: ${result.prediction.label.replace(/_/g, ' ')}`, {
          icon: '🎯',
          style: {
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
          },
        });
      } catch (err) {
        const errorMessage = err.message || 'Failed to analyze image';
        setError(errorMessage);
        toast.error(errorMessage, {
          style: {
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          },
        });
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  // Clear image and results
  const handleClearImage = useCallback(() => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setError(null);
  }, [imagePreview]);

  // Add meal to daily tracker
  const handleAddMeal = useCallback(
    (mealData) => {
      addMeal(mealData);
      toast.success(`${mealData.name} added to today's meals!`, {
        icon: '✅',
        style: {
          background: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        },
      });
    },
    [addMeal]
  );

  // Retry server check
  const handleRetryServer = async () => {
    setServerStatus('checking');
    const health = await checkApiHealth();
    setServerStatus(health.status === 'Online' ? 'online' : 'offline');
  };

  return (
    <div className="page-upload" id="page-upload">
      <div className="page-upload__header">
        <h1 className="page-upload__title">Scan Your Food</h1>
        <p className="page-upload__subtitle">
          Upload a photo of your meal and our AI will instantly detect the food and estimate its calories &amp; nutrients
        </p>

        {/* Server Status Indicator */}
        <div className={`page-upload__server-status page-upload__server-status--${serverStatus}`}>
          {serverStatus === 'online' && (
            <>
              <Wifi size={14} />
              <span>AI Server Online</span>
            </>
          )}
          {serverStatus === 'offline' && (
            <>
              <WifiOff size={14} />
              <span>AI Server Offline</span>
              <button className="page-upload__retry-btn" onClick={handleRetryServer} type="button">
                <RefreshCw size={12} />
              </button>
            </>
          )}
          {serverStatus === 'checking' && (
            <>
              <div className="page-upload__status-dot" />
              <span>Checking server...</span>
            </>
          )}
        </div>
      </div>

      <ImageUploader
        onImageSelected={handleImageSelected}
        onClearImage={handleClearImage}
        isAnalyzing={isAnalyzing}
        preview={imagePreview}
      />

      {/* Error Display */}
      {error && !isAnalyzing && (
        <div className="page-upload__error animate-fadeInUp">
          <p className="page-upload__error-title">⚠️ Analysis Failed</p>
          <p className="page-upload__error-msg">{error}</p>
          {serverStatus === 'offline' && (
            <div className="page-upload__error-help">
              <p><strong>To start the AI server, run:</strong></p>
              <code>uvicorn main:app --reload</code>
            </div>
          )}
          <button
            className="btn btn--secondary"
            onClick={() => selectedFile && handleImageSelected(selectedFile)}
            type="button"
            style={{ marginTop: '1rem' }}
          >
            <RefreshCw size={14} />
            Retry Analysis
          </button>
        </div>
      )}

      <FoodResult result={analysisResult} onAddMeal={handleAddMeal} />
    </div>
  );
};

export default Upload;
