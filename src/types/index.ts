export interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
  grayscale: number;
  lightness: number;
}

export interface HistoryState {
  id: string;
  canvas: string;
  filters: FilterSettings;
  timestamp: number;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: FilterSettings;
  timestamp: number;
}

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}
