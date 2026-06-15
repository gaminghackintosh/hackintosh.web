import React from "react";

// ============================================================================
// ИМПОРТЫ ИКОНОК
// ============================================================================

// --- Базовые иконки приложений ---
import settingsIcon from "@/assets/icons/apps/Light_Themes/settings_1.png";
import notesIcon from "@/assets/icons/apps/Light_Themes/Notes.png";
import launchpadIcon from "@/assets/icons/apps/Light_Themes/Launchpad.png";
import calculatorIcon from "@/assets/icons/apps/Light_Themes/Calculator.png";
import calendarIcon from "@/assets/icons/apps/Light_Themes/Calendrier.png";
import safariIcon from "@/assets/icons/apps/Light_Themes/Safari.png";
import finderIcon from "@/assets/icons/apps/Light_Themes/Finder.png";
import musicIcon from "@/assets/icons/apps/Light_Themes/Apple_Music.png";

// --- Сеть (Network) ---
import WifiIcon from "@/assets/icons/Settings_menuSections/Network/Wi-Fi.png";
import BluetoothIcon from "@/assets/icons/Settings_menuSections/Network/Bluetooth.png";
import NetworkIcon from "@/assets/icons/Settings_menuSections/Network/Network.ico";
import VPNIcon from "@/assets/icons/Settings_menuSections/Network/VPN.png";

// --- Система (System) ---
import NotificationsIcon from "@/assets/icons/Settings_menuSections/Second_Part/notifications.png";
import SoundIcon from "@/assets/icons/Settings_menuSections/Second_Part/Sounds.webp";
import FocusIcon from "@/assets/icons/Settings_menuSections/Second_Part/Focus.webp";
import ScreentimeIcon from "@/assets/icons/Settings_menuSections/Second_Part/Screen_Time.webp";

// --- Общие настройки (General) ---
import AppearanceIcon from "@/assets/icons/Settings_menuSections/General/Appearance.png";
import AccessibilityIcon from "@/assets/icons/Settings_menuSections/General/Accessibility.png";
import ControlCenterIcon from "@/assets/icons/Settings_menuSections/General/Control_Center.svg";
import SiriIcon from "@/assets/icons/Settings_menuSections/General/Siri.webp";
import SecurityIcon from "@/assets/icons/Settings_menuSections/General/security_privacy.png";

// --- Персонализация (Personalization) ---
import WallpaperIcon from "@/assets/icons/Settings_menuSections/Personalization/Wallpapers.png";
import DisplaysIcon from "@/assets/icons/Settings_menuSections/Personalization/Displays.png";
import DesktopDockIcon from "@/assets/icons/Settings_menuSections/Personalization/DesktopAndDock.png";
import ScreenSaverIcon from "@/assets/icons/Settings_menuSections/Personalization/ScreenSaver.svg";
import EnergySaverIcon from "@/assets/icons/Settings_menuSections/Personalization/Energy_Saver.svg";

// --- Безопасность и пользователи (Security & Users) ---
import UsersIcon from "@/assets/icons/Settings_menuSections/Security/Users.png";
import LockScreenIcon from "@/assets/icons/Settings_menuSections/Security/lockScreen.svg";
import LoginPassIcon from "@/assets/icons/Settings_menuSections/Security/LoginPass.svg";
import PasswordsIcon from "@/assets/icons/Settings_menuSections/OtherPart/Passwords_dark.png";
import MailIcon from "@/assets/icons/Settings_menuSections/OtherPart/mail.png";
import WalletIcon from "@/assets/icons/Settings_menuSections/OtherPart/Wallet.png";
import GameCenterIcon from "@/assets/icons/Settings_menuSections/OtherPart/Game_Center.png";

