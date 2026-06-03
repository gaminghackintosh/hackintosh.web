import { useWindowManager } from './../../hooks/WindowManagerProvider';
import { AppWindow } from './AppWindow/AppWindow';
import { renderAppContent } from './../../utils/renderAppContent';
import { Suspense, memo, useCallback } from 'react';
import { WindowLoading } from './../ui';

/**
 * WindowItem — индивидуальное окно с собственным селектором состояния
 * ✅ Рендерится только при изменении СВОИХ данных, а не всех окон
 */
const WindowItem = memo(function WindowItem({ winId, setWallpaper }) {
  const { 
    windows, 
    activeWin, 
    minimizedApps,
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow 
  } = useWindowManager();
  
  const win = windows.find(w => w.id === winId);
  if (!win) return null;
  
  const isActive = activeWin === winId;
  const isMinimized = minimizedApps.has(winId);
  
  // ✅ Стабильные функции для этого конкретного окна
  const handleClose = useCallback(() => closeWindow(winId), [closeWindow, winId]);
  const handleMinimize = useCallback(() => minimizeWindow(winId), [minimizeWindow, winId]);
  const handleFocus = useCallback(() => focusWindow(winId), [focusWindow, winId]);
  const handleZoom = useCallback(() => maximizeWindow(winId), [maximizeWindow, winId]);

  return (
    <AppWindow
      win={win}
      isActive={isActive}
      isMinimized={isMinimized}
      onClose={handleClose}
      onMinimize={handleMinimize}
      onFocus={handleFocus}
      onZoom={handleZoom}
    >
      <Suspense fallback={<WindowLoading />}>
        {renderAppContent(winId, { 
          closeWindow: handleClose, 
          minimizeWindow: handleMinimize, 
          maximizeWindow: handleZoom, 
          setWallpaper 
        })}
      </Suspense>
    </AppWindow>
  );
}, (prev, next) => {
  // ✅ Сравниваем только ID окна — остальное внутри компонента
  return prev.winId === next.winId && prev.setWallpaper === next.setWallpaper;
});

/**
 * WindowList — рендерит список окон
 * ✅ Не передаёт map в родитель, каждое окно независимо
 */
export const WindowList = memo(function WindowList({ setWallpaper }) {
  const { windows } = useWindowManager();
  
  return (
    <>
      {windows.map(win => (
        <WindowItem key={win.id} winId={win.id} setWallpaper={setWallpaper} />
      ))}
    </>
  );
}, (prev, next) => {
  // ✅ Сравниваем только количество окон и setWallpaper
  return prev.setWallpaper === next.setWallpaper;
});
