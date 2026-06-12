# Photo Shop - Image Editor

A modern, professional image editing application built with React and TypeScript. Perfect for quick photo edits and filters.

## Features

✨ **Image Editing Capabilities:**
- 🎨 Brightness adjustment
- 🎯 Contrast control
- 🌈 Saturation enhancement
- 🔵 Blur effects
- 🎪 Hue rotation
- ⚫ Grayscale conversion
- 💾 Download edited images
- 🔄 Reset all filters

## Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 with modern features

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mahi2004-prog/photo-shop-app.git
cd photo-shop-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Upload an Image:** Click the upload button to select an image from your device
2. **Apply Filters:** Use the sliders on the left panel to adjust various filters
3. **Preview:** See real-time preview of your edits
4. **Reset:** Click the reset button to restore original filter values
5. **Download:** Save your edited image by clicking the download button

## Project Structure

```
src/
├── components/
│   ├── ImageEditor.tsx      # Canvas rendering component
│   ├── FilterControls.tsx   # Filter control panel
│   └── Slider.tsx          # Reusable slider component
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main application component
├── App.css                 # Application styles
├── index.css              # Global styles
└── main.tsx               # Application entry point
```

## Available Scripts

### Development
```bash
npm run dev
```
Runs the app in development mode.

### Build
```bash
npm run build
```
Builds the app for production to the `dist` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally.

## Supported Image Formats

- JPG/JPEG
- PNG
- GIF
- WebP
- BMP

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Crop and rotate functionality
- [ ] Undo/Redo history
- [ ] Multiple filters presets
- [ ] Image overlay tools
- [ ] Text overlay capability
- [ ] Export to different formats
- [ ] Batch processing

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Happy Editing! 📸**
