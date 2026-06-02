export const Desktop = ({ children, wallpaper, onContextMenu }) => (
  <div
    onContextMenu={onContextMenu}
    style={{
      width: "100vw", height: "100vh", overflow: "hidden", position: "relative",
      backgroundImage: `url(${wallpaper})`, backgroundSize: "cover",
    }}
  >
    {children}
  </div>
);