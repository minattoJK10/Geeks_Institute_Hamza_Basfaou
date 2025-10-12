import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  // Fetch message from Express on load
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hello");
        const text = await res.text();
        setMessage(text);
      } catch (err) {
        console.error("Error fetching message:", err);
      }
    };
    fetchMessage();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/world", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const text = await res.text();
      setResponse(text);
    } catch (err) {
      console.error("Error posting data:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6 p-8">
      <h1 className="text-4xl font-bold text-blue-600">{message}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <label className="block text-gray-700 font-medium">Enter a message:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type something..."
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Send to Server
        </button>
      </form>

      {response && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg w-full max-w-md">
          {response}
        </div>
      )}
    </div>
  );
}

export default App;
