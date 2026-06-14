import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch } from "../../SettingsPanel";

export const NotificationsSettings = () => (
  <SettingsPanel title="Notifications" icon="notifications">
    <SettingsGroup label="Allow notifications from">
      <ToggleSwitch label="Notifications" checked={true} onChange={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
