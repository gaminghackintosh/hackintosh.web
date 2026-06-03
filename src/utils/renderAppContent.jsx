import React from "react";
// Оптимизация: прямой импорт из features для tree-shaking
import FinderContent from "./../features/finder/Finder/FinderContent"; 
import { TerminalContent } from "./../features/terminal/Terminal/Terminal";
import { NotesContent } from "./../features/notes/Notes/NotesContent";
import { SettingsContent } from "./../features/settings/Settings/SettingsContent";
import { MusicContent } from "./../features/music/MusicApp/MusicContent";
import { SafariContent } from "./../features/safari/Safari/SafariContent";

/**
 * Функция-фабрика для рендеринга контента приложения.
 * Оптимизирована для tree-shaking и code-splitting.
 * @param {string} appId - ID приложения.
 * @param {object} props - Объект с функциями управления окном и состояниями.
 */
export const renderAppContent = (appId, { 
  closeWindow, minimizeWindow, maximizeWindow, setWallpaper 
}) => {
  // Общие пропсы для всех приложений
  const commonProps = {
    onClose: () => closeWindow(appId),
    onMinimize: () => minimizeWindow(appId),
    onMaximize: () => maximizeWindow(appId),
    onZoom: () => maximizeWindow(appId),
  };

  switch (appId) {
    case "finder":
      return <FinderContent {...commonProps} />;
    case "terminal":
      return <TerminalContent {...commonProps} />;
    case "notes":
      return <NotesContent {...commonProps} />;
    case "settings":
      return (
        <SettingsContent
          {...commonProps}
          onWallpaperChange={setWallpaper}
        />
      );
    case "safari":
      return <SafariContent {...commonProps} />;
    case "music":
      return <MusicContent {...commonProps} />;
    default:
      return (
        <div style={{ padding: 20, color: '#fff' }}>
          Приложение {appId} не найдено.
        </div>
      );
  }
};