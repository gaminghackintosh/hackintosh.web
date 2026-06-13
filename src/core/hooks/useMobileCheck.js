import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Хук для отслеживания мобильных устройств или узких экранов.
 * @param {number} breakpoint - Ширина экрана, ниже которой устройство считается мобильным (по умолчанию 1024).
 * @returns {boolean} - true, если устройство мобильное.
 */
export function useMobileCheck(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const isMobileRef = useRef(false);

  // Используем resize observer для более точного отслеживания
  useEffect(() => {
    const checkIsMobile = () => {
      const newIsMobile = window.innerWidth <= breakpoint;
      isMobileRef.current = newIsMobile;
      setIsMobile(newIsMobile);
      lastUpdateRef.current = performance.now();
    };

    // Первичная проверка
    checkIsMobile();

    // Используем requestAnimationFrame для debounce
    const handler = () => {
      const now = performance.now();
      const elapsed = now - lastUpdateRef.current;
      
      // Обновляем только если прошло более 100ms или сейчас не обновлялось
      if (elapsed >= 100 || !lastUpdateRef.current) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        
        rafRef.current = requestAnimationFrame(() => {
          const finalIsMobile = window.innerWidth <= breakpoint;
          if (isMobileRef.current !== finalIsMobile) {
            isMobileRef.current = finalIsMobile;
            setIsMobile(finalIsMobile);
            lastUpdateRef.current = performance.now();
          }
          rafRef.current = null;
        });
      }
    };

    // Используем passive listener для лучшей производительности
    window.addEventListener("resize", handler, { passive: true });

    return () => {
      window.removeEventListener("resize", handler);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [breakpoint]);

  return isMobile;
}