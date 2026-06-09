import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    base: isProd ? "/hackintosh.web/" : "/",

    plugins: [
      react({
        devTarget: "esnext",
        tsDecorators: true,
        loose: true,
      }),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },

    build: {
      sourcemap: false,
      minify: isProd ? "esbuild" : false,
      chunkSizeWarningLimit: 1000,
      target: "esnext",
      cssMinify: isProd,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            icons: ["react-icons"],
            finder: ["./src/features/finder/Finder/FinderContent"],
            safari: ["./src/features/safari/Safari/SafariContent"],
            notes: ["./src/features/notes/Notes/NotesContent"],
            terminal: ["./src/features/terminal/Terminal/Terminal"],
            music: ["./src/features/music/MusicApp/MusicContent"],
            settings: ["./src/features/settings/Settings/SettingsContent"],
          },
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          crossOrigin: "anonymous",
        },
        treeshake: true,
      },
    },

    optimizeDeps: {
      include: ["react", "react-dom", "react-icons"],
      force: false,
    },

    server: {
      open: false,
      hmr: { overlay: false },
      watch: { usePolling: false },
    },

    esbuild: {
      drop: isProd ? ["console", "debugger"] : [],
      minifyIdentifiers: isProd,
      minifySyntax: true,
      minifyWhitespace: isProd,
    },

    resolve: {
      alias: {
        "@": "/src",
        "@core": "/src/core",
        "@features": "/src/features",
        "@ui": "/src/ui",
        "@windows": "/src/windows",
        "@styles": "/src/styles",
        "@assets": "/src/assets",
        "@utils": "/src/utils",
        "@hooks": "/src/hooks",
        "@components": "/src/components",
      },
    },

    preview: {
      port: 4173,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    },
  };
});