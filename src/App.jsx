import React, { Suspense, useState } from "react";

// Импортируем хуки
import { useMobileCheck } from "./hooks/useMobileCheck";
import { useWindowManager } from "./hooks/useWindowManager";
import { useContextMenu } from "./hooks/useContextMenu";

// Компоненты UI
import BootScreen from "./components/Boot/BootScreen";
import MobileNotSupported from "./components/MNS/MobileNotSupported";
import Dock from "./components/Dock";
import { AppWindow } from "./components/AppWindow/AppWindow";
import { MenuBar } from "./components/apps/MenuBar/MenuBar";
import { ContextMenu } from "./components/ContextMenu/ContextMenu";
import { Desktop } from "./components/Desktop";

// Константы и лоадеры
import { WindowLoading } from "./components/Loaders/WindowLoading"; 
import { renderAppContent } from "./utils/renderAppContent"; 

// Импорт обоев (убедись, что путь верный)
import defaultWallpaper from "./assets/images/wallpapers/Tahoe/Tahoe Light.png";

export default function App() {
  const { 
    windows, openApps, activeWin, minimizedApps, 
    openApp, closeWindow, minimizeWindow, maximizeWindow, focusWindow 
  } = useWindowManager();

  const { contextMenu, openContextMenu, closeContextMenu } = useContextMenu();
  const isMobile = useMobileCheck();
  
  const [bootComplete, setBootComplete] = useState(false);
  
  // Инициализируем обои объектом, чтобы не было ошибки undefined.value
  const [wallpaper, setWallpaper] = useState({
    id: "sequoia_11",
    type: "image",
    value: defaultWallpaper,
  });

  if (!bootComplete) return <BootScreen onComplete={() => setBootComplete(true)} />;
  if (isMobile) return <MobileNotSupported />;

  return (
    <Desktop wallpaper={wallpaper.value} onContextMenu={openContextMenu}>
      {/* Верхняя панель */}
      <MenuBar 
        activeApp={activeWin} 
        onClose={() => closeWindow(activeWin)}
        onMinimize={() => minimizeWindow(activeWin)}
        onZoom={() => maximizeWindow(activeWin)}
      />

      {/* Окна */}
      {windows.map((win) => (
        <AppWindow
          key={win.id}
          win={win}
          isActive={activeWin === win.id}
          isMinimized={minimizedApps.has(win.id)}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          onZoom={() => maximizeWindow(win.id)}
        >
          <Suspense fallback={<WindowLoading />}>
            {renderAppContent(win.id, { 
                closeWindow, minimizeWindow, maximizeWindow, 
                setWallpaper 
            })}
          </Suspense>
        </AppWindow>
      ))}

      {/* Док */}
      <Dock onOpen={openApp} openApps={openApps} minimizedApps={minimizedApps} />

      {/* Контекстное меню */}
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