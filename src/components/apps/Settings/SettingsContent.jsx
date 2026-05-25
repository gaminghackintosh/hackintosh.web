import React, { useState, useEffect } from "react";
import { WALLPAPER_GROUPS, DEFAULT_WALLPAPER } from "../../../constants/wallpapers";

export function SettingsContent({ currentWallpaper, onWallpaperChange }) {
  const [activeTab, setActiveTab] = useState("wallpaper");
  const [searchQuery, setSearchQuery] = useState("");

  // Полная структура меню как в macOS System Settings
  const menuSections = [
    {
      id: "network",
      items: [
        { id: "wifi", label: "Wi-Fi", icon: "📶", badge: null },
        { id: "bluetooth", label: "Bluetooth", icon: "🔄", badge: null },
        { id: "network", label: "Network", icon: "🌐", badge: null },
        { id: "vpn", label: "VPN", icon: "🔒", badge: null }
      ]
    },
    {
      id: "system",
      items: [
        { id: "notifications", label: "Notifications", icon: "🔔", badge: null },
        { id: "sound", label: "Sound", icon: "🔊", badge: null },
        { id: "focus", label: "Focus", icon: "🧘", badge: null },
        { id: "screentime", label: "Screen Time", icon: "⏱️", badge: null }
      ]
    },
    {
      id: "general",
      items: [
        { id: "general", label: "General", icon: "⚙️", badge: null },
        { id: "appearance", label: "Appearance", icon: "🎨", badge: null },
        { id: "accessibility", label: "Accessibility", icon: "♿", badge: null },
        { id: "controlcenter", label: "Control Center", icon: "🎮", badge: null },
        { id: "siri", label: "Siri & Spotlight", icon: "🔍", badge: null },
        { id: "privacy", label: "Privacy & Security", icon: "🔐", badge: null }
      ]
    },
    {
      id: "desktop",
      items: [
        { id: "desktopdock", label: "Desktop & Dock", icon: "🖥️", badge: null },
        { id: "displays", label: "Displays", icon: "🖥️", badge: null },
        { id: "wallpaper", label: "Wallpaper", icon: "🖼️", badge: null },
        { id: "screensaver", label: "Screen Saver", icon: "✨", badge: null },
        { id: "energysaver", label: "Energy Saver", icon: "🔋", badge: null }
      ]
    },
    {
      id: "security",
      items: [
        { id: "lockscreen", label: "Lock Screen", icon: "🔒", badge: null },
        { id: "loginpassword", label: "Login Password", icon: "🔑", badge: null },
        { id: "usersgroups", label: "Users & Groups", icon: "👥", badge: null }
      ]
    },
    {
      id: "accounts",
      items: [
        { id: "passwords", label: "Passwords", icon: "🔐", badge: null },
        { id: "internetaccounts", label: "Internet Accounts", icon: "🌍", badge: null },
        { id: "gamecenter", label: "Game Center", icon: "🎮", badge: null }
      ]
    }
  ];

  // Фильтрация по поиску
  const filteredSections = menuSections
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.includes(searchQuery.toLowerCase())
      )
    }))
    .filter(section => section.items.length > 0);

  const handleItemClick = (itemId) => {
    if (itemId === "wallpaper") setActiveTab(itemId);
    else if (itemId === "appleid") setActiveTab("about");
    // Здесь можно добавить обработку других пунктов меню
    else console.log(`Clicked: ${itemId} (not implemented yet)`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "wallpaper":
        return (
          <div className="settings-panel">
            <div className="panel-header">
              <h2 className="panel-title">Wallpaper</h2>
              <p className="panel-description">Choose a background image for your desktop</p>
            </div>
            {WALLPAPER_GROUPS.map((group) => (
              <div key={group.id} className="wallpaper-group">
                <h3 className="wallpaper-group-title">{group.title}</h3>
                <div className="wallpaper-grid">
                  {group.wallpapers.map((wp) => {
                    const isSelected = currentWallpaper === wp.id;
                    return (
                      <div
                        key={wp.id}
                        className={`wallpaper-card ${isSelected ? "selected" : ""}`}
                        onClick={() => onWallpaperChange?.({ id: wp.id, type: "image", value: wp.image })}
                      >
                        <div className="wallpaper-thumbnail">
                          <img src={wp.thumbnail} alt={wp.name} />
                          {isSelected && <div className="check-badge">✓</div>}
                        </div>
                        <span className="wallpaper-title">{wp.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );

      case "about":
        return (
          <div className="settings-panel">
            <div className="panel-header">
              <h2 className="panel-title">About This Mac</h2>
            </div>
            <div className="system-info-card">
              <div className="info-header">
                <div className="apple-logo">🍎</div>
                <div>
                  <h3>hackintosh.web</h3>
                  <p>macOS Sonoma 14.0.1</p>
                </div>
              </div>
            </div>
            <div className="info-section">
              <div className="info-row"><span className="info-label">Version</span><span className="info-value">14.0.1</span></div>
              <div className="info-row"><span className="info-label">Build</span><span className="info-value">23A344</span></div>
              <div className="info-row"><span className="info-label">Serial Number</span><span className="info-value">HACKW192K98X</span></div>
              <div className="info-row"><span className="info-label">Processor</span><span className="info-value">Apple M3 Max (Virtual)</span></div>
              <div className="info-row"><span className="info-label">Memory</span><span className="info-value">16 GB LPDDR5X</span></div>
              <div className="info-row"><span className="info-label">Graphics</span><span className="info-value">Integrated GPU (16-core)</span></div>
              <div className="info-row"><span className="info-label">Storage</span><span className="info-value">512 GB (420 GB available)</span></div>
            </div>
            <div className="info-footer">
              <p>™ & © 1983–2026 Apple Inc. All rights reserved.</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="settings-panel">
            <div className="panel-header">
              <h2 className="panel-title">Settings</h2>
              <p className="panel-description">This section is not yet implemented.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <div className="sidebar-header">
          <h1>System Settings</h1>
        </div>
        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="tabs-list">
          {filteredSections.map((section, idx) => (
            <div key={section.id} className="menu-section">
              {idx > 0 && <div className="section-divider" />}
              {section.items.map(item => (
                <div
                  key={item.id}
                  className={`tab-item ${activeTab === item.id ? "active" : ""} ${item.isAppleId ? "apple-id" : ""}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span className="tab-icon">{item.icon}</span>
                  <span className="tab-label">{item.label}</span>
                  {item.badge && (
                    <span className="tab-badge" style={{ backgroundColor: item.badgeColor || "#ff3b30" }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="settings-content">
        {renderTabContent()}
      </div>
    </div>
  );
}