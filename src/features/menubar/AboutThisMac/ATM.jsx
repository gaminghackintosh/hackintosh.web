import React, { useCallback } from "react";
import { AssetIcon } from "@/ui";
import { APP_ICONS } from "@/assets/paths";

export default function AboutThisMac({ onClose }) {
  // Закрытие по клику вне окна
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  }, [onClose]);

  return (
    <div className="about-mac-backdrop" onClick={handleBackdropClick}>
      <div className="about-mac-window">
        <div className="about-mac-titlebar">
          <div className="about-mac-traffic">
            <div className="tl tl-close" onClick={onClose} />
            <div className="tl tl-min" />
            <div className="tl tl-max" />
          </div>
          <span className="about-mac-title">About This Mac</span>
        </div>

        <div className="about-mac-content">
          <div className="about-mac-left">
            <div className="about-mac-icon">
              <AssetIcon path={APP_ICONS.logotype} size={80} />
            </div>
            <div className="about-mac-version">
              <span className="about-mac-os-name">macOS</span>
              <span className="about-mac-os-version">Tahoe</span>
              <span className="about-mac-os-build">Version 26.0.1</span>
            </div>
            <div className="about-mac-disclaimer">
              <span>™ & © 1983–2026 Apple Inc.</span>
              <span>All rights reserved.</span>
            </div>
          </div>

          <div className="about-mac-right">
            <div className="about-mac-specs">
              <div className="about-mac-spec-row">
                <span className="spec-label">Chip</span>
                <span className="spec-value">Apple M3 Max</span>
              </div>
              <div className="about-mac-spec-row">
                <span className="spec-label">Memory</span>
                <span className="spec-value">16 GB LPDDR5X</span>
              </div>
              <div className="about-mac-spec-row">
                <span className="spec-label">Storage</span>
                <span className="spec-value">512 GB SSD</span>
              </div>
              <div className="about-mac-spec-row">
                <span className="spec-label">Serial</span>
                <span className="spec-value">HACKW192K98X</span>
              </div>
              <div className="about-mac-spec-row">
                <span className="spec-label">Graphics</span>
                <span className="spec-value">Integrated 16-core</span>
              </div>
            </div>

            <div className="about-mac-actions">
              <button className="about-mac-btn">More Info...</button>
              <button className="about-mac-btn">Service</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
