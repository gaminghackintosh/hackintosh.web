import React, { useState, useRef, useCallback, memo, useMemo } from "react";
import { APPS } from "@/core/constants/apps";
import { AssetIcon } from "@/ui";

const GITHUB_APP = {
  id: "github",
  name: "View Source by GitHub",
  isLink: true,
  url: "https://github.com/gaminghackintosh/hackintosh.web",
  icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
};

// Базовый размер иконки в Dock
const BASE_ICON_SIZE = 58;

// Мемоизированный список приложений (никогда не меняется)
const DOCK_ITEMS = [...APPS, GITHUB_APP];

const DockTooltip = memo(function DockTooltip({ visible, text }) {
  if (!visible) return null;
  return <div className="dock__tooltip dock__tooltip--visible">{text}</div>;
});

const DockItem = memo(function DockItem({ 
  app, 
  isHovered,
  onOpen, 
  isOpen, 
  isMinimized,
  isLightTheme
}) {
  const itemRef = useRef(null);
  const isGitHub = app.id === "github";
  
  const handleClick = useCallback(() => {
    if (app.isLink) {
      window.open(app.url, "_blank");
    } else {
      onOpen(app.id);
    }
  }, [app.isLink, app.url, app.id, onOpen]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);
  
  return (
    <div
      ref={itemRef}
      className={`dock__item ${isHovered ? "dock__item--hovered" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Launch ${app.name} app`}
      tabIndex={0}
      style={{ contain: "layout style" }}
    >
      {/* Icon */}
      {isGitHub ? (
        <div className="dock__icon-wrapper dock__icon-wrapper--white-bg">
          <img 
            src={app.icon} 
            alt={app.name}
            draggable={false}
            loading="lazy"
            decoding="async"
            style={{ width: `${BASE_ICON_SIZE}px`, height: `${BASE_ICON_SIZE}px` }}
          />
        </div>
      ) : (
        <AssetIcon 
          path={app.iconPath} 
          pathLight={app.iconPathLight}
          fallback={app.icon} 
          size={BASE_ICON_SIZE} 
          alt={app.name}
          isLightTheme={isLightTheme}
          imgStyle={{ width: `${BASE_ICON_SIZE}px`, height: `${BASE_ICON_SIZE}px` }}
        />
      )}

      {/* Indicator dot */}
      <div className="dock__indicator">
        {isOpen && !app.isLink && (
          <div 
            className={`dock__indicator-dot ${isMinimized ? "dock__indicator-dot--minimized" : ""}`}
          />
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Кастомная проверка для минимизации ререндеров
  return (
    prevProps.isHovered === nextProps.isHovered &&
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.isMinimized === nextProps.isMinimized &&
    prevProps.isLightTheme === nextProps.isLightTheme &&
    prevProps.app.id === nextProps.app.id
  );
});

// Мемоизированный разделитель
const DockSeparator = memo(() => <div className="dock__separator" aria-hidden="true" />);

export default function Dock({ onOpen, openApps, minimizedApps = new Set(), isLightTheme = false }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const dockRef = useRef(null);

  // Мемоизация обработчиков
  const handleMouseEnter = useCallback((index) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  // Мемоизация рендера элементов Dock
  const dockItems = useMemo(() => {
    return DOCK_ITEMS.map((app, index) => {
      const isGitHub = app.id === "github";
      const isOpen = openApps?.includes(app.id);
      // Защита для minimizedApps
      const isMinimized = minimizedApps instanceof Set ? minimizedApps.has(app.id) : minimizedApps?.includes?.(app.id);
      
      return (
        <React.Fragment key={app.id}>
          {isGitHub && <DockSeparator />}
          <div
            className="dock__item-wrapper"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{ contain: "layout" }}
          >
            <DockTooltip visible={hoverIndex === index} text={app.name} />
            
            <DockItem
              app={app}
              isHovered={hoverIndex === index}
              onOpen={onOpen}
              isOpen={isOpen}
              isMinimized={isMinimized}
              isLightTheme={isLightTheme}
            />
          </div>
        </React.Fragment>
      );
    });
  }, [openApps, minimizedApps, hoverIndex, onOpen, isLightTheme]);

  return (
    <div 
      ref={dockRef}
      className="dock"
      onMouseLeave={handleMouseLeave}
      style={{ contain: "layout paint" }}
    >
      {dockItems}
    </div>
  );
}