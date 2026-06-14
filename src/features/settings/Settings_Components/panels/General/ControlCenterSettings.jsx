import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch } from "../../SettingsPanel";

export const ControlCenterSettings = () => (
  <SettingsPanel title="Control Center" icon="controlcenter">
    <SettingsGroup label="Menu Bar Only">
      <ToggleSwitch label="Show in Menu Bar" checked={true} onChange={() => {}} />
    </SettingsGroup>
    <SettingsGroup label="Controls">
      <ToggleSwitch label="Wi-Fi" checked={true} onChange={() => {}} />
      <ToggleSwitch label="Bluetooth" checked={true} onChange={() => {}} />
      <ToggleSwitch label="AirDrop" checked={true} onChange={() => {}} />
      <ToggleSwitch label="Focus" checked={true} onChange={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
