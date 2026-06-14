import React from "react";
import { SettingsPanel, SettingsGroup } from "../../SettingsPanel";

export const SoundSettings = () => (
  <SettingsPanel title="Sound" icon="sound">
    <SettingsGroup label="Sound Effects">
      <div className="settings-option">
        <label className="settings-label">Output</label>
        <select className="ctrl-select">
          <option>MacBook Pro Speakers</option>
          <option>External Headphones</option>
        </select>
      </div>
      <div className="settings-option">
        <label className="settings-label">Output volume</label>
        <input type="range" className="ctrl-range" min="0" max="100" defaultValue="75" />
      </div>
    </SettingsGroup>
  </SettingsPanel>
);
