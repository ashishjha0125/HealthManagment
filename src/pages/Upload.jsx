// Upload Page - Upload food images for AI calorie detection
import ImageUploader from '../components/food/ImageUploader';
import FoodResult from '../components/food/FoodResult';
import '../styles/pages/upload.css';

const Upload = () => {
  // TODO: Manage upload state, connect to TensorFlow service
  return (
    <div className="page-upload" id="page-upload">
      <div className="page-upload__header">
        <h1 className="page-upload__title">Scan Your Food</h1>
        <p className="page-upload__subtitle">
          Upload a photo of your meal and our AI will instantly detect the food and estimate its calories & nutrients
        </p>
      </div>

      <ImageUploader />
      <FoodResult result={null} />
    </div>
  );
};

export default Upload;
