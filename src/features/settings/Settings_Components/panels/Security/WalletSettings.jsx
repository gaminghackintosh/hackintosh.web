import React from "react";
import { SettingsPanel, SettingsGroup, SettingsRow, ToggleSwitch } from "../../SettingsPanel";

export const WalletSettings = () => (
  <SettingsPanel title="Wallet & Apple Pay" icon="wallet">
    <SettingsGroup label="Apple Pay">
      <SettingsRow label="Cards" chevron onClick={() => {}} />
      <div className="settings-info" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        <p>No cards added yet</p>
      </div>
      <ToggleSwitch label="Allow Handoff" checked={true} onChange={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
