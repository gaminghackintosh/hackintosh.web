import React, { Suspense, useState, useCallback, useMemo, useEffect } from "react";
import { useMobileCheck } from "./hooks/useMobileCheck";
import { useWindowManager } from "./hooks/useWindowManager";
import { useContextMenu } from "./hooks/useContextMenu";
// UI компоненты
import { BootScreen, MobileNotSupported, WindowLoading, ContextMenu } from "./components/ui";
// Layout компоненты
import { Desktop, Dock, AppWindow } from "./components/layout";
import { MenuBar } from "./features/menubar/MenuBar/MenuBar";
import { renderAppContent } from "./utils/renderAppContent"; 
// Оптимизация: ленивая загрузка обоев
import defaultWallpaperDark from "./assets/images/wallpapers/Tahoe/Tahoe Dark.png";
import defaultWallpaperLight from "./assets/images/wallpapers/Tahoe/Tahoe Light.png";

// Мемоизированный компонент окна
const MemoizedAppWindow = React.memo(AppWindow, (prevProps, nextProps) => {
  return (
    prevProps.win.x === nextProps.win.x &&
    prevProps.win.y === nextProps.win.y &&
    prevProps.win.width === nextProps.win.width &&
    prevProps.win.height === nextProps.win.height &&
    prevProps.isActive === nextProps.isActive &&
    prevProps.isMinimized === nextProps.isMinimized &&
    prevProps.win.zIndex === nextProps.win.zIndex
  );
});

export default function App() {
  const windowManager = useWindowManager();
  const { contextMenu, openContextMenu, closeContextMenu } = useContextMenu();
  const isMobile = useMobileCheck();
  const [bootComplete, setBootComplete] = useState(false);
  // Оптимизация: инициализация темы и обоев одним useEffect
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light';
  });
  
  const [wallpaper, setWallpaper] = useState(() => ({
    id: "tahoe_default",
    type: "image",
    value: defaultWallpaperDark, // По умолчанию тёмная тема
  }));

  // Apply saved theme on mount + обои
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    
    if (isLight) {
      document.documentElement.classList.add('light-theme');
      setWallpaper(prev => ({ ...prev, value: defaultWallpaperLight }));
    }
  }, []);

  // Listen for theme changes from MenuBar + смена обоев
  useEffect(() => {
    const handleThemeChange = (e) => {
      const isLight = e.detail.isLight;
      setIsLightTheme(isLight);
      // Динамическая смена обоев
      setWallpaper(prev => ({
        ...prev,
        value: isLight ? defaultWallpaperLight : defaultWallpaperDark,
      }));
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);
  
  const handleDesktopContextMenu = useCallback((e) => {
    openContextMenu(e, [
      { label: "New Folder", action: () => console.log("New Folder") },
      { type: "divider" },
      { label: "Change Wallpaper", action: () => windowManager.openApp("settings", "Settings") }
    ]);
  }, [openContextMenu, windowManager.openApp]);

  // Мемоизированный список окон с глубокой оптимизацией
  const windowComponents = useMemo(() => {
    return windowManager.windows.map((win) => (
      <MemoizedAppWindow
        key={win.id}
        win={win}
        isActive={windowManager.activeWin === win.id}
        isMinimized={windowManager.minimizedApps.has(win.id)}
        onClose={() => windowManager.closeWindow(win.id)}
        onMinimize={() => windowManager.minimizeWindow(win.id)}
        onFocus={() => windowManager.focusWindow(win.id)}
        onZoom={() => windowManager.maximizeWindow(win.id)}
      >
        <Suspense fallback={<WindowLoading />}>
          {renderAppContent(win.id, { 
            closeWindow: windowManager.closeWindow, 
            minimizeWindow: windowManager.minimizeWindow, 
            maximizeWindow: windowManager.maximizeWindow, 
            setWallpaper 
          })}
        </Suspense>
      </MemoizedAppWindow>
    ));
  }, [
    windowManager.windows.length,
    windowManager.activeWin,
    windowManager.minimizedApps.size,
    windowManager.closeWindow,
    windowManager.minimizeWindow,
    windowManager.maximizeWindow,
    windowManager.focusWindow,
    setWallpaper,
  ]);

  if (!bootComplete) return <BootScreen onComplete={() => setBootComplete(true)} />;
  if (isMobile) return <MobileNotSupported />;

  return (
    <Desktop wallpaper={wallpaper.value} onContextMenu={handleDesktopContextMenu}>
      <MenuBar 
        activeApp={windowManager.activeWin} 
        onClose={() => windowManager.closeWindow(windowManager.activeWin)}
        onMinimize={() => windowManager.minimizeWindow(windowManager.activeWin)}
        onZoom={() => windowManager.maximizeWindow(windowManager.activeWin)}
      />

      {windowComponents}

      <Dock 
        onOpen={windowManager.openApp} 
        openApps={windowManager.openApps} 
        minimizedApps={windowManager.minimizedApps} 
        isLightTheme={isLightTheme}
      />

      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          items={contextMenu.items} 
          onClose={closeContextMenu} 
        />
      )}
    </Desktop>
  );
}