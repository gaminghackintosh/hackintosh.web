import React, { useRef, useEffect, memo } from "react";
import { FiWifi, FiSun } from "react-icons/fi";
import { BiBluetooth } from "react-icons/bi";
import { ConnectivityItem } from "./ConnectivityItem";
import { Tile } from "./Tile";
import { VerticalSlider } from "./VerticalSlider";
import { WIFI_NAME, AirDropIcon, StageManagerIcon, ScreenMirroringIcon, SoundIcon, ThemeIcon, FocusIcon } from "./constants.jsx";

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

  useEffect(() => {
    const h = (e) => {
      if (ccRef.current && !ccRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div ref={ccRef} className="cc">
      <div className="cc__row">
        <div className="cc-card cc-card--connectivity">
          <ConnectivityItem 
            icon={FiWifi} 
            label="Wi-Fi" 
            status={wifi ? WIFI_NAME : "Off"} 
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

      <div className="cc-card cc-card--wide">
        <Tile
          icon={StageManagerIcon}
          title="Stage Manager"
          subtitle={stageManager ? "On" : "Off"}
          active={stageManager}
          onClick={() => setStageManager(p => !p)}
        />
      </div>

      <div className="cc-card cc-card--slider">
        <span className="cc-card-title">Display</span>
        <VerticalSlider
          initialValue={brightness}
          icon={FiSun}
          onValueChange={setBrightness}
        />
      </div>

      <div className="cc-card cc-card--slider">
        <span className="cc-card-title">Sound</span>
        <VerticalSlider
          initialValue={volume}
          icon={SoundIcon}
          onValueChange={setVolume}
        />
      </div>

      <div className="cc-card cc-card--theme" onClick={toggleTheme}>
        <div className="cc-conn-icon cc-conn-icon--active">
          <ThemeIcon size={17} isLight={isLightTheme} />
        </div>
        <span className="cc-conn-label">{isLightTheme ? "Light Mode" : "Dark Mode"}</span>
      </div>
    </div>
  );
});
