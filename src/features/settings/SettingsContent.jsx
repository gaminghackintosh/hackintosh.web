import React, { useState, useContext, useMemo, useCallback, memo } from "react";
import { WALLPAPER_GROUPS } from "@/core/constants/wallpapers";
import { WindowContext } from "@/windows";
import appleIdAvatar from "@/assets/images/logo/logo_butterfly.png";

// Network Icons
import WiFi_Icon from "@/assets/icons/Settings_menuSections/Network/Wi-Fi.png";
import Bluetooth_Icon from "@/assets/icons/Settings_menuSections/Network/Bluetooth.png";
import Network_Icon from "@/assets/icons/Settings_menuSections/Network/Network.ico";
import Vpn_Icon from "@/assets/icons/Settings_menuSections/Network/VPN.png";

// Other Icons
import Notification_Icon from "@/assets/icons/Settings_menuSections/Second_Part/notifications.png";
import Sounds_Icon from "@/assets/icons/Settings_menuSections/Second_Part/Sounds.webp";
import Focus_Icon from "@/assets/icons/Settings_menuSections/Second_Part/Focus.webp";
import ScreenTime_Icon from "@/assets/icons/Settings_menuSections/Second_Part/Screen_Time.webp";
import GeneralSettings_Icon from "@/assets/icons/apps/Light_Themes/settings_1.png";
import Appearance_Icon from "@/assets/icons/Settings_menuSections/General/Appearance.png";
import Accessibility_Icon from "@/assets/icons/Settings_menuSections/General/Accessibility.png";
import ControlCenter_Icon from "@/assets/icons/Settings_menuSections/General/Control_Center.svg";
import Siri_Icon from "@/assets/icons/Settings_menuSections/General/Siri.webp";
import Security_Icon from "@/assets/icons/Settings_menuSections/General/security_privacy.png";
import DesktopAndDock_Icon from "@/assets/icons/Settings_menuSections/Personalization/DesktopAndDock.png";
import Displays_Icon from "@/assets/icons/Settings_menuSections/Personalization/Displays.png";
import Wallpapers_Icon from "@/assets/icons/Settings_menuSections/Personalization/Wallpapers.png";
import ScreenSaver_Icon from "@/assets/icons/Settings_menuSections/Personalization/ScreenSaver.svg";
import EnergySaver_Icon from "@/assets/icons/Settings_menuSections/Personalization/Energy_Saver.svg";
import LockScreen_Icon from "@/assets/icons/Settings_menuSections/Security/lockScreen.svg";
import LoginPass_Icon from "@/assets/icons/Settings_menuSections/Security/LoginPass.svg";
import Users_Icon from "@/assets/icons/Settings_menuSections/Security/Users.png";
import Pass_Icon from "@/assets/icons/Settings_menuSections/OtherPart/Passwords_dark.png";
import Mail_Icon from "@/assets/icons/Settings_menuSections/OtherPart/mail.png";
import GameCenter_Icon from "@/assets/icons/Settings_menuSections/OtherPart/Game_Center.png";
import Wallet_Icon from "@/assets/icons/Settings_menuSections/OtherPart/Wallet.png";

// Components
import { SettingsPanel } from "./Settings_Components/SettingsPanel";
import { SettingsGroup } from "./Settings_Components/SettingsPanel";
import {
  AccessibilitySettings, AppearanceSettings, BluetoothSettings, ControlCenterSettings,
  DesktopDockSettings, DisplaysSettings, EnergySaverSettings, FocusSettings,
  GameCenterSettings, GameControllersSettings, GeneralSettings, InternetAccountsSettings,
  LockScreenSettings, LoginPasswordSettings, MouseSettings, NetworkSettings,
  NotificationsSettings, PasswordsSettings, PrivacySettings, SoundSettings,
  UsersSettings, VPNSettings, WiFiSettings,
} from "./Settings_Components/panels";

