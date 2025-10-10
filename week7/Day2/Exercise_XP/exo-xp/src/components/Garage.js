import React from "react";

const Garage = ({ size }) => {
  return (
    <div className="bg-blue-50 text-blue-700 rounded-xl py-2 px-4 mt-3 border border-blue-200">
      Who lives in my <strong>{size}</strong> garage?
    </div>
  );
};

export default Garage;
