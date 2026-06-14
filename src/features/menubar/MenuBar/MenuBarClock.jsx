import React, { useState, useEffect, memo, useRef } from "react";

export const MenuBarClock = memo(function MenuBarClock() {
  const [time, setTime] = useState(new Date());
  const intervalRef = useRef(null);
  const nextMinuteRef = useRef(0);
  
  useEffect(() => {
    // Вычисляем время до начала следующей минуты
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    
    // Устанавливаем таймер на начало следующей минуты
    const timeoutId = setTimeout(() => {
      // Обновляем время
      setTime(new Date());
      
      // Запускаем интервал на 1 секунду для точного обновления
      intervalRef.current = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }, msUntilNextMinute);
    
    nextMinuteRef.current = timeoutId;
    
    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Кэшируем форматированные значения
  const dateString = time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const timeString = time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  
  return (
    <>
      <span className="menuBar__date">
        {dateString}
      </span>
      <span className="menuBar__time">
        {timeString}
      </span>
    </>
  );
});