// ─── Menu structure ──────────────────────────────────────────────────────────
const MENU_SECTIONS = [
  {
    id: "network",
    items: [
      { id: "wifi", label: "Wi‑Fi", icon: WiFi_Icon, iconType: "image" },
      { id: "bluetooth", label: "Bluetooth", icon: Bluetooth_Icon, iconType: "image" },
      { id: "network", label: "Network", icon: Network_Icon, iconType: "image" },
      { id: "vpn", label: "VPN", icon: Vpn_Icon, iconType: "image" },
    ],
  },
  {
    id: "system",
    items: [
      { id: "notifications", label: "Notifications", icon: Notification_Icon, iconType: "image" },
      { id: "sound", label: "Sound", icon: Sounds_Icon, iconType: "image" },
      { id: "focus", label: "Focus", icon: Focus_Icon, iconType: "image" },
      { id: "screentime", label: "Screen Time", icon: ScreenTime_Icon, iconType: "image" },
    ],
  },
  {
    id: "general",
    items: [
      { id: "general", label: "General", icon: GeneralSettings_Icon, iconType: "image" },
      { id: "appearance", label: "Appearance", icon: Appearance_Icon, iconType: "image" },
      { id: "accessibility", label: "Accessibility", icon: Accessibility_Icon, iconType: "image" },
      { id: "controlcenter", label: "Control Center", icon: ControlCenter_Icon, iconType: "image" },
      { id: "siri", label: "Siri & Spotlight", icon: Siri_Icon, iconType: "image" },
      { id: "privacy", label: "Privacy & Security", icon: Security_Icon, iconType: "image" },
    ],
  },
  {
    id: "desktop",
    items: [
      { id: "desktopdock", label: "Desktop & Dock", icon: DesktopAndDock_Icon, iconType: "image" },
      { id: "displays", label: "Displays", icon: Displays_Icon, iconType: "image" },
      { id: "wallpaper", label: "Wallpaper", icon: Wallpapers_Icon, iconType: "image" },
      { id: "screensaver", label: "Screen Saver", icon: ScreenSaver_Icon, iconType: "image" },
      { id: "energysaver", label: "Energy Saver", icon: EnergySaver_Icon, iconType: "image" },
    ],
  },
  {
    id: "security",
    items: [
      { id: "lockscreen", label: "Lock Screen", icon: LockScreen_Icon, iconType: "image" },
      { id: "loginpassword", label: "Login Password", icon: LoginPass_Icon, iconType: "image" },
      { id: "usersgroups", label: "Users & Groups", icon: Users_Icon, iconType: "image" },
    ],
  },
  {
    id: "accounts",
    items: [
      { id: "passwords", label: "Passwords", icon: Pass_Icon, iconType: "image" },
      { id: "internetaccounts", label: "Internet Accounts", icon: Mail_Icon, iconType: "image" },
      { id: "gamecenter", label: "Game Center", icon: GameCenter_Icon, iconType: "image" },
      { id: "wallet", label: "Wallet & Apple Pay", icon: Wallet_Icon, iconType: "image" },
    ],
  },
  {
    id: "hardware",
    items: [
      { id: "keyboard", label: "Keyboard", icon: "⌨️", iconType: "emoji" },
      { id: "mouse", label: "Mouse", icon: "🖱️", iconType: "emoji" },
      { id: "gamecontrollers", label: "Game Controllers", icon: "🎮", iconType: "emoji" },
      { id: "printersscanners", label: "Printers & Scanners", icon: "🖨️", iconType: "emoji" },
    ],
  },
];

// ─── Unimplemented Panel ─────────────────────────────────────────────────────
const UnimplementedPanel = memo(({ title }) => (
  <SettingsPanel title={title}>
    <div className="unimplemented-placeholder">
      <div className="unimplemented-icon">🚧</div>
      <h3>{title}</h3>
      <p>This section is under development.</p>
    </div>
  </SettingsPanel>
));

// ─── Apple Logo SVG Component ────────────────────────────────────────────────
const AppleLogoSVG = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-.8 1.94-.8s.16 1.06-.59 1.91c-.7.81-1.87.76-1.87.76s-.21-1.02.52-1.87z"/>
  </svg>
);

// ─── Apple ID Avatar ─────────────────────────────────────────────────────────
const AppleIdAvatar = memo(() => (
  <div className="apple-id-avatar">
    <img src={appleIdAvatar} alt="Apple ID Avatar" loading="lazy" />
  </div>
));

