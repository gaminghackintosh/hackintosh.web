import React from "react";

export const SettingsRow = ({
  label,
  description,
  value,
  children,
  onClick,
  chevron = false,
  icon = null,
  iconBg = null,
}) => {
  const isClickable = !!onClick || chevron;

  return (
    <div
      className={`sr-row${isClickable ? " sr-row--clickable" : ""}`}
      onClick={onClick}
    >
      {icon && (
        <div className="sr-icon-badge" style={iconBg ? { background: iconBg } : undefined}>
          {icon}
        </div>
      )}
      
      <div className="sr-left">
        <span className="sr-label">{label}</span>
        {description && <span className="sr-desc">{description}</span>}
      </div>

      <div className="sr-right">
        {value && <span className="sr-value">{value}</span>}
        {children}
        {chevron && <span className="sr-chevron">›</span>}
      </div>
    </div>
  );
};