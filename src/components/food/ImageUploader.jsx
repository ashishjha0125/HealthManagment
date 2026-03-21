// ImageUploader Component - Drag & drop / click to upload food images
// Uses react-dropzone for file handling
import '../../styles/components/uploader.css';

const ImageUploader = () => {
  // TODO: Integrate react-dropzone
  // TODO: Connect to TensorFlow service for image classification
  return (
    <div className="uploader" id="image-uploader">
      <div className="uploader__dropzone">
        <div className="uploader__icon">📷</div>
        <div className="uploader__text">
          <p className="uploader__title">Drop your food image here</p>
          <p className="uploader__subtitle">
            or <span className="uploader__browse">browse files</span> to upload
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Supports: JPG, PNG, WEBP (max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
