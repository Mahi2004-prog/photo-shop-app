import React, { useState } from 'react';
import { FilterSettings, FilterPreset } from '../types';

interface FilterPresetsProps {
  filters?: FilterSettings;
  onApplyPreset: (filters: FilterSettings) => void;
  currentFilters?: FilterSettings;
  onSavePreset?: (name: string) => void;
}

const PRESET_FILTERS: FilterPreset[] = [
  {
    id: '1',
    name: 'Vintage',
    filters: {
      brightness: 110,
      contrast: 90,
      saturation: 70,
      blur: 0,
      hue: 30,
      grayscale: 0,
      lightness: 5,
    },
    timestamp: Date.now(),
  },
  {
    id: '2',
    name: 'Cool',
    filters: {
      brightness: 100,
      contrast: 110,
      saturation: 100,
      blur: 0,
      hue: 200,
      grayscale: 0,
      lightness: 0,
    },
    timestamp: Date.now(),
  },
  {
    id: '3',
    name: 'Warm',
    filters: {
      brightness: 110,
      contrast: 95,
      saturation: 120,
      blur: 0,
      hue: 30,
      grayscale: 0,
      lightness: 10,
    },
    timestamp: Date.now(),
  },
  {
    id: '4',
    name: 'B&W',
    filters: {
      brightness: 100,
      contrast: 120,
      saturation: 0,
      blur: 0,
      hue: 0,
      grayscale: 100,
      lightness: 0,
    },
    timestamp: Date.now(),
  },
  {
    id: '5',
    name: 'Vivid',
    filters: {
      brightness: 105,
      contrast: 130,
      saturation: 150,
      blur: 0,
      hue: 0,
      grayscale: 0,
      lightness: 5,
    },
    timestamp: Date.now(),
  },
  {
    id: '6',
    name: 'Soft',
    filters: {
      brightness: 110,
      contrast: 85,
      saturation: 90,
      blur: 2,
      hue: 0,
      grayscale: 0,
      lightness: 15,
    },
    timestamp: Date.now(),
  },
];

const FilterPresets: React.FC<FilterPresetsProps> = ({
  onApplyPreset,
  onSavePreset,
}) => {
  const [presets, setPresets] = useState<FilterPreset[]>(PRESET_FILTERS);
  const [showSave, setShowSave] = useState(false);
  const [presetName, setPresetName] = useState('');

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset?.(presetName);
      setPresetName('');
      setShowSave(false);
    }
  };

  return (
    <div className="filter-presets">
      <h3>Filter Presets</h3>
      <div className="presets-grid">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onApplyPreset(preset.filters)}
            className="preset-button"
            title={preset.name}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {showSave ? (
        <div className="save-preset">
          <input
            type="text"
            placeholder="Preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            className="preset-input"
          />
          <button onClick={handleSavePreset} className="btn btn-primary btn-sm">
            Save
          </button>
          <button
            onClick={() => setShowSave(false)}
            className="btn btn-secondary btn-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSave(true)}
          className="btn btn-secondary btn-sm"
        >
          💾 Save Current
        </button>
      )}
    </div>
  );
};

export default FilterPresets;