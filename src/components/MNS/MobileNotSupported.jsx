import React, { useState } from "react";
import "./scss/main.scss";

const FEATURES = [
  {
    icon: "🖥",
    title: "Desktop Optimized",
    desc: "Requires a screen of 1024px or wider",
  },
  {
    icon: "🎨",
    title: "Aqua / Glass Design",
    desc: "Full macOS visual system with blur & layers",
  },
  {
    icon: "⚡",
    title: "Full Performance Mode",
    desc: "Window management, Dock & Terminal live",
  },
];

export default function MobileNotSupported() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="mns-backdrop">
      {/* Classic macOS desktop background pattern */}
      <div className="mns-desktop-bg" />

      {/* OS X–style window */}
      <div className="mns-window" role="dialog" aria-modal="true">

        {/* ── Brushed-metal title bar ── */}
        <div className="mns-titlebar">
          <div className="mns-traffic">
            <button
              className="tl tl-close"
              onClick={() => setDismissed(true)}
              aria-label="Close"
              title="Close"
            />
            <button className="tl tl-min"  aria-label="Minimize" title="Minimize" />
            <button className="tl tl-max"  aria-label="Zoom"     title="Zoom"     />
          </div>
          <span className="mns-titlebar-label">hackintosh.web</span>
          {/* Right spacer keeps title centered */}
          <div className="mns-titlebar-spacer" />
        </div>

        {/* ── Toolbar divider ── */}
        <div className="mns-divider" />

        {/* ── Body ── */}
        <div className="mns-body">

          {/* Icon + headline */}
          <div className="mns-hero">
            <div className="mns-app-icon" aria-hidden="true">
              <span className="mns-app-icon-inner">🖥</span>
            </div>
            <div className="mns-hero-text">
              <h1 className="mns-title">Desktop Only</h1>
              <p className="mns-subtitle">macOS Experience</p>
              <p className="mns-description">
                This interface requires a desktop or laptop computer.
                Open it on a larger screen to access the full
                macOS&#8209;inspired environment.
              </p>
            </div>
          </div>

          {/* Classic separator */}
          <div className="mns-divider mns-divider--inset" />

          {/* Feature list — looks like a classic macOS panel */}
          <div className="mns-features" role="list">
            {FEATURES.map((f) => (
              <div className="mns-feature-row" role="listitem" key={f.title}>
                <div className="mns-feature-icon" aria-hidden="true">
                  {f.icon}
                </div>
                <div className="mns-feature-text">
                  <span className="mns-feature-title">{f.title}</span>
                  <span className="mns-feature-desc">{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mns-divider mns-divider--inset" />

          {/* Action buttons — classic Aqua style */}
          <div className="mns-actions">
            <button
              className="mns-btn mns-btn--secondary"
              onClick={() => setDismissed(true)}
            >
              Cancel
            </button>
            <button
              className="mns-btn mns-btn--primary"
              onClick={() => setDismissed(true)}
            >
              OK
            </button>
          </div>

          <p className="mns-footer">© 2026 gaminghackintosh</p>
        </div>
      </div>
    </div>
  );
}