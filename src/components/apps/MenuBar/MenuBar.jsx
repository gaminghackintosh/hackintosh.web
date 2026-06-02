import React, { useState, useEffect, useRef, useCallback } from "react";
import AppleIcon from "../../AppleIcon";

import { FiWifi, FiMonitor } from "react-icons/fi";
import { BiBluetooth } from "react-icons/bi";
import { MdOutlineBedtime, MdOutlineScreenShare } from "react-icons/md";
import { TbLayoutSidebar } from "react-icons/tb";

import batteryIcon       from "../../../assets/icons/menuBar/battery_charge.png";
import wifiIcon          from "../../../assets/icons/menuBar/wi-fi.png";
import controlCenterIcon from "../../../assets/icons/menuBar/control_center.svg";

import AboutThisMac from "./AboutThisMac/ATM";

const AirDropIcon = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12 1a7 7 0 1 0 0 14A7 7 0 0 0 12 1zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 12 3zM6 17c0-2.76 2.69-5 6-5s6 2.24 6 5v.5H6V17z"/>
    <path d="M9.5 16.5 12 12l2.5 4.5h-5z" opacity=".7"/>
  </svg>
);

// ─── SmoothSlider ────────────────────────────────────────────────
// CSS-переменная --val обновляется ПРЯМО в DOM-элемент (onInput),
// минуя React state → нулевой lag при drag.
// State-коллбэк onCommit вызывается только по pointerup.
function SmoothSlider({ initialValue = 50, min = 0, max = 100, onCommit, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const pct = ((initialValue - min) / (max - min)) * 100;
    ref.current.style.setProperty("--val", `${pct}%`);
    ref.current.value = initialValue;
  }, []); // eslint-disable-line

  const onInput = (e) => {
    const pct = ((+e.target.value - min) / (max - min)) * 100;
    e.target.style.setProperty("--val", `${pct}%`);
  };

  const onPointerUp = (e) => onCommit?.(+e.target.value);

  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      defaultValue={initialValue}
      onInput={onInput}
      onPointerUp={onPointerUp}
      className={className}
    />
  );
}

