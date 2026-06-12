import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ImageEditor from './components/ImageEditor';
import FilterControls from './components/FilterControls';
import CropTool from './components/CropTool';
import RotateTool from './components/RotateTool';
import FilterPresets from './components/FilterPresets';
import UndoRedo from './components/UndoRedo';
import Histogram from './components/Histogram';
import BrushTool from './components/BrushTool';
import ResizeCanvas from './components/ResizeCanvas';
import BeforeAfter from './components/BeforeAfter';
import ColorAdjustments from './components/ColorAdjustments';
import { FilterSettings, HistoryState } from './types';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCropTool, setShowCropTool] = useState(false);
  const [showBrushTool, setShowBrushTool] = useState(false);
  const [showResizeCanvas, setShowResizeCanvas] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [filters, setFilters] = useState<FilterSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    hue: 0,
    grayscale: 0,
    lightness: 0,
  });
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImage(imageUrl);
        setOriginalImage(imageUrl);
        setHistory([]);
        setHistoryIndex(-1);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilterChange = (filterName: keyof FilterSettings, value: number) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    addToHistory(newFilters);
  };

  const addToHistory = (newFilters: FilterSettings) => {
    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1));
    }
    
    const newState: HistoryState = {
      id: Date.now().toString(),
      canvas: canvasRef.current?.toDataURL() || '',
      filters: newFilters,
      timestamp: Date.now(),
    };
    
    setHistory([...history, newState]);
    setHistoryIndex(history.length);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setFilters(history[newIndex].filters);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setFilters(history[newIndex].filters);
    }
  };

  const handleRotate = (angle: number) => {
    setRotation((prev) => (prev + angle) % 360);
  };

  const handleApplyPreset = (presetFilters: FilterSettings) => {
    setFilters(presetFilters);
    addToHistory(presetFilters);
  };

  const handleCrop = (croppedImage: string) => {
    setImage(croppedImage);
    setShowCropTool(false);
  };

  const handleResize = (width: number, height: number) => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        setImage(canvas.toDataURL());
        setShowResizeCanvas(false);
      }
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL('image/png');
    link.download = `photo-shop-${Date.now()}.png`;
    link.click();
  };

  const resetFilters = () => {
    const defaultFilters = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      hue: 0,
      grayscale: 0,
      lightness: 0,
    };
    setFilters(defaultFilters);
    setRotation(0);
    addToHistory(defaultFilters);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📸 Photo Shop Pro</h1>
        <p>Advanced Image Editor with Professional Tools</p>
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
            <div className="controls-tabs">
              <button className="tab-btn active">Filters</button>
            </div>
            
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
              onDownload={downloadImage}
            />

            <div className="divider"></div>

            <ColorAdjustments
              lightness={filters.lightness}
              onLightnessChange={(value) => handleFilterChange('lightness', value)}
            />

            <div className="divider"></div>

            <FilterPresets
              filters={filters}
              onApplyPreset={handleApplyPreset}
              onSavePreset={(name) => console.log('Saved preset:', name)}
              currentFilters={filters}
            />

            <div className="divider"></div>

            <UndoRedo
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              onUndo={handleUndo}
              onRedo={handleRedo}
              historyCount={history.length}
            />
          </aside>

          <main className="editor-main">
            <div className="editor-toolbar">
              <button
                onClick={() => setShowCropTool(true)}
                className="tool-btn"
                title="Crop Tool"
              >
                ✂️ Crop
              </button>
              <RotateTool onRotate={handleRotate} />
              <button
                onClick={() => setShowBrushTool(true)}
                className="tool-btn"
                title="Brush Tool"
              >
                🖌️ Brush
              </button>
              <button
                onClick={() => setShowResizeCanvas(true)}
                className="tool-btn"
                title="Resize Canvas"
              >
                📐 Resize
              </button>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="tool-btn"
                title="Before/After Comparison"
              >
                🌐 Compare
              </button>
            </div>

            {showComparison && originalImage ? (
              <BeforeAfter
                originalImage={originalImage}
                editedImage={canvasRef.current?.toDataURL() || image}
              />
            ) : (
              <div className="editor-content">
                <ImageEditor
                  image={image}
                  filters={filters}
                  canvasRef={canvasRef}
                  rotation={rotation}
                  onImageDataUpdate={setImageData}
                />
                {imageData && (
                  <Histogram imageData={imageData} />
                )}
              </div>
            )}
          </main>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-content">
            <p>👆 Upload an image to get started</p>
            <p className="help-text">Support for JPG, PNG, GIF, WebP, and BMP formats</p>
          </div>
        </div>
      )}

      {showCropTool && image && (
        <CropTool
          image={image}
          onCrop={handleCrop}
          onCancel={() => setShowCropTool(false)}
        />
      )}

      {showBrushTool && (
        <BrushTool
          canvas={canvasRef.current}
          onClose={() => setShowBrushTool(false)}
        />
      )}

      {showResizeCanvas && image && (
        <ResizeCanvas
          currentWidth={800}
          currentHeight={600}
          onResize={handleResize}
          onCancel={() => setShowResizeCanvas(false)}
        />
      )}
    </div>
  );
}

export default App;
