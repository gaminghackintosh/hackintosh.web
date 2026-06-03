import React, { useState, useRef, useLayoutEffect, memo, useMemo, useCallback } from "react";

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
  // Инициализируем только один раз
  const [pos, setPos] = useState(() => ({ x: win.x, y: win.y }));
  const [size, setSize] = useState(() => ({ width: win.width, height: win.height }));
  const [isMaximized, setIsMaximized] = useState(false);

  // Refs для drag без ререндеров
  const windowRef = useRef(null);
  const contentRef = useRef(null);
  const dragging = useRef(false);
  const resizing = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  // Синхронизация с пропсами только при внешних изменениях (максимизация)
  useLayoutEffect(() => {
    if (win.x !== pos.x || win.y !== pos.y) {
      setPos({ x: win.x, y: win.y });
      setIsMaximized(win.x === 0 && win.y === 28);
    }
    if (win.width !== size.width || win.height !== size.height) {
      setSize({ width: win.width, height: win.height });
      setIsMaximized(win.width >= window.innerWidth - 2);
    }
  }, [win.x, win.y, win.width, win.height]);

  // Оптимизированный drag без state обновлений в реальном времени
  const onTitleMouseDown = useCallback((e) => {
    if (e.button !== 0 || isMaximized) return;
    
    onFocus();
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    startPos.current = { x: pos.x, y: pos.y };

    // Визуальная обратная связь
    if (windowRef.current) {
      windowRef.current.style.cursor = 'grabbing';
      windowRef.current.style.transition = 'none';
    }

    const onMove = (ev) => {
      if (!dragging.current) return;
      
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, ev.clientX - offset.current.x));
      const newY = Math.max(28, ev.clientY - offset.current.y);

      // Прямая манипуляция DOM без state
      if (windowRef.current) {
        windowRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    };

    const onUp = (ev) => {
      if (!dragging.current) return;
      dragging.current = false;

      // Восстанавливаем стили
      if (windowRef.current) {
        windowRef.current.style.cursor = '';
        windowRef.current.style.transition = '';
      }

      // Вычисляем финальную позицию один раз
      const finalX = Math.max(0, Math.min(window.innerWidth - size.width, ev.clientX - offset.current.x));
      const finalY = Math.max(28, ev.clientY - offset.current.y);
      
      // Обновляем state только в конце
      setPos({ x: finalX, y: finalY });
      
      // Синхронизируем с windowRef
      if (windowRef.current) {
        windowRef.current.style.transform = `translate(${finalX}px, ${finalY}px)`;
      }

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    e.preventDefault();
  }, [pos.x, pos.y, size.width, size.height, isMaximized, onFocus]);

  // Оптимизированный resize
  const onResizeMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus();

    resizing.current = true;
    startSize.current = { width: size.width, height: size.height };
    const startX = e.clientX;
    const startY = e.clientY;

    if (windowRef.current) {
      windowRef.current.style.transition = 'none';
    }

    const onMove = (ev) => {
      if (!resizing.current) return;
      
      const deltaX = ev.clientX - startX;
      const deltaY = ev.clientY - startY;
      const newWidth = Math.max(250, startSize.current.width + deltaX);
      const newHeight = Math.max(200, startSize.current.height + deltaY);

      // Прямая манипуляция DOM
      if (windowRef.current) {
        windowRef.current.style.width = `${newWidth}px`;
        windowRef.current.style.height = `${newHeight}px`;
      }
    };

    const onUp = () => {
      resizing.current = false;
      
      if (windowRef.current) {
        windowRef.current.style.transition = '';
        setSize({ 
          width: parseFloat(windowRef.current.style.width) || size.width, 
          height: parseFloat(windowRef.current.style.height) || size.height 
        });
      }

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
  }, [size.width, size.height, onFocus]);

  const contextValue = useMemo(() => ({
    onClose,
    onMinimize,
    onZoom,
    onFocus,
    onTitleMouseDown,
  }), [onClose, onMinimize, onZoom, onFocus, onTitleMouseDown]);

  // Предотвращаем ререндер контента при изменении позиции
  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <WindowContext.Provider value={contextValue}>
      <div
        ref={windowRef}
        className={[
          "app-window",
          isActive ? "app-window--active" : "app-window--inactive",
          isMinimized ? "app-window--minimized" : "",
        ].filter(Boolean).join(" ")}
        onContextMenu={(e) => e.stopPropagation()}
        onMouseDown={onFocus}
        style={{
          position: "fixed",
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: size.width,
          height: size.height,
          zIndex: win.zIndex,
          willChange: "transform",
          contain: "layout style paint",
          touchAction: "none",
        }}
      >
        <div ref={contentRef} className="app-window__content" style={{ contain: "content" }}>
          {memoizedChildren}
        </div>

        <div 
          className="resize-handle" 
          onMouseDown={onResizeMouseDown}
          style={{ touchAction: "none" }}
        >
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