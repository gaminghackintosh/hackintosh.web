import { useState } from 'react';

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState(null);

  const openContextMenu = (e, items) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: items
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return {
    contextMenu,
    openContextMenu,
    closeContextMenu,
  };
};