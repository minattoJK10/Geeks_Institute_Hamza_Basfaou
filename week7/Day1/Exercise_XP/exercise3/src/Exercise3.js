import React from "react";

const Exercise = () => {
  const style_header = {
    color: "white",
    backgroundColor: "#3B82F6", // Tailwind "blue-500"
    padding: "12px",
    fontFamily: "Inter, sans-serif",
    borderRadius: "8px",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      {/* Header */}
      <h1 style={style_header} className="text-3xl font-bold mb-6 shadow-md">
        This is a Header
      </h1>

      {/* Paragraph */}
      <p className="bg-gray-800 text-white px-6 py-4 rounded-lg text-center font-medium mb-4 w-full max-w-lg">
        This is a Paragraph
      </p>

      {/* Link */}
      <a
        href="https://react.dev"
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:text-blue-800 font-semibold underline mb-8 transition-all duration-200"
      >
        This is a Link
      </a>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">This is a Form:</h3>
        <form className="flex flex-col items-center gap-3">
          <label className="text-sm font-medium text-gray-600">
            Enter your name:
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="border border-gray-300 rounded-md px-3 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Image */}
      <div className="text-center mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Here is an Image:</h3>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          className="w-80 mx-auto shadow-lg rounded-xl bg-gray-900 p-8"
        />
      </div>

      {/* List */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">This is a List:</h4>
        <ul className="list-disc list-inside text-gray-600 text-left mx-auto w-fit space-y-1">
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul>
      </div>
    </div>
  );
};

export default Exercise;
