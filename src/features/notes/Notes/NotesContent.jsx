import React, { useState, useContext } from "react";
import { WindowContext } from "./../../../components/layout";

export function NotesContent() {
  const { onClose, onMinimize, onZoom, onTitleMouseDown } = useContext(WindowContext);

  const initialNotes = [
    {
      id: 1,
      title: "Developer Life Plan",
      content: "# Roadmap 🚀\n\n✔ Learn React\n✔ Understand useEffect (sometimes)\n✔ Stop breaking layouts by 2px\n✔ Build something that looks like Apple UI\n\n🔲 Become rich\n🔲 Sleep 8 hours (optional feature)\n🔲 Stop using console.log as a debugger framework",
      modified: "Just now",
    },
    {
      id: 2,
      title: "Debugging Thoughts",
      content: "useEffect(() => {\n  // why is this running 17 times?\n  // I didn't change anything\n  // it just started working differently\n}, [])\n\n// 2 hours later:\n// turns out I did change everything",
      modified: "Yesterday",
    },
    {
      id: 3,
      title: "Essential Survival Kit",
      content: "- Coffee ☕\n- More coffee ☕☕\n- Motivation (not found)\n- npm install --force\n- Hope\n- 1% battery and blind confidence",
      modified: "2 days ago",
    },
    {
      id: 4,
      title: "JavaScript Summary",
      content: "let life = undefined;\n\nsetTimeout(() => {\n  life = null;\n}, 0);\n\nconsole.log(life);\n\n// expected: meaning\n// actual: undefined",
      modified: "Today",
    },
    {
      id: 5,
      title: "Developer Philosophy",
      content: "If it works — don't touch it.\n\nIf it doesn't work — you didn't touch anything.\n\nIf everything breaks — it's webpack's fault.",
      modified: "Today",
    },
    {
      id: 6,
      title: "Git Commit Reality",
      content: "feat: added feature\nfix: fixed feature\nchore: touched something I don't understand\nrefactor: moved code around and prayed\n\n// everything works until you push to production",
      modified: "Today",
    },
  ];

  const [notes, setNotes] = useState(initialNotes);
  const [activeId, setActiveId] = useState(1);

  const activeNote = notes.find((n) => n.id === activeId);

  const updateContent = (content) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeId
          ? { ...n, content, modified: "Just now" }
          : n
      )
    );
  };

  return (
    <div className="notes">
      {/* ── Custom Title Bar ── */}
      <div className="notes-titlebar" onMouseDown={(e) => !e.target.closest('.notes-traffic-light') && onTitleMouseDown(e)}>
        <div className="notes-traffic-lights">
          <button
            className="notes-traffic-light notes-traffic-light--close"
            onClick={onClose}
            title="Close"
          />
          <button
            className="notes-traffic-light notes-traffic-light--minimize"
            onClick={onMinimize}
            title="Minimize"
          />
          <button
            className="notes-traffic-light notes-traffic-light--zoom"
            onClick={onZoom}
            title="Zoom"
          />
        </div>
        <span className="notes-title">Notes</span>
      </div>

      {/* ── Main Content ── */}
      <div className="notes-body">
        {/* Sidebar */}
        <div className="notes-sidebar">
          <div className="notes-sidebar-header">
            ALL NOTES — {notes.length}
          </div>
          <div className="notes-list">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`notes-list-item ${activeId === note.id ? "active" : ""}`}
                onClick={() => setActiveId(note.id)}
              >
                <div className="notes-item-title">{note.title}</div>
                <div className="notes-item-modified">{note.modified}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <textarea
          className="notes-editor"
          value={activeNote?.content || ""}
          onChange={(e) => updateContent(e.target.value)}
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
}