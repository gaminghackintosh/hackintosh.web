import React, { useState } from "react";
import { SettingsPanel } from "../SettingsPanel";
import { SettingsGroup } from "../SettingsGroup";
import { SettingsRow } from "../SettingsRow";
import { ToggleSwitch } from "../ToggleSwitch";

export const BluetoothSettings = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsPanel title="Bluetooth">
      <SettingsGroup>
        <ToggleSwitch label="Bluetooth" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
      </SettingsGroup>
      {enabled && (
        <>
          <SettingsGroup label="My Devices">
            <SettingsRow label="No devices connected" value="—" />
          </SettingsGroup>
          <SettingsGroup label="Nearby Devices" footer="Make sure your device is in pairing mode.">
            <SettingsRow label="Scanning…">
              <span className="ctrl-spinner" />
            </SettingsRow>
          </SettingsGroup>
        </>
      )}
    </SettingsPanel>
  );
};