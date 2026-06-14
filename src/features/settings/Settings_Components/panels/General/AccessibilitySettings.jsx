import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch } from "../../SettingsPanel";

export const AccessibilitySettings = () => (
  <SettingsPanel title="Accessibility" icon="accessibility">
    <SettingsGroup label="Vision">
      <ToggleSwitch label="VoiceOver" checked={false} onChange={() => {}} />
      <ToggleSwitch label="Zoom" checked={false} onChange={() => {}} />
      <ToggleSwitch label="Display" checked={false} onChange={() => {}} />
    </SettingsGroup>
    <SettingsGroup label="Hearing">
      <ToggleSwitch label="Sound Recognition" checked={false} onChange={() => {}} />
    </SettingsGroup>
    <SettingsGroup label="Motor">
      <ToggleSwitch label="Pointer Control" checked={false} onChange={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
