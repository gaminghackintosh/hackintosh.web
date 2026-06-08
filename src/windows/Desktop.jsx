import React, { memo, useState, useEffect, useCallback } from "react";


export const Desktop = memo(function Desktop({ 
  children, 
  wallpaper, 
  onContextMenu,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Предзагрузка обоев
  useEffect(() => {
    const img = new Image();
    img.src = wallpaper;
    img.onload = () => setIsLoaded(true);
    
    return () => {
      img.onload = null;
    };
  }, [wallpaper]);


  // Мемоизация стилей
  const desktopStyle = {
    backgroundImage: `url(${wallpaper})`,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  return (
    <div
      onContextMenu={onContextMenu}
      className="desktop"
      style={desktopStyle}
    >
      {children}
    </div>
  );
}, (prevProps, nextProps) => {
  // Кастомная проверка для минимизации ререндеров
  return (
    prevProps.wallpaper === nextProps.wallpaper &&
    prevProps.onContextMenu === nextProps.onContextMenu
  );
});