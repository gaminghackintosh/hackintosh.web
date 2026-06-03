import { useState, useEffect, useCallback } from 'react';

/**
 * Оптимизированный хук для предзагрузки изображений
 * Кэширует загруженные изображения в памяти
 */
const imageCache = new Map();

export function useImagePreloader(sources) {
  const [loadedImages, setLoadedImages] = useState(() => {
    const initial = {};
    sources.forEach(src => {
      if (imageCache.has(src)) {
        initial[src] = imageCache.get(src);
      }
    });
    return initial;
  });

  useEffect(() => {
    let cancelled = false;
    
    const loadImages = async () => {
      const promises = sources.map(async (src) => {
        if (imageCache.has(src)) {
          return { src, img: imageCache.get(src) };
        }
        
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            if (!cancelled) {
              imageCache.set(src, img);
              resolve({ src, img });
            }
          };
          img.onerror = () => resolve({ src, img: null });
        });
      });
      
      const results = await Promise.all(promises);
      if (!cancelled) {
        setLoadedImages(prev => {
          const next = { ...prev };
          results.forEach(({ src, img }) => {
            if (img) next[src] = img;
          });
          return next;
        });
      }
    };

    loadImages();
    
    return () => {
      cancelled = true;
    };
  }, [sources]);

  return loadedImages;
}

/**
 * Хук для оптимизированной смены обоев с плавным переходом
 */
export function useWallpaper(initialWallpaper) {
  const [wallpaper, setWallpaperState] = useState(initialWallpaper);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setWallpaper = useCallback((newWallpaper) => {
    setWallpaperState(prev => {
      if (prev.value === newWallpaper.value) return prev;
      
      setIsTransitioning(true);
      // Предзагрузка нового изображения
      const img = new Image();
      img.src = newWallpaper.value;
      img.onload = () => {
        setIsTransitioning(false);
      };
      
      return newWallpaper;
    });
  }, []);

  return { wallpaper, setWallpaper, isTransitioning };
}

/**
 * Фабрика обоев для разных тем
 */
export const WallpaperFactory = {
  getForTheme: (theme = 'dark') => {
    const isLight = theme === 'light';
    return isLight 
      ? require('../assets/images/wallpapers/Tahoe/Tahoe Light.png')
      : require('../assets/images/wallpapers/Tahoe/Tahoe Dark.png');
  },
  
  // Кэш для часто используемых обоев
  cache: new Map(),
  
  preload: (wallpapers) => {
    wallpapers.forEach(wp => {
      if (!WallpaperFactory.cache.has(wp)) {
        const img = new Image();
        img.src = wp;
        WallpaperFactory.cache.set(wp, img);
      }
    });
  }
};
