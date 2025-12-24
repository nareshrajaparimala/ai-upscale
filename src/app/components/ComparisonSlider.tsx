'use client';

import { useState } from 'react';

export default function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  const lowResImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=30";
  const highResImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=95";

  return (
    <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden">
      {/* High resolution background */}
      <div className="absolute inset-0">
        <img 
          src={highResImage}
          alt="High resolution"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Low resolution overlay */}
      <div 
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={lowResImage}
          alt="Low resolution"
          className="w-full h-full object-cover filter blur-sm"
          style={{ width: `${100 * (100 / sliderPosition)}%` }}
        />
      </div>
      
      {/* Slider input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
      />
      
      {/* Slider handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
        Before (Low Res)
      </div>
      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
        After (AI Enhanced)
      </div>
    </div>
  );
}
