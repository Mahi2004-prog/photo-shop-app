import React, { useRef, useState } from 'react';

interface CropToolProps {
  image: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}

const CropTool: React.FC<CropToolProps> = ({ image, onCrop, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);

  const handleCrop = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const cropCanvas = document.createElement('canvas');
      cropCanvas.width = cropData.width;
      cropCanvas.height = cropData.height;
      const cropCtx = cropCanvas.getContext('2d');
      if (cropCtx) {
        cropCtx.drawImage(
          img,
          cropData.x,
          cropData.y,
          cropData.width,
          cropData.height,
          0,
          0,
          cropData.width,
          cropData.height
        );
        onCrop(cropCanvas.toDataURL());
      }
    };
    img.src = image;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    setCropData({
      ...cropData,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const newWidth = Math.max(50, e.clientX - rect.left - cropData.x);
    const newHeight = Math.max(50, e.clientY - rect.top - cropData.y);
    setCropData({ ...cropData, width: newWidth, height: newHeight });
  };

  return (
    <div className="tool-modal">
      <div className="tool-modal-content">
        <h3>Crop Image</h3>
        <canvas
          ref={canvasRef}
          className="crop-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          style={{
            cursor: 'crosshair',
            border: '2px solid #667eea',
            marginBottom: '15px',
          }}
        />
        <div className="crop-info">
          <p>Width: {cropData.width}px | Height: {cropData.height}px</p>
        </div>
        <div className="tool-buttons">
          <button onClick={handleCrop} className="btn btn-primary">✂️ Crop</button>
          <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CropTool;
