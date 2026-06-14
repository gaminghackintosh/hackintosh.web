import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch } from "../../SettingsPanel";

export const GameCenterSettings = () => (
  <SettingsPanel title="Game Center" icon="gamecenter">
    <SettingsGroup label="Game Center">
      <ToggleSwitch label="Enable Game Center" checked={true} onChange={() => {}} />
      <div className="settings-info" style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎮</div>
        <p style={{ color: '#666' }}>Sign in to Game Center to play games with friends</p>
      </div>
    </SettingsGroup>
  </SettingsPanel>
);
