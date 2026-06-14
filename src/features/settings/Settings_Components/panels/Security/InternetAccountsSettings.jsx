import React from "react";
import { SettingsPanel, SettingsGroup, SettingsRow } from "../../SettingsPanel";

export const InternetAccountsSettings = () => (
  <SettingsPanel title="Internet Accounts" icon="internetaccounts">
    <SettingsGroup label="Accounts">
      <SettingsRow label="Add Account..." chevron onClick={() => {}} />
      <div className="accounts-list" style={{ padding: '10px' }}>
        <div className="account-item" style={{ padding: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <div style={{ fontWeight: 600 }}>iCloud</div>
          <div style={{ fontSize: '12px', color: '#666' }}>user@example.com</div>
        </div>
      </div>
    </SettingsGroup>
  </SettingsPanel>
);
