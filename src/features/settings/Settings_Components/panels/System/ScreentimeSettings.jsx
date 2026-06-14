import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch } from "../../SettingsPanel";

export const ScreentimeSettings = () => (
  <SettingsPanel title="Screen Time" icon="storage">
    <SettingsGroup label="Screen Time">
      <ToggleSwitch label="Enable Screen Time" checked={false} onChange={() => {}} />
      <div className="settings-info" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        <p>Track your app usage and set limits.</p>
      </div>
    </SettingsGroup>
  </SettingsPanel>
);
