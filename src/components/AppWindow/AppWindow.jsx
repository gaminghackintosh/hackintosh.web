import React, { useState, useRef, useLayoutEffect, memo, useMemo } from "react";

// Мемоизированное значение контекста по умолчанию
const defaultWindowContextValue = {
  onClose: () => {},
  onMinimize: () => {},
  onZoom: () => {},
  onFocus: () => {},
  onTitleMouseDown: () => {},
};

export const WindowContext = React.createContext(defaultWindowContextValue);

export const AppWindow = memo(function AppWindow({
  win,
  onClose,
  onMinimize,
  onFocus,
  isActive,
  isMinimized = false,
  children,
  onZoom = null,
}) {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [size, setSize] = useState({ width: win.width, height: win.height });

  // Refs для производительности
  const windowRef = useRef(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const [animating, setAnimating] = useState(false);

  // === Синхронизация с пропсами (только при максимизации/восстановлении) ===
  useLayoutEffect(() => {
    // Если уже анимируем – пропускаем, чтобы не перебивать анимацию
    if (animating) return;

    const targetX = win.x;
    const targetY = win.y;
    const targetW = win.width;
    const targetH = win.height;

    // Запускаем анимацию только если координаты действительно изменились
    if (
      pos.x !== targetX ||
      pos.y !== targetY ||
      size.width !== targetW ||
      size.height !== targetH
    ) {
      setAnimating(true);
      requestAnimationFrame(() => {
        setPos({ x: targetX, y: targetY });
        setSize({ width: targetW, height: targetH });
      });
    }
  }, [win.x, win.y, win.width, win.height]); // eslint-disable-line react-hooks/exhaustive-deps


  // ─── Mouse events ────────────────────────────────────────────────

  const onTitleMouseDown = (e) => {
    if (e.button !== 0) return;
    onFocus();
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };

    const onMove = (ev) => {
      if (!dragging.current) return;
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, ev.clientX - offset.current.x));
      const newY = Math.max(0, ev.clientY - offset.current.y);

      if (windowRef.current) {
        windowRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    };

    const onUp = () => {
      dragging.current = false;
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        setPos({ x: rect.left, y: rect.top });
      }
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    e.preventDefault();
  };

  // Мемоизированное значение контекста
  const contextValue = useMemo(() => ({
    onClose,
    onMinimize,
    onZoom,
    onFocus,
    onTitleMouseDown,
  }), [onClose, onMinimize, onZoom, onFocus, onTitleMouseDown]);

  // Обработчик для редактирования размера окна
  const onResizeMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus();

    const startW = size.width;
    const startH = size.height;
    const startX = e.clientX;
    const startY = e.clientY;

    const onMove = (ev) => {
      // Используем rAF для плавности
      requestAnimationFrame(() => {
        const deltaX = ev.clientX - startX;
        const deltaY = ev.clientY - startY;

        setSize({ 
          width: Math.max(250, startW + deltaX), 
          height: Math.max(200, startH + deltaY) 
        });
      });
    };

    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };


  return (
    <WindowContext.Provider value={contextValue}>
      <div
        ref={windowRef}
        className={[
          "app-window",
          isActive ? "app-window--active" : "app-window--inactive",
          isMinimized ? "app-window--minimized" : "",
          animating ? "app-window--animating" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onContextMenu={(e) => e.stopPropagation()}
        onTransitionEnd={() => {
          setAnimating(false);
        }}
        style={{
          position: "fixed",
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: size.width,
          height: size.height,
          zIndex: win.zIndex,
          willChange: animating ? "transform, width, height" : "auto",
        }}
      >
        <div className="app-window__content">{children}</div>

        <div className="resize-handle" onMouseDown={onResizeMouseDown}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M14 0 L14 14 L0 14" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
            <path d="M10 14 L14 10" stroke="white" strokeWidth="1" opacity="0.6" />
            <path d="M6 14 L14 6" stroke="white" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
      </div>
    </WindowContext.Provider>
  );
});
