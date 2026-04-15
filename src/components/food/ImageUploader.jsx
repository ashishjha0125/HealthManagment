// ImageUploader Component - Drag & drop / click to upload food images
// Uses react-dropzone for file handling, sends to FastAPI backend
import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, Sparkles, AlertCircle, Camera } from 'lucide-react';
import '../../styles/components/uploader.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

const ImageUploader = ({ onImageSelected, onClearImage, isAnalyzing = false, preview = null }) => {
  const [dragError, setDragError] = useState(null);
  const cameraInputRef = useRef(null);

  const handleCameraCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setDragError(null);

      if (rejectedFiles.length > 0) {
        const err = rejectedFiles[0].errors[0];
        if (err.code === 'file-too-large') {
          setDragError('File is too large. Maximum size is 10MB.');
        } else if (err.code === 'file-invalid-type') {
          setDragError('Invalid file type. Use JPG, PNG, or WEBP.');
        } else {
          setDragError(err.message);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onImageSelected(acceptedFiles[0]);
      }
    },
    [onImageSelected]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled: isAnalyzing,
  });

  return (
    <div className="uploader" id="image-uploader">
      {!preview ? (
        <>
          <div
            {...getRootProps()}
            className={`uploader__dropzone ${isDragActive ? 'uploader__dropzone--active' : ''} ${isDragReject ? 'uploader__dropzone--reject' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="uploader__icon-wrapper">
              {isDragActive ? (
                <Sparkles size={48} className="uploader__lucide-icon uploader__lucide-icon--active" />
              ) : (
                <Upload size={48} className="uploader__lucide-icon" />
              )}
            </div>
            <div className="uploader__text">
              <p className="uploader__title">
                {isDragActive ? 'Drop it here!' : 'Drop your food image here'}
              </p>
              <p className="uploader__subtitle">
                or <span className="uploader__browse">browse files</span> to upload
              </p>
              <p className="uploader__hint">
                Supports: JPG, PNG, WEBP (max 10MB)
              </p>
            </div>
          </div>

          <div className="mobile-only uploader__camera-wrapper">
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              ref={cameraInputRef} 
              onChange={handleCameraCapture} 
              style={{ display: 'none' }} 
            />
            <button 
              type="button" 
              className="btn btn--secondary uploader__camera-btn" 
              onClick={() => cameraInputRef.current?.click()}
              disabled={isAnalyzing}
            >
              <Camera size={18} /> Click Image via Camera
            </button>
          </div>

          {dragError && (
            <div className="uploader__error animate-fadeIn">
              <AlertCircle size={16} />
              <span>{dragError}</span>
            </div>
          )}
        </>
      ) : (
        <div className="uploader__preview-container animate-fadeInUp">
          <div className="uploader__preview">
            <img
              src={preview}
              alt="Food preview"
              className="uploader__preview-img"
            />
            <div className="uploader__preview-overlay">
              <ImageIcon size={16} style={{ color: '#fff', marginRight: '0.5rem' }} />
              <span className="uploader__preview-name">Uploaded Image</span>
            </div>
          </div>

          {isAnalyzing ? (
            <div className="uploader__analyzing">
              <div className="uploader__spinner" />
              <p className="uploader__analyzing-text">
                🧠 AI is analyzing your food...
              </p>
              <p className="uploader__analyzing-subtext">
                Identifying food and calculating nutrition
              </p>
            </div>
          ) : (
            <div className="uploader__actions">
              <button
                className="btn btn--secondary"
                onClick={onClearImage}
                type="button"
              >
                <X size={16} />
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
