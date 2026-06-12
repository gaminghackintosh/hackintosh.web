import React, { useCallback, memo } from "react";

export const ConnectivityItem = memo(function ConnectivityItem({ icon: Icon, label, status, active, onClick }) {
  const handleClick = useCallback(() => onClick(), [onClick]);
  
  return (
    <button className="cc-conn-item" onClick={handleClick}>
      <div className={`cc-conn-icon ${active ? "cc-conn-icon--active" : ""}`}>
        <Icon size={17} />
      </div>
      <div className="cc-conn-text">
        <span className="cc-conn-label">{label}</span>
        <span className="cc-conn-status">{status}</span>
      </div>
    </button>
  );
});
