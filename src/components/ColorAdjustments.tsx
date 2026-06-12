import React from 'react';

interface ColorAdjustmentsProps {
  lightness: number;
  onLightnessChange: (value: number) => void;
}

const ColorAdjustments: React.FC<ColorAdjustmentsProps> = ({
  lightness,
  onLightnessChange,
}) => {
  return (
    <div className="color-adjustments">
      <h3>Color Adjustments (HSL)</h3>
      <div className="adjustment-slider">
        <label>
          Lightness
          <span className="value">{lightness}</span>
        </label>
        <input
          type="range"
          min="-50"
          max="50"
          value={lightness}
          onChange={(e) => onLightnessChange(parseInt(e.target.value))}
          className="slider-input"
        />
      </div>
      <p className="help-text">
        Adjust the lightness of your image. Negative values darken, positive values lighten.
      </p>
    </div>
  );
};

export default ColorAdjustments;
