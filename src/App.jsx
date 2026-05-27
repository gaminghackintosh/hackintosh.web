import React, { useState, useEffect } from "react";

import {
  DESKTOP_ICONS,
  DESKTOP_ICON_FALLBACK,
} from "./assets/paths";

import BootScreen from "./components/Boot/BootScreen";
import Dock from "./components/Dock";

import FinderContent from "./components/Finder/FinderContent";
import MobileNotSupported from "./components/MNS/MobileNotSupported";

import { APPS } from "./constants/apps";
import { AppWindow } from "./components/AppWindow/AppWindow";

import { MenuBar } from "./components/apps/MenuBar/MenuBar";
import { TerminalContent } from "./components/apps/Terminal/Terminal";
import { NotesContent } from "./components/apps/Notes/NotesContent";
import { SettingsContent } from "./components/apps/Settings/SettingsContent";

import { DEFAULT_WALLPAPER } from "./constants/wallpapers";

const INITIAL_POSITIONS = {
  finder: { x: 80, y: 56, w: 740, h: 500 },
  safari: { x: 100, y: 60, w: 780, h: 520 },
  notes: { x: 200, y: 90, w: 620, h: 440 },
  terminal: { x: 140, y: 70, w: 780, h: 520 },
  settings: { x: 80, y: 56, w: 740, h: 500 },
  music: { x: 180, y: 80, w: 740, h: 500 },
};

function PlaceholderContent({ appId }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      gap: 14,
      color: "rgba(255,255,255,0.35)",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <span style={{ fontSize: 24 }}>{appId}</span>
    </div>
  );
}

let zCounter = 10;

export default function App() {
  const [windows, setWindows] = useState([]);
  const [openApps, setOpenApps] = useState([]);
  const [activeWin, setActiveWin] = useState(null);

  const [bootComplete, setBootComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [wallpaperState, setWallpaperState] = useState({
    id: DEFAULT_WALLPAPER.id,
    type: "image",
    value: DEFAULT_WALLPAPER.image,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openApp = (appId) => {
    const existing = windows.find((w) => w.id === appId);
    if (existing) return focusWindow(appId);

    const p = INITIAL_POSITIONS[appId] || { x: 120, y: 80, w: 600, h: 420 };
    const app = APPS.find((a) => a.id === appId);

    setWindows((prev) => [
      ...prev,
      {
        id: appId,
        title: app?.name || appId,
        x: p.x,
        y: p.y,
        width: p.w,
        height: p.h,
        zIndex: ++zCounter,
      },
    ]);

    setOpenApps((prev) => [...new Set([...prev, appId])]);
    setActiveWin(appId);
  };

  const closeWindow = (appId) => {
    setWindows((prev) => prev.filter((w) => w.id !== appId));
    setOpenApps((prev) => prev.filter((id) => id !== appId));
  };

  const focusWindow = (appId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === appId ? { ...w, zIndex: ++zCounter } : w
      )
    );
    setActiveWin(appId);
  };

  const renderContent = (appId) => {
    switch (appId) {
      case "finder":
        return <FinderContent openApp={openApp} />;
      case "terminal":
        return <TerminalContent />;
      case "notes":
        return <NotesContent />;
      case "settings":
        return (
          <SettingsContent
            currentWallpaper={wallpaperState.id}
            onWallpaperChange={setWallpaperState}
          />
        );
      default:
        return <PlaceholderContent appId={appId} />;
    }
  };

  const activeApp = activeWin
    ? APPS.find((a) => a.id === activeWin)?.name
    : "Finder";

  if (!bootComplete)
    return <BootScreen onComplete={() => setBootComplete(true)} />;

  if (isMobile)
    return <MobileNotSupported />;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundImage: `url(${wallpaperState.value})`,
        backgroundSize: "cover",
      }}
    >
      <MenuBar activeApp={activeApp} />

      {windows.map((win) => (
        <AppWindow
          key={win.id}
          win={win}
          isActive={activeWin === win.id}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => closeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          titleBarHidden={win.id === "settings"}
        >
          {renderContent(win.id)}
        </AppWindow>
      ))}

      <Dock onOpen={openApp} openApps={openApps} />
    </div>
  );
}