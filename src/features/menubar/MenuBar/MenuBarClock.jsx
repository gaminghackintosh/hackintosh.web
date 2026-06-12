import React, { useState, useEffect, memo } from "react";

export const MenuBarClock = memo(function MenuBarClock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  
  return (
    <>
      <span className="menuBar__date">
        {time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
      </span>
      <span className="menuBar__time">
        {time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true })}
      </span>
    </>
  );
});
