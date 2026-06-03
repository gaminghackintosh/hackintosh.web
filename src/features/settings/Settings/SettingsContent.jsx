import React, { useState, useContext, useMemo, useCallback, memo, useEffect } from "react";
import { WALLPAPER_GROUPS } from "./../../../constants/wallpapers";
import { WindowContext } from "./../../../components/layout";

// Icons - PNG images for network section
import WiFi_Icon      from "./../../../assets/icons/Settings_menuSections/Wi-Fi.png";
import Bluetooth_Icon from "./../../../assets/icons/Settings_menuSections/Bluetooth.png";
import Network_Icon   from "./../../../assets/icons/Settings_menuSections/Network.ico";
import GameCenter_Icon from "./../../../assets/icons/Settings_menuSections/Game_Center.png";

// SVG icons for all other sections
import {
  NotificationsIcon,
  SoundIcon,
  FocusIcon,
  ScreenTimeIcon,
  BatteryIcon,
  GeneralIcon,
  AppearanceIcon,
  AccessibilityIcon,
  ControlCenterIcon,
  SiriIcon,
  PrivacyIcon,
  DesktopDockIcon,
  DisplaysIcon,
  ScreenSaverIcon,
  EnergySaverIcon,
  LockScreenIcon,
  LoginPasswordIcon,
  TouchIDIcon,
  UsersGroupsIcon,
  PasswordsIcon,
  InternetAccountsIcon,
  KeyboardIcon,
  MouseIcon,
  GameControllersIcon,
  PrintersScannersIcon,
} from "./Settings_Components/SettingsIcons";

// Shared components
import { SettingsPanel } from "./Settings_Components/SettingsPanel";
import { SettingsGroup  } from "./Settings_Components/SettingsGroup";
import { SettingsRow    } from "./Settings_Components/SettingsRow";
import { ToggleSwitch } from "./Settings_Components/ToggleSwitch";

// Import Components Settings
import {
  AccessibilitySettings,
  AppearanceSettings,
  BatterySettings,
  BluetoothSettings,
  ControlCenterSettings,
  DesktopDockSettings,
  DisplaysSettings,
  EnergySaverSettings,
  FocusSettings,
  GameCenterSettings,
  GameControllersSettings,
  GeneralSettings,
  InternetAccountsSettings,
  LockScreenSettings,
  LoginPasswordSettings,
  MouseSettings,
  NetworkSettings,
  NotificationsSettings,
  PasswordsSettings,
  PrivacySettings,
  SoundSettings,
  TouchIDSettings,
  UsersSettings,
  VPNSettings,
  WiFiSettings,
} from "./Settings_Components/panels";

// ─── Menu structure ──────────────────────────────────────────────────────────

