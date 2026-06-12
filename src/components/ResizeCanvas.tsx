import React, { useState } from 'react';

interface ResizeCanvasProps {
  currentWidth: number;
  currentHeight: number;
  onResize: (width: number, height: number) => void;
  onCancel: () => void;
}

const ResizeCanvas: React.FC<ResizeCanvasProps> = ({
  currentWidth,
  currentHeight,
  onResize,
  onCancel,
}) => {
  const [width, setWidth] = useState(currentWidth);
  const [height, setHeight] = useState(currentHeight);
  const [ratio, setRatio] = useState(true);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (ratio) {
      setHeight(Math.round((newWidth / currentWidth) * currentHeight));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (ratio) {
      setWidth(Math.round((newHeight / currentHeight) * currentWidth));
    }
  };

  return (
    <div className="tool-modal">
      <div className="tool-modal-content">
        <h3>Resize Canvas</h3>
        <div className="resize-inputs">
          <div className="input-group">
            <label>Width (px):</label>
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}
              min="50"
            />
          </div>
          <div className="input-group">
            <label>Height (px):</label>
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
              min="50"
            />
          </div>
          <label className="ratio-lock">
            <input
              type="checkbox"
              checked={ratio}
              onChange={(e) => setRatio(e.target.checked)}
            />
            Lock Aspect Ratio
          </label>
        </div>
        <div className="tool-buttons">
          <button
            onClick={() => onResize(width, height)}
            className="btn btn-primary"
          >
            📐 Resize
          </button>
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResizeCanvas;