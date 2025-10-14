import React, { useEffect, useState } from "react";

export default function App() {
  const [time, setTime] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    week: new Date().getDay(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
    monthName: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"
    ][new Date().getMonth()],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        week: now.getDay(),
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds(),
        monthName: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"
        ][now.getMonth()],
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const createArray = (length) => Array.from({ length }, (_, i) => i + 1);

  const renderRing = (label, total, value, radius) => (
    <div
      className="absolute flex items-center justify-center transition-all duration-500"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {createArray(total).map((x, index) => (
        <div
          key={index}
          className={`absolute text-white text-xs sm:text-sm transition-all duration-500 opacity-50 ${
            index === value - 1 ? "opacity-100 text-lg font-semibold" : ""
          }`}
          style={{
            transform: `rotate(${index * (360 / total) - value * (360 / total)}deg) translateY(-${radius}px)`,
          }}
        >
          {x} {label}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#282c34] text-white relative overflow-hidden">
      {/* Header Info */}
      <div className="absolute left-8 top-8 text-left">
        <div className="opacity-80 mb-4">
          <div className="text-2xl font-bold">{time.year}</div>
          <div className="text-sm">Year</div>
        </div>
      </div>

      {/* Month Display */}
      <div className="absolute right-8 bottom-8 text-2xl font-semibold">
        {time.monthName}
      </div>

      {/* Main clock box */}
      <div className="relative w-[900px] h-[900px] flex items-center justify-center">
        {renderRing("month", 12, time.month, 120)}
        {renderRing("week", 7, time.week, 160)}
        {renderRing("day", 30, time.day, 200)}
        {renderRing("hr", 24, time.hour, 260)}
        {renderRing("min", 60, time.minute, 340)}
        {renderRing("sec", 60, time.second, 380)}
      </div>
      
    </div>
    
  );
}
