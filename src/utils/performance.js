/**
 * Оптимизации производительности для React приложения
 * Отключает лишние проверки в production
 */

// Отключаем React DevTools в production для производительности
if (process.env.NODE_ENV === 'production') {
  // Отключаем console.log в production
  if (typeof window !== 'undefined') {
    window.console = {
      ...window.console,
      log: () => {},
      debug: () => {},
      info: () => {},
      // Предупреждения и ошибки оставляем
      warn: window.console.warn.bind(window.console),
      error: window.console.error.bind(window.console),
    };
  }
}

/**
 * Хук для debounce тяжелых операций
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Хук для throttle событий
 */
export function useThrottle(value, limit = 16) { // 16ms = ~60fps
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

/**
 * Хук для requestAnimationFrame
 */
export function useAnimationFrame(callback, enabled = true) {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    if (enabled) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        cancelAnimationFrame(requestRef.current);
        previousTimeRef.current = undefined;
      };
    }
  }, [enabled, animate]);
}

/**
 * Утилита для batch updates
 */
export function batchUpdates(...updates) {
  React.unstable_batchedUpdates(() => {
    updates.forEach(update => update());
  });
}

/**
 * Компонент для ленивой загрузки с preload
 */
export function LazyPreload({ children, preload }) {
  useEffect(() => {
    if (preload) {
      preload();
    }
  }, [preload]);

  return children;
}
