import React from "react";
import { SettingsPanel, SettingsGroup, SettingsRow, ToggleSwitch } from "../../SettingsPanel";

export const LockscreenSettings = () => (
  <SettingsPanel title="Lock Screen" icon="lockscreen">
    <SettingsGroup label="Lock Screen">
      <SettingsRow label="Turn display off on battery after">
        <select className="ctrl-select">
          <option>1 minute</option>
          <option>5 minutes</option>
          <option>10 minutes</option>
          <option>15 minutes</option>
        </select>
      </SettingsRow>
      <SettingsRow label="Turn display off on power adapter after">
        <select className="ctrl-select">
          <option>1 minute</option>
          <option>5 minutes</option>
          <option>10 minutes</option>
          <option>15 minutes</option>
          <option>Never</option>
        </select>
      </SettingsRow>
      <ToggleSwitch label="Show lock screen after sleep or screen saver" checked={true} onChange={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
