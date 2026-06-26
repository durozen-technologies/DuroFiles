import React, { useRef } from 'react';

interface Props {
  src: string;
  onChange: (newSrc: string) => void;
  className?: string;
  style?: React.CSSProperties;
  fallbackText?: string;
}

import { compressImage } from '../utils/imageCompression';

export const EditableImage: React.FC<Props> = ({ src, onChange, className, style, fallbackText = "Upload Logo" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file);
        onChange(compressedBase64);
      } catch (error) {
        console.error('Image compression failed', error);
      }
    }
  };

  return (
    <div 
      className={`editable-image ${className || ''} ${!src ? 'print-hidden' : ''}`}
      style={{ 
        position: 'relative', 
        cursor: 'pointer', 
        display: 'inline-block',
        minWidth: '100px',
        minHeight: '40px',
        border: src ? '1px dashed transparent' : '1px dashed var(--border-color)',
        borderRadius: '4px',
        ...style 
      }}
      onClick={handleClick}
      title="Click to change image"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />
      {src ? (
        <img src={src} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          {fallbackText}
        </div>
      )}
    </div>
  );
};
