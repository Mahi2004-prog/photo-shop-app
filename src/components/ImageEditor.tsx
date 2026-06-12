import React, { useEffect } from 'react';
import { FilterSettings } from '../types';

interface ImageEditorProps {
  image: string;
  filters: FilterSettings;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image, filters, canvasRef }) => {
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      canvas.width = img.width;
      canvas.height = img.height;

      // Apply CSS filters
      const filterString = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        blur(${filters.blur}px)
        hue-rotate(${filters.hue}deg)
        grayscale(${filters.grayscale}%)
      `;

      ctx.filter = filterString;
      ctx.drawImage(img, 0, 0);
    };
    img.src = image;
  }, [image, filters, canvasRef]);

  return (
    <div className="editor-preview">
      <canvas ref={canvasRef} className="canvas-display" />
    </div>
  );
};

export default ImageEditor;
