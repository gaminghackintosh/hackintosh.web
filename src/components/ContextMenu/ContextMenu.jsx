import React, { useEffect, useRef } from 'react';

export const ContextMenu = ({ x, y, items, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Корректируем позицию, чтобы меню не вылезало за границы экрана
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const overflowsRight = x + rect.width > window.innerWidth;
      const overflowsBottom = y + rect.height > window.innerHeight;
      if (overflowsRight) menuRef.current.style.left = `${x - rect.width}px`;
      if (overflowsBottom) menuRef.current.style.top = `${y - rect.height}px`;
    }
  }, [x, y]);

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ left: x, top: y }}
    >
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return <div key={index} className="context-menu__divider" />;
        }
        return (
          <div
            key={index}
            className="context-menu__item"
            onClick={() => {
              item.action?.();
              onClose();
            }}
          >
            <span className="context-menu__label">{item.label}</span>
            {item.shortcut && <span className="context-menu__shortcut">{item.shortcut}</span>}
          </div>
        );
      })}
    </div>
  );
};