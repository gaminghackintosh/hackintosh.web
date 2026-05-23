import React, { useEffect, useRef, useState } from "react";

const DEFAULT_HOME = "https://duckduckgo.com/";
const normalizeUrl = (raw) => {
  const value = raw.trim();
  if (!value) return DEFAULT_HOME;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) return value;
  if (value.includes(" ")) return `https://duckduckgo.com/?q=${encodeURIComponent(value)}`;
  return `https://${value}`;
};

const niceTitle = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace("www.", "");
  } catch {
    return url;
  }
};

export default function SafariContent() {
  const [address, setAddress] = useState(DEFAULT_HOME);
  const [inputValue, setInputValue] = useState(DEFAULT_HOME);
  const [history, setHistory] = useState([DEFAULT_HOME]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const iframeRef = useRef(null);

  const currentUrl = history[historyIndex] || DEFAULT_HOME;
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  useEffect(() => {
    setAddress(currentUrl);
    setInputValue(currentUrl);
    setLoadFailed(false);
    setIsLoading(true);
  }, [currentUrl]);

  const openUrl = (value) => {
    const nextUrl = normalizeUrl(value);
    setHistory((prev) => {
      const clean = prev.slice(0, historyIndex + 1);
      return [...clean, nextUrl];
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const reload = () => {
    setIsLoading(true);
    setLoadFailed(false);
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  const navigate = (value) => {
    openUrl(value);
    setIsLoading(true);
    setLoadFailed(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(inputValue);
  };

  const handleBack = () => {
    if (canGoBack) setHistoryIndex((prev) => prev - 1);
  };

  const handleForward = () => {
    if (canGoForward) setHistoryIndex((prev) => prev + 1);
  };

  const handleHome = () => navigate(DEFAULT_HOME);
  const handleOpenExternally = () => window.open(currentUrl, "_blank");

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(250,250,252,0.04) 0%, rgba(0,0,0,0.05) 100%)",
      }}
    >
      <div
        style={{
          padding: "14px 16px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: 1.1, textTransform: "uppercase" }}>
              Safari
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>
              {niceTitle(currentUrl)}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={handleBack}
            disabled={!canGoBack}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: canGoBack ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
              color: canGoBack ? "white" : "rgba(255,255,255,0.35)",
              cursor: canGoBack ? "pointer" : "not-allowed",
            }}
          >
            ◀
          </button>
          <button
            type="button"
            onClick={handleForward}
            disabled={!canGoForward}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: canGoForward ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
              color: canGoForward ? "white" : "rgba(255,255,255,0.35)",
              cursor: canGoForward ? "pointer" : "not-allowed",
            }}
          >
            ▶
          </button>
          <button
            type="button"
            onClick={reload}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              cursor: "pointer",
            }}
          >
            ⟳
          </button>
          <button
            type="button"
            onClick={handleHome}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              cursor: "pointer",
            }}
          >
            ⌂
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          background: "rgba(18,18,20,0.82)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flex: 1,
            padding: "10px 14px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#3CCF4E" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>https</span>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: "white",
              fontSize: 13,
            }}
            placeholder="Enter a website or search"
          />
        </div>
        <button
          type="submit"
          style={{
            minWidth: 66,
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Go
        </button>
      </form>

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <iframe
          key={currentUrl}
          ref={iframeRef}
          src={currentUrl}
          title="Safari Browser"
          frameBorder="0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onLoad={() => {
            setIsLoading(false);
            setLoadFailed(false);
          }}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "#0b0b0e",
          }}
        />
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, #5ac8fa, #ff9f0a, #32d74b)",
              animation: "safari-progress 1.4s ease-in-out infinite",
            }}
          />
        )}
        {loadFailed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: 24,
              textAlign: "center",
              background: "rgba(0,0,0,0.7)",
              color: "white",
            }}
          >
            <div style={{ fontSize: 30 }}>⚠️</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>This page could not be displayed in Safari.</div>
            <div style={{ color: "rgba(255,255,255,0.66)", maxWidth: 420 }}>
              Some websites block embedding in iframes, so the browser may not be able to show the page here. Open it in a new tab to continue browsing.
            </div>
            <button
              type="button"
              onClick={handleOpenExternally}
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                border: "none",
                background: "#0a84ff",
                color: "white",
                cursor: "pointer",
              }}
            >
              Open in new tab
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255,255,255,0.03)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
          <span>{isLoading ? "Loading…" : "Ready"}</span>
          <span>•</span>
          <span>{niceTitle(currentUrl)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={() => navigate("https://duckduckgo.com/")}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Start Page
          </button>
          <button
            type="button"
            onClick={handleOpenExternally}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Open in Tab
          </button>
        </div>
      </div>

      <style>{`
        @keyframes safari-progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(8%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
    </div>
  );
}
