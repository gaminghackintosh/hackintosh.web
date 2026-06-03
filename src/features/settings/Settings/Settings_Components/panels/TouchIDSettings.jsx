import React, { useState } from "react";
import { SettingsPanel } from "../SettingsPanel";
import { SettingsGroup } from "../SettingsGroup";
import { SettingsRow } from "../SettingsRow";
import { ToggleSwitch } from "../ToggleSwitch";

export const TouchIDSettings = () => {
  const [touchIdEnabled, setTouchIdEnabled] = useState(true);
  const [applePayEnabled, setApplePayEnabled] = useState(true);
  const [autoUnlockEnabled, setAutoUnlockEnabled] = useState(true);
  
  const [fingerprints, setFingerprints] = useState([
    { id: 1, name: "Finger 1", isDefault: true },
    { id: 2, name: "Finger 2", isDefault: false },
  ]);

  const addFingerprint = () => {
    const newId = fingerprints.length + 1;
    setFingerprints([...fingerprints, { id: newId, name: `Finger ${newId}`, isDefault: false }]);
  };

  return (
    <SettingsPanel title="Touch ID & Password">
      {/* Touch ID Section */}
      <SettingsGroup label="Touch ID">
        <ToggleSwitch 
          label="Use Touch ID to unlock your Mac" 
          checked={touchIdEnabled} 
          onChange={e => setTouchIdEnabled(e.target.checked)} 
        />
        <ToggleSwitch 
          label="Use Touch ID for Apple Pay" 
          checked={applePayEnabled} 
          onChange={e => setApplePayEnabled(e.target.checked)} 
        />
        <ToggleSwitch 
          label="Use Touch ID to auto-unlock apps" 
          checked={autoUnlockEnabled} 
          onChange={e => setAutoUnlockEnabled(e.target.checked)} 
        />
      </SettingsGroup>

      {/* Fingerprints */}
      <SettingsGroup label="Fingerprints">
        {fingerprints.map(fp => (
          <div key={fp.id} className="fingerprint-row">
            <div className="fingerprint-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C9.24 2 7 4.24 7 7v3c0 1.1-.9 2-2 2H4c-1.1 0-2 .9-2 2v4c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6v-4c0-1.1-.9-2-2-2h-1c-1.1 0-2-.9-2-2V7c0-2.76-2.24-5-5-5z"/>
                <path d="M12 6c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1z"/>
              </svg>
            </div>
            <div className="fingerprint-info">
              <span className="fingerprint-name">{fp.name}</span>
              {fp.isDefault && <span className="fingerprint-default"> (Default)</span>}
            </div>
            <button className="fingerprint-delete-btn" onClick={() => {
              setFingerprints(fingerprints.filter(f => f.id !== fp.id));
            }}>×</button>
          </div>
        ))}
        <button className="add-fingerprint-btn" onClick={addFingerprint}>
          Add Fingerprint...
        </button>
      </SettingsGroup>

      {/* Password */}
      <SettingsGroup label="Password">
        <SettingsRow label="Change Password" chevron onClick={() => {}} />
        <SettingsRow label="Password Hint" value="Not set" chevron onClick={() => {}} />
      </SettingsGroup>
    </SettingsPanel>
  );
};