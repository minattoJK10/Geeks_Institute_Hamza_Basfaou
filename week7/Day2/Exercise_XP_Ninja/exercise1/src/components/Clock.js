import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fonction pour mettre à jour le temps chaque seconde
  const tick = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const timerID = setInterval(tick, 1000);
    return () => clearInterval(timerID); // Nettoyage
  }, []);

  // Format de l’heure
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <p
        style={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "black",
          marginBottom: "10px",
        }}
      >
        Hello, world!
      </p>

      <h2
        style={{
          fontSize: "1.5rem",
          color: "black",
          marginTop: "10px",
        }}
      >
        It is {formattedTime}.
      </h2>
    </div>
  );
};

export default Clock;