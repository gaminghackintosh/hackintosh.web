import React, { useState } from "react";
import { SettingsPanel, SettingsGroup, SettingsRow, ToggleSwitch } from "../../SettingsPanel";

// ═══════════════════════════════════════════════════════════════════
//  SVG ICONS
// ═══════════════════════════════════════════════════════════════════

const WifiSignalIcon = ({ level = 3 }) => (
  <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor">
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={i * 4.5}
        y={10 - (i + 1) * 2.5}
        width="3"
        height={(i + 1) * 2.5}
        rx="0.5"
        opacity={i < level ? 1 : 0.15}
      />
    ))}
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const RouterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 14V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <circle cx="7" cy="18" r="1" fill="currentColor" />
    <circle cx="11" cy="18" r="1" fill="currentColor" />
  </svg>
);

const DnsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" />
    <line x1="7" y1="7" x2="7" y2="7" />
    <line x1="7" y1="17" x2="7" y2="17" />
  </svg>
);

const ProxyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export const NetworkSettings = () => {
  const [limitTracking, setLimitTracking] = useState(true);
  const [privateWifi, setPrivateWifi] = useState(false);

  return (
    <SettingsPanel 
      title="Network"
      description="Manage network connections and privacy settings"
      icon="network"
    >
      <div className="network-settings-wrapper">

        {/* ── STATUS ── */}
        <SettingsGroup label="Status">
          <SettingsRow
            label="Wi-Fi"
            value="Connected"
            chevron
            onClick={() => {}}
            icon={<WifiSignalIcon level={3} />}
            iconBg="#007aff"
          />
          <SettingsRow
            label="IP Address"
            value="192.168.1.42"
            icon={<GlobeIcon />}
            iconBg="#34c759"
          />
          <SettingsRow
            label="Router"
            value="192.168.1.1"
            icon={<RouterIcon />}
            iconBg="#8e8e93"
          />
        </SettingsGroup>

        {/* ── PRIVACY ── */}
        <SettingsGroup label="Privacy">
          <ToggleSwitch
            label="Limit IP Address Tracking"
            description="Hides your IP address from known trackers in Mail and Safari."
            checked={limitTracking}
            onChange={() => setLimitTracking(!limitTracking)}
          />
          <ToggleSwitch
            label="Use Private Wi-Fi Address"
            description="Reduces network activity tracking by using a unique address for each network."
            checked={privateWifi}
            onChange={() => setPrivateWifi(!privateWifi)}
          />
        </SettingsGroup>

        {/* ── ADVANCED ── */}
        <SettingsGroup>
          <SettingsRow
            label="DNS Configuration"
            chevron
            onClick={() => {}}
            icon={<DnsIcon />}
            iconBg="#5e5ce6"
          />
          <SettingsRow
            label="Proxies"
            chevron
            onClick={() => {}}
            icon={<ProxyIcon />}
            iconBg="#ff9f0a"
          />
        </SettingsGroup>

      </div>
    </SettingsPanel>
  );
};