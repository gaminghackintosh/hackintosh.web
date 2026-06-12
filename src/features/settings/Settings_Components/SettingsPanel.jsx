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
