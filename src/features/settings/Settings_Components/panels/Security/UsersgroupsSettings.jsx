import React from "react";
import { SettingsPanel, SettingsGroup, SettingsRow } from "../../SettingsPanel";

export const UsersgroupsSettings = () => (
  <SettingsPanel title="Users & Groups" icon="users">
    <SettingsGroup label="Current User">
      <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
        <div className="user-avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#007AFF' }} />
        <div>
          <div style={{ fontWeight: 600 }}>User</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Administrator</div>
        </div>
      </div>
      <SettingsRow label="Change Account Type..." chevron onClick={() => {}} />
      <SettingsRow label="Delete Account..." chevron onClick={() => {}} />
    </SettingsGroup>
    <SettingsGroup label="Other Users">
      <SettingsRow label="Guest User" chevron onClick={() => {}} />
    </SettingsGroup>
  </SettingsPanel>
);
