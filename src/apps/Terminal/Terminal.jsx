import React, { useState, useEffect, useRef } from "react";

/* ===== Terminal ===== */
export function TerminalContent() {
  const [history, setHistory] = useState([
    { type: "output", text: "Last login: " + new Date().toDateString() + " on ttys001" },
    { type: "output", text: "" },
    { type: "output", text: 'Type "help" for available commands.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [gitLogLines, setGitLogLines] = useState([]);
  const [gitLogLoading, setGitLogLoading] = useState(true);
  const [gitLogError, setGitLogError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGitLog() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/gaminghackintosh/hackintosh.web/commits?sha=code-root&per_page=10",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }

        const commits = await response.json();
        const lines = commits.flatMap((commit) => {
          const author = commit.commit.author || {};
          const date = author.date ? new Date(author.date) : new Date();
          const message = commit.commit.message?.split("\n")[0] || "(no commit message)";
          return [
            `\x1b[33mcommit ${commit.sha.slice(0, 7)}\x1b[0m`,
            `Author: ${author.name || "Unknown"} <${author.email || "noreply@github.com"}>`,
            `Date:   ${date.toUTCString()}`,
            "",
            `    ${message}`,
            "",
          ];
        });

        setGitLogLines(lines.length ? lines : ["No commits found."]);
      } catch (error) {
        if (error.name !== "AbortError") {
          setGitLogError(error.message);
          setGitLogLines([]);
        }
      } finally {
        setGitLogLoading(false);
      }
    }

    fetchGitLog();
    return () => controller.abort();
  }, []);

  const runCommand = (raw) => {
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1).join(" ");

    const cmds = {
      help: [
        "Available commands:",
        "  ls        – list directory contents",
        "  pwd       – print working directory",
        "  whoami    – current user",
        "  uname     – system information",
        "  date      – current date & time",
        "  echo      – print text",
        "  cat       – print file contents",
        "  neofetch  – system info with ASCII art",
        "  clear     – clear the terminal",
        "  open      – open an app",
        "  git log   – repository commit history",
      ],
      ls: [
        "Desktop/    Documents/    Downloads/    Movies/    Music/",
        "Pictures/   Projects/     Public/       readme.md",
      ],
      pwd: ["/Users/gaminghackintosh"],
      whoami: ["gaminghackintosh"],
      uname: [
        "Darwin hackintosh.web 24.0.0 Darwin Kernel Version 24.0.0; root:xnu/RELEASE_ARM64",
      ],
      date: [new Date().toString()],
      "git log": [
        "\x1b[33mcommit a3f9d21\x1b[0m (HEAD -> main, origin/main)",
        "Author: gaminghackintosh <dev@hackintosh.web>",
        "Date:   " + new Date().toDateString(),
        "",
        "    feat: add draggable windows and dock magnification",
        "",
        "\x1b[33mcommit b1e4c08\x1b[0m",
        "Author: gaminghackintosh <dev@hackintosh.web>",
        "Date:   " + new Date(Date.now() - 86400000).toDateString(),
        "",
        "    init: project scaffold with React",
      ],
      neofetch: [
        "",
        " \x1b[38;5;39m                                     ,\x1b[0m                          \x1b[32mgaminghackintosh\x1b[0m@\x1b[36mhackintosh.web\x1b[0m",
        " \x1b[38;5;39m                                    ;o\\\\\x1b[0m                         ─────────────────────────────",
        " \x1b[38;5;45m                                    ;Ob`.\x1b[0m                       OS:          \x1b[37mhackintosh.web 1.0.0\x1b[0m",
        " \x1b[38;5;45m                                   ;OOOOb`.\x1b[0m                     Kernel:      \x1b[37mhackintosh-core\x1b[0m",
        " \x1b[38;5;51m                                  ;OOOOOY\" )\x1b[0m                    Host:        \x1b[37mMacBook Pro (Simulated)\x1b[0m",
        " \x1b[38;5;51m                                 ;OOOO' ,%%)\x1b[0m                    Shell:       \x1b[37mhacksh 1.0.0\x1b[0m",
        " \x1b[38;5;87m                             \\\\  /OOO ,%%%%,%\\\\\x1b[0m                 Runtime:     \x1b[37mReact 18 / V8\x1b[0m",
        " \x1b[38;5;87m                              |:  ,%%%%%%;%%/\x1b[0m                  Resolution:  \x1b[37m" + window.innerWidth + "x" + window.innerHeight + "\x1b[0m",
        " \x1b[38;5;123m                              ||,%%%%%%%%%%/\x1b[0m                   Theme:       \x1b[35mhackintosh Dark\x1b[0m",
        " \x1b[38;5;123m                              ;|%%%%%%%%%'/`-\"\"`.\x1b[0m             Engine:      \x1b[37mChromium Terminal\x1b[0m",
        " \x1b[38;5;159m                             /: %%%%%%%%'/ c$$$$.`.\x1b[0m            Memory:      \x1b[37m" + Math.round((performance?.memory?.usedJSHeapSize || 67108864) / 1048576) + " MB\x1b[0m",
        " \x1b[38;5;159m                `.______     \\\\ \\\\%%%%%%%'/.$$YF\"Y$: )\x1b[0m          Uptime:     \x1b[37m" + Math.floor(performance.now() / 1000) + "s\x1b[0m",
        " \x1b[38;5;195m              _________ \"`..\\\\`o \\\\`%%' ,',$F,.   $F )\x1b[0m         Packages:    \x1b[37m1337 (npm)\x1b[0m",
        " \x1b[38;5;195m     ___,--\"\"'dOOO;,:%%`-._ o_,O_   ,'\"',d88)  '  )\x1b[0m",
        " \x1b[38;5;45m  -\"'. YOOOOOOO';%%%%%%%%%;`-O   )_     ,X888F   _/\x1b[0m",
        " \x1b[38;5;45m      \\\\ YOOOO',%%%%%%%%%%Y    \\\\__;`),-.  `\"\"F  ,'\x1b[0m",
        " \x1b[38;5;51m       \\\\ `\" ,%%%%%%%%%%,' _,-   \\\\-' \\\\_ `------'\x1b[0m",
        " \x1b[38;5;51m        \\\\_ %%%%',%%%%%_,-' ,;    ( _,-\\\\\x1b[0m",
        " \x1b[38;5;87m          `-.__`%%',-' .c$$'     |\\\\-_,-\\\\\x1b[0m",
        " \x1b[38;5;87m               `\"\"; ,$$$',md8oY  : `\\\\_,')\x1b[0m",
        " \x1b[38;5;123m                 ( ,$$$F `88888  ;   `--'\x1b[0m",
        " \x1b[38;5;123m                  \\\\`$$(    `\"\"' /\x1b[0m",
        " \x1b[38;5;159m                   \\\\`\"$$c'   _,'\x1b[0m",
        " \x1b[38;5;159m                    `.____,-'\x1b[0m",
        "",
        " \x1b[40m   \x1b[0m\x1b[41m   \x1b[0m\x1b[42m   \x1b[0m\x1b[43m   \x1b[0m\x1b[44m   \x1b[0m\x1b[45m   \x1b[0m\x1b[46m   \x1b[0m\x1b[47m   \x1b[0m",
        "",
      ]
    };

    if (cmd === "clear") return "CLEAR";
    if (cmd === "echo") return [args || ""];
    if (cmd === "") return [""];
    if (cmd === "open") return [`Opening ${args || "application"}... `];
    if (cmd === "cat" && args === "readme.md")
      return [
        "# hackintosh.web",
        "",
        "A web-native macOS experience built with React.",
        "github.com/gaminghackintosh",
        "",
        "## Features",
        "- Draggable windows with traffic lights",
        "- Dock with magnification",
        "- Finder, Terminal, Notes",
        "- Live clock and menu bar",
        "",
        "## Stack",
        "React 18 · CSS-in-JS · Vite",
      ];
    if (cmd === "git" && parts[1] === "log") {
      if (gitLogLoading) {
        return ["Fetching commit history from GitHub..."];
      }
      if (gitLogError) {
        return [`\x1b[31merror:\x1b[0m ${gitLogError}`];
      }
      return gitLogLines.length ? gitLogLines : ["No commit history available."];
    }

    if (cmds[cmd]) return cmds[cmd];
    return [
      `\x1b[31m${cmd}: command not found\x1b[0m. Type 'help' for available commands.`,
    ];
  };

  const handleSubmit = () => {
    const cmd = input.trim();
    if (runCommand(cmd) === "CLEAR") {
      setHistory([{ type: "output", text: "" }]);
    } else {
      const lines = runCommand(cmd);
      setHistory((prev) => [
        ...prev,
        { type: "prompt", text: cmd },
        ...lines.map((t) => ({ type: "output", text: t })),
      ]);
    }
    setCmdHistory((prev) => (cmd ? [cmd, ...prev] : prev));
    setCmdIdx(-1);
    setInput("");
  };

