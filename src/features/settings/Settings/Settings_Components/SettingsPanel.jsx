import React from "react";

export const SettingsPanel = ({ title, description, children }) => (
  <div className="settings-panel">
    <div className="panel-header">
      <h2 className="panel-title">{title}</h2>
      {description && <p className="panel-description">{description}</p>}
    </div>
    <div className="panel-body">{children}</div>
  </div>
);