const assetModules = import.meta.glob("./**/*.{png,svg,webp,jpg,jpeg,ico}", {
  eager: true,
  import: "default",
});

export function resolveAssetUrl(relativePath) {
  if (!relativePath) return null;
  const key = relativePath.startsWith("./") ? relativePath : `./${relativePath}`;
  return assetModules[key] ?? null;
}
