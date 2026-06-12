import React, { useCallback, memo } from "react";

export const Tile = memo(function Tile({ icon: Icon, title, subtitle, active, accent, onClick }) {
  const handleClick = useCallback(() => onClick(), [onClick]);
  
  return (
    <button
      className={`cc-tile ${active ? "cc-tile--active" : ""}`}
      style={active && accent ? { "--tile-accent": accent } : undefined}
      onClick={handleClick}
    >
      <div className="cc-tile-icon">
        <Icon size={20} />
      </div>
      <div className="cc-tile-text">
        <span className="cc-tile-title">{title}</span>
        {subtitle && <span className="cc-tile-subtitle">{subtitle}</span>}
      </div>
    </button>
  );
});
