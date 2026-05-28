import React, { useState, useRef, useEffect } from "react";
import { AssetIcon } from "../../../AssetIcon";
import { APP_ICONS } from "../../../../assets/paths";

export default function AboutThisMac({ onClose }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Центрирование окна при монтировании
  useEffect(() => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, []);

  // Закрытие по клику вне окна
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Начало перетаскивания
  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Перетаскивание
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div className="about-mac-backdrop" onClick={handleBackdropClick}>
      <div 
        ref={windowRef}
        className={`about-mac-window ${isDragging ? "dragging" : ""}`}
        style={{
          left: position.x,
          top: position.y,
          position: 'absolute'
        }}
      >
        <div className="about-mac-titlebar" onMouseDown={handleMouseDown}>
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
              <AssetIcon path={APP_ICONS.finder} fallback="🗂" size={80} />
            </div>
            <div className="about-mac-version">
              <span className="about-mac-os-name">macOS</span>
              <span className="about-mac-os-version">Sonoma</span>
              <span className="about-mac-os-build">Version 14.0.1</span>
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