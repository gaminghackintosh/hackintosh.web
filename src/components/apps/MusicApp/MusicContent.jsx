import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
  memo,
} from "react";
import { WindowContext } from "../../AppWindow/AppWindow";
import {
  FaPlay, FaPause, FaStepForward, FaStepBackward,
  FaRandom, FaSearch, FaVolumeUp, FaVolumeMute,
  FaPodcast, FaClock, FaUserFriends,
  FaCompactDisc, FaMusic, FaList, FaPlus,
} from "react-icons/fa";
import { MdOutlineRepeat, MdOutlineRepeatOne } from "react-icons/md";

const DEFAULT_SONGS = [];

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SongRow = memo(function SongRow({ song, isActive, isPlaying, onClick }) {
  return (
    <div
      className={`music-row${isActive ? " music-row--active" : ""}`}
      onClick={() => onClick(song.id)}
    >
      <span className="music-col-num">
        {isActive
          ? (isPlaying
              ? <span className="music-playing-bars"><span/><span/><span/></span>
              : <FaPlay className="music-active-icon" />)
          : <span className="music-row-num">{song._index}</span>}
      </span>
      <span className="music-col-title">
        <span className="music-col-title-text">{song.title}</span>
        <span className="music-col-title-artist">{song.artist}</span>
      </span>
      <span className="music-col-album">{song.album}</span>
      <span className="music-col-genre">{song.genre}</span>
      <span className="music-col-time">{song.duration || "—"}</span>
    </div>
  );
});

const ProgressBar = memo(function ProgressBar({ audioRef, duration }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tick = () => {
      setProgress(audio.currentTime / (audio.duration || 1));
      rafRef.current = requestAnimationFrame(tick);
    };

    audio.addEventListener("play",  () => { rafRef.current = requestAnimationFrame(tick); });
    audio.addEventListener("pause", () => { cancelAnimationFrame(rafRef.current); });
    audio.addEventListener("ended", () => { cancelAnimationFrame(rafRef.current); setProgress(0); });

    return () => cancelAnimationFrame(rafRef.current);
  }, [audioRef]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio);
  };

  return (
    <div className="music-progress" onClick={handleSeek}>
      <span className="music-progress-time">{formatTime(progress * (duration || 0))}</span>
      <div className="music-progress-track">
        <div className="music-progress-fill" style={{ width: `${progress * 100}%` }} />
        <div className="music-progress-thumb" style={{ left: `${progress * 100}%` }} />
      </div>
      <span className="music-progress-time">{formatTime(duration || 0)}</span>
    </div>
  );
});

