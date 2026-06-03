import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { AppleIcon } from "../../../components/ui";
import { useTheme } from "@/core/providers";

import { FiWifi, FiSun } from "react-icons/fi";
import { BiBluetooth } from "react-icons/bi";

import batteryIcon       from "../../../assets/icons/menuBar/battery_charge.png";
import wifiIcon          from "../../../assets/icons/menuBar/wi-fi.png";
import controlCenterIcon from "../../../assets/icons/menuBar/control_center.svg";

import AboutThisMac from "./AboutThisMac/ATM";

// ─── Icon Components ────────────────────────────────────────────────
const AirDropIcon = memo(({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12 1a7 7 0 1 0 0 14A7 7 0 0 0 12 1zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 12 3zM6 17c0-2.76 2.69-5 6-5s6 2.24 6 5v.5H6V17z"/>
    <path d="M9.5 16.5 12 12l2.5 4.5h-5z" opacity=".7"/>
  </svg>
));

const SleepIcon = memo(({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M21 10.5V6a1 1 0 0 0-1-1h-5V3a1 1 0 0 0-2 0v2H8a1 1 0 0 0-1 1v10h14v-5.5zm-2 3.5H9V7h5v2a1 1 0 0 0 2 0V7h3v7z"/>
    <circle cx="15" cy="10" r="1.5"/>
  </svg>
));

const StageManagerIcon = memo(({ size = 15 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <rect x="2" y="4" width="13" height="16" rx="2" opacity="0.5"/>
    <rect x="9" y="4" width="13" height="16" rx="2"/>
  </svg>
));

const ScreenMirroringIcon = memo(({ size = 15 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <rect x="2" y="4" width="20" height="14" rx="2"/>
    <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
));

const DisplayIcon = memo(({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <rect x="3" y="3" width="18" height="12" rx="2"/>
    <path d="M7 20h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
));

const SoundIcon = memo(({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M18.36 5.64a8 8 0 0 1 0 11.31"/>
  </svg>
));

const AirPlayIcon = memo(({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M6 18l6-6 6 6H6zM6 14l6-6 6 6H6zM3 20h18v2H3v-2z"/>
  </svg>
));

const ThemeIcon = memo(({ size = 18, isLight }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    {isLight ? (
      <>
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </>
    ) : (
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
    )}
  </svg>
));

const FocusIcon = memo(({ size = 17 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <circle cx="12" cy="12" r="10" opacity="0.2"/>
    <circle cx="12" cy="12" r="6" opacity="0.5"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
));

// ─── Vertical Slider (Sequoia стиль с иконкой внутри) ──────────────
const VerticalSlider = memo(function VerticalSlider({ initialValue = 50, icon: Icon, label, onValueChange }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((value) => {
    if (!trackRef.current) return;
    const pct = Math.max(0, Math.min(100, value));
    trackRef.current.style.setProperty('--fill', `${pct}%`);
    onValueChange?.(pct);
  }, [onValueChange]);

  useEffect(() => {
    updateSlider(initialValue);
  }, [initialValue, updateSlider]);

  const handlePointer = useCallback((clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    updateSlider((x / rect.width) * 100);
  }, [updateSlider]);

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    handlePointer(e.clientX);
    const move = (ev) => { if (isDragging.current) handlePointer(ev.clientX); };
    const up = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }, [handlePointer]);

  return (
    <div className="cc-slider-block">
      <div className="cc-slider-bar" ref={trackRef} onMouseDown={handleMouseDown}>
        <div className="cc-slider-fill" />
        {Icon && <span className="cc-slider-glyph"><Icon size={18} /></span>}
      </div>
      <span className="cc-slider-caption">{label}</span>
    </div>
  );
});

// ─── Connectivity Item (строка в общем блоке) ──────────────────────
const ConnectivityItem = memo(function ConnectivityItem({ icon: Icon, label, status, active, onClick }) {
  return (
    <button className="cc-conn-item" onClick={onClick}>
      <div className={`cc-conn-icon ${active ? "cc-conn-icon--active" : ""}`}>
        <Icon size={17} />
      </div>
      <div className="cc-conn-text">
        <span className="cc-conn-label">{label}</span>
        <span className="cc-conn-status">{status}</span>
      </div>
    </button>
  );
});

// ─── Tile (квадратная плитка как в Sequoia) ────────────────────────
const Tile = memo(function Tile({ icon: Icon, title, subtitle, active, accent, onClick }) {
  return (
    <button
      className={`cc-tile ${active ? "cc-tile--active" : ""}`}
      style={active && accent ? { "--tile-accent": accent } : undefined}
      onClick={onClick}
    >
      <div className="cc-tile-icon">
        <Icon size={20} />
      </div>
      <div className="cc-tile-text">
        <span className="cc-tile-title">{title}</span>
        {subtitle && <span className="cc-tile-subtitle">{subtitle}</span>}
      </div>
    </button>
  );
});

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// ═══════════════════════════════════════════════════════════════════
export const MenuBar = memo(function MenuBar({ activeApp, openApp, onCloseWindow, onMinimizeWindow, onZoomWindow }) {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);
  const [showCC, setShowCC] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  const { isLightTheme, toggleTheme } = useTheme();

  // Connectivity states
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  
  // Quick actions
  const [focus, setFocus] = useState(false);
  const [stageManager, setStageManager] = useState(false);
  const [screenMirror, setScreenMirror] = useState(false);
  
  // Sliders
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(55);

  const wifiName = "Kernel Panic Network";
  const barRef = useRef(null);
  const ccRef = useRef(null);
  const ccBtnRef = useRef(null);

  const appleMenuOptions = [
    { id:"about", label:"About This Mac" },
    { id:"div1", type:"divider" },
    { id:"settings", label:"System Settings…" },
    { id:"appstore", label:"App Store…" },
    { id:"div2", type:"divider" },
    { id:"recent", label:"Recent Items", submenu:true },
    { id:"div3", type:"divider" },
    { id:"force", label:`Force Quit ${activeApp||"Finder"}…`, shortcut:"⌥⇧⌘Q" },
    { id:"div4", type:"divider" },
    { id:"sleep", label:"Sleep" },
    { id:"restart", label:"Restart…" },
    { id:"shutdown", label:"Shut Down…" },
    { id:"div5", type:"divider" },
    { id:"lock", label:"Lock Screen", shortcut:"⌃⌘Q" },
    { id:"logout", label:"Log Out ghost…", shortcut:"⇧⌘Q" },
  ];

  const menuOptions = {
    File: ["New Folder","New Window","Open…","Close Window"],
    Edit: ["Undo","Redo","Cut","Copy","Paste","Select All"],
    View: ["Show Sidebar","Show Path Bar","Sort By","Clean Up"],
    Window: ["Minimize","Zoom","Bring All to Front","Close Window"],
    Help: ["Search","About This Mac"],
  };

  const leftItems = [" ", activeApp||"Finder","File","Edit","View","Window","Help"];

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!activeMenu) return;
    const h = (e) => { if (barRef.current && !barRef.current.contains(e.target)) setActiveMenu(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [activeMenu]);

  useEffect(() => {
    if (!showCC) return;
    const h = (e) => {
      if (ccRef.current && !ccRef.current.contains(e.target) &&
          ccBtnRef.current && !ccBtnRef.current.contains(e.target))
        setShowCC(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [showCC]);

  const fmt = (d) => d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:true});
  const fmtD = (d) => d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
  const onApple = (e) => { e.stopPropagation(); setActiveMenu(p => p===" "?null:" "); };
  const onAbout = () => { setActiveMenu(null); setShowAbout(true); };

  return (
    <>
      <div ref={barRef} className="menuBar">
        <div className="menuBar__left">
          {leftItems.map((item, i) => {
            const clickable = i > 1 || i === 0;
            return (
              <div key={i} className="menuBar__itemWrapper">
                <span
                  className={["menuBar__item", clickable?"isClickable":"", activeMenu===item?"isActive":"", i===0?"isApple":"", i<=1?"isBold":""].join(" ")}
                  onClick={(e) => { if(i===0) onApple(e); else if(clickable) setActiveMenu(activeMenu===item?null:item); }}
                >
                  {item === " " ? <AppleIcon/> : (i === 1 ? capitalizeFirstLetter(item) : item)}
                </span>

                {activeMenu===" " && i===0 && (
                  <div className="menuBar__dropdown apple-menu">
                    {appleMenuOptions.map((opt,idx) =>
                      opt.type==="divider"
                        ? <div key={idx} className="menuBar__dropdownDivider"/>
                        : (
                          <div key={idx} className="menuBar__dropdownItem"
                            onClick={() => {
                              if(opt.id==="about") { onAbout(); return; }
                              if(opt.id==="settings") { openApp?.("settings"); setActiveMenu(null); return; }
                              setActiveMenu(null);
                            }}>
                            <span className="menuBar__dropdownLabel">{opt.label}</span>
                            {opt.shortcut && <span className="menuBar__dropdownShortcut">{opt.shortcut}</span>}
                            {opt.submenu && <span className="menuBar__dropdownIcon">›</span>}
                          </div>
                        )
                    )}
                  </div>
                )}

                {activeMenu===item && menuOptions[item] && (
                  <div className="menuBar__dropdown">
                    {menuOptions[item].map((opt,idx) => (
                      <div key={idx} className="menuBar__dropdownItem"
                        onClick={() => {
                          if(opt==="About This Mac") onAbout();
                          else if(opt==="Minimize") onMinimizeWindow?.();
                          else if(opt==="Zoom") onZoomWindow?.();
                          else if(opt==="Close Window") onCloseWindow?.();
                          else setActiveMenu(null);
                        }}>
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
          <div ref={ccBtnRef} className="menuBar__controlCenterBtn" onClick={() => setShowCC(p=>!p)}>
            <img src={controlCenterIcon} alt="Control Center" className="menuBar__iconImg"/>
          </div>
          <img src={batteryIcon} alt="Battery" className="menuBar__iconImg"/>
          <img src={wifiIcon} alt="Wi-Fi" className="menuBar__iconImg"/>
          <span className="menuBar__date">{fmtD(time)}</span>
          <span className="menuBar__time">{fmt(time)}</span>
        </div>
      </div>

      {/* ══ macOS SEQUOIA CONTROL CENTER ════════════════════════════ */}
      {showCC && (
        <div ref={ccRef} className="cc">
          
          {/* Верхний ряд: блок связи + плитки Focus/Mirroring */}
          <div className="cc__row">
            {/* Объединённый блок связи */}
            <div className="cc-card cc-card--connectivity">
              <ConnectivityItem 
                icon={FiWifi} 
                label="Wi-Fi" 
                status={wifi ? wifiName : "Off"} 
                active={wifi} 
                onClick={() => setWifi(p => !p)} 
              />
              <ConnectivityItem 
                icon={BiBluetooth} 
                label="Bluetooth" 
                status={bluetooth ? "On" : "Off"} 
                active={bluetooth} 
                onClick={() => setBluetooth(p => !p)} 
              />
              <ConnectivityItem 
                icon={AirDropIcon} 
                label="AirDrop" 
                status={airdrop ? "Everyone" : "Off"} 
                active={airdrop} 
                onClick={() => setAirdrop(p => !p)} 
              />
            </div>

            {/* Колонка плиток */}
            <div className="cc__tiles-col">
              <Tile
                icon={FocusIcon}
                title="Focus"
                subtitle={focus ? "On" : undefined}
                active={focus}
                accent="#6F5AF2"
                onClick={() => setFocus(p => !p)}
              />
              <Tile
                icon={ScreenMirroringIcon} 
                title="Screen Mirroring"
                active={screenMirror} 
                onClick={() => setScreenMirror(p => !p)} 
              />
            </div>
          </div>

          {/* Stage Manager — широкая плитка */}
          <div className="cc-card cc-card--wide">
            <Tile
              icon={StageManagerIcon}
              title="Stage Manager"
              subtitle={stageManager ? "On" : "Off"}
              active={stageManager}
              onClick={() => setStageManager(p => !p)}
            />
          </div>

          {/* Слайдер Display */}
          <div className="cc-card cc-card--slider">
            <span className="cc-card-title">Display</span>
            <VerticalSlider
              initialValue={brightness}
              icon={FiSun}
              onValueChange={setBrightness}
            />
          </div>

          {/* Слайдер Sound */}
          <div className="cc-card cc-card--slider">
            <span className="cc-card-title">Sound</span>
            <VerticalSlider
              initialValue={volume}
              icon={SoundIcon}
              onValueChange={setVolume}
            />
          </div>

          {/* Нижний ряд: переключатель темы */}
          <div className="cc-card cc-card--theme" onClick={toggleTheme}>
            <div className="cc-conn-icon cc-conn-icon--active">
              <ThemeIcon size={17} isLight={isLightTheme} />
            </div>
            <span className="cc-conn-label">{isLightTheme ? "Light Mode" : "Dark Mode"}</span>
          </div>

        </div>
      )}

      {showAbout && <AboutThisMac onClose={()=>setShowAbout(false)}/>}
    </>
  );
});

export default MenuBar;