const MENU_SECTIONS = [
  {
    id: "network",
    items: [
      { id: "wifi",      label: "Wi-Fi",      icon: WiFi_Icon,      iconType: "image" },
      { id: "bluetooth", label: "Bluetooth",  icon: Bluetooth_Icon, iconType: "image" },
      { id: "network",   label: "Network",    icon: Network_Icon,   iconType: "image" },
      { id: "vpn",       label: "VPN",        icon: "🔒",      iconType: "emoji" },
    ],
  },
  {
    id: "system",
    items: [
      { id: "notifications", label: "Notifications", icon: NotificationsIcon, iconType: "svg" },
      { id: "sound",         label: "Sound",          icon: SoundIcon, iconType: "svg" },
      { id: "focus",         label: "Focus",          icon: FocusIcon, iconType: "svg" },
      { id: "screentime",    label: "Screen Time",    icon: ScreenTimeIcon, iconType: "svg" },
      { id: "battery",       label: "Battery",        icon: BatteryIcon, iconType: "svg" },
    ],
  },
  {
    id: "general",
    items: [
      { id: "general",       label: "General",            icon: GeneralIcon, iconType: "svg" },
      { id: "appearance",    label: "Appearance",         icon: AppearanceIcon, iconType: "svg" },
      { id: "accessibility", label: "Accessibility",      icon: AccessibilityIcon, iconType: "svg" },
      { id: "controlcenter", label: "Control Center",     icon: ControlCenterIcon, iconType: "svg" },
      { id: "siri",          label: "Siri & Spotlight",   icon: SiriIcon, iconType: "svg" },
      { id: "privacy",       label: "Privacy & Security", icon: PrivacyIcon, iconType: "svg" },
    ],
  },
  {
    id: "desktop",
    items: [
      { id: "desktopdock",  label: "Desktop & Dock", icon: DesktopDockIcon, iconType: "svg" },
      { id: "displays",     label: "Displays",        icon: DisplaysIcon, iconType: "svg" },
      { id: "wallpaper",    label: "Wallpaper",       icon: "🖼️", iconType: "emoji" },
      { id: "screensaver",  label: "Screen Saver",    icon: ScreenSaverIcon, iconType: "svg" },
      { id: "energysaver",  label: "Energy Saver",    icon: EnergySaverIcon, iconType: "svg" },
    ],
  },
  {
    id: "security",
    items: [
      { id: "lockscreen",    label: "Lock Screen",    icon: LockScreenIcon, iconType: "svg" },
      { id: "loginpassword", label: "Login Password", icon: LoginPasswordIcon, iconType: "svg" },
      { id: "touchid",       label: "Touch ID & Password", icon: TouchIDIcon, iconType: "svg" },
      { id: "usersgroups",   label: "Users & Groups", icon: UsersGroupsIcon, iconType: "svg" },
    ],
  },
  {
    id: "accounts",
    items: [
      { id: "passwords",         label: "Passwords",           icon: PasswordsIcon, iconType: "svg" },
      { id: "internetaccounts",  label: "Internet Accounts",   icon: InternetAccountsIcon, iconType: "svg" },
      { id: "gamecenter",        label: "Game Center",         icon: GameCenter_Icon, iconType: "image" },
      { id: "wallet",            label: "Wallet & Apple Pay",  icon: "💳", iconType: "emoji" },
    ],
  },
  {
    id: "hardware",
    items: [
      { id: "keyboard",           label: "Keyboard",           icon: KeyboardIcon, iconType: "svg" },
      { id: "mouse",              label: "Mouse",              icon: MouseIcon, iconType: "svg" },
      { id: "gamecontrollers",    label: "Game Controllers",   icon: GameControllersIcon, iconType: "svg" },
      { id: "printersscanners",   label: "Printers & Scanners",icon: PrintersScannersIcon, iconType: "svg" },
    ],
  },
];

// ─── Компоненты-заглушки для нереализованных разделов ────────────────────────
const UnimplementedPanel = memo(({ title }) => (
  <SettingsPanel title={title}>
    <div className="unimplemented-placeholder">
      <div className="unimplemented-icon">🚧</div>
      <h3>{title}</h3>
      <p>This section is under development and will be available in a future update.</p>
    </div>
  </SettingsPanel>
));

// ─── Panel для обоев (memoized) ──────────────────────────────────────────────
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
                    <img 
                      src={wp.thumbnail} 
                      alt={wp.name} 
                      loading="lazy"
                      decoding="async"
                    />
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

// ─── Panel "About This Mac" (memoized) ───────────────────────────────────────
const AboutPanel = memo(() => (
  <SettingsPanel title="About This Mac">
    <SettingsGroup>
      <div className="about-header">
        <div className="about-logo">🍎</div>
        <div className="about-info">
          <div className="about-name">hackintosh.web</div>
          <div className="about-version">macOS Sonoma 14.0.1</div>
          <div className="about-copyright">™ & © 1983–2026 Apple Inc. All rights reserved.</div>
        </div>
      </div>
    </SettingsGroup>
    <SettingsGroup title="System Information">
      <SettingsRow label="macOS Version" value="14.0.1 (23A344)" />
      <SettingsRow label="Chip" value="Apple M3 Max (Virtual)" />
      <SettingsRow label="Memory" value="16 GB LPDDR5X" />
      <SettingsRow label="Serial Number" value="HACKW192K98X" />
    </SettingsGroup>
    <SettingsGroup title="Storage">
      <SettingsRow label="Macintosh HD" value="420 GB available of 512 GB">
        <div className="storage-bar">
          <div className="storage-bar-fill" style={{ width: "82%" }} />
        </div>
      </SettingsRow>
    </SettingsGroup>
  </SettingsPanel>
));

// ─── Map для быстрого доступа к панелям ──────────────────────────────────────
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
  battery: BatterySettings,
  touchid: TouchIDSettings,
  usersgroups: UsersSettings,
  screentime: () => <UnimplementedPanel title="Screen Time" />,
  siri: () => <UnimplementedPanel title="Siri & Spotlight" />,
  wallet: () => <UnimplementedPanel title="Wallet & Apple Pay" />,
  keyboard: () => <UnimplementedPanel title="Keyboard" />,
  printersscanners: () => <UnimplementedPanel title="Printers & Scanners" />,
  screensaver: () => <UnimplementedPanel title="Screen Saver" />,
};

