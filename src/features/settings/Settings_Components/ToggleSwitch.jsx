import React from "react";

export const ToggleSwitch = ({ label, description, checked, onChange }) => (
  <div className="sr-row">
    <div className="sr-left">
      <span className="sr-label">{label}</span>
      {description && <span className="sr-desc">{description}</span>}
    </div>
    <label className="toggle">
      <input
        type="checkbox"
        className="toggle__input"
        checked={checked}
        onChange={onChange}
      />
      <span className="toggle__track">
        <span className="toggle__thumb" />
      </span>
    </label>
  </div>
);