// ─── Wallpaper Panel ─────────────────────────────────────────────────────────
const WallpaperPanel = memo(function WallpaperPanel({ currentWallpaper, onWallpaperChange }) {
  return (
    <SettingsPanel title="Wallpaper" description="Choose a background image for your desktop">
      {WALLPAPER_GROUPS.map((group) => (
        <div key={group.id} className="wallpaper-group">
          <h3 className="wallpaper-group-title">{group.title}</h3>
          <div className="wallpaper-grid">
            {group.wallpapers.map((wp) => {
              const isSelected = currentWallpaper === wp.id;
              return (
                <div
                  key={wp.id}
                  className={`wallpaper-card${isSelected ? " selected" : ""}`}
                  onClick={() => onWallpaperChange?.({ id: wp.id, type: "image", value: wp.image })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onWallpaperChange?.({ id: wp.id, type: "image", value: wp.image });
                    }
                  }}
                >
                  <div className="wallpaper-thumbnail">
                    <img src={wp.thumbnail} alt={wp.name} loading="lazy" decoding="async" />
                    {isSelected && <div className="check-badge">✓</div>}
                  </div>
                  <span className="wallpaper-title">{wp.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </SettingsPanel>
  );
});

// ─── About Panel ─────────────────────────────────────────────────────────────
const AboutPanel = memo(() => (
  <SettingsPanel title="About">
    <div className="apple-about-container">
      
      {/* ── БЛОК ХАРАДВЕРА (HERO) ── */}
      <div className="about-hardware-hero">
        <div className="hardware-icon-canvas">
          <AppleLogoSVG />
        </div>
        <h2 className="hardware-title">hackintosh.web</h2>
        <p className="hardware-subtitle">Virtual Mac (Browser Edition)</p>
      </div>

      {/* ── ОСНОВНЫЕ СПЕЦИФИКАЦИИ ── */}
      <SettingsGroup>
        <div className="sr-row">
          <span className="sr-label">Chip</span>
          <span className="sr-value">Apple M3 Max (Virtual 16-Core)</span>
        </div>
        <div className="sr-row">
          <span className="sr-label">Memory</span>
          <span className="sr-value">16 GB LPDDR5X</span>
        </div>
        <div className="sr-row">
          <span className="sr-label">Startup Disk</span>
          <span className="sr-value">Macintosh HD</span>
        </div>
        <div className="sr-row">
          <span className="sr-label">Serial Number</span>
          <span className="sr-value actionable-text">HACKW192K98X</span>
        </div>
      </SettingsGroup>

      {/* ── БЛОК ОПЕРАЦИОННОЙ СИСТЕМЫ ── */}
      <div className="settings-group-title">Operating System</div>
      <SettingsGroup>
        <div className="os-disclosure-row">
          <div className="os-meta-left">
            <div className="os-gradient-thumbnail" />
            <div className="os-text-stack">
              <span className="os-name">macOS Sonoma</span>
              <span className="os-version-build">Version 14.0.1 (23A344)</span>
            </div>
          </div>
          <button className="apple-btn-secondary">Software Update…</button>
        </div>
      </SettingsGroup>

      {/* ── БЛОК ХРАНИЛИЩА (STORAGE) ── */}
      <div className="settings-group-title">Storage</div>
      <SettingsGroup>
        <div className="about-storage-box">
          <div className="storage-info-header">
            <span className="disk-name">Macintosh HD</span>
            <span className="disk-meta">342 GB available of 512 GB</span>
          </div>
          <div className="storage-bar-track">
            <div className="storage-bar-fill-system" style={{ width: "33%" }} />
          </div>
        </div>
      </SettingsGroup>

      {/* ── СИСТЕМНЫЙ ЮРИДИЧЕСКИЙ ФУТЕР ── */}
      <div className="about-legal-footer">
        <div className="legal-links-row">
          <button className="legal-link-btn">Regulatory Certification</button>
          <span className="legal-dot">•</span>
          <button className="legal-link-btn">License Agreement</button>
        </div>
        <p className="legal-copyright-text">
          ™ & © 1983–2026 Apple Inc. All rights reserved.
        </p>
      </div>

    </div>
  </SettingsPanel>
));

// ─── Panels Map ──────────────────────────────────────────────────────────────
const PANELS = {
  wifi: WiFiSettings,
  bluetooth: BluetoothSettings,
  network: NetworkSettings,
  vpn: VPNSettings,
  notifications: NotificationsSettings,
  sound: SoundSettings,
  focus: FocusSettings,
  general: GeneralSettings,
  appearance: AppearanceSettings,
  accessibility: AccessibilitySettings,
  controlcenter: ControlCenterSettings,
  privacy: PrivacySettings,
  desktopdock: DesktopDockSettings,
  displays: DisplaysSettings,
  energysaver: EnergySaverSettings,
  lockscreen: LockScreenSettings,
  loginpassword: LoginPasswordSettings,
  passwords: PasswordsSettings,
  internetaccounts: InternetAccountsSettings,
  gamecenter: GameCenterSettings,
  mouse: MouseSettings,
  gamecontrollers: GameControllersSettings,
  usersgroups: UsersSettings,
  screentime: () => <UnimplementedPanel title="Screen Time" />,
  siri: () => <UnimplementedPanel title="Siri & Spotlight" />,
  wallet: () => <UnimplementedPanel title="Wallet & Apple Pay" />,
  keyboard: () => <UnimplementedPanel title="Keyboard" />,
  printersscanners: () => <UnimplementedPanel title="Printers & Scanners" />,
  screensaver: () => <UnimplementedPanel title="Screen Saver" />,
};

// ─── Render Tab ──────────────────────────────────────────────────────────────
const renderTab = (activeTab, currentWallpaper, onWallpaperChange) => {
  if (activeTab === "wallpaper") return <WallpaperPanel currentWallpaper={currentWallpaper} onWallpaperChange={onWallpaperChange} />;
  if (activeTab === "about" || activeTab === "appleid") return <AboutPanel />;
  const PanelComponent = PANELS[activeTab];
  return PanelComponent ? <PanelComponent /> : <UnimplementedPanel title={activeTab} />;
};

// ─── Main Component ──────────────────────────────────────────────────────────
export const SettingsContent = memo(function SettingsContent({ currentWallpaper, onWallpaperChange }) {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const { onClose, onMinimize, onFocus, onTitleMouseDown, onZoom } = useContext(WindowContext);

  const handleZoom = useCallback(() => {
    setIsExpanded(prev => !prev);
    onZoom?.();
  }, [onZoom]);

  const filteredSections = useMemo(() =>
    MENU_SECTIONS
      .map(section => ({ ...section, items: section.items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())) }))
      .filter(section => section.items.length > 0),
    [searchQuery]
  );

  const handleItemClick = useCallback((id) => setActiveTab(id === "appleid" ? "about" : id), []);
  const handleWallpaperChange = useCallback((wp) => onWallpaperChange?.(wp), [onWallpaperChange]);

  const tabContent = useMemo(() => renderTab(activeTab, currentWallpaper, handleWallpaperChange), [activeTab, currentWallpaper, handleWallpaperChange]);

  const renderIcon = useCallback((item) => {
    if (item.iconType === "image") return <img src={item.icon} alt={item.label} loading="lazy" />;
    if (item.iconType === "svg") { const IconComponent = item.icon; return <IconComponent size={20} />; }
    if (item.iconType === "emoji") return <span>{item.icon}</span>;
    return null;
  }, []);

  return (
    <div className="settings-container">
      {/* ── SIDEBAR ── */}
      <div className="settings-sidebar">
        <div className="sidebar-drag-handle" onMouseDown={(e) => { if (e.target.closest('button, input')) return; onFocus(); onTitleMouseDown(e); }}>
          <div className="sidebar-traffic-lights">
            <button className="traffic-light traffic-light--close" onClick={onClose} aria-label="Close" />
            <button className="traffic-light traffic-light--minimize" onClick={onMinimize} aria-label="Minimize" />
            <button className="traffic-light traffic-light--zoom" onClick={handleZoom} aria-label="Zoom" />
          </div>
        </div>

        <div className="sidebar-search">
          <input type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} aria-label="Search settings" />
        </div>

        <div className={`sidebar-apple-id${activeTab === "about" ? " active" : ""}`} onClick={() => handleItemClick("appleid")} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleItemClick("appleid"); } }}>
          <AppleIdAvatar />
          <div className="apple-id-info">
            <div className="apple-id-name">ghost</div>
            <div className="apple-id-email">Apple ID</div>
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="tabs-list" role="tablist">
          {filteredSections.map((section, idx) => (
            <div key={section.id} className="menu-section">
              {idx > 0 && <div className="section-divider" />}
              {section.items.map(item => (
                <div key={item.id} className={`tab-item${activeTab === item.id ? " active" : ""}`} onClick={() => handleItemClick(item.id)} role="tab" aria-selected={activeTab === item.id} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleItemClick(item.id); } }}>
                  <span className="tab-icon">{renderIcon(item)}</span>
                  <span className="tab-label">{item.label}</span>
                  {item.badge && <span className="tab-badge">{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className={`settings-content${isExpanded ? " settings-content--expanded" : ""}`} role="tabpanel">
        {tabContent}
      </div>
    </div>
  );
});