// ─── CcTile ──────────────────────────────────────────────────────
function CcTile({ icon: Icon, label, active, onClick }) {
  return (
    <button className={`cc-tile${active ? " cc-tile--on" : ""}`} onClick={onClick}>
      <span className="cc-tile__icon"><Icon size={18} /></span>
      <span className="cc-tile__label">{label}</span>
    </button>
  );
}

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// ═══════════════════════════════════════════════════════════════════
export function MenuBar({ activeApp, openApp, onCloseWindow, onMinimizeWindow, onZoomWindow }) {
  const [time,      setTime]      = useState(new Date());
  const [activeMenu,setActiveMenu]= useState(null);
  const [showCC,    setShowCC]    = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [wifi,         setWifi]         = useState(true);
  const [bluetooth,    setBluetooth]    = useState(true);
  const [airdrop,      setAirdrop]      = useState(false);
  const [focus,        setFocus]        = useState(false);
  const [stageManager, setStageManager] = useState(false);
  const [screenMirror, setScreenMirror] = useState(false);

  const wifiName = "Kernel Panic Network";
  const barRef   = useRef(null);
  const ccRef    = useRef(null);
  const ccBtnRef = useRef(null);

  const appleMenuOptions = [
    { id:"about",    label:"About This Mac" },
    { id:"div1",     type:"divider" },
    { id:"settings", label:"System Settings…" },
    { id:"appstore", label:"App Store…" },
    { id:"div2",     type:"divider" },
    { id:"recent",   label:"Recent Items", submenu:true },
    { id:"div3",     type:"divider" },
    { id:"force",    label:`Force Quit ${activeApp||"Finder"}…`, shortcut:"⌥⇧⌘Q" },
    { id:"div4",     type:"divider" },
    { id:"sleep",    label:"Sleep" },
    { id:"restart",  label:"Restart…" },
    { id:"shutdown", label:"Shut Down…" },
    { id:"div5",     type:"divider" },
    { id:"lock",     label:"Lock Screen",  shortcut:"⌃⌘Q" },
    { id:"logout",   label:"Log Out ghost…", shortcut:"⇧⌘Q" },
  ];

  const menuOptions = {
    File:   ["New Folder","New Window","Open…","Close Window"],
    Edit:   ["Undo","Redo","Cut","Copy","Paste","Select All"],
    View:   ["Show Sidebar","Show Path Bar","Sort By","Clean Up"],
    Window: ["Minimize","Zoom","Bring All to Front","Close Window"],
    Help:   ["Search","About This Mac"],
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
      if (ccRef.current    && !ccRef.current.contains(e.target) &&
          ccBtnRef.current && !ccBtnRef.current.contains(e.target))
        setShowCC(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [showCC]);

  const fmt    = (d) => d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",second:"2-digit",hour12:true});
  const fmtD   = (d) => d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
  const onApple = (e) => { e.stopPropagation(); setActiveMenu(p => p===" "?null:" "); };
  const onAbout = () => { setActiveMenu(null); setShowAbout(true); };

  const NetRow = ({ icon: Icon, label, sub, active, onClick }) => (
    <div className={`cc-net-row${active?" cc-net-row--on":""}`} onClick={onClick}>
      <span className={`cc-net-icon${active?" cc-net-icon--on":""}`}><Icon size={14}/></span>
      <div className="cc-net-text">
        <span className="cc-net-label">{label}</span>
        <span className="cc-net-sub">{sub}</span>
      </div>
    </div>
  );

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
                              if(opt.id==="about")    { onAbout(); return; }
                              if(opt.id==="settings") { openApp?.("settings"); setActiveMenu(null); return; }
                              setActiveMenu(null);
                            }}>
                            <span className="menuBar__dropdownLabel">{opt.label}</span>
                            {opt.shortcut && <span className="menuBar__dropdownShortcut">{opt.shortcut}</span>}
                            {opt.submenu  && <span className="menuBar__dropdownIcon">›</span>}
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
                          if(opt==="About This Mac")   onAbout();
                          else if(opt==="Minimize")    onMinimizeWindow?.();
                          else if(opt==="Zoom")        onZoomWindow?.();
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
          <img src={wifiIcon}    alt="Wi-Fi"   className="menuBar__iconImg"/>
          <span className="menuBar__date">{fmtD(time)}</span>
          <span className="menuBar__time">{fmt(time)}</span>
        </div>
      </div>

      {/* ══ CONTROL CENTER ════════════════════════════════════════ */}
      {showCC && (
        <div ref={ccRef} className="cc">

          {/* Row 1: Network + Focus/Stage/Mirror */}
          <div className="cc__top">

            {/* Network group */}
            <div className="cc__card cc__network">
              <NetRow icon={FiWifi}      label="Wi-Fi"     sub={wifi      ? wifiName   : "Off"} active={wifi}      onClick={()=>setWifi(p=>!p)}/>
              <div className="cc__div"/>
              <NetRow icon={BiBluetooth} label="Bluetooth" sub={bluetooth ? "On"        : "Off"} active={bluetooth} onClick={()=>setBluetooth(p=>!p)}/>
              <div className="cc__div"/>
              <NetRow icon={AirDropIcon} label="AirDrop"   sub={airdrop   ? "Everyone"  : "Off"} active={airdrop}   onClick={()=>setAirdrop(p=>!p)}/>
            </div>

            {/* Tiles column */}
            <div className="cc__tiles">
              <CcTile icon={MdOutlineBedtime}    label="Focus"            active={focus}        onClick={()=>setFocus(p=>!p)}/>
              <div className="cc__tile-pair">
                <CcTile icon={TbLayoutSidebar}      label="Stage Manager"  active={stageManager} onClick={()=>setStageManager(p=>!p)}/>
                <CcTile icon={MdOutlineScreenShare} label="Screen Mirroring" active={screenMirror} onClick={()=>setScreenMirror(p=>!p)}/>
              </div>
            </div>
          </div>

          {/* Display */}
          <div className="cc__card cc__slider-card">
            <span className="cc__slider-title">Display</span>
            <div className="cc__slider-row">
              <FiMonitor size={13} className="cc__slider-icon"/>
              <SmoothSlider initialValue={75} className="cc__slider"/>
            </div>
          </div>

          {/* Sound */}
          <div className="cc__card cc__slider-card">
            <span className="cc__slider-title">Sound</span>
            <div className="cc__slider-row">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="cc__slider-icon">
                <path d="M12 3a9 9 0 0 0-9 9v3a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5.1A7 7 0 0 1 19 12h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1a3 3 0 0 0 3-3v-3a9 9 0 0 0-9-9z"/>
              </svg>
              <SmoothSlider initialValue={55} className="cc__slider"/>
            </div>
          </div>

        </div>
      )}

      {showAbout && <AboutThisMac onClose={()=>setShowAbout(false)}/>}
    </>
  );
}