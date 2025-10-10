import React, { useState } from "react";
import Garage from "./Garage";

const Car = ({ carInfo }) => {
  const [color, setColor] = useState("red");

  const changeColor = () => {
    setColor(color === "red" ? "blue" : "red");
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-200 w-80 transition-transform hover:scale-105">
      <i className="fa-solid fa-car text-5xl text-blue-500 mb-3"></i>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        This car is a <span className={`text-${color}-600`}>{color}</span> {carInfo.model}
      </h2>
      <p className="text-gray-500 mb-4">Brand: {carInfo.name}</p>
      <Garage size="small" />
      <button
        onClick={changeColor}
        className="btn btn-primary mt-4 px-4 py-2 rounded-lg shadow-sm hover:opacity-90"
      >
        <i className="fa-solid fa-paintbrush me-2"></i>
        Change Color
      </button>
    </div>
  );
};

export default Car;
