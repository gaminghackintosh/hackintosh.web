import React, { useState } from "react";
import { SettingsPanel } from "../SettingsPanel";
import { SettingsGroup } from "../SettingsGroup";
import { SettingsRow } from "../SettingsRow";
import { ToggleSwitch } from "../ToggleSwitch";

export const GameControllersSettings = () => {
  const [btMode, setBtMode]     = useState(false);
  const [vibration, setVib]     = useState(true);
  const [notifs, setNotifs]     = useState(true);
  return (
    <SettingsPanel title="Game Controllers">
      <SettingsGroup label="Connected Controllers">
        <SettingsRow label="No controllers detected" value="—" />
      </SettingsGroup>
      <SettingsGroup label="Settings">
        <ToggleSwitch label="Bluetooth Gaming Mode"          checked={btMode}   onChange={e => setBtMode(e.target.checked)} />
        <ToggleSwitch label="Controller Vibrations"          checked={vibration}onChange={e => setVib(e.target.checked)} />
        <ToggleSwitch label="Show Controller Notifications"  checked={notifs}   onChange={e => setNotifs(e.target.checked)} />
      </SettingsGroup>
    </SettingsPanel>
  );
};