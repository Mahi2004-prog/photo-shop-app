import React, { useState } from 'react';

interface BeforeAfterProps {
  originalImage: string;
  editedImage: string;
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({ originalImage, editedImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <div className="before-after-container" onMouseMove={handleMouseMove}>
      <img src={originalImage} alt="Before" className="before-image" />
      <div
        className="after-image-wrapper"
        style={{ width: `${sliderPosition}%` }}
      >
        <img src={editedImage} alt="After" className="after-image" />
      </div>
      <div
        className="slider-handle"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-arrow">‹ ›</div>
      </div>
      <div className="before-label">Before</div>
      <div className="after-label">After</div>
    </div>
  );
};

export default BeforeAfter;