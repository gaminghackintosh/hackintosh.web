import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch, SettingsRow } from "../../SettingsPanel";

export const PrivacySettings = () => (
  <SettingsPanel title="Privacy & Security" icon="security">
    <SettingsGroup label="Security">
      <ToggleSwitch label="Firewall" checked={true} onChange={() => {}} />
      <SettingsRow label="Firewall Options..." chevron onClick={() => {}} />
    </SettingsGroup>
    <SettingsGroup label="Privacy">
      <SettingsRow label="Location Services" chevron onClick={() => {}} />
      <SettingsRow label="Analytics & Improvements" chevron onClick={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
