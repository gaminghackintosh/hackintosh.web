import React, { useRef, useEffect, memo, useState } from "react";
import { FiWifi, FiSun, FiMoon, FiClock, FiCamera, FiMusic, FiGrid, FiVolume2, FiHeadphones, FiPause, FiPlay, FiFastForward, FiActivity, FiRadio } from "react-icons/fi";
import { BiBluetooth } from "react-icons/bi";
import { WIFI_NAME, AirDropIcon, StageManagerIcon, ScreenMirroringIcon, SoundIcon, FocusIcon } from "./constants";
import { VerticalSlider } from "./VerticalSlider";

import defaultAlbumArt from "@/assets/images/AlbumIMG.jpg";

// ═══════════════════════════════════════════════════════════════════
//  MUSIC / NOW PLAYING WIDGET
// ═══════════════════════════════════════════════════════════════════

const MusicWidget = memo(({ track, artist, isPlaying, onToggle, coverUrl }) => {
  const [imgSrc, setImgSrc] = useState(coverUrl || defaultAlbumArt);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (imgSrc !== defaultAlbumArt) {
      setImgSrc(defaultAlbumArt);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="cc-music-widget">
      <div className="cc-music-main-info">
        <div className="cc-music-art">
          {!isError ? (
            <img
              src={imgSrc}
              alt="Album Art"
              className="cc-music-art-img"
              onError={handleError}
            />
          ) : (
            <div className="cc-music-art-placeholder">
              <FiMusic size={18} />
            </div>
          )}
        </div>
        <div className="cc-music-text">
          <div className="cc-music-title">{track}</div>
          {artist && <div className="cc-music-artist">{artist}</div>}
        </div>
      </div>
      <div className="cc-music-controls">
        <button className="cc-music-btn cc-music-btn--play" onClick={onToggle} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
        </button>
        <button className="cc-music-btn" aria-label="Fast forward">
          <FiFastForward size={16} />
        </button>
      </div>
    </div>
  );
});

const QuickAction = memo(({ icon: Icon, label, active, onClick }) => (
  <button
    className={`cc-quick-action${active ? " cc-quick-action--active" : ""}`}
    onClick={onClick}
    title={label}
  >
    <Icon size={18} />
  </button>
));

export const ControlCenter = memo(function ControlCenter({
  wifi, setWifi,
  bluetooth, setBluetooth,
  airdrop, setAirdrop,
  focus, setFocus,
  stageManager, setStageManager,
  screenMirror, setScreenMirror,
  brightness, setBrightness,
  volume, setVolume,
  isLightTheme, toggleTheme,
  onClose
}) {
  const ccRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ccRef.current && !ccRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div ref={ccRef} className={`cc-panel ${isLightTheme ? "" : "dark-theme"}`}>

      {/* ── ACTIVE AUDIO CONTEXT ── */}
      <div className="cc-now-context">
        <span className="cc-context-icon">
          <FiHeadphones size={12} />
        </span>
        <span>Audio Routing Kit (ARK)</span>
      </div>

      {/* ── CONNECTIVITY (left) + FOCUS / STAGE MANAGER / SCREEN MIRRORING (right) ── */}
      <div className="cc-grid-main">

        <div className="cc-card cc-card--connectivity">
          <div className="cc-conn-item" onClick={() => setWifi(!wifi)}>
            <div className={`cc-icon-circle ${wifi ? "active-blue" : ""}`}>
              <FiWifi size={14} />
            </div>
            <div className="cc-conn-text">
              <span className="cc-label-main">Wi-Fi</span>
              <span className="cc-label-sub">{wifi ? WIFI_NAME : "Off"}</span>
            </div>
          </div>
          <div className="cc-conn-item" onClick={() => setBluetooth(!bluetooth)}>
            <div className={`cc-icon-circle ${bluetooth ? "active-blue" : ""}`}>
              <BiBluetooth size={14} />
            </div>
            <div className="cc-conn-text">
              <span className="cc-label-main">Bluetooth</span>
              <span className="cc-label-sub">{bluetooth ? "On" : "Off"}</span>
            </div>
          </div>
          <div className="cc-conn-item" onClick={() => setAirdrop(!airdrop)}>
            <div className={`cc-icon-circle ${airdrop ? "active-blue" : ""}`}>
              <AirDropIcon size={16} className={airdrop ? "active-blue" : ""} />
            </div>
            <div className="cc-conn-text">
              <span className="cc-label-main">AirDrop</span>
              <span className="cc-label-sub">{airdrop ? "Everyone" : "Off"}</span>
            </div>
          </div>
        </div>

        <div className="cc-right-column">
          <button className={`cc-focus-row ${focus ? "active-purple" : ""}`} onClick={() => setFocus(!focus)}>
            <div className="cc-icon-circle">
              <FocusIcon size={15} />
            </div>
            <span className="cc-label-main">Focus</span>
          </button>

          <div className="cc-utilities-row">
            <button
              className={`cc-utility-square ${stageManager ? "active-opaque" : ""}`}
              onClick={() => setStageManager(!stageManager)}
            >
              <StageManagerIcon size={18} />
              <span className="cc-utility-label">Stage Manager</span>
            </button>
            <button
              className={`cc-utility-square ${screenMirror ? "active-opaque" : ""}`}
              onClick={() => setScreenMirror(!screenMirror)}
            >
              <ScreenMirroringIcon size={18} />
              <span className="cc-utility-label">Screen Mirroring</span>
            </button>
          </div>
        </div>

      </div>

      {/* ── DISPLAY ── */}
      <div className="cc-card cc-card--slider-wrapper">
        <div className="cc-slider-header">
          <span className="cc-slider-title">Display</span>
        </div>
        <VerticalSlider
          value={brightness}
          icon={FiSun}
          onChange={setBrightness}
        />
      </div>

      {/* ── SOUND ── */}
      <div className="cc-card cc-card--slider-wrapper">
        <div className="cc-slider-header">
          <span className="cc-slider-title">Sound</span>
        </div>
        <div className="cc-sound-row">
          <VerticalSlider
            value={volume}
            icon={FiHeadphones}
            onChange={setVolume}
          />
          <button className="cc-output-btn" title="Output device">
            <FiRadio />
          </button>
        </div>
      </div>

      {/* ── MUSIC RECOGNITION ── */}
      <button className="cc-shazam-row">
        <span className="cc-shazam-icon">
          <FiActivity size={16} />
        </span>
        <span className="cc-shazam-text">Music Recognition</span>
      </button>

      {/* ── QUICK ACTIONS ── */}
      <div className="cc-quick-actions-shelf">
        <QuickAction icon={isLightTheme ? FiSun : FiMoon} label={isLightTheme ? "Light Mode" : "Dark Mode"} onClick={toggleTheme} />
        <QuickAction icon={FiGrid} label="Calculator" onClick={() => {}} />
        <QuickAction icon={FiClock} label="Clock" onClick={() => {}} />
        <QuickAction icon={FiCamera} label="Camera" onClick={() => {}} />
      </div>
    </div>
  );
});