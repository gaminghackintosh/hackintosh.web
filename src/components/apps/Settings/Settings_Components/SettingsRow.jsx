import React from "react";


export const SettingsRow = ({
  label,
  description,
  value,
  children,
  onClick,
  chevron = false,
}) => {
  const isClickable = !!onClick || chevron;

  return (
    <div
      className={`sr-row${isClickable ? " sr-row--clickable" : ""}`}
      onClick={onClick}
    >
      {/* Left: label + optional description */}
      <div className="sr-left">
        <span className="sr-label">{label}</span>
        {description && <span className="sr-desc">{description}</span>}
      </div>

      {/* Right: value text OR custom control OR chevron */}
      <div className="sr-right">
        {value && <span className="sr-value">{value}</span>}
        {children}
        {chevron && <span className="sr-chevron">›</span>}
      </div>
    </div>
  );
};