export function MusicContent() {
  const { onClose, onMinimize, onZoom, onTitleMouseDown } = useContext(WindowContext);

  const [songs, setSongs]             = useState(DEFAULT_SONGS);
  const [activeId, setActiveId]       = useState(null);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [volume, setVolume]           = useState(0.7);
  const [isMuted, setIsMuted]         = useState(false);
  const [shuffle, setShuffle]         = useState(false);
  const [repeat, setRepeat]           = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [duration, setDuration]       = useState(0);
  const [activeSection, setActiveSection] = useState("songs");

  // ИСПОЛЬЗУЕМ NULL И ПРИВЯЗЫВАЕМ К ТЕГУ НИЖЕ
  const audioRef = useRef(null);

  const indexedSongs = useMemo(() => songs.map((s, i) => ({ ...s, _index: i + 1 })), [songs]);

  const filteredSongs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return q
      ? indexedSongs.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.artist.toLowerCase().includes(q) ||
            s.album?.toLowerCase().includes(q)
        )
      : indexedSongs;
  }, [indexedSongs, searchQuery]);

  const activeSong = useMemo(() => songs.find((s) => s.id === activeId) || null, [songs, activeId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        playNext();
      }
    };
    const onLoaded = () => setDuration(audio.duration);
    const onPlay   = () => setIsPlaying(true);
    const onPause  = () => setIsPlaying(false);

    audio.addEventListener("ended",          onEnded);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("play",           onPlay);
    audio.addEventListener("pause",          onPause);

    return () => {
      audio.removeEventListener("ended",          onEnded);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("play",           onPlay);
      audio.removeEventListener("pause",          onPause);
    };
  }, [repeat, activeId]);

  // НАДЕЖНАЯ СИНХРОНИЗАЦИЯ ГРОМКОСТИ С DOM
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const loadAndPlay = useCallback((song) => {
    const audio = audioRef.current;
    if (!audio || !song?.src) return;
    audio.src = song.src;
    audio.load();
    audio.play().catch(() => {});
    setActiveId(song.id);
    setDuration(0);
  }, []);

  const playNext = useCallback(() => {
    if (!songs.length) return;
    const idx = songs.findIndex((s) => s.id === activeId);
    let next = shuffle ? songs[Math.floor(Math.random() * songs.length)] : songs[(idx + 1) % songs.length];
    loadAndPlay(next);
  }, [songs, activeId, shuffle, loadAndPlay]);

  const playPrev = useCallback(() => {
    if (!songs.length) return;
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const idx = songs.findIndex((s) => s.id === activeId);
    const prev = songs[(idx - 1 + songs.length) % songs.length];
    loadAndPlay(prev);
  }, [songs, activeId, loadAndPlay]);

  const handleRowClick = useCallback((id) => {
    const song = songs.find((s) => s.id === id);
    if (!song) return;
    if (activeId === id) {
      const audio = audioRef.current;
      if (isPlaying) audio.pause();
      else audio.play().catch(() => {});
    } else {
      loadAndPlay(song);
    }
  }, [songs, activeId, isPlaying, loadAndPlay]);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!activeSong) {
      if (songs.length) loadAndPlay(songs[0]);
      return;
    }
    if (isPlaying) audio.pause();
    else audio.play().catch(() => {});
  }, [activeSong, songs, isPlaying, loadAndPlay]);

  const handleImport = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    const newSongs = files.map((f, i) => {
      const name = f.name.replace(/\.[^.]+$/, "");
      const parts = name.split(" - ");
      return {
        id: Date.now() + i,
        title:  parts.length > 1 ? parts[1].trim() : name,
        artist: parts.length > 1 ? parts[0].trim() : "Unknown",
        album:  "",
        genre:  "",
        src:    URL.createObjectURL(f),
        _isLocal: true,
      };
    });
    setSongs((prev) => [...prev, ...newSongs]);
    e.target.value = "";
  }, []);

  const cycleRepeat = () => setRepeat((r) => r === "none" ? "all" : r === "all" ? "one" : "none");

  const RepeatIcon = repeat === "one" ? MdOutlineRepeatOne : MdOutlineRepeat;

  // Функция для рендера контента на основе активной вкладки
  const renderMainContent = () => {
    switch (activeSection) {
      case "songs":
        return (
          <>
            <div className="music-table-header">
              <span className="music-col-num">#</span>
              <span className="music-col-title">Title</span>
              <span className="music-col-album">Album</span>
              <span className="music-col-genre">Genre</span>
              <span className="music-col-time">Time</span>
            </div>
            <div className="music-table-body">
              {filteredSongs.length === 0 ? (
                <div className="music-empty">
                  <FaMusic className="music-empty-icon" />
                  <p>Your library is empty</p>
                  <p className="music-empty-sub">Click the + button to add music files</p>
                </div>
              ) : (
                filteredSongs.map((song) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    isActive={song.id === activeId}
                    isPlaying={isPlaying}
                    onClick={handleRowClick}
                  />
                ))
              )}
            </div>
            <label className="music-import-btn" title="Add music files">
              <FaPlus />
              <input type="file" accept="audio/*" multiple style={{ display: "none" }} onChange={handleImport} />
            </label>
          </>
        );
      case "albums":
      case "artists":
      case "recent":
      case "playlists":
      case "radio":
        return (
          <div className="music-empty">
            <FaCompactDisc className="music-empty-icon" />
            <p style={{ textTransform: "capitalize" }}>{activeSection}</p>
            <p className="music-empty-sub">This section will be available in future updates.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="music">
      {/* СКРЫТЫЙ AUDIO ТЕГ ДЛЯ ПРАВИЛЬНОЙ РАБОТЫ REACT */}
      <audio ref={audioRef} style={{ display: "none" }} />

      <div className="music-header" onMouseDown={onTitleMouseDown}>
        <div className="music-traffic-lights">
          <button className="music-tl music-tl--close"    onClick={onClose} />
          <button className="music-tl music-tl--minimize" onClick={onMinimize} />
          <button className="music-tl music-tl--zoom"     onClick={onZoom} />
        </div>

        <div className="music-toolbar-center">
          <button className={`music-ctrl-btn ${shuffle ? "music-ctrl-btn--active" : ""}`} onClick={() => setShuffle((s) => !s)} title="Shuffle"><FaRandom /></button>
          <button className="music-ctrl-btn" onClick={playPrev} title="Previous"><FaStepBackward /></button>
          <button className="music-ctrl-btn music-ctrl-btn--play" onClick={handlePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
          <button className="music-ctrl-btn" onClick={playNext} title="Next"><FaStepForward /></button>
          <button className={`music-ctrl-btn ${repeat !== "none" ? "music-ctrl-btn--active" : ""}`} onClick={cycleRepeat} title="Repeat"><RepeatIcon /></button>
        </div>

        <div className="music-toolbar-right">
          <button className="music-ctrl-btn" onClick={() => setIsMuted((m) => !m)}>{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}</button>
          <input
            type="range" min="0" max="1" step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => { setVolume(+e.target.value); setIsMuted(false); }}
            className="music-volume-slider"
          />
        </div>
      </div>

      <div className="music-layout">
        <aside className="music-sidebar">
          <div className="music-sidebar-search">
            <FaSearch className="music-sidebar-search-icon" />
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="music-sidebar-section">
            <div className="music-sidebar-section-title">Library</div>
            {[
              { id: "songs",   icon: <FaMusic />,        label: "Songs"          },
              { id: "albums",  icon: <FaCompactDisc />,  label: "Albums"         },
              { id: "artists", icon: <FaUserFriends />,  label: "Artists"        },
              { id: "recent",  icon: <FaClock />,        label: "Recently Added" },
              { id: "playlists",icon: <FaList />,        label: "Playlists"      },
            ].map(({ id, icon, label }) => (
              <div key={id} className={`music-sidebar-item${activeSection === id ? " active" : ""}`} onClick={() => setActiveSection(id)}>
                <span className="music-sidebar-icon">{icon}</span>
                {label}
              </div>
            ))}
          </div>

          <div className="music-sidebar-section">
            <div className="music-sidebar-section-title">Radio</div>
            <div className={`music-sidebar-item${activeSection === "radio" ? " active" : ""}`} onClick={() => setActiveSection("radio")}>
              <span className="music-sidebar-icon"><FaPodcast /></span>
              Radio
            </div>
          </div>
        </aside>

        <main className="music-main">
          {renderMainContent()}
        </main>
      </div>

      {activeSong && (
        <div className="music-now-playing">
          <div className="music-now-playing-art">
            <FaCompactDisc className={`music-now-playing-disc${isPlaying ? " music-now-playing-disc--spin" : ""}`} />
          </div>
          <div className="music-now-playing-info">
            <span className="music-now-playing-title">{activeSong.title}</span>
            <span className="music-now-playing-artist">{activeSong.artist}</span>
          </div>
          <ProgressBar audioRef={audioRef} duration={duration} />
        </div>
      )}
    </div>
  );
}