import React from "react";

// Импорты иконок
import settingsIcon from "@/assets/icons/apps/Light_Themes/settings_1.png";
import notesIcon from "@/assets/icons/apps/Light_Themes/Notes.png";
import launchpadIcon from "@/assets/icons/apps/Light_Themes/Launchpad.png";
import calculatorIcon from "@/assets/icons/apps/Light_Themes/Calculator.png";
import calendarIcon from "@/assets/icons/apps/Light_Themes/Calendrier.png";
import safariIcon from "@/assets/icons/apps/Light_Themes/Safari.png";
import finderIcon from "@/assets/icons/apps/Light_Themes/Finder.png";
import musicIcon from "@/assets/icons/apps/Light_Themes/Apple_Music.png";

import WifiIcon from "@/assets/icons/Settings_menuSections/Network/Wi-Fi.png";
import BluetoothIcon from "@/assets/icons/Settings_menuSections/Network/Bluetooth.png";
import NetworkIcon from "@/assets/icons/Settings_menuSections/Network/Network.ico";
import VPNIcon from "@/assets/icons/Settings_menuSections/Network/VPN.png";

// SVG иконки для разделов настроек
const SettingsIcons = {
  wifi: <img src={WifiIcon} alt="Wi-Fi" />,
  bluetooth: <img src={BluetoothIcon} alt="Bluetooth" />,
  network: <img src={NetworkIcon} alt="Network" />,
  vpn: <img src={VPNIcon} alt="VPN" />,
  
  display: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  sound: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  battery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
      <line x1="23" y1="13" x2="23" y2="11" />
    </svg>
  ),
  appearance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    </svg>
  ),
  menuBar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="3" y="16" width="18" height="4" rx="1" />
      <line x1="6" y1="8" x2="6" y2="8" />
      <line x1="10" y1="8" x2="10" y2="8" />
      <line x1="6" y1="20" x2="6" y2="20" />
      <line x1="10" y1="20" x2="10" y2="20" />
    </svg>
  ),
  dock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="18" width="4" height="4" rx="1" />
      <rect x="10" y="18" width="4" height="4" rx="1" />
      <rect x="16" y="18" width="4" height="4" rx="1" />
    </svg>
  ),
  focus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  keyboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <line x1="6" y1="8" x2="6" y2="8" />
      <line x1="10" y1="8" x2="10" y2="8" />
      <line x1="14" y1="8" x2="14" y2="8" />
      <line x1="18" y1="8" x2="18" y2="8" />
      <line x1="6" y1="12" x2="6" y2="12" />
      <line x1="10" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="14" y2="12" />
      <line x1="18" y1="12" x2="18" y2="12" />
      <line x1="7" y1="16" x2="17" y2="16" />
    </svg>
  ),
  mouse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="4" width="12" height="16" rx="6" />
      <line x1="12" y1="4" x2="12" y2="10" />
    </svg>
  ),
  trackpad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  printer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
  sharing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  datetime: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  region: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  privacy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  storage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  softwareupdate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <polyline points="21 12 16 12 16 7" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

export const SettingsPanel = ({ title, description, icon, hideHeader = false, children }) => {
  // Путь к иконкам (импортированные или SVG)
  const iconPaths = {
    settings: settingsIcon,
    notes: notesIcon,
    launchpad: launchpadIcon,
    calculator: calculatorIcon,
    calendar: calendarIcon,
    safari: safariIcon,
    finder: finderIcon,
    music: musicIcon,
  };

  const renderIcon = () => {
    if (iconPaths[icon]) {
      return <img src={iconPaths[icon]} alt={title} />;
    }
    return SettingsIcons[icon] || SettingsIcons.settings;
  };

  return (
    <div className="settings-panel">
      {!hideHeader && (
        <div className="panel-header">
          {icon && (
            <div className="panel-icon">
              {renderIcon()}
            </div>
          )}
          <h2 className="panel-title">{title}</h2>
          {description && <p className="panel-description">{description}</p>}
        </div>
      )}
      <div className="panel-body">{children}</div>
    </div>
  );
};

export const SettingsGroup = ({ label, footer, children }) => {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <div className="sg-wrapper">
      {label && <div className="sg-label">{label}</div>}
      <div className="sg-card">
        {items.map((child, idx) => (
          <React.Fragment key={idx}>
            {child}
            {idx < items.length - 1 && <div className="sg-divider" />}
          </React.Fragment>
        ))}
      </div>
      {footer && <div className="sg-footer">{footer}</div>}
    </div>
  );
};

export { SettingsRow } from "./SettingsRow";
export { ToggleSwitch } from "./ToggleSwitch";
