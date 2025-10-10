import React, { useState } from "react";

function Events() {
  // Part I
  const clickMe = () => {
    alert("I was clicked");
  };

  // Part II
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert(`You pressed Enter: ${event.target.value}`);
      // optional: clear input after enter:
      event.target.value = "";
    }
  };

  // Part III
  const [isToggleOn, setIsToggleOn] = useState(true);
  const toggle = () => setIsToggleOn((prev) => !prev);

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Exercise: Events</h2>

      {/* Part I */}
      <div className="text-center mb-4">
        <button onClick={clickMe} className="btn btn-success">
          Click Me
        </button>
      </div>

      {/* Part II */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Type something and press Enter"
          onKeyDown={handleKeyDown}
          className="form-control"
        />
      </div>

      {/* Part III */}
      <div className="text-center">
        <button onClick={toggle} className="btn btn-primary">
          {isToggleOn ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
}

export default Events;
