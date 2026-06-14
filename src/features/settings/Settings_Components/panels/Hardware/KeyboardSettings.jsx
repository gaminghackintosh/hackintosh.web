import React, { useState } from "react";
import { SettingsPanel, SettingsGroup, SettingsRow, ToggleSwitch } from "../../SettingsPanel";

export const KeyboardSettings = () => {
  const [keyRepeat, setKeyRepeat] = useState("fast");
  const [delay, setDelay] = useState("short");

  return (
    <SettingsPanel 
      title="Keyboard"
      description="Adjust keyboard settings including key repeat, delay, and text input."
      icon="keyboard"
    >
      <SettingsGroup label="Keyboard">
        <SettingsRow label="Key Repeat">
          <select className="ctrl-select" value={keyRepeat} onChange={e => setKeyRepeat(e.target.value)}>
            <option value="fast">Fast</option>
            <option value="medium-fast">Medium Fast</option>
            <option value="medium">Medium</option>
            <option value="slow">Slow</option>
            <option value="off">Off</option>
          </select>
        </SettingsRow>
        <SettingsRow label="Delay Until Repeat">
          <select className="ctrl-select" value={delay} onChange={e => setDelay(e.target.value)}>
            <option value="short">Short</option>
            <option value="medium-short">Medium Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </SettingsRow>
        <ToggleSwitch
          label="Show Input menu in menu bar"
          checked={true}
          onChange={() => {}}
        />
      </SettingsGroup>

      <SettingsGroup label="Text Input">
        <SettingsRow label="Edit..." chevron onClick={() => {}} />
        <SettingsRow label="Input Sources" chevron onClick={() => {}} />
      </SettingsGroup>

      <SettingsGroup label="Shortcuts">
        <SettingsRow label="Keyboard Shortcuts..." chevron onClick={() => {}} />
      </SettingsGroup>
    </SettingsPanel>
  );
};