// ============================================================================
// SVG ИКОНКИ ДЛЯ РАЗДЕЛОВ НАСТРОЕК
// ============================================================================
const SettingsIcons = {
  wifi: <img src={WifiIcon} alt="Wi-Fi" />,
  bluetooth: <img src={BluetoothIcon} alt="Bluetooth" />,
  network: <img src={NetworkIcon} alt="Network" />,
  vpn: <img src={VPNIcon} alt="VPN" />,

  NotificationsSettings: <img src={NotificationsIcon} alt="Notifications" />,
  SoundSettings: <img src={SoundIcon} alt="Sound Settings" />,
  FocusSettings: <img src={FocusIcon} alt="Focus Settings" />,
  ScreentimeSettings: <img src={ScreentimeIcon} alt="Screentime Settings" />,
  
  GeneralSettings: <img src={settingsIcon} alt="General Settings" />,
  AppearanceSettings: <img src={AppearanceIcon} alt="Appearance Settings" />,
  DesktopDockSettings: <img src={DesktopDockIcon} alt="Desktop Dock Settings" />,
  EnergySaverSettings: <img src={EnergySaverIcon} alt="Energy Saver Settings" />,
  ControlCenterSettings: <img src={ControlCenterIcon} alt="Control Center Settings" />,
  AccessibilitySettings: <img src={AccessibilityIcon} alt="Accessibility Settings" />,
  PrivacySettings: <img src={SecurityIcon} alt="Privacy Settings" />,
  ScreenSaverSettings: <img src={ScreenSaverIcon} alt="Screen Saver Settings" />,
  WallpaperSettings: <img src={WallpaperIcon} alt="Wallpaper Settings" />,
};

export const SettingsPanel = ({ title, description, icon, hideHeader = false, children }) => {
  // ==========================================================================
  // ИКОНКИ ПО КАТЕГОРИЯМ (как в macOS Settings)
  // ==========================================================================
  const iconPaths = {
    // ----------------------------------------------------------------------
    // СЕТЬ (Network)
    // ----------------------------------------------------------------------
    wifi: WifiIcon,
    bluetooth: BluetoothIcon,
    network: NetworkIcon,
    vpn: VPNIcon,

    // ----------------------------------------------------------------------
    // СИСТЕМНЫЕ (System)
    // ----------------------------------------------------------------------
    notifications: NotificationsIcon,
    sound: SoundIcon,
    focus: FocusIcon,
    screentime: ScreentimeIcon,

    // ----------------------------------------------------------------------
    // ОБЩИЕ (General)
    // ----------------------------------------------------------------------
    settings: settingsIcon,
    general: settingsIcon,
    appearance: AppearanceIcon,
    accessibility: AccessibilityIcon,
    controlcenter: ControlCenterIcon,
    siri: SiriIcon,
    privacy: SecurityIcon,
    security: SecurityIcon,

    // ----------------------------------------------------------------------
    // ПЕРСОНАЛИЗАЦИЯ (Personalization)
    // ----------------------------------------------------------------------
    desktopdock: DesktopDockIcon,
    display: DisplaysIcon,
    displays: DisplaysIcon,
    wallpaper: WallpaperIcon,
    screensaver: ScreenSaverIcon,
    energysaver: EnergySaverIcon,

    // ----------------------------------------------------------------------
    // БЕЗОПАСНОСТЬ И ПОЛЬЗОВАТЕЛИ (Security & Users)
    // ----------------------------------------------------------------------
    lockscreen: LockScreenIcon,
    loginpassword: LoginPassIcon,
    users: UsersIcon,
    passwords: PasswordsIcon,
    internetaccounts: MailIcon,
    gamecenter: GameCenterIcon,
    wallet: WalletIcon,

    // ----------------------------------------------------------------------
    // УСТРОЙСТВА (Hardware)
    // ----------------------------------------------------------------------
    keyboard: notesIcon,
    mouse: finderIcon,
    trackpad: finderIcon,
    printer: finderIcon,
    storage: calculatorIcon,

    // ----------------------------------------------------------------------
    // ДОПОЛНИТЕЛЬНЫЕ (прочие)
    // ----------------------------------------------------------------------
    notes: notesIcon,
    launchpad: launchpadIcon,
    calculator: calculatorIcon,
    calendar: calendarIcon,
    safari: safariIcon,
    finder: finderIcon,
    music: musicIcon,
    datetime: calendarIcon,
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
