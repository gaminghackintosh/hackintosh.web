import React from "react";

export const WindowLoading = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      // Цвет текста в стиле Apple (полупрозрачный белый)
      color: "rgba(255, 255, 255, 0.45)",
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      fontSize: "13px",
      gap: "12px",
      userSelect: "none"
    }}>
      {/* Спиннер в стиле macOS */}
      <div style={{
        width: "24px",
        height: "24px",
        border: "2.5px solid rgba(255, 255, 255, 0.15)",
        borderTop: "2.5px solid rgba(255, 255, 255, 0.6)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <span>Loading...</span>

      {/* Анимация */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};