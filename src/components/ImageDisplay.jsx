import React from 'react';

export const ImageDisplay = ({ image }) => {
  if (!image) return null;

  const images = Array.isArray(image) ? image : [image];

  return (
    <div className="brutalist-panel">
      <h2 className="text-xl font-bold uppercase mb-4">Generated Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img, index) => (
          <div key={index} className="border-4 border-black overflow-hidden">
            <img
              src={img}
              alt={`Generated artwork ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};