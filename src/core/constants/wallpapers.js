// macOS Sequoia
import Sequoia_1 from "@/assets/images/wallpapers/Sequoia/wallpaper_default.png";
import Sequoia_2 from "@/assets/images/wallpapers/Sequoia/wallpaper_2.png";
import Sequoia_3 from "@/assets/images/wallpapers/Sequoia/wallpaper_3.png";
import Sequoia_4 from "@/assets/images/wallpapers/Sequoia/wallpaper_4.png";
import Sequoia_5 from "@/assets/images/wallpapers/Sequoia/wallpaper_5.png";
import Sequoia_6 from "@/assets/images/wallpapers/Sequoia/wallpaper_6.png";
import Sequoia_7 from "@/assets/images/wallpapers/Sequoia/wallpaper_7.png";
import Sequoia_8 from "@/assets/images/wallpapers/Sequoia/wallpaper_8.png";
import Sequoia_9 from "@/assets/images/wallpapers/Sequoia/wallpaper_9.png";
import Sequoia_10 from "@/assets/images/wallpapers/Sequoia/wallpaper_10.png";
import Sequoia_11 from "@/assets/images/wallpapers/Sequoia/wallpaper_11.png";

// macOS Tahoe
import Tahoe_1 from "@/assets/images/wallpapers/Tahoe/Tahoe Light.webp";
import Tahoe_2 from "@/assets/images/wallpapers/Tahoe/Tahoe Dark.webp";

const SEQUOIA_GROUP = 0;
const TAHOE_GROUP = 1;

export const WALLPAPER_GROUPS = [
  {
    id: "sequoia",
    title: "macOS Sequoia",
    wallpapers: [
      { id: "sequoia_1", name: "Sequoia Default", image: Sequoia_1, thumbnail: Sequoia_1 },
      { id: "sequoia_2", name: "Sequoia Forest", image: Sequoia_2, thumbnail: Sequoia_2 },
      { id: "sequoia_3", name: "Sequoia Lake", image: Sequoia_3, thumbnail: Sequoia_3 },
      { id: "sequoia_4", name: "Sequoia Mountain", image: Sequoia_4, thumbnail: Sequoia_4 },
      { id: "sequoia_5", name: "Sequoia Sunset", image: Sequoia_5, thumbnail: Sequoia_5 },
      { id: "sequoia_6", name: "Sequoia Night", image: Sequoia_6, thumbnail: Sequoia_6 },
      { id: "sequoia_7", name: "Sequoia Abstract", image: Sequoia_7, thumbnail: Sequoia_7 },
      { id: "sequoia_8", name: "Sequoia Waves", image: Sequoia_8, thumbnail: Sequoia_8 },
      { id: "sequoia_9", name: "Sequoia Desert", image: Sequoia_9, thumbnail: Sequoia_9 },
      { id: "sequoia_10", name: "Sequoia City", image: Sequoia_10, thumbnail: Sequoia_10 },
      { id: "sequoia_11", name: "Sequoia Vintage", image: Sequoia_11, thumbnail: Sequoia_11 }
    ]
  },

  {
    id: "Tahoe",
    title: "macOS Tahoe",
    wallpapers: [
      { id: "Tahoe_1", name: "Tahoe Light", image: Tahoe_1, thumbnail: Tahoe_1 },
      { id: "Tahoe_2", name: "Tahoe Dark", image: Tahoe_2, thumbnail: Tahoe_2 }
    ]
  }
];

// wallpapers[0] — Tahoe Light
// wallpapers[1] — Tahoe Dark

// По умолчанию тёмная тема (Tahoe Dark)
export const DEFAULT_WALLPAPER = WALLPAPER_GROUPS[1].wallpapers[1];
export const WALLPAPERS = WALLPAPER_GROUPS.flatMap(g => g.wallpapers);
export function getWallpaperById(id) {
  return WALLPAPERS.find(w => w.id === id) || DEFAULT_WALLPAPER;
}