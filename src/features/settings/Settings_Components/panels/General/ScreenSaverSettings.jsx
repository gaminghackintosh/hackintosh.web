import React, { useState } from "react";
import { SettingsPanel, SettingsGroup, SettingsRow, ToggleSwitch } from "../../SettingsPanel";

export const ScreenSaverSettings = () => {
  const [screenSaver, setScreenSaver] = useState("flurry");
  const [delay, setDelay] = useState("5");

  return (
    <SettingsPanel 
      title="Screen Saver"
      description="Choose a screen saver and when to activate it."
      icon="datetime"
    >
      <SettingsGroup label="Screen Saver">
        <SettingsRow label="Screen Saver">
          <select className="ctrl-select" value={screenSaver} onChange={e => setScreenSaver(e.target.value)}>
            <option value="flurry">Flurry</option>
            <option value="arabesque">Arabesque</option>
            <option value="message">Message</option>
            <option value="photos">Photos</option>
            <option value="none">None</option>
          </select>
        </SettingsRow>
        <SettingsRow label="Start after">
          <select className="ctrl-select" value={delay} onChange={e => setDelay(e.target.value)}>
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="never">Never</option>
          </select>
        </SettingsRow>
        <ToggleSwitch
          label="Show with clock"
          description="Display clock over screen saver"
          checked={true}
          onChange={() => {}}
        />
      </SettingsGroup>
    </SettingsPanel>
  );
};
