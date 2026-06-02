import React, { useState, useCallback, useMemo, memo } from "react";
import {
  FiArrowLeft, FiArrowRight, FiRefreshCw,
  FiShare2, FiPlus, FiSearch,
} from "react-icons/fi";
import { HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { BsSliders2 } from "react-icons/bs";

import safariBg from "./../../../assets/images/Safari_Wallpapers/Safari_Background.webp";
import { AboutPage, HackintoshPage, CatsPage, SurprisePage } from "./Local_Pages/LocalPages";

// ── Оптимизированные Favicon SVGs (мемоизированные) ─────────────
const AppleFavicon = memo(() => (
  <svg viewBox="0 0 60 60" width="30" height="30" fill="#1d1d1f">
    <path d="M42.56 46.5c-1.93 2.87-3.97 5.67-7.05 5.73-3.1.07-4.1-1.84-7.61-1.84-3.55 0-4.63 1.79-7.57 1.91-3.03.11-5.33-3.06-7.27-5.87C9.83 39.37 6.86 28.84 10.87 21.7c2.01-3.52 5.63-5.74 9.54-5.81 2.97-.05 5.78 2.01 7.62 2.01 1.8 0 5.23-2.48 8.82-2.1 1.5.06 5.71.6 8.42 4.58-.2.14-5.02 2.97-4.97 8.83.06 6.99 6.14 9.32 6.2 9.35-.06.16-.98 3.34-3.2 6.54M30.15 8.1c1.7-1.92 4.49-3.38 6.81-3.47.3 2.7-.78 5.44-2.4 7.38-1.6 1.97-4.24 3.5-6.83 3.29-.35-2.65.96-5.43 2.42-7.2"/>
  </svg>
));

const YandexFavicon = memo(() => (
  <svg viewBox="0 0 60 60" width="28" height="28" fill="white">
    <text x="12" y="44" fontFamily="Georgia,serif" fontSize="44" fontWeight="700">Y</text>
  </svg>
));

const BingFavicon = memo(() => (
  <svg viewBox="0 0 60 60" width="28" height="28" fill="white">
    <text x="10" y="46" fontFamily="Segoe UI,sans-serif" fontSize="46" fontWeight="700">B</text>
  </svg>
));

const GoogleFavicon = memo(() => (
  <svg viewBox="0 0 60 60" width="30" height="30">
    <text x="6" y="46" fontFamily="Product Sans,sans-serif" fontSize="46" fontWeight="700" fill="#4285f4">G</text>
    <circle cx="44" cy="35" r="4" fill="#34a853"/>
    <circle cx="44" cy="22" r="4" fill="#ea4335"/>
    <circle cx="33" cy="16" r="4" fill="#fbbc05"/>
  </svg>
));

// Статические данные (не пересоздаются при ререндере)
const FAVORITES = [
  { title: "Apple",  icon: AppleFavicon,  bg: "#fff",    url: "https://apple.com" },
  { title: "Yandex", icon: YandexFavicon, bg: "#FC3F1D", url: "https://ya.ru" },
  { title: "Bing",   icon: BingFavicon,   bg: "#008373", url: "https://bing.com" },
  { title: "Google", icon: GoogleFavicon, bg: "#fff",    url: "https://google.com" },
  { title: "Apple",  icon: AppleFavicon,  bg: "#fff",    url: "https://apple.com" },
];

const FROM_IPHONE = ["INCY AI Helper"];
const LOCAL_COMMANDS = new Set(["about", "hackintosh", "cats", "surprise"]);

// Мемоизированный компонент вкладки
const Tab = memo(({ tab, isActive, onSelect, onClose, isOnlyTab }) => (
  <div 
    className={`sf__tab ${isActive ? "active" : ""}`}
    onClick={() => onSelect(tab.id)}
  >
    <span className="sf__tab-title">{tab.title}</span>
    {!isOnlyTab && (
      <button 
        className="sf__tab-close" 
        onClick={(e) => onClose(tab.id, e)}
        title="Close"
      >
        ×
      </button>
    )}
  </div>
));

// Мемоизированный компонент списка вкладок
const TabsBar = memo(({ tabs, activeTabId, onSelectTab, onCloseTab }) => (
  <div className="sf__tabs-bar">
    {tabs.map(tab => (
      <Tab
        key={tab.id}
        tab={tab}
        isActive={tab.id === activeTabId}
        onSelect={onSelectTab}
        onClose={onCloseTab}
        isOnlyTab={tabs.length === 1}
      />
    ))}
    <button className="sf__new-tab-btn" onClick={() => onSelectTab(null)} title="New Tab">
      <FiPlus size={14}/>
    </button>
  </div>
));

// Мемоизированный компонент стартовой страницы
const StartPage = memo(({ bookmarks, onNavigate }) => (
  <div className="sf__start">
    <div className="sf__start-inner">
      <section className="sf__section">
        <h3 className="sf__section-title">Favorites</h3>
        <div className="sf__favs">
          {FAVORITES.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <button key={i} className="sf__fav" onClick={() => onNavigate(f.url)}>
                <span className="sf__fav-icon" style={{ background: f.bg }}>
                  <IconComponent />
                </span>
                <span className="sf__fav-label">{f.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {bookmarks.length > 0 && (
        <section className="sf__section">
          <h3 className="sf__section-title">Bookmarks</h3>
          <div className="sf__bookmarks">
            {bookmarks.map((b, i) => (
              <button key={i} className="sf__bookmark-btn" onClick={() => onNavigate(b.url)}>
                {b.title}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="sf__section">
        <h3 className="sf__section-title">Privacy Report</h3>
        <div className="sf__privacy-card">
          <span className="sf__privacy-icon"><HiOutlineShieldCheck size={20}/></span>
          <p className="sf__privacy-text">
            Safari has not encountered any trackers in the last seven days.
            Safari can hide your IP address from known trackers.
          </p>
        </div>
      </section>

      <section className="sf__section">
        <h3 className="sf__section-title">From iPhone</h3>
        <div className="sf__iphone-grid">
          {FROM_IPHONE.map((t, i) => (
            <button key={i} className="sf__iphone-tab" onClick={() => onNavigate(t)}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <button className="sf__surprise-btn" onClick={() => onNavigate("surprise")}>
        🎲 Surprise Me!
      </button>
    </div>
  </div>
));

// Мемоизированный компонент заблокированной страницы
const BlockedPage = memo(({ url, onGoHome }) => (
  <div className="sf__blocked">
    <div className="sf__blocked-icon">🧭</div>
    <h2>Safari Can't Open the Page</h2>
    <p>
      Safari can't open <strong>"{url}"</strong> because web content cannot be loaded in this environment.
    </p>
    <button className="sf__blocked-back" onClick={onGoHome}>
      Go to Start Page
    </button>
  </div>
));

function PageRenderer({ command, onNavigate }) {
  switch (command) {
    case "about":      return <AboutPage />;
    case "hackintosh": return <HackintoshPage />;
    case "cats":       return <CatsPage />;
    case "surprise":   return <SurprisePage onNavigate={onNavigate} />;
    default:           return null;
  }
}

export function SafariContent({ onClose, onMinimize, onZoom }) {
  // Используем useReducer для более предсказуемых обновлений
  const [tabs, setTabs] = useState(() => [
    { id: 1, title: "Start Page", url: "", isStart: true }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Ленивая инициализация bookmarks
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("safari_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch { 
      return []; 
    }
  });

  // Мемоизация активной вкладки
  const activeTab = useMemo(
    () => tabs.find(t => t.id === activeTabId) || tabs[0],
    [tabs, activeTabId]
  );

  // Оптимизированные обработчики с useCallback
  const addTab = useCallback((url = "", title = "New Tab") => {
    const newTab = { 
      id: Date.now(), 
      title, 
      url, 
      isStart: !url 
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, []);

  const closeTab = useCallback((id, e) => {
    e?.stopPropagation();
    if (tabs.length === 1) return;
    
    setTabs(prev => {
      const newTabs = prev.filter(t => t.id !== id);
      if (activeTabId === id) {
        setActiveTabId(newTabs[0].id);
      }
      return newTabs;
    });
  }, [tabs.length, activeTabId]);

  const updateTab = useCallback((id, updates) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const navigate = useCallback((target) => {
    if (!target?.trim()) return;
    
    const lowerTarget = target.toLowerCase().trim();
    const isLocal = LOCAL_COMMANDS.has(lowerTarget);

    if (isLocal) {
      updateTab(activeTab.id, {
        url: lowerTarget,
        title: lowerTarget.charAt(0).toUpperCase() + lowerTarget.slice(1),
        isStart: false,
      });
      return;
    }

    updateTab(activeTab.id, {
      url: target.startsWith("http") ? target : `https://${target}`,
      title: target,
      isStart: false,
    });
    
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300); // Уменьшил задержку
    return () => clearTimeout(timer);
  }, [activeTab.id, updateTab]);

  const goHome = useCallback(() => {
    updateTab(activeTab.id, { 
      url: "", 
      title: "Start Page", 
      isStart: true 
    });
  }, [activeTab.id, updateTab]);

  const handleKey = useCallback((e) => {
    if (e.key === "Enter") {
      navigate(activeTab.url || "");
    }
  }, [activeTab.url, navigate]);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const addBookmark = useCallback(() => {
    if (!activeTab.url || activeTab.isStart) return;
    
    const newBookmark = { 
      title: activeTab.title, 
      url: activeTab.url 
    };
    
    setBookmarks(prev => {
      const updated = [...prev, newBookmark];
      localStorage.setItem("safari_bookmarks", JSON.stringify(updated));
      return updated;
    });
  }, [activeTab.title, activeTab.url, activeTab.isStart]);

  const handleSelectTab = useCallback((tabId) => {
    if (tabId === null) {
      addTab();
    } else {
      setActiveTabId(tabId);
    }
  }, [addTab]);

  // Мемоизация контента
  const renderContent = useMemo(() => {
    if (activeTab.isStart) {
      return <StartPage bookmarks={bookmarks} onNavigate={navigate} />;
    }

    const isLocal = LOCAL_COMMANDS.has(activeTab.url?.toLowerCase());
    if (isLocal) {
      return <PageRenderer command={activeTab.url.toLowerCase()} onNavigate={navigate} />;
    }

    return <BlockedPage url={activeTab.url} onGoHome={goHome} />;
  }, [activeTab.isStart, activeTab.url, bookmarks, navigate, goHome]);

  return (
    <div className="sf" style={{ backgroundImage: `url(${safariBg})` }}>
      <div className="sf__bg-overlay" />

      <div className="sf__toolbar">
        <div className="sf__toolbar-top">
          <div className="sf__toolbar-left">
            <div className="sf__tl-group">
              <button className="sf__tl sf__tl--close" onClick={onClose} title="Close"/>
              <button className="sf__tl sf__tl--minimize" onClick={onMinimize} title="Minimize"/>
              <button className="sf__tl sf__tl--zoom" onClick={onZoom} title="Zoom"/>
            </div>
            <button className="sf__icon-btn" title="Toggle Sidebar">
              <TbLayoutSidebarLeftExpand size={16}/>
            </button>
          </div>

          <div className="sf__toolbar-center">
            <div className="sf__nav-buttons">
              <button 
                className={`sf__nav-btn${!activeTab.isStart ? "" : " sf__nav-btn--disabled"}`}
                onClick={() => !activeTab.isStart && goHome()} 
                disabled={activeTab.isStart}
              >
                <FiArrowLeft size={13}/>
              </button>
              <button className="sf__nav-btn sf__nav-btn--disabled" disabled>
                <FiArrowRight size={13}/>
              </button>
            </div>

            <div className="sf__address">
              {activeTab.isStart ? (
                <FiSearch size={12} className="sf__address-icon"/>
              ) : (
                <HiOutlineLockClosed size={12} className="sf__address-icon sf__address-icon--lock"/>
              )}
              <input
                className="sf__address-input"
                placeholder="Search or enter website name"
                value={activeTab.url || ""}
                onChange={(e) => updateTab(activeTab.id, { url: e.target.value })}
                onKeyDown={handleKey}
                onFocus={(e) => e.target.select()}
                spellCheck={false}
              />
              <button className="sf__refresh-btn" onClick={handleRefresh} title="Reload">
                <FiRefreshCw size={11} className={isLoading ? "sf--spin" : ""}/>
              </button>
            </div>
          </div>

          <div className="sf__toolbar-right">
            <button className="sf__icon-btn" title="Share"><FiShare2 size={14}/></button>
            <button className="sf__icon-btn" onClick={addBookmark} title="Bookmark">🔖</button>
            <button className="sf__icon-btn" title="View Settings"><BsSliders2 size={14}/></button>
          </div>
        </div>

        <TabsBar 
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={handleSelectTab}
          onCloseTab={closeTab}
        />
      </div>

      <div className="sf__body">
        {renderContent}
      </div>
    </div>
  );
}
