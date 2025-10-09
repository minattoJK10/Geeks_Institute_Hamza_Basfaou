import React from "react";

const Planets = () => {
  const planets = ["Mars", "Venus", "Jupiter", "Earth", "Saturn", "Neptune"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Planets List</h1>

      <ul className="bg-white shadow-lg rounded-xl w-64 divide-y divide-gray-200">
        {planets.map((planet, index) => (
          <li
            key={index}
            className="p-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
          >
            {planet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Planets;
