import { createContext, useContext, useMemo, useCallback, useState, useRef } from "react";
import { APPS } from "./../constants/apps";
import { INITIAL_POSITIONS } from "./../constants/positions";

const WindowManagerContext = createContext(null);

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [openApps, setOpenApps] = useState([]);
  const [activeWin, setActiveWin] = useState(null);
  const [minimizedApps, setMinimizedApps] = useState(new Set());
  const [windowStates, setWindowStates] = useState({});
  
  const zCounter = useRef(100);
  const focusTimeoutRef = useRef(null);

  // Мемоизированный фокус без лишних обновлений
  const focusWindow = useCallback((appId) => {
    if (activeWin === appId) return;
    
    if (focusTimeoutRef.current) {
      cancelAnimationFrame(focusTimeoutRef.current);
    }
    
    focusTimeoutRef.current = requestAnimationFrame(() => {
      setWindows((prev) => {
        const target = prev.find(w => w.id === appId);
        if (!target || target.zIndex === zCounter.current + 1) return prev;
        
        zCounter.current += 1;
        return prev.map((w) => 
          w.id === appId ? { ...w, zIndex: zCounter.current } : w
        );
      });
      setActiveWin(appId);
    });
  }, [activeWin]);

  const openApp = useCallback((appId, appName) => {
    if (minimizedApps.has(appId)) {
      setMinimizedApps((prev) => {
        const s = new Set(prev);
        s.delete(appId);
        return s;
      });
      focusWindow(appId);
      return;
    }

    const existing = windows.find((w) => w.id === appId);
    if (existing) {
      focusWindow(appId);
      return;
    }

    const p = INITIAL_POSITIONS[appId] || { x: 120, y: 80, w: 600, h: 420 };
    
    setWindows((prev) => {
      zCounter.current += 1;
      return [
        ...prev,
        {
          id: appId,
          title: appName || appId,
          x: p.x,
          y: p.y,
          width: p.w,
          height: p.h,
          zIndex: zCounter.current,
        },
      ];
    });
    
    setOpenApps((prev) => {
      if (prev.includes(appId)) return prev;
      return [...prev, appId];
    });
    
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
    if (activeWin === appId) {
      setActiveWin(null);
    }
  }, [activeWin]);

  const minimizeWindow = useCallback((appId) => {
    setMinimizedApps((prev) => {
      const s = new Set(prev);
      s.add(appId);
      return s;
    });
    if (activeWin === appId) {
      setActiveWin(null);
    }
  }, [activeWin]);

  const maximizeWindow = useCallback((appId) => {
    setWindows((prev) => {
      const win = prev.find((w) => w.id === appId);
      if (!win) return prev;

      const DOCK_HEIGHT = 80;
      const MENUBAR_HEIGHT = 28;
      const isMaximized = win.x === 0 && win.y === MENUBAR_HEIGHT;

      if (isMaximized) {
        const saved = windowStates[appId];
        if (!saved) return prev;
        
        return prev.map((w) => 
          w.id === appId 
            ? { ...w, x: saved.x, y: saved.y, width: saved.w, height: saved.h } 
            : w
        );
      } else {
        setWindowStates((prevStates) => ({
          ...prevStates,
          [appId]: { x: win.x, y: win.y, w: win.width, h: win.height },
        }));
        
        return prev.map((w) =>
          w.id === appId
            ? { 
                ...w, 
                x: 0, 
                y: MENUBAR_HEIGHT, 
                width: window.innerWidth, 
                height: window.innerHeight - MENUBAR_HEIGHT - DOCK_HEIGHT 
              }
            : w
        );
      }
    });
  }, [windowStates]);

  // Стабильный value объект для контекста
  const value = useMemo(() => ({
    windows,
    openApps,
    activeWin,
    minimizedApps,
    windowStates,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    setActiveWin,
    setWindows,
  }), [
    windows,
    openApps,
    activeWin,
    minimizedApps,
    windowStates,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
  ]);

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
};
