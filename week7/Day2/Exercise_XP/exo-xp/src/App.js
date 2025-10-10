import React from "react";
import Car from "./components/Car";
import Events from "./components/Events";
import Phone from "./components/Phone";
import Color from "./components/Color";
import "./index.css";

function App() {
  const carInfo = { name: "Ford", model: "Mustang" };

  return (
    <div className="App">
      {/* Car Section */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          🚗 React Car & Garage Exercise
        </h1>
        <Car carInfo={carInfo} />
      </div>
      {/* Other Components */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
        <Color />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
        <Phone />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">  
        <Events />
      </div>        
    </div>
  );
}

export default App;
