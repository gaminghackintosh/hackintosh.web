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

  // Ref для хранения текущих значений без ререндера
  const posRef = useRef(pos);
  const sizeRef = useRef(size);
  
  // Синхронизация ref с state
  useLayoutEffect(() => {
    posRef.current = pos;
    sizeRef.current = size;
  }, [pos, size]);

  // Синхронизация с пропсами только при внешних изменениях (максимизация)
  useLayoutEffect(() => {
    if ((win.x !== posRef.current.x || win.y !== posRef.current.y) && !dragging.current) {
      setPos({ x: win.x, y: win.y });
      setIsMaximized(win.x === 0 && win.y === 28);
      
      if (windowRef.current && !dragging.current) {
        windowRef.current.style.transform = `translate(${win.x}px, ${win.y}px)`;
      }
    }
    if ((win.width !== sizeRef.current.width || win.height !== sizeRef.current.height) && !resizing.current) {
      setSize({ width: win.width, height: win.height });
      setIsMaximized(win.width >= window.innerWidth - 2);
    }
  }, [win.x, win.y, win.width, win.height]);

  // Оптимизированный drag без state обновлений в реальном времени
  const onTitleMouseDown = useCallback((e) => {
    if (e.button !== 0 || isMaximized) return;
    
    onFocus();
    dragging.current = true;
    offset.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    startPos.current = { x: posRef.current.x, y: posRef.current.y };

    // Визуальная обратная связь + класс производительности
    if (windowRef.current) {
      windowRef.current.classList.add('app-window--dragging');
      windowRef.current.style.cursor = 'grabbing';
      windowRef.current.style.willChange = 'transform';
      // ✅ Важно: отключаем pointer-events на время drag для всех элементов внутри
      windowRef.current.style.pointerEvents = 'none';
    }

    let rafId = null;
    let lastX = posRef.current.x;
    let lastY = posRef.current.y;
    
    const onMove = (ev) => {
      if (!dragging.current) return;
      
      const newX = Math.max(0, Math.min(window.innerWidth - sizeRef.current.width, ev.clientX - offset.current.x));
      const newY = Math.max(28, ev.clientY - offset.current.y);

      // Throttle: обновляем только если позиция изменилась значительно (>1px)
      if (Math.abs(newX - lastX) < 1 && Math.abs(newY - lastY) < 1) return;
      lastX = newX;
      lastY = newY;
      
      // Отменяем предыдущий frame, если он ещё не выполнен
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      // Прямая манипуляция DOM без state - используем requestAnimationFrame
      rafId = requestAnimationFrame(() => {
        if (windowRef.current && dragging.current) {
          windowRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
          rafId = null;
        }
      });
    };

    const onUp = (ev) => {
      if (!dragging.current) return;
      dragging.current = false;

      // Отменяем pending frame
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      
      // Восстанавливаем стили
      if (windowRef.current) {
        windowRef.current.classList.remove('app-window--dragging');
        windowRef.current.style.cursor = '';
        windowRef.current.style.willChange = '';
        windowRef.current.style.pointerEvents = '';
      }

      // Вычисляем финальную позицию
      const finalX = Math.max(0, Math.min(window.innerWidth - sizeRef.current.width, ev.clientX - offset.current.x));
      const finalY = Math.max(28, ev.clientY - offset.current.y);
      
      // Обновляем state только в конце (один ререндер)
      setPos({ x: finalX, y: finalY });
      
      // Синхронизируем с windowRef
      if (windowRef.current) {
        windowRef.current.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
      }

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    e.preventDefault();
  }, [isMaximized, onFocus]);

  // Оптимизированный resize
  const onResizeMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus();

    resizing.current = true;
    startSize.current = { width: sizeRef.current.width, height: sizeRef.current.height };
    const startX = e.clientX;
    const startY = e.clientY;

    if (windowRef.current) {
      windowRef.current.classList.add('app-window--resizing');
      windowRef.current.style.willChange = 'width, height';
      windowRef.current.style.pointerEvents = 'none';
    }

    let rafId = null;
    let lastW = startSize.current.width;
    let lastH = startSize.current.height;
    
    const onMove = (ev) => {
      if (!resizing.current) return;
      
      const deltaX = ev.clientX - startX;
      const deltaY = ev.clientY - startY;
      const newWidth = Math.max(250, startSize.current.width + deltaX);
      const newHeight = Math.max(200, startSize.current.height + deltaY);

      // Throttle: обновляем только если размер изменился значительно
      if (Math.abs(newWidth - lastW) < 1 && Math.abs(newHeight - lastH) < 1) return;
      lastW = newWidth;
      lastH = newHeight;
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        if (windowRef.current && resizing.current) {
          windowRef.current.style.width = `${newWidth}px`;
          windowRef.current.style.height = `${newHeight}px`;
          rafId = null;
        }
      });
    };

    const onUp = () => {
      resizing.current = false;
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      
      if (windowRef.current) {
        windowRef.current.classList.remove('app-window--resizing');
        windowRef.current.style.willChange = '';
        windowRef.current.style.pointerEvents = '';
        setSize({ 
          width: parseFloat(windowRef.current.style.width) || sizeRef.current.width, 
          height: parseFloat(windowRef.current.style.height) || sizeRef.current.height 
        });
      }

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
  }, [onFocus]);

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
          willChange: isActive ? "transform" : "auto",
          contain: "layout style paint",
          touchAction: "none",
          contentVisibility: "auto",
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