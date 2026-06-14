const assetModules = import.meta.glob(
  [
    "./icons/apps/Dark_Themes/*.{png,svg,webp,jpg,jpeg,ico}",
    "./icons/apps/Light_Themes/*.{png,svg,webp,jpg,jpeg,ico}",
    "./icons/apps/macintosh_HD.ico",
    "./icons/finder/*.{png,svg,webp,jpg,jpeg,ico}",
    "./icons/menu/*.{png,svg,webp,jpg,jpeg,ico}",
    "./images/logo/*.{png,svg,webp,jpg,jpeg,ico}",
  ],
  {
    eager: true,
    import: "default",
  }
);

export function resolveAssetUrl(relativePath) {
  if (!relativePath) return null;
  const key = relativePath.startsWith("./") ? relativePath : `./${relativePath}`;
  return assetModules[key] ?? null;
}
