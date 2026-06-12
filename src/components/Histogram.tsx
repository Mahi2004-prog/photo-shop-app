import React from 'react';

interface HistogramProps {
  imageData: ImageData | null;
}

const Histogram: React.FC<HistogramProps> = ({ imageData }) => {
  const getHistogram = () => {
    if (!imageData) return { r: [], g: [], b: [] };

    const r = new Array(256).fill(0);
    const g = new Array(256).fill(0);
    const b = new Array(256).fill(0);

    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      r[data[i]]++;
      g[data[i + 1]]++;
      b[data[i + 2]]++;
    }

    return { r, g, b };
  };

  const histogram = getHistogram();
  const maxValue = Math.max(...histogram.r, ...histogram.g, ...histogram.b);

  return (
    <div className="histogram-container">
      <h4>Histogram</h4>
      <svg width="100%" height="100" className="histogram-chart">
        {histogram.r.map((val, i) => (
          <line
            key={`r-${i}`}
            x1={i}
            y1={100}
            x2={i}
            y2={100 - (val / maxValue) * 100}
            stroke="rgba(255, 0, 0, 0.5)"
            strokeWidth="0.5"
          />
        ))}
        {histogram.g.map((val, i) => (
          <line
            key={`g-${i}`}
            x1={i}
            y1={100}
            x2={i}
            y2={100 - (val / maxValue) * 100}
            stroke="rgba(0, 255, 0, 0.5)"
            strokeWidth="0.5"
          />
        ))}
        {histogram.b.map((val, i) => (
          <line
            key={`b-${i}`}
            x1={i}
            y1={100}
            x2={i}
            y2={100 - (val / maxValue) * 100}
            stroke="rgba(0, 0, 255, 0.5)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
};

export default Histogram;