import React, { useRef } from 'react';

interface BrushToolProps {
  canvas: HTMLCanvasElement | null;
  onClose: () => void;
}

const BrushTool: React.FC<BrushToolProps> = ({ canvas, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [color, setColor] = React.useState('#000000');
  const [size, setSize] = React.useState(5);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const rect = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="tool-modal">
      <div className="tool-modal-content">
        <h3>Brush Tool</h3>
        <canvas
          ref={canvasRef}
          className="brush-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          width={600}
          height={400}
          style={{ border: '2px solid #667eea', marginBottom: '15px', cursor: 'crosshair' }}
        />
        <div className="brush-controls">
          <div>
            <label>Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div>
            <label>Size: {size}px</label>
            <input
              type="range"
              min="1"
              max="50"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="tool-buttons">
          <button onClick={handleClear} className="btn btn-secondary">
            🗑️ Clear
          </button>
          <button onClick={onClose} className="btn btn-primary">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrushTool;