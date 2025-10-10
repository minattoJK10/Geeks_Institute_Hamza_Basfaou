import React, { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const addVote = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].votes += 1;
    setLanguages(updatedLanguages);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12">
        Vote Your Favorite Language
      </h1>

      <div className="w-full max-w-md space-y-6">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-6 py-5 rounded-2xl shadow-lg transition-transform duration-300 bg-gradient-to-r from-white to-gray-50 hover:scale-105"
          >
            <span className="text-2xl font-bold text-indigo-600 w-12 text-center">
              {lang.votes}
            </span>
            <span className="text-xl font-medium text-gray-800 flex-1 text-center">
              {lang.name}
            </span>
            <button
              onClick={() => addVote(index)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
