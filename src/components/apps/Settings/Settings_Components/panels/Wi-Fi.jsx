import React, { useState } from "react";
import { SettingsPanel } from "./../SettingsPanel";
import { SettingsGroup } from "./../SettingsGroup";
import { SettingsRow } from "./../SettingsRow";
import { ToggleSwitch } from "./../ToggleSwitch";

// 👇 Импортируем PNG-иконку Wi-Fi
import wifiIcon from "./../../../../../assets/icons/Settings_menuSections/Wi-Fi.png";

export const WiFiSettings = () => {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [askToJoin, setAskToJoin] = useState(false);
  const [askToJoinHotspots, setAskToJoinHotspots] = useState(false);

  // Моковые данные сетей
  const knownNetworks = [
    { id: 1, name: "MERCUSYS_5G", secured: true, connected: true },
    { id: 2, name: "MERCUSYS_B939", secured: true, connected: false },
  ];

  return (
    <div className="wifi-settings-wrapper">
      <SettingsPanel title="Wi-Fi" description="Connect to Wi-Fi networks">
        {/* ── Основной переключатель ── */}
        <SettingsGroup>
          <div className="wifi-header-row">
            <div className="wifi-header-left">
              <div className="wifi-icon-circle">
                <img 
                  src={wifiIcon} 
                  alt="Wi-Fi" 
                  style={{ width: '24px', height: '24px', objectFit: 'contain' }} 
                />
              </div>
              <span className="wifi-header-label">Wi-Fi</span>
            </div>
            <ToggleSwitch checked={wifiEnabled} onChange={() => setWifiEnabled(!wifiEnabled)} />
          </div>
        </SettingsGroup>

        {/* ── Текущая подключенная сеть ── */}
        {wifiEnabled && (
          <SettingsGroup>
            <div className="connected-status">
              <div className="dot" />
              <span className="status-text">Connected</span>
              <span className="network-name">MERCUSYS_5G</span>
            </div>
          </SettingsGroup>
        )}

        {/* ── Personal Hotspots ── */}
        {wifiEnabled && (
          <SettingsGroup label="Personal Hotspots">
            <div className="network-row">
              <div className="network-left">
                <span className="network-name">iPhone</span>
              </div>
              <div className="network-right">
                <span className="network-icons">🔒 🔗</span>
              </div>
            </div>
          </SettingsGroup>
        )}

        {/* ── Known Networks ── */}
        {wifiEnabled && (
          <SettingsGroup label="Known Networks">
            {knownNetworks.map((network) => (
              <div key={network.id} className="network-row">
                <div className="network-left">
                  {network.connected && <span style={{ color: "#34c759" }}>✓</span>}
                  <span className="network-name">{network.name}</span>
                </div>
                <div className="network-right">
                  <span className="network-icons">
                    {network.secured && <span>🔒</span>}
                    <span>📶</span>
                  </span>
                  {network.connected && (
                    <button className="details-btn">Details...</button>
                  )}
                </div>
              </div>
            ))}
          </SettingsGroup>
        )}

        {/* ── Other Networks ── */}
        {wifiEnabled && (
          <SettingsGroup label="Other Networks">
            <div className="other-networks">
              <div className="searching-spinner" />
              <span className="searching-text">Searching...</span>
              <button className="other-btn">Other...</button>
            </div>
          </SettingsGroup>
        )}

        {/* ── Переключатели ── */}
        {wifiEnabled && (
          <SettingsGroup>
            <div className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Ask to join networks</span>
                <span className="toggle-desc">Known networks will be joined automatically. If no known networks are available, you will have to manually select a network.</span>
              </div>
              <ToggleSwitch checked={askToJoin} onChange={() => setAskToJoin(!askToJoin)} />
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Ask to join hotspots</span>
                <span className="toggle-desc">Allow this Mac to automatically discover nearby personal hotspots when no Wi-Fi network is available.</span>
              </div>
              <ToggleSwitch checked={askToJoinHotspots} onChange={() => setAskToJoinHotspots(!askToJoinHotspots)} />
            </div>
          </SettingsGroup>
        )}

        {/* ── Advanced кнопка ── */}
        <div className="advanced-row">
          <button className="advanced-btn">Advanced...</button>
        </div>
      </SettingsPanel>
    </div>
  );
};