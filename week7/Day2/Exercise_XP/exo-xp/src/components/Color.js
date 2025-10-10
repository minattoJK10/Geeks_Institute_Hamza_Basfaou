import React, { useState, useEffect } from "react";

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
    // No cleanup needed for this exercise.
  }, [favoriteColor]);

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">
        My favorite color is{" "}
        <span style={{ color: favoriteColor, textTransform: "capitalize" }}>
          {favoriteColor}
        </span>
      </h2>

      <button
        onClick={() => setFavoriteColor("blue")}
        className="btn btn-primary"
      >
        Change Color
      </button>
    </div>
  );
}

export default Color;
