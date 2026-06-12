import React from 'react';

interface RotateToolProps {
  onRotate: (angle: number) => void;
}

const RotateTool: React.FC<RotateToolProps> = ({ onRotate }) => {
  return (
    <div className="tool-buttons-horizontal">
      <button onClick={() => onRotate(-90)} className="btn btn-secondary" title="Rotate Left">
        ↶ 90°
      </button>
      <button onClick={() => onRotate(90)} className="btn btn-secondary" title="Rotate Right">
        ↷ 90°
      </button>
      <button onClick={() => onRotate(180)} className="btn btn-secondary" title="Rotate 180°">
        ↻ 180°
      </button>
      <button onClick={() => onRotate(-180)} className="btn btn-secondary" title="Flip Horizontal">
        ↔ Flip
      </button>
    </div>
  );
};

export default RotateTool;