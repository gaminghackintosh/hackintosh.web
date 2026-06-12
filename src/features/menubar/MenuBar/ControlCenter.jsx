import React, { useRef, useEffect, memo, useState } from "react";
import { FiWifi, FiSun, FiMoon, FiClock, FiCamera, FiMusic, FiGrid, FiVolume2 } from "react-icons/fi";
import { BiBluetooth } from "react-icons/bi";
import { WIFI_NAME, AirDropIcon, StageManagerIcon, ScreenMirroringIcon, SoundIcon, FocusIcon } from "./constants";
import { VerticalSlider } from "./VerticalSlider";

import defaultAlbumArt from "@/assets/images/AlbumIMG.jpg";
 
// ═══════════════════════════════════════════════════════════════════
//  SLIDER COMPONENT
// ═══════════════════════════════════════════════════════════════════

const Slider = ({ value, onChange, min = 0, max = 100, icon: Icon }) => {
  const barRef = useRef(null);
  const percent = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (e) => {
    const rect = barRef.current.getBoundingClientRect();
    const newVal = Math.min(max, Math.max(min, ((e.clientX - rect.left) / rect.width) * (max - min) + min));
    onChange(newVal);
    
    const onMove = (moveEvent) => {
      const moveVal = Math.min(max, Math.max(min, ((moveEvent.clientX - rect.left) / rect.width) * (max - min) + min));
      onChange(moveVal);
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div className="cc-slider-block">
      <div className="cc-slider-bar" ref={barRef} onMouseDown={handleMouseDown}>
        <div className="cc-slider-fill" style={{ width: `${percent}%` }} />
        {Icon && (
          <div className="cc-slider-knob" style={{ left: `${percent}%` }}>
            <Icon size={12} />
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
//  MUSIC WIDGET
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
          <div className="cc-music-artist">{artist}</div>
        </div>
      </div>
      <div className="cc-music-controls">
        {/* кнопки без изменений */}
        <button className="cc-music-btn" aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>
        <button className="cc-music-btn cc-music-btn--play" onClick={onToggle}>
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="3" height="16" rx="1"/>
              <rect x="15" y="4" width="3" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <button className="cc-music-btn" aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
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
    <div ref={ccRef} className={`cc-panel ${isLightTheme ? "light-theme" : ""}`}>
      
      <div className="cc-grid-2x2">
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
              <AirDropIcon size={15} className={airdrop ? "active-blue" : ""} />
            </div>
            <div className="cc-conn-text">
              <span className="cc-label-main">AirDrop</span>
              <span className="cc-label-sub">{airdrop ? "Everyone" : "Off"}</span>
            </div>
          </div>
        </div>

        <MusicWidget
          track="Second Chance"
          artist="Shinedown"
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying(!isPlaying)}
          coverUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Polyopia_Album_Cover.jpg/240px-Polyopia_Album_Cover.jpg"
        />
      </div>

      <div className="cc-utilities-row">
        <button className={`cc-utility-card cc-utility-card--focus ${focus ? "active-purple" : ""}`} onClick={() => setFocus(!focus)}>
          <FocusIcon size={16} />
          <div className="cc-utility-text">
            <span className="cc-label-main">Focus</span>
          </div>
        </button>
        <button className={`cc-utility-square ${screenMirror ? "active-opaque" : ""}`} onClick={() => setScreenMirror(!screenMirror)} title="Screen Mirroring">
          <ScreenMirroringIcon size={16} />
        </button>
        <button className={`cc-utility-square ${stageManager ? "active-opaque" : ""}`} onClick={() => setStageManager(!stageManager)} title="Stage Manager">
          <StageManagerIcon size={16} />
        </button>
      </div>

      <div className="cc-card cc-card--slider-wrapper">
        <div className="cc-slider-header">
          <FiSun size={13} />
          <span className="cc-slider-title">Display</span>
          <span className="cc-slider-value">{Math.round(brightness)}%</span>
        </div>
        <VerticalSlider
          initialValue={brightness}
          icon={FiSun}
          onValueChange={setBrightness}
        />
      </div>

      <div className="cc-card cc-card--slider-wrapper">
        <div className="cc-slider-header">
          <FiVolume2 size={13} />
          <span className="cc-slider-title">Sound</span>
          <span className="cc-slider-value">{Math.round(volume)}%</span>
        </div>
        <VerticalSlider
          initialValue={volume}
          icon={SoundIcon}
          onValueChange={setVolume}
        />
      </div>

      <div className="cc-quick-actions-shelf">
        <QuickAction icon={isLightTheme ? FiSun : FiMoon} label={isLightTheme ? "Light Mode" : "Dark Mode"} onClick={toggleTheme} />
        <QuickAction icon={FiGrid} label="Calculator" onClick={() => {}} />
        <QuickAction icon={FiClock} label="Clock" onClick={() => {}} />
        <QuickAction icon={FiCamera} label="Camera" onClick={() => {}} />
      </div>

      <button className="cc-footer-edit-btn">Edit Controls…</button>
    </div>
  );
});