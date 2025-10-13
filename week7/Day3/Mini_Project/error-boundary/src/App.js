import React from "react";
import ColumnLeft from "./columns/ColumnLeft";
import ColumnRight from "./columns/ColumnRight";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white shadow-md px-6 py-4 flex items-center justify-center">
        <h1 className="text-xl font-semibold tracking-wide">
          Error Boundaries in React
        </h1>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {/* Left Column */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
            Left Column
          </h2>
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <ColumnLeft />
          </div>
        </div>

        {/* Right Column */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">
            Right Column
          </h2>
          <ErrorBoundary>
            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <ColumnRight />
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
