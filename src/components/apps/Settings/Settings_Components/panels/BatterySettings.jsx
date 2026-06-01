import React, { useState } from "react";
import { SettingsPanel } from "../SettingsPanel";
import { SettingsGroup } from "../SettingsGroup";
import { SettingsRow } from "../SettingsRow";
import { ToggleSwitch } from "../ToggleSwitch";

export const BatterySettings = () => {
  const [showPercentage, setShowPercentage] = useState(true);
  const [powerMode, setPowerMode] = useState("normal");
  const [lowPower, setLowPower] = useState(false);
  const [batteryLevel] = useState(78);

  return (
    <SettingsPanel title="Battery">
      {/* Battery Status */}
      <SettingsGroup>
        <div className="battery-status-card">
          <div className="battery-icon-large">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
              <line x1="22" y1="11" x2="22" y2="13" />
              <rect x="4" y="9" width={12 * (batteryLevel / 100)} height="6" rx="1" fill="#34c759" stroke="none" />
            </svg>
          </div>
          <div className="battery-info">
            <span className="battery-percentage">{batteryLevel}%</span>
            <span className="battery-status-text">Charging — 1:30 until full</span>
          </div>
        </div>
      </SettingsGroup>

      {/* Options */}
      <SettingsGroup label="Options">
        <ToggleSwitch 
          label="Show Percentage" 
          description="Show battery percentage in menu bar" 
          checked={showPercentage} 
          onChange={e => setShowPercentage(e.target.checked)} 
        />
        <SettingsRow label="Power Mode">
          <select className="ctrl-select" value={powerMode} onChange={e => setPowerMode(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="low-power">Low Power</option>
            <option value="high-performance">High Performance</option>
          </select>
        </SettingsRow>
        <ToggleSwitch 
          label="Low Power Mode" 
          description="Extends battery life by reducing performance" 
          checked={lowPower} 
          onChange={e => setLowPower(e.target.checked)} 
        />
      </SettingsGroup>

      {/* Battery Health */}
      <SettingsGroup label="Battery Health">
        <SettingsRow label="Maximum Capacity" value="92%" />
        <SettingsRow label="Cycle Count" value="145" />
        <SettingsRow label="Battery Health" chevron onClick={() => {}} />
      </SettingsGroup>
    </SettingsPanel>
  );
};