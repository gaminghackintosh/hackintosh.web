import React, { useState, lazy, Suspense, createContext, useCallback, useMemo } from "react";
import { APPS, INITIAL_POSITIONS } from "./constants/apps";
import { AppWindow } from "./components/AppWindow/AppWindow";
import { Dock } from "./components/Dock";


export const WindowContext = createContext(null);

const FinderContent   = lazy(() => import("./components/apps/Finder/FinderContent"));
const SafariContent   = lazy(() => import("./components/apps/Safari/SafariContent"));
const TerminalContent = lazy(() => import("./components/apps/Terminal/TerminalContent"));
const NotesContent    = lazy(() => import("./components/apps/Notes/NotesContent"));

const WALLPAPER = `
  radial-gradient(ellipse at 25% 35%, rgba(120, 40, 220, 0.75) 0%, transparent 55%),
  radial-gradient(ellipse at 78% 20%, rgba(255, 110, 40, 0.65) 0%, transparent 45%),
  radial-gradient(ellipse at 55% 78%, rgba(20, 90, 220, 0.55) 0%, transparent 48%),
  radial-gradient(ellipse at 85% 80%, rgba(200, 40, 120, 0.45) 0%, transparent 40%),
  linear-gradient(145deg, #0d0718 0%, #1a0833 35%, #0d1a3a 65%, #0d1f18 100%)
`;

let zCounter = 100;

function WindowLoader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "rgba(20, 20, 22, 0.3)" }}>
      <div style={{ width: 24, height: 24, border: "2.5px solid rgba(255,255,255,0.15)", borderTopColor: "#0A84FF", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function MacOSWeb() {
  const [windows, setWindows] = useState([]);
  const [openApps, setOpenApps] = useState([]);
  const [activeWin, setActiveWin] = useState(null);

  // Используем useCallback, чтобы не пересоздавать функции при каждом рендере
  const openApp = useCallback((appId) => {
    setWindows(prev => {
      if (prev.find((w) => w.id === appId)) return prev;
      const p = INITIAL_POSITIONS[appId] || { x: 120, y: 80, w: 600, h: 420 };
      const app = APPS.find((a) => a.id === appId);
      return [...prev, { id: appId, title: app?.name || appId, x: p.x, y: p.y, width: p.w, height: p.h, zIndex: ++zCounter }];
    });
    setOpenApps(prev => prev.includes(appId) ? prev : [...prev, appId]);
    setActiveWin(appId);
  }, []);

  const closeWindow = useCallback((appId) => {
    setWindows((prev) => prev.filter((w) => w.id !== appId));
    setOpenApps((prev) => prev.filter((id) => id !== appId));
    setActiveWin((cur) => (cur === appId ? null : cur));
  }, []);

  const focusWindow = useCallback((appId) => {
    setWindows((prev) => prev.map((w) => (w.id === appId ? { ...w, zIndex: ++zCounter } : w)));
    setActiveWin(appId);
  }, []);

  const renderContent = useCallback((appId) => {
    const handleClose = () => closeWindow(appId);
    switch (appId) {
      case "finder":   return <FinderContent />;
      case "safari":   return <SafariContent onClose={handleClose} onMinimize={handleClose} onZoom={null} />;
      case "terminal": return <TerminalContent />;
      case "notes":    return <NotesContent />;
      default:         return null;
    }
  }, [closeWindow]);

  const activeApp = useMemo(() => activeWin ? APPS.find((a) => a.id === activeWin)?.name : "Finder", [activeWin]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", background: WALLPAPER }}>

      {windows.map((win) => (
        <AppWindow
          key={win.id} 
          win={win}
          isActive={activeWin === win.id}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => closeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
        >
          <Suspense fallback={<WindowLoader />}>
            {renderContent(win.id)}
          </Suspense>
        </AppWindow>
      ))}

      <Dock onOpen={openApp} openApps={openApps} />
    </div>
  );
}