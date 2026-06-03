import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/hackintosh.web/" : "/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    // Code splitting для лучшей производительности
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['react-icons'],
        },
      },
    },
    // Отключение sourcemaps для production
    sourcemap: false,
    // Минимизация бандла
    minify: 'esbuild',
    // Ограничение размера чанка
    chunkSizeWarningLimit: 500,
    // Оптимизация для production
    target: 'esnext',
    cssMinify: true,
    // Сжатие изображений
    assetsInlineLimit: 4096, // 4kb
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons'],
    // Кэширование зависимостей
    force: false,
  },
  // Server оптимизации
  server: {
    open: false,
    hmr: {
      overlay: false, // Отключить overlay для производительности
    },
  },
  // Production оптимизации
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));

