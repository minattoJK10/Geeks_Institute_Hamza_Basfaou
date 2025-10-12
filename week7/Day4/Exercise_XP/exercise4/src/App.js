import React from "react";

function App() {
  const sendData = async () => {
    const url = "	https://webhook.site/fdfb119d-f65f-4335-8430-3e6b26edbc21"; // replace this
    const data = {
      key1: "myusername",
      email: "mymail@gmail.com",
      name: "Isaac",
      lastname: "Doe",
      age: 27,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.text();
      console.log("Response from webhook:", result);
      alert("Data sent successfully ✅");
    } catch (err) {
      console.error("Error sending data:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={sendData}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
      >
        Send Data
      </button>
    </div>
  );
}

export default App;
