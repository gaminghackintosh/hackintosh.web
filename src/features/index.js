// Feature modules - приложения
// Lazy loading для оптимизации начальной загрузки
import { lazy } from 'react';

export const Finder = lazy(() => import('../features/finder/FinderContent'));
export const Safari = lazy(() => import('../features/safari/SafariContent'));
export const Notes = lazy(() => import('../features/notes/NotesContent'));
export const Music = lazy(() => import('../features/music/MusicContent'));
export const Terminal = lazy(() => import('../features/terminal/Terminal'));
export const Settings = lazy(() => import('../features/settings/SettingsContent'));
export const MenuBar = lazy(() => import('../features/menubar/MenuBar'));

// Константы приложений для импорта
export { APPS } from '../constants/apps';
export { APP_ICONS_LIGHT } from '../assets/paths';
