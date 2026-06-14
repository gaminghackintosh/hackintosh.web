import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch, SettingsRow } from "../../SettingsPanel";

export const EnergySaverSettings = () => (
  <SettingsPanel title="Energy Saver" icon="energysaver">
    <SettingsGroup label="Power Saving">
      <ToggleSwitch label="Low Power Mode" checked={false} onChange={() => {}} />
      <SettingsRow label="Turn display off after">
        <select className="ctrl-select">
          <option>1 minute</option>
          <option>5 minutes</option>
          <option>10 minutes</option>
          <option>15 minutes</option>
          <option>Never</option>
        </select>
      </SettingsRow>
      <ToggleSwitch label="Power nap" checked={false} onChange={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
