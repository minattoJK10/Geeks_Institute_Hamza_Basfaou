import React, { useState } from "react";

function ColumnLeft() {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const res = await fetch("https://picsum.photos/v2/list?limit=2");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  return (
    <div className="text-center space-y-4">
      <button
        onClick={getImages}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Get Images
      </button>

      <div className="space-y-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.download_url}
            alt="random"
            className="w-full rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}

export default ColumnLeft;
