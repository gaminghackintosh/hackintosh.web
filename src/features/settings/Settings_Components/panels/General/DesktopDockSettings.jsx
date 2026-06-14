import React from "react";
import { SettingsPanel, SettingsGroup, ToggleSwitch, SettingsRow } from "../../SettingsPanel";

export const DesktopDockSettings = () => (
  <SettingsPanel title="Desktop & Dock" icon="desktopdock">
    <SettingsGroup label="Dock">
      <SettingsRow label="Size">
        <input type="range" className="ctrl-range" min="1" max="100" defaultValue="50" />
      </SettingsRow>
      <ToggleSwitch label="Magnification" checked={false} onChange={() => {}} />
      <ToggleSwitch label="Automatically hide and show the Dock" checked={false} onChange={() => {}} />
    </SettingsGroup>
    <SettingsGroup label="Desktop">
      <ToggleSwitch label="Show Stacks" checked={true} onChange={() => {}} />
      <SettingsRow label="Sort by">
        <select className="ctrl-select">
          <option>Name</option>
          <option>Kind</option>
          <option>Date Added</option>
        </select>
      </SettingsRow>
    </SettingsGroup>
  </SettingsPanel>
);