const renderLine = (text) => {
  const ansiMap = {
    "\x1b[0m": "</span>",

    "\x1b[30m": '<span style="color:#000">',
    "\x1b[31m": '<span style="color:#ff5f56">',
    "\x1b[32m": '<span style="color:#27c93f">',
    "\x1b[33m": '<span style="color:#ffbd2e">',
    "\x1b[34m": '<span style="color:#0a84ff">',
    "\x1b[35m": '<span style="color:#bf5af2">',
    "\x1b[36m": '<span style="color:#5ac8fa">',
    "\x1b[37m": '<span style="color:#f2f2f7">',

    "\x1b[1m": '<span style="font-weight:bold">',

    "\x1b[40m": '<span style="background:#1c1c1e;color:#1c1c1e">',
    "\x1b[41m": '<span style="background:#ff5f56;color:#ff5f56">',
    "\x1b[42m": '<span style="background:#27c93f;color:#27c93f">',
    "\x1b[43m": '<span style="background:#ffbd2e;color:#ffbd2e">',
    "\x1b[44m": '<span style="background:#0a84ff;color:#0a84ff">',
    "\x1b[45m": '<span style="background:#bf5af2;color:#bf5af2">',
    "\x1b[46m": '<span style="background:#5ac8fa;color:#5ac8fa">',
    "\x1b[47m": '<span style="background:#f2f2f7;color:#f2f2f7">',
  };

  let result = text;

  Object.entries(ansiMap).forEach(([code, tag]) => {
    result = result.split(code).join(tag);
  });

  return (
    <span
      dangerouslySetInnerHTML={{ __html: result }}
      style={{
        whiteSpace: "pre",
        fontVariantLigatures: "none",
      }}
    />
  );
};

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: "rgba(16,16,18,0.99)",
        height: "100%",
        fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", "Consolas", monospace',
        fontSize: 13,
        color: "#d4d4d4",
        overflowY: "auto",
        cursor: "text",
        display: "flex",
        flexDirection: "column",
        padding: "12px 14px",
      }}
    >
      <div style={{ flex: 1 }}>
        {history.map((entry, i) => (
          <div key={i} style={{ lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {entry.type === "prompt" ? (
              <span>
                <span style={{ color: "#32d74b" }}>gaminghackintosh</span>
                <span style={{ color: "#48484a" }}>@</span>
                <span style={{ color: "#0a84ff" }}>hackintosh.web</span>
                <span style={{ color: "#636366" }}>:~$ </span>
                <span style={{ color: "#f2f2f7" }}>{entry.text}</span>
              </span>
            ) : (
              renderLine(entry.text)
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: 2, flexShrink: 0 }}>
        <span style={{ color: "#32d74b", flexShrink: 0 }}>gaminghackintosh</span>
        <span style={{ color: "#48484a", flexShrink: 0 }}>@</span>
        <span style={{ color: "#0a84ff", flexShrink: 0 }}>hackintosh.web</span>
        <span style={{ color: "#636366", flexShrink: 0 }}>:~$ </span>
        <input
          ref={inputRef}
          value={input}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "ArrowUp") {
              const ni = Math.min(cmdIdx + 1, cmdHistory.length - 1);
              setCmdIdx(ni);
              setInput(cmdHistory[ni] || "");
            }
            if (e.key === "ArrowDown") {
              const ni = Math.max(cmdIdx - 1, -1);
              setCmdIdx(ni);
              setInput(ni === -1 ? "" : cmdHistory[ni]);
            }
          }}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#f2f2f7",
            flex: 1,
            fontFamily: "inherit",
            fontSize: "inherit",
            caretColor: "#f2f2f7",
          }}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}