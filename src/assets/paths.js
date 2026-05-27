/**===== Корневая папка для всех иконок =====**/
export const ICONS_DIR = "icons";

export const ASSET_DIRS = {
  apps: `${ICONS_DIR}/apps`,
  menu: `${ICONS_DIR}/menu`,
  desktop: `${ICONS_DIR}/desktop`,
  finder: `${ICONS_DIR}/finder`,
};

/**===== Иконки приложений (Dock, окна) =====**/
export const APP_ICONS = {
  finder: `${ASSET_DIRS.apps}/Dark_Themes/Finder_Dark.png`,
  safari: `${ASSET_DIRS.apps}/Dark_Themes/Safari_Dark.png`,
  notes: `${ASSET_DIRS.apps}/Dark_Themes/Notes_Dark.png`,
  terminal: `${ASSET_DIRS.apps}/Dark_Themes/Terminal_Dark.png`,
  music: `${ASSET_DIRS.apps}/Dark_Themes/Music_Dark.png`,
  settings: `${ASSET_DIRS.apps}/Dark_Themes/Settings_Dark.png`,
};
/* Emoji, пока нет картинки */
export const APP_ICON_FALLBACK = {
  finder: "🗂",
  safari: "🧭",
  notes: "📒",
  terminal: "🖥",
  music: "🎵",
  settings: "⚙️",
};

/**===== Боковое меню Finder (Favourites / Locations) =====**/
export const MENU_ICONS = {
  home: `${ASSET_DIRS.menu}/home.png`,
  desktop: `${ASSET_DIRS.menu}/desktop.png`,
  documents: `${ASSET_DIRS.menu}/documents.png`,
  downloads: `${ASSET_DIRS.menu}/downloads.png`,
  projects: `${ASSET_DIRS.menu}/projects.png`,
  macintoshHd: `${ASSET_DIRS.apps}/macintosh_HD.ico`,
  network: `${ASSET_DIRS.menu}/network.png`,
};
/* Emoji, пока нет картинки */
export const MENU_ICON_FALLBACK = {
  home: "🏠",
  desktop: "🖥",
  documents: "📁",
  downloads: "⬇️",
  projects: "💻",
  macintoshHd: "💾",
  network: "🌐",
};

/**===== Иконки на рабочем столе =====**/
export const DESKTOP_ICONS = {
  hackintoshWeb: `${ASSET_DIRS.apps}/macintosh_HD.ico`,
};
/* Emoji, пока нет картинки */
export const DESKTOP_ICON_FALLBACK = {
  hackintoshWeb: "💿",
};

/**===== Типы файлов/папок в Finder (список файлов) =====**/
export const FINDER_ICONS = {
  folder: `${ASSET_DIRS.finder}/folder_icon.png`,
  file: `${ASSET_DIRS.finder}/file.png`,
  image: `${ASSET_DIRS.finder}/image.png`,
  archive: `${ASSET_DIRS.finder}/archive.png`,
  pdf: `${ASSET_DIRS.finder}/pdf.png`,
  application: `${ASSET_DIRS.finder}/application.png`,
};
/* Emoji, пока нет картинки */
export const FINDER_ICON_FALLBACK = {
  folder: "📁",
  file: "📄",
  image: "🖼",
  archive: "📦",
  pdf: "📑",
  application: "📱",
};
