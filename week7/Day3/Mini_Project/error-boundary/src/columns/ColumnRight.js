import React, { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

function ColumnRight() {
  const [text, setText] = useState(JSON.stringify({ function: "I live to crash" }));

  const replaceStringWithObject = () => {
    setText({ function: "I live to crash" }); // ❌ Causes rendering error
  };

  const invokeEventHandler = () => {
    throw new Error("This is an event handler error!");
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">
        There are two types of errors we can trigger inside this component:
      </h4>
      <p className="text-gray-600">
        A rendering error and a regular JavaScript error.
      </p>

      {/* ✅ Protected by ErrorBoundary */}
      <ErrorBoundary>
        <p className="text-gray-700">
          Clicking this button will replace the{" "}
          <code className="bg-gray-100 text-red-600 px-1 rounded">stringified</code> object,{" "}
          <code className="bg-gray-100 text-blue-700 px-1 rounded">{text}</code>, with
          the original object. This will result in a rendering error.
        </p>
      </ErrorBoundary>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={replaceStringWithObject}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Replace string with object
        </button>

        <button
          onClick={invokeEventHandler}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Invoke event handler
        </button>
      </div>
    </div>
  );
}

export default ColumnRight;
