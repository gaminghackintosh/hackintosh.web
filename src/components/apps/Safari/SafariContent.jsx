import React, { useContext, useState, useMemo } from "react";
import { WindowContext } from "../../AppWindow/AppWindow";
import {
  FiArrowLeft, FiArrowRight, FiRefreshCw,
  FiShare2, FiPlus, FiSearch,
} from "react-icons/fi";
import { HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { BsSliders2 } from "react-icons/bs";

// import assets
import safariBg from "./../../../assets/images/Safari_Wallpapers/Safari_Background.webp";

// ── Favicon SVGs для избранных ────────────────────────────────────
const AppleFavicon = () => (
  <svg viewBox="0 0 60 60" width="30" height="30" fill="#1d1d1f">
    <path d="M42.56 46.5c-1.93 2.87-3.97 5.67-7.05 5.73-3.1.07-4.1-1.84-7.61-1.84-3.55 0-4.63 1.79-7.57 1.91-3.03.11-5.33-3.06-7.27-5.87C9.83 39.37 6.86 28.84 10.87 21.7c2.01-3.52 5.63-5.74 9.54-5.81 2.97-.05 5.78 2.01 7.62 2.01 1.8 0 5.23-2.48 8.82-2.1 1.5.06 5.71.6 8.42 4.58-.2.14-5.02 2.97-4.97 8.83.06 6.99 6.14 9.32 6.2 9.35-.06.16-.98 3.34-3.2 6.54M30.15 8.1c1.7-1.92 4.49-3.38 6.81-3.47.3 2.7-.78 5.44-2.4 7.38-1.6 1.97-4.24 3.5-6.83 3.29-.35-2.65.96-5.43 2.42-7.2"/>
  </svg>
);
const YandexFavicon = () => (
  <svg viewBox="0 0 60 60" width="28" height="28" fill="white">
    <text x="12" y="44" fontFamily="Georgia,serif" fontSize="44" fontWeight="700">Y</text>
  </svg>
);
const BingFavicon = () => (
  <svg viewBox="0 0 60 60" width="28" height="28" fill="white">
    <text x="10" y="46" fontFamily="Segoe UI,sans-serif" fontSize="46" fontWeight="700">B</text>
  </svg>
);
const GoogleFavicon = () => (
  <svg viewBox="0 0 60 60" width="30" height="30">
    <text x="6" y="46" fontFamily="Product Sans,sans-serif" fontSize="46" fontWeight="700" fill="#4285f4">G</text>
    <circle cx="44" cy="35" r="4" fill="#34a853"/>
    <circle cx="44" cy="22" r="4" fill="#ea4335"/>
    <circle cx="33" cy="16" r="4" fill="#fbbc05"/>
  </svg>
);

// ── Список избранного (точно как на скриншоте) ────────────────────
const FAVORITES = [
  { title: "Apple",  icon: <AppleFavicon />,  bg: "#fff",    url: "https://apple.com" },
  { title: "Yandex", icon: <YandexFavicon />, bg: "#FC3F1D", url: "https://ya.ru" },
  { title: "Bing",   icon: <BingFavicon />,   bg: "#008373", url: "https://bing.com" },
  { title: "Google", icon: <GoogleFavicon />, bg: "#fff",    url: "https://google.com" },
  { title: "Apple",  icon: <AppleFavicon />,  bg: "#fff",    url: "https://apple.com" },
];

// ── «From iPhone» — имитация открытых вкладок ─────────────────────
const FROM_IPHONE = [
  "INCY AI Helper",
  "",
];

// ── Грeetings по времени суток ──────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 5)  return "Good Night";
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
}

