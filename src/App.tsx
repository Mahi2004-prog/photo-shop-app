import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ImageEditor from './components/ImageEditor';
import FilterControls from './components/FilterControls';
import { FilterSettings } from './types';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    hue: 0,
    grayscale: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilterChange = (filterName: keyof FilterSettings, value: number) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL('image/png');
    link.download = `photo-shop-${Date.now()}.png`;
    link.click();
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      hue: 0,
      grayscale: 0,
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📸 Photo Shop</h1>
        <p>Professional Image Editor</p>
      </header>

      <div className="upload-section">
        <label className="upload-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          <span className="upload-button">+ Upload Image</span>
        </label>
      </div>

      {image ? (
        <div className="editor-container">
          <aside className="controls-sidebar">
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
              onDownload={downloadImage}
            />
          </aside>
          <main className="editor-main">
            <ImageEditor
              image={image}
              filters={filters}
              canvasRef={canvasRef}
            />
          </main>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-content">
            <p>👆 Upload an image to get started</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
