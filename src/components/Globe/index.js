import React from 'react';

const SplineEmbed = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://my.spline.design/globe-7fce3f4b79236226e82daa4e00ce0469/"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="3D Model"
        allowFullScreen
      />
      {/* Dark Mask with 10% Opacity and Pointer Events Disabled */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-10" style={{ pointerEvents: 'none' }} />
      {/* Text Overlay */}
      <div className="absolute top-10 left-10 z-20 text-gray-300 p-4">
        <h1 className="text-4xl font-bold text-gray-700">Welcome to Globe 3D</h1>
        <p className="text-xl mt-2 text-gray-900">Play with the world at your fingertips!</p>
      </div>
    </div>
  );
};

export default function Globe() {
  return (
    <SplineEmbed />
  );
}
