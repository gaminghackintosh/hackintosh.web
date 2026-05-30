import React, { useState } from "react";
import { SettingsPanel } from "../SettingsPanel";
import { SettingsGroup } from "../SettingsGroup";
import { SettingsRow } from "../SettingsRow";
import { ToggleSwitch } from "../ToggleSwitch";

export const NotificationsSettings = () => {
  const [lockScreen, setLockScreen]     = useState(true);
  const [previews, setPreviews]         = useState(true);
  const [mirroring, setMirroring]       = useState(true);
  const [style, setStyle]               = useState("Banners");
  return (
    <SettingsPanel title="Notifications">
      <SettingsGroup label="Display">
        <ToggleSwitch label="Show on Lock Screen"           checked={lockScreen}  onChange={e => setLockScreen(e.target.checked)} />
        <ToggleSwitch label="Show Previews"                 checked={previews}    onChange={e => setPreviews(e.target.checked)} />
        <ToggleSwitch label="Allow when Mirroring Display"  checked={mirroring}   onChange={e => setMirroring(e.target.checked)} />
        <SettingsRow label="Default Alert Style">
          <select className="ctrl-select" value={style} onChange={e => setStyle(e.target.value)}>
            <option>Banners</option><option>Alerts</option><option>None</option>
          </select>
        </SettingsRow>
      </SettingsGroup>
    </SettingsPanel>
  );
};