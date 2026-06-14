import React, { useState } from "react";
import { SettingsPanel, SettingsGroup, SettingsRow, ToggleSwitch } from "../../SettingsPanel";

export const WallpaperSettings = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState("default");

  return (
    <SettingsPanel 
      title="Wallpaper"
      description="Customize the appearance of your desktop with different wallpapers and colors."
      icon="display"
    >
      <SettingsGroup label="Choose a wallpaper">
        <div className="wallpaper-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '10px' }}>
          {['default', 'dark', 'light', 'gradient1', 'gradient2', 'nature'].map(wp => (
            <div
              key={wp}
              className={`wallpaper-option ${selectedWallpaper === wp ? 'selected' : ''}`}
              onClick={() => setSelectedWallpaper(wp)}
              style={{
                height: '100px',
                borderRadius: '8px',
                cursor: 'pointer',
                border: selectedWallpaper === wp ? '3px solid #007AFF' : '2px solid transparent',
                background: wp === 'default' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                           wp === 'dark' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' :
                           wp === 'light' ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' :
                           wp === 'gradient1' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                           wp === 'gradient2' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
                           'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              }}
            />
          ))}
        </div>
      </SettingsGroup>
    </SettingsPanel>
  );
};
