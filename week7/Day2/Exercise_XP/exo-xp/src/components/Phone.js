import React, { useState } from "react";

function Phone() {
  const [phone, setPhone] = useState({
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020,
  });

  const changeColor = () => {
    setPhone((prev) => ({ ...prev, color: "blue" }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-3">Exercise: Phone</h2>

      <p className="text-gray-700 mb-4">
        {phone.brand} {phone.model} —{" "}
        <span style={{ textTransform: "capitalize", color: phone.color }}>
          {phone.color}
        </span>{" "}
        ({phone.year})
      </p>

      <button onClick={changeColor} className="btn btn-outline-primary">
        Change Color
      </button>
    </div>
  );
}

export default Phone;