// ─── Tab content renderer (memoized) ──────────────────────────────────────────
const renderTab = (activeTab, currentWallpaper, onWallpaperChange) => {
  if (activeTab === "wallpaper") {
    return <WallpaperPanel currentWallpaper={currentWallpaper} onWallpaperChange={onWallpaperChange} />;
  }
  
  if (activeTab === "about" || activeTab === "appleid") {
    return <AboutPanel />;
  }

  const PanelComponent = PANELS[activeTab];
  if (PanelComponent) {
    return <PanelComponent />;
  }

  return <UnimplementedPanel title={activeTab} />;
};

// ─── Main component ───────────────────────────────────────────────────────────

export const SettingsContent = memo(function SettingsContent({ currentWallpaper, onWallpaperChange }) {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const { onClose, onMinimize, onFocus, onTitleMouseDown, onZoom } = useContext(WindowContext);

  // Memoized filtered sidebar items
  const filteredSections = useMemo(() => 
    MENU_SECTIONS
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter(section => section.items.length > 0),
    [searchQuery]
  );

  const handleItemClick = useCallback((id) => {
    setActiveTab(id === "appleid" ? "about" : id);
  }, []);

  const handleSidebarMouseDown = useCallback((e) => {
    if (e.target.closest('button, input')) return;
    onFocus();
    onTitleMouseDown(e);
  }, [onFocus, onTitleMouseDown]);

  const handleWallpaperChange = useCallback((wp) => {
    onWallpaperChange?.(wp);
  }, [onWallpaperChange]);

  // Memoized render tab content
  const tabContent = useMemo(() => 
    renderTab(activeTab, currentWallpaper, handleWallpaperChange),
    [activeTab, currentWallpaper, handleWallpaperChange]
  );

  // Мемоизированный рендер иконок
  const renderIcon = useCallback((item) => {
    if (item.iconType === "image") {
      return <img src={item.icon} alt={item.label} loading="lazy" />;
    }
    if (item.iconType === "svg") {
      const IconComponent = item.icon;
      return <IconComponent size={20} />;
    }
    if (item.iconType === "emoji") {
      return <span>{item.icon}</span>;
    }
    return null;
  }, []);

  return (
    <div className="settings-container">
      {/* ── SIDEBAR ── */}
      <div className="settings-sidebar" onMouseDown={handleSidebarMouseDown}>

        {/* Traffic lights */}
        <div className="sidebar-traffic-lights">
          <button className="traffic-light traffic-light--close"    onClick={onClose} aria-label="Close" />
          <button className="traffic-light traffic-light--minimize" onClick={onMinimize} aria-label="Minimize" />
          <button className="traffic-light traffic-light--zoom" onClick={onZoom} aria-label="Zoom" />
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search settings"
          />
        </div>

        {/* Apple ID card */}
        <div
          className={`sidebar-apple-id${activeTab === "about" ? " active" : ""}`}
          onClick={() => handleItemClick("appleid")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleItemClick("appleid");
            }
          }}
        >
          <div className="apple-id-avatar">
            <span className="apple-id-avatar-fallback">g</span>
          </div>
          <div className="apple-id-info">
            <div className="apple-id-name">ghost</div>
            <div className="apple-id-email">Apple ID</div>
          </div>
        </div>

        <div className="sidebar-divider" />

        {/* Menu list */}
        <div className="tabs-list" role="tablist">
          {filteredSections.map((section, idx) => (
            <div key={section.id} className="menu-section">
              {idx > 0 && <div className="section-divider" />}
              {section.items.map(item => (
                <div
                  key={item.id}
                  className={`tab-item${activeTab === item.id ? " active" : ""}`}
                  onClick={() => handleItemClick(item.id)}
                  role="tab"
                  aria-selected={activeTab === item.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleItemClick(item.id);
                    }
                  }}
                >
                  <span className="tab-icon">
                    {renderIcon(item)}
                  </span>
                  <span className="tab-label">{item.label}</span>
                  {item.badge && <span className="tab-badge">{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="settings-content" role="tabpanel">
        {tabContent}
      </div>
    </div>
  );
});
