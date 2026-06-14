import React, { useState } from "react";
import { SettingsPanel, SettingsGroup, SettingsRow } from "../../SettingsPanel";

export const DisplaysSettings = () => {
  const [brightness, setBrightness] = useState(75);
  const [resolution, setResolution] = useState("default");

  return (
    <SettingsPanel title="Displays" icon="display">
      <SettingsGroup label="Settings">
        <SettingsRow label="Brightness">
          <input type="range" className="ctrl-range" min="0" max="100" value={brightness} onChange={e => setBrightness(e.target.value)} />
        </SettingsRow>
        <SettingsRow label="Resolution">
          <select className="ctrl-select" value={resolution} onChange={e => setResolution(e.target.value)}>
            <option value="default">Default</option>
            <option value="scaled">Scaled</option>
            <option value="low">Low Resolution</option>
          </select>
        </SettingsRow>
        <SettingsRow label="Refresh Rate">
          <select className="ctrl-select">
            <option>60Hz</option>
            <option>120Hz</option>
            <option>144Hz</option>
          </select>
        </SettingsRow>
      </SettingsGroup>
    </SettingsPanel>
  );
};
