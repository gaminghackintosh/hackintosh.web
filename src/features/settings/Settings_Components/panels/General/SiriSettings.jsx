import React, { useState } from "react";
import { SettingsPanel, SettingsGroup, SettingsRow, ToggleSwitch } from "../../SettingsPanel";

export const SiriSettings = () => {
  const [askSiri, setAskSiri] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <SettingsPanel 
      title="Siri & Spotlight"
      description="Ask Siri to open apps, find files, send messages, and more. Use Spotlight to search the web and your Mac."
      icon="siri"
    >
      <SettingsGroup label="Siri">
        <ToggleSwitch
          label="Ask Siri"
          description="Enable Siri assistant"
          checked={askSiri}
          onChange={e => setAskSiri(e.target.checked)}
        />
        <SettingsRow label="Language">
          <select className="ctrl-select" value={language} onChange={e => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Русский</option>
            <option>Español</option>
            <option>Deutsch</option>
            <option>Français</option>
          </select>
        </SettingsRow>
        <SettingsRow label="Siri Voice">
          <select className="ctrl-select">
            <option>Voice 1</option>
            <option>Voice 2</option>
            <option>Voice 3</option>
            <option>Voice 4</option>
          </select>
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup label="Spotlight">
        <SettingsRow label="Spotlight Suggestions" chevron onClick={() => {}} />
        <SettingsRow label="Search Results" chevron onClick={() => {}} />
      </SettingsGroup>
    </SettingsPanel>
  );
};
