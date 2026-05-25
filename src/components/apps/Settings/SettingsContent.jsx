import React, { useState, useEffect } from "react";
import { WALLPAPER_GROUPS, DEFAULT_WALLPAPER } from "../../../constants/wallpapers";

export function SettingsContent({ currentWallpaper, onWallpaperChange }) {
  const [activeTab, setActiveTab] = useState("wallpaper");
  const [searchQuery, setSearchQuery] = useState("");

  // Только рабочие разделы
  const tabs = [
    { id: "wallpaper", label: "Wallpaper", icon: "🖼️" },
    { id: "about", label: "About This Mac", icon: "🍎" },
  ].filter(tab =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tab.id.includes(searchQuery.toLowerCase())
  );

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
        return null;
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
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
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