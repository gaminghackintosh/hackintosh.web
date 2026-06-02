import React, { memo } from "react";

export const Desktop = memo(function Desktop({ children, wallpaper, onContextMenu }) {
  return (
    <div
      onContextMenu={onContextMenu}
      className="desktop"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        willChange: "auto",
      }}
    >
      {children}
    </div>
  );
});