export function SafariContent({ onClose, onMinimize, onZoom }) {
  const { onTitleMouseDown } = useContext(WindowContext);
  const [url, setUrl]           = useState("");
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [canBack, setCanBack]   = useState(false);
  const [canFwd,  setCanFwd]    = useState(false);

  const greeting = useMemo(() => getGreeting(), []);

  const navigate = (target) => {
    if (!target.trim()) return;
    const dest = target.startsWith("http") ? target : `https://${target}`;
    setUrl(dest);
    setInputVal(dest);
    setShowStart(false);
    setCanBack(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 900);
  };

  const goHome = () => {
    setShowStart(true);
    setInputVal("");
    setUrl("");
    setCanBack(false);
    setCanFwd(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") navigate(inputVal);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="sf" style={{ backgroundImage: `url(${safariBg})` }}>

      {/* ══ Background / Blur ══════════════════════════════════════════════════ */}
      <div className="sf__bg-overlay" />
      
      {/* ══ TOOLBAR ══════════════════════════════════════════════════ */}
      <div
        className="sf__toolbar"
        onMouseDown={(e) => {
          if (!e.target.closest("button, input")) onTitleMouseDown(e);
        }}
      >
        {/* Left: traffic lights + sidebar toggle */}
        <div className="sf__toolbar-left">
          <div className="sf__tl-group">
            <button className="sf__tl sf__tl--close"    onClick={onClose}    title="Close"/>
            <button className="sf__tl sf__tl--minimize" onClick={onMinimize} title="Minimize"/>
            <button className="sf__tl sf__tl--zoom"     onClick={onZoom}     title="Zoom"/>
          </div>
          <button className="sf__icon-btn" title="Toggle Sidebar">
            <TbLayoutSidebarLeftExpand size={16}/>
          </button>
        </div>

        {/* Center: nav + address bar */}
        <div className="sf__toolbar-center">
          <button className={`sf__nav-btn${canBack ? "" : " sf__nav-btn--disabled"}`}
            onClick={() => canBack && goHome()} disabled={!canBack} title="Back">
            <FiArrowLeft size={13}/>
          </button>
          <button className={`sf__nav-btn${canFwd ? "" : " sf__nav-btn--disabled"}`}
            disabled={!canFwd} title="Forward">
            <FiArrowRight size={13}/>
          </button>

          <div className="sf__address">
            {showStart ? (
              <FiSearch size={12} className="sf__address-icon"/>
            ) : (
              <HiOutlineLockClosed size={12} className="sf__address-icon sf__address-icon--lock"/>
            )}
            <input
              className="sf__address-input"
              placeholder="Search or enter website name"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKey}
              onFocus={(e) => e.target.select()}
              spellCheck={false}
            />
            <button className="sf__refresh-btn" onClick={handleRefresh} title="Reload">
              <FiRefreshCw size={11} className={isLoading ? "sf--spin" : ""}/>
            </button>
          </div>
        </div>

        {/* Right: share, new tab, view settings */}
        <div className="sf__toolbar-right">
          <button className="sf__icon-btn" title="Share"><FiShare2 size={14}/></button>
          <button className="sf__icon-btn" title="New Tab"><FiPlus size={16}/></button>
          <button className="sf__icon-btn" title="View Settings"><BsSliders2 size={14}/></button>
        </div>
      </div>

      {/* ══ CONTENT ══════════════════════════════════════════════════ */}
      <div className="sf__body">

        {showStart ? (
          /* ── START PAGE ─────────────────────────────────────────── */
          <div className="sf__start">
            <div className="sf__start-inner">

              {/* Favorites */}
              <section className="sf__section">
                <h3 className="sf__section-title">Favorites</h3>
                <div className="sf__favs">
                  {FAVORITES.map((f, i) => (
                    <button key={i} className="sf__fav" onClick={() => navigate(f.url)}>
                      <span className="sf__fav-icon" style={{ background: f.bg }}>
                        {f.icon}
                      </span>
                      <span className="sf__fav-label">{f.title}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Privacy Report */}
              <section className="sf__section">
                <h3 className="sf__section-title">Privacy Report</h3>
                <div className="sf__privacy-card">
                  <span className="sf__privacy-icon">
                    <HiOutlineShieldCheck size={20}/>
                  </span>
                  <p className="sf__privacy-text">
                    Safari has not encountered any trackers in the last seven days.
                    Safari can hide your IP address from known trackers.
                  </p>
                </div>
              </section>

              {/* From iPhone */}
              <section className="sf__section">
                <h3 className="sf__section-title">From iPhone</h3>
                <div className="sf__iphone-grid">
                  {FROM_IPHONE.filter(t => t).map((t, i) => (
                    <button key={i} className="sf__iphone-tab" onClick={() => navigate(t)}>
                      {t}
                    </button>
                  ))}
                </div>
              </section>

            </div>
          </div>
        ) : (
          /* ── BLOCKED PAGE ───────────────────────────────────────── */
          <div className="sf__blocked">
            <div className="sf__blocked-icon">🧭</div>
            <h2>Safari Can't Open the Page</h2>
            <p>
              Safari can't open <strong>"{url}"</strong> because the URL is invalid
              or web content cannot be loaded in this environment.
            </p>
            <button className="sf__blocked-back" onClick={goHome}>
              Go to Start Page
            </button>
          </div>
        )}

      </div>
    </div>
  );
}