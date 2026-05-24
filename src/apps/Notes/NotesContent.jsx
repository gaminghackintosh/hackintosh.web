import React, { useState, useEffect, useRef } from "react";


export function NotesContent() {
  const initialNotes = [
    {
      id: 1,
      title: "hackintosh.web Roadmap",
      content:
        "# hackintosh.web 🍎\n\nProject roadmap:\n\n✅ Draggable windows\n✅ Dock with magnification\n✅ Terminal emulator\n✅ Finder with sidebar\n✅ Notes app\n\n🔲 Safari browser\n🔲 Spotlight search (⌘ Space)\n🔲 Mission Control\n🔲 Notifications\n🔲 App Store\n🔲 Calendar\n🔲 Dark/Light mode toggle",
      modified: "Just now",
    },
    {
      id: 2,
      title: "React Patterns",
      content:
        "# React Patterns\n\nuseState – reactive state\nuseEffect – side effects\nuseRef – mutable refs / DOM\nuseCallback – memoize fns\n\nKey rules:\n- Lift state up\n- Composition > inheritance\n- Keys on lists\n- Never mutate state directly",
      modified: "Yesterday",
    },
    {
      id: 3,
      title: "Shopping List",
      content: "- Coffee ☕\n- Matcha 🍵\n- Energy drinks 🔋\n- More RAM",
      modified: "2 days ago",
    },
  ];

  const [notes, setNotes] = useState(initialNotes);
  const [activeId, setActiveId] = useState(1);

  const activeNote = notes.find((n) => n.id === activeId);

  const updateContent = (content) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === activeId ? { ...n, content, modified: "Just now" } : n))
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      <div
        style={{
          width: 210,
          flexShrink: 0,
          background: "rgba(36,36,40,0.96)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "10px 14px 8px",
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: 0.8,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          ALL NOTES — {notes.length}
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveId(note.id)}
              style={{
                padding: "10px 14px",
                background: activeId === note.id ? "rgba(255,190,0,0.16)" : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                cursor: "pointer",
                borderLeft: activeId === note.id ? "3px solid #ffd60a" : "3px solid transparent",
                transition: "background 0.1s",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.86)",
                  marginBottom: 3,
                }}
              >
                {note.title}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.32)" }}>{note.modified}</div>
            </div>
          ))}
        </div>
      </div>

      <textarea
        value={activeNote?.content || ""}
        onChange={(e) => updateContent(e.target.value)}
        placeholder="Start writing..."
        style={{
          flex: 1,
          background: "rgba(22,22,26,0.99)",
          border: "none",
          outline: "none",
          color: "rgba(255,255,255,0.82)",
          fontFamily: '"SF Mono", "Fira Code", monospace',
          fontSize: 14,
          lineHeight: 1.75,
          padding: "22px 28px",
          resize: "none",
        }}
      />
    </div>
  );
}