import React from "react";
import { SettingsPanel, SettingsGroup, SettingsRow, ToggleSwitch } from "../../SettingsPanel";

export const LoginpasswordSettings = () => (
  <SettingsPanel title="Login Password" icon="loginpassword">
    <SettingsGroup label="Password">
      <SettingsRow label="Change Password..." chevron onClick={() => {}} />
      <SettingsRow label="Password Hint" chevron onClick={() => {}} />
      <ToggleSwitch label="Use Touch ID to unlock" checked={true} onChange={() => {}} />
      <ToggleSwitch label="Allow user to reset password using Apple ID" checked={true} onChange={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
