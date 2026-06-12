import React, { useState, useEffect, useRef, memo } from "react";
import { AppleIcon } from "@/ui";
import { useTheme } from "@/core/providers";

import { MenuBarClock } from "./MenuBar/MenuBarClock";
import { ControlCenter } from "./MenuBar/ControlCenter";
import { APPLE_MENU_OPTIONS, MENU_OPTIONS } from "./MenuBar/constants";

import batteryIcon       from "./../../assets/icons/menuBar/battery_charge.png";
import wifiIcon          from "./../../assets/icons/menuBar/wi-fi.png";
import controlCenterIcon from "./../../assets/icons/menuBar/control_center.svg";

import AboutThisMac from "./AboutThisMac/ATM";

// ═══════════════════════════════════════════════════════════════════
export const MenuBar = memo(function MenuBar({ activeApp, openApp, onCloseWindow, onMinimizeWindow, onZoomWindow }) {
  // ─── Menu states ──────────────────────────────────────────────────
  const [activeMenu, setActiveMenu] = useState(null);
  const [showCC, setShowCC] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  // ─── Theme ────────────────────────────────────────────────────────
  const { isLightTheme, toggleTheme } = useTheme();

  // ─── Connectivity states ──────────────────────────────────────────
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  
  // ─── Quick actions ────────────────────────────────────────────────
  const [focus, setFocus] = useState(false);
  const [stageManager, setStageManager] = useState(false);
  const [screenMirror, setScreenMirror] = useState(false);
  
  // ─── Sliders ──────────────────────────────────────────────────────
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(55);

  // ─── Refs ─────────────────────────────────────────────────────────
  const barRef = useRef(null);
  const ccBtnRef = useRef(null);

  // ─── Close menus on outside click ─────────────────────────────────
  useEffect(() => {
    if (!activeMenu) return;
    const h = (e) => { 
      if (barRef.current && !barRef.current.contains(e.target)) setActiveMenu(null); 
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [activeMenu]);

  // ─── Handlers ─────────────────────────────────────────────────────
  const handleAppleClick = (e) => {
    e.stopPropagation();
    setActiveMenu(p => p === " " ? null : " ");
  };

  const handleMenuItemClick = (item) => {
    setActiveMenu(p => p === item ? null : item);
  };

  const handleAppleMenuSelect = (opt) => {
    if (opt.id === "about") {
      setShowAbout(true);
      setActiveMenu(null);
      return;
    }
    if (opt.id === "settings") {
      openApp?.("settings");
      setActiveMenu(null);
      return;
    }
    setActiveMenu(null);
  };

  const handleMenuAction = (opt) => {
    switch (opt) {
      case "About This Mac":
        setShowAbout(true);
        break;
      case "Minimize":
        onMinimizeWindow?.();
        break;
      case "Zoom":
        onZoomWindow?.();
        break;
      case "Close Window":
        onCloseWindow?.();
        break;
      default:
        break;
    }
    setActiveMenu(null);
  };

  const handleCCClick = () => {
    setShowCC(p => !p);
  };

  const handleCloseCC = () => {
    setShowCC(false);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  // ─── Render ───────────────────────────────────────────────────────
  const appName = (activeApp || "Finder").charAt(0).toUpperCase() + (activeApp || "Finder").slice(1);
  const leftItems = [" ", appName, "File", "Edit", "View", "Window", "Help"];

  return (
    <>
      <div ref={barRef} className="menuBar">
        <div className="menuBar__left">
          {leftItems.map((item, i) => {
            const clickable = i > 1 || i === 0;
            const isBold = i <= 1;
            const isActive = activeMenu === item;
            const isApple = i === 0;
            
            return (
              <div key={i} className="menuBar__itemWrapper">
                <span className={`menuBar__item ${clickable ? "isClickable" : ""} ${isActive ? "isActive" : ""} ${isBold ? "isBold" : ""} ${isApple ? "isApple" : ""}`}>
                  {isApple ? <AppleIcon /> : item}
                </span>

                {clickable && (
                  <div
                    className="menuBar__item-click-overlay"
                    onClick={isApple ? handleAppleClick : () => handleMenuItemClick(item)}
                  />
                )}

                {activeMenu === " " && isApple && (
                  <div className="menuBar__dropdown apple-menu">
                    {APPLE_MENU_OPTIONS.map((opt, idx) =>
                      opt.type === "divider"
                        ? <div key={idx} className="menuBar__dropdownDivider" />
                        : (
                          <div 
                            key={idx} 
                            className="menuBar__dropdownItem"
                            onClick={() => handleAppleMenuSelect(opt)}
                          >
                            <span className="menuBar__dropdownLabel">
                              {opt.dynamicApp ? `${opt.label} ${appName}…` : opt.label}
                              {opt.dynamicUser && " ghost…"}
                            </span>
                            {opt.shortcut && <span className="menuBar__dropdownShortcut">{opt.shortcut}</span>}
                            {opt.submenu && <span className="menuBar__dropdownIcon">›</span>}
                          </div>
                        )
                    )}
                  </div>
                )}

                {activeMenu === item && MENU_OPTIONS[item] && (
                  <div className="menuBar__dropdown">
                    {MENU_OPTIONS[item].map((opt, idx) => (
                      <div key={idx} className="menuBar__dropdownItem" onClick={() => handleMenuAction(opt)}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="menuBar__right">
          <div ref={ccBtnRef} className="menuBar__controlCenterBtn" onClick={handleCCClick}>
            <img src={controlCenterIcon} alt="Control Center" className="menuBar__iconImg"/>
          </div>
          <img src={batteryIcon} alt="Battery" className="menuBar__iconImg"/>
          <img src={wifiIcon} alt="Wi-Fi" className="menuBar__iconImg"/>
          <MenuBarClock />
        </div>
      </div>

      {showCC && (
        <ControlCenter
          wifi={wifi} setWifi={setWifi}
          bluetooth={bluetooth} setBluetooth={setBluetooth}
          airdrop={airdrop} setAirdrop={setAirdrop}
          focus={focus} setFocus={setFocus}
          stageManager={stageManager} setStageManager={setStageManager}
          screenMirror={screenMirror} setScreenMirror={setScreenMirror}
          brightness={brightness} setBrightness={setBrightness}
          volume={volume} setVolume={setVolume}
          isLightTheme={isLightTheme}
          toggleTheme={toggleTheme}
          onClose={handleCloseCC}
        />
      )}

      {showAbout && <AboutThisMac onClose={handleCloseAbout} />}
    </>
  );
});

export default MenuBar;
