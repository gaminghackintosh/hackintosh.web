import React, { useState } from "react";

// ===== IMPORTS ===== //
import WallpaperIconImg from "../../../assets/icons/SettingsIcon/folder.png";

// ===== SCSS ===== //
import "./../../../styles/Settings.scss";

export function SettingsContent({ currentWallpaper, onWallpaperChange }) {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About This Mac", icon: "" },
    // 2. Передаем импортированную переменную вместо строки
    { id: "wallpaper", label: "Wallpaper", iconImg: WallpaperIconImg }, 
    { id: "displays", label: "Displays", icon: "📺" },
    { id: "battery", label: "Battery", icon: "🔋" },
    { id: "wifi", label: "Wi-Fi", icon: "📶" },
  ];

  const wallpapersList = [
    { id: "default", name: "Sonoma Default", type: "image" },
    { 
      id: "cosmic-purple", 
      name: "Cosmic Purple", 
      type: "gradient", 
      value: "radial-gradient(ellipse at 25% 35%, rgba(120, 40, 220, 0.75) 0%, transparent 55%), radial-gradient(ellipse at 78% 20%, rgba(255, 110, 40, 0.65) 0%, transparent 45%), linear-gradient(145deg, #0d0718 0%, #1a0833 100%)" 
    },
    { 
      id: "sunset-orange", 
      name: "Sunset Orange", 
      type: "gradient", 
      value: "linear-gradient(135deg, #2c003e 0%, #03001e 50%, #7303c0 100%)" 
    },
    { 
      id: "dark-mode", 
      name: "Pure Dark", 
      type: "gradient", 
      value: "linear-gradient(180deg, #16161a 0%, #0b0b0c 100%)" 
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 10 }}>
            <div style={{ fontSize: 64, color: "#fff", userSelect: "none" }}></div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>macOS Ventura</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Version 13.5 (Simulated)</div>
            
            <div style={{ width: "100%", maxWidth: 440, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "6px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { label: "Processor", value: "Apple M3 Max (Virtual)" },
                { label: "Memory", value: "16 GB LPDDR5" },
                { label: "Graphics", value: "Apple G15S (16-core)" },
                { label: "Serial Number", value: "HACKW192K98X" },
                { label: "Storage", value: "512 GB NVMe SSD (420 GB free)" }
              ].map((item, index, arr) => (
                <div key={item.label} style={{
                  display: "flex", justifyContent: "space-between", padding: "12px 0",
                  borderBottom: index === arr.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
                  fontSize: 13
                }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: "#fff", fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 20, textAlign: "center" }}>
              ™ & © 1983-2026 Apple Inc. All rights reserved.
            </div>
          </div>
        );

      case "wallpaper":
        return (
          <div>
            <h3 style={{ margin: "0 0 4px 0", color: "#fff", fontSize: 17, fontWeight: 600 }}>Wallpaper</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 20px 0" }}>Select a background style for your desktop environment.</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 16 }}>
              {wallpapersList.map((wp) => {
                const isSelected = currentWallpaper === wp.id;
                return (
                  <div 
                    key={wp.id} 
                    onClick={() => onWallpaperChange && onWallpaperChange(wp)}
                    style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <div style={{
                      width: "100%", height: 90, borderRadius: 10,
                      background: wp.type === "gradient" ? wp.value : "rgba(255,255,255,0.1)",
                      border: isSelected ? "3px solid #0a84ff" : "1px solid rgba(255,255,255,0.15)",
                      boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: isSelected ? "0 0 12px rgba(10,132,255,0.4)" : "none",
                      transition: "border 0.15s ease"
                    }}>
                      {wp.type === "image" && <span style={{ fontSize: 28 }}>🖼️</span>}
                    </div>
                    <span style={{ fontSize: 12, color: isSelected ? "#0a84ff" : "rgba(255,255,255,0.8)", textAlign: "center", fontWeight: isSelected ? 600 : 400 }}>
                      {wp.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "displays":
        return (
          <div>
            <h3 style={{ margin: "0 0 16px 0", color: "#fff", fontSize: 17, fontWeight: 600 }}>Displays</h3>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: 24, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width: 160, height: 100, border: "4px solid #e5e5ea", borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{window.innerWidth} × {window.innerHeight}</span>
              </div>
              <div style={{ width: "100%", fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Resolution</span>
                  <span style={{ color: "#fff", fontWeight: 500 }}>Built-in Retina Display</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Refresh Rate</span>
                  <span style={{ color: "#fff", fontWeight: 500 }}>120 Hz (ProMotion)</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "battery":
        return (
          <div>
            <h3 style={{ margin: "0 0 16px 0", color: "#fff", fontSize: 17, fontWeight: 600 }}>Battery</h3>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: 18, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 36 }}>🔋</span>
                <div>
                  <div style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>100%</div>
                  <div style={{ color: "#32d74b", fontSize: 12, fontWeight: 500 }}>Fully Charged • Power Adapter Connected</div>
                </div>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Maximum Capacity</span>
                <span style={{ color: "#fff", fontWeight: 500 }}>99%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Condition</span>
                <span style={{ color: "#32d74b", fontWeight: 500 }}>Normal</span>
              </div>
            </div>
          </div>
        );

      case "wifi":
        return (
          <div>
            <h3 style={{ margin: "0 0 16px 0", color: "#fff", fontSize: 17, fontWeight: 600 }}>Wi-Fi</h3>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>📶</span>
                  <div>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>Wi-Fi State</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Connected to Hackintosh_Network_5G</div>
                  </div>
                </div>
                <div style={{
                  width: 42, height: 24, borderRadius: 12, background: "#30d158",
                  position: "relative", cursor: "pointer", display: "flex", alignItems: "center", padding: "0 2px"
                }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", marginLeft: "auto", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
                </div>
              </div>
              
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "4px 0" }} />
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: 0.5 }}>NEARBY NETWORKS</div>
              
              {["Hackintosh_Network_5G", "Apple_Guest_Secure", "Starbucks_Free_WiFi"].map((net, i) => (
                <div key={net} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, padding: "4px 6px", borderRadius: 6 }}>
                  <span style={{ color: i === 0 ? "#0a84ff" : "rgba(255,255,255,0.85)", fontWeight: i === 0 ? 500 : 400 }}>
                    {net} {i === 0 && " ✓"}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>🔒</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", userSelect: "none" }}>
      {/* Левый Сайдбар Настроек */}
      <div style={{
        width: 190, flexShrink: 0, background: "rgba(40,40,44,0.3)",
        borderRight: "1px solid rgba(255,255,255,0.06)", padding: "14px 8px", overflowY: "auto"
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 8,
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                fontSize: 13, fontWeight: isActive ? 500 : 400, cursor: "pointer",
                transition: "background 0.1s ease, color 0.1s ease", marginBottom: 2
              }}
              onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ width: 20, display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                {tab.iconImg ? (
                  <img 
                    src={tab.iconImg} 
                    alt={tab.label} 
                    style={{ width: 18, height: 18, borderRadius: 4, objectFit: "cover" }} 
                  />
                ) : (
                  <span style={{ fontSize: 15 }}>{tab.icon}</span>
                )}
              </span>
              <span>{tab.label}</span>
            </div>
          );
        })}
      </div>

      {/* Правая часть с Контентом */}
      <div style={{ flex: 1, padding: "22px 26px", overflowY: "auto" }}>
        {renderTabContent()}
      </div>
    </div>
  );
}