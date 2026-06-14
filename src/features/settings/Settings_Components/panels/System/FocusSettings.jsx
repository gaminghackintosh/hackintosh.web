import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch } from "../../SettingsPanel";

export const FocusSettings = () => (
  <SettingsPanel title="Focus" icon="focus">
    <SettingsGroup label="Focus Modes">
      <ToggleSwitch label="Do Not Disturb" checked={false} onChange={() => {}} />
      <ToggleSwitch label="Personal" checked={false} onChange={() => {}} />
      <ToggleSwitch label="Work" checked={false} onChange={() => {}} />
      <ToggleSwitch label="Sleep" checked={false} onChange={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
