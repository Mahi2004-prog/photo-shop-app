import React from 'react';
import { FilterSettings } from '../types';
import Slider from './Slider';

interface FilterControlsProps {
  filters: FilterSettings;
  onFilterChange: (filter: keyof FilterSettings, value: number) => void;
  onReset: () => void;
  onDownload: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFilterChange,
  onReset,
  onDownload,
}) => {
  return (
    <div className="filter-controls">
      <h2>Edit Filters</h2>

      <div className="control-group">
        <Slider
          label="Brightness"
          value={filters.brightness}
          min={0}
          max={200}
          onChange={(value) => onFilterChange('brightness', value)}
        />
      </div>

      <div className="control-group">
        <Slider
          label="Contrast"
          value={filters.contrast}
          min={0}
          max={200}
          onChange={(value) => onFilterChange('contrast', value)}
        />
      </div>

      <div className="control-group">
        <Slider
          label="Saturation"
          value={filters.saturation}
          min={0}
          max={200}
          onChange={(value) => onFilterChange('saturation', value)}
        />
      </div>

      <div className="control-group">
        <Slider
          label="Blur"
          value={filters.blur}
          min={0}
          max={20}
          onChange={(value) => onFilterChange('blur', value)}
        />
      </div>

      <div className="control-group">
        <Slider
          label="Hue Rotate"
          value={filters.hue}
          min={0}
          max={360}
          onChange={(value) => onFilterChange('hue', value)}
        />
      </div>

      <div className="control-group">
        <Slider
          label="Grayscale"
          value={filters.grayscale}
          min={0}
          max={100}
          onChange={(value) => onFilterChange('grayscale', value)}
        />
      </div>

      <div className="button-group">
        <button onClick={onReset} className="btn btn-secondary">
          🔄 Reset
        </button>
        <button onClick={onDownload} className="btn btn-primary">
          💾 Download
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
