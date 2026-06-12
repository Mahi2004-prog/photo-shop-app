import React, { useEffect } from 'react';
import { FilterSettings } from '../types';

interface ImageEditorProps {
  image: string;
  filters: FilterSettings;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  rotation?: number;
  onImageDataUpdate?: (imageData: ImageData) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  image,
  filters,
  canvasRef,
  rotation = 0,
  onImageDataUpdate,
}) => {
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      // Handle rotation
      let width = img.width;
      let height = img.height;

      if (Math.abs(rotation) === 90 || Math.abs(rotation) === 270) {
        [width, height] = [height, width];
      }

      canvas.width = width;
      canvas.height = height;

      // Save context state
      ctx.save();

      // Translate to center and rotate
      if (rotation !== 0) {
        ctx.translate(width / 2, height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else {
        ctx.drawImage(img, 0, 0);
      }

      // Restore context state
      ctx.restore();

      // Apply filters
      const filterString = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        blur(${filters.blur}px)
        hue-rotate(${filters.hue}deg)
        grayscale(${filters.grayscale}%)
        brightness(${filters.lightness > 0 ? 100 + filters.lightness : 100 + filters.lightness}%)
      `;

      const filterCanvas = document.createElement('canvas');
      filterCanvas.width = canvas.width;
      filterCanvas.height = canvas.height;
      const filterCtx = filterCanvas.getContext('2d')!;

      filterCtx.filter = filterString;
      filterCtx.drawImage(canvas, 0, 0);

      // Copy filtered image back to main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(filterCanvas, 0, 0);

      // Update histogram
      if (onImageDataUpdate) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        onImageDataUpdate(imageData);
      }
    };
    img.src = image;
  }, [image, filters, canvasRef, rotation, onImageDataUpdate]);

  return (
    <div className="editor-preview">
      <canvas ref={canvasRef} className="canvas-display" />
    </div>
  );
};

export default ImageEditor;
