import { useState, useEffect } from "react";

/**
 * Хук для отслеживания мобильных устройств или узких экранов.
 * @param {number} breakpoint - Ширина экрана, ниже которой устройство считается мобильным (по умолчанию 1024).
 * @returns {boolean} - true, если устройство мобильное.
 */
export function useMobileCheck(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Функция проверки ширины
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Проверяем при монтировании
    checkIsMobile();

    // Добавляем обработчик на изменение размера окна
    let timeout;
    const handler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(checkIsMobile, 100); // Дебаунс для оптимизации производительности
    };

    window.addEventListener("resize", handler);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handler);
    };
  }, [breakpoint]);

  return isMobile;
}