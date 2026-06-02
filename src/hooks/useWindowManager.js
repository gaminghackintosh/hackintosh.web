// hooks/useWindowManager.js
import { useState, useCallback, useRef } from "react";
import { APPS } from "./../constants/apps";
import { INITIAL_POSITIONS } from "./../constants/apps";

export function useWindowManager() {
  const [windows, setWindows] = useState([]);
  const [openApps, setOpenApps] = useState([]);
  const [activeWin, setActiveWin] = useState(null);
  const [minimizedApps, setMinimizedApps] = useState(new Set());
  const [windowStates, setWindowStates] = useState({}); // Для хранения состояния до максимизации

  const zCounter = useRef(100);

  const focusWindow = useCallback((appId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, zIndex: ++zCounter.current } : w))
    );
    setActiveWin(appId);
  }, []);

  const openApp = useCallback((appId, appName) => {
    // Если приложение свёрнуто — восстанавливаем
    if (minimizedApps.has(appId)) {
      setMinimizedApps((prev) => {
        const s = new Set(prev);
        s.delete(appId);
        return s;
      });
      focusWindow(appId);
      return;
    }

    // Если окно уже открыто — просто фокусируем
    const existing = windows.find((w) => w.id === appId);
    if (existing) {
      focusWindow(appId);
      return;
    }

    // Создаем новое окно
    const p = INITIAL_POSITIONS[appId] || { x: 120, y: 80, w: 600, h: 420 };
    setWindows((prev) => [
      ...prev,
      {
        id: appId,
        title: appName || appId,
        x: p.x,
        y: p.y,
        width: p.w,
        height: p.h,
        zIndex: ++zCounter.current,
      },
    ]);
    setOpenApps((prev) => [...new Set([...prev, appId])]);
    setActiveWin(appId);
  }, [minimizedApps, windows, focusWindow]);

  const closeWindow = useCallback((appId) => {
    setWindows((prev) => prev.filter((w) => w.id !== appId));
    setOpenApps((prev) => prev.filter((id) => id !== appId));
    setMinimizedApps((prev) => {
      const s = new Set(prev);
      s.delete(appId);
      return s;
    });
    setActiveWin(null);
  }, []);

  const minimizeWindow = useCallback((appId) => {
    setMinimizedApps((prev) => new Set([...prev, appId]));
    setActiveWin(null);
  }, []);

  const maximizeWindow = useCallback((appId) => {
    setWindows((prev) => {
      const win = prev.find((w) => w.id === appId);
      if (!win) return prev;

      const DOCK_HEIGHT = 80;
      const isMaximized = win.width >= window.innerWidth - 2 && win.height >= window.innerHeight - 28 - DOCK_HEIGHT;

      if (isMaximized) {
        // Восстанавливаем из сохраненного состояния
        const saved = windowStates[appId] || INITIAL_POSITIONS[appId];
        return prev.map((w) => w.id === appId ? { ...w, ...saved } : w);
      } else {
        // Сохраняем текущие размеры и разворачиваем
        setWindowStates((prevStates) => ({
          ...prevStates,
          [appId]: { x: win.x, y: win.y, w: win.width, h: win.height },
        }));
        return prev.map((w) =>
          w.id === appId
            ? { ...w, x: 0, y: 28, width: window.innerWidth, height: window.innerHeight - 28 - DOCK_HEIGHT }
            : w
        );
      }
    });
  }, [windowStates]);

  return {
    windows,
    openApps,
    activeWin,
    minimizedApps,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    setActiveWin
  };
}