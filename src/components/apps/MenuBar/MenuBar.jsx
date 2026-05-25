import React, { useState, useEffect, useRef } from "react";
import AppleIcon from "../../AppleIcon";

/* ===== ИКОНКИ ДЛЯ CONTROL CENTER ===== */
import { FiWifi, FiBluetooth, FiAirplay, FiMoon, FiMusic, FiPlay, FiPause, FiMonitor, FiVolume2 } from "react-icons/fi";
import { MdOutlineBedtime, MdOutlineScreenShare } from "react-icons/md";
import { IoSwapHorizontalOutline } from "react-icons/io5";

/* ===== ASSETS ===== */
import batteryIcon from "../../../assets/icons/menuBar/battery_charge.png";
import wifiIcon from "../../../assets/icons/menuBar/wi-fi.png";
import controlCenterIcon from "../../../assets/icons/menuBar/control_center.svg";

export function MenuBar({ activeApp }) {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airdropEnabled, setAirdropEnabled] = useState(false);
  const [stageManagerEnabled, setStageManagerEnabled] = useState(true);
  const [screenMirroring, setScreenMirroring] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({ title: "Zemfira – земфира", isPlaying: true });

  const barRef = useRef(null);
  const controlCenterRef = useRef(null);
  const controlCenterButtonRef = useRef(null);

  const wifiName = "Kernel Panic Network";

  const menuOptions = {
    File: ["New Folder", "New Window", "Open...", "Close Window"],
    Edit: ["Undo", "Redo", "Cut", "Copy", "Paste", "Select All"],
    View: ["Show Sidebar", "Show Path Bar", "Sort By", "Clean Up"],
    Window: ["Minimize", "Zoom", "Bring All to Front"],
    Help: ["Search", "About This Mac"],
  };

  const leftItems = [" ", activeApp || "Finder", "File", "Edit", "View", "Window", "Help"];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activeMenu) return;
    const handleClickOutside = (event) => {
      if (barRef.current && !barRef.current.contains(event.target)) setActiveMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenu]);

  useEffect(() => {
    if (!showControlCenter) return;
    const handleClickOutside = (event) => {
      if (
        controlCenterRef.current && !controlCenterRef.current.contains(event.target) &&
        controlCenterButtonRef.current && !controlCenterButtonRef.current.contains(event.target)
      ) {
        setShowControlCenter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showControlCenter]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark-mode");
    else document.documentElement.classList.remove("dark-mode");
  }, [darkMode]);

  const fmtTime = (date) =>
    date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const fmtDate = (date) =>
    date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const toggleControlCenter = () => setShowControlCenter(!showControlCenter);

  return (
    <div ref={barRef} className="menuBar">
      <div className="menuBar__left">
        {leftItems.map((item, i) => {
          const isClickable = i > 1;
          return (
            <div key={i} className="menuBar__itemWrapper">
              <span
                className={[
                  "menuBar__item",
                  isClickable ? "isClickable" : "",
                  activeMenu === item ? "isActive" : "",
                  i === 0 ? "isApple" : "",
                  i <= 1 ? "isBold" : "",
                ].join(" ")}
                onClick={() => {
                  if (!isClickable) return;
                  setActiveMenu(activeMenu === item ? null : item);
                }}
              >
                {item === " " ? <AppleIcon /> : item}
              </span>
              {activeMenu === item && menuOptions[item] && (
                <div className="menuBar__dropdown">
                  {menuOptions[item].map((option, idx) => (
                    <div key={idx} className="menuBar__dropdownItem" onClick={() => setActiveMenu(null)}>
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="menuBar__right">
        <div ref={controlCenterButtonRef} className="menuBar__controlCenterBtn" onClick={toggleControlCenter}>
          <img src={controlCenterIcon} alt="Control Center" className="menuBar__iconImg" />
        </div>
        <img src={batteryIcon} alt="Battery" className="menuBar__iconImg" />
        <img src={wifiIcon} alt="Wifi" className="menuBar__iconImg" />
        <span className="menuBar__date">{fmtDate(time)}</span>
        <span className="menuBar__time">{fmtTime(time)}</span>
      </div>

      {/* ПАНЕЛЬ CONTROL CENTER */}
      {showControlCenter && (
        <div ref={controlCenterRef} className="controlCenter">
          <div className="controlCenter__grid">
            {/* СЕКЦИЯ СЕТИ (Wi-Fi, Bluetooth, AirDrop) – как в macOS */}
            <div className="controlCenter__networkGroup">
              <div className="controlCenter__networkItem">
                <FiWifi className="controlCenter__networkIcon" />
                <div>
                  <div className="controlCenter__networkLabel">Wi-Fi</div>
                  <div className="controlCenter__networkStatus">{wifiName}</div>
                </div>
              </div>
              <div className="controlCenter__networkItem">
                <FiBluetooth className="controlCenter__networkIcon" />
                <div>
                  <div className="controlCenter__networkLabel">Bluetooth</div>
                  <div className="controlCenter__networkStatus">{bluetoothEnabled ? "On" : "Off"}</div>
                </div>
                <label className="controlCenter__toggle">
                  <input type="checkbox" checked={bluetoothEnabled} onChange={() => setBluetoothEnabled(!bluetoothEnabled)} />
                  <span className="controlCenter__toggleSlider" />
                </label>
              </div>
              <div className="controlCenter__networkItem">
                <FiAirplay className="controlCenter__networkIcon" />
                <div>
                  <div className="controlCenter__networkLabel">AirDrop</div>
                  <div className="controlCenter__networkStatus">{airdropEnabled ? "Everyone" : "Off"}</div>
                </div>
                <label className="controlCenter__toggle">
                  <input type="checkbox" checked={airdropEnabled} onChange={() => setAirdropEnabled(!airdropEnabled)} />
                  <span className="controlCenter__toggleSlider" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}