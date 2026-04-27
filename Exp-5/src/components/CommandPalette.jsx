import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import {
  toggleCompactMode,
  toggleNotifications,
  clearCompleted,
  pushToast,
  setRsvp,
} from "../redux/slices/appSlice";

export default function CommandPalette({ open, onClose }) {
  const { state, setTheme, toggleTheme } = useContext(AppContext);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const [idx, setIdx] = useState(0);

  const actions = useMemo(() => {
    return [
      { label: "Go: Dashboard", run: () => nav("/dashboard") },
      { label: "Go: Home", run: () => nav("/") },
      { label: "Go: Tasks", run: () => nav("/tasks") },
      { label: "Go: Reports", run: () => nav("/reports") },
      { label: "Go: Analytics", run: () => nav("/analytics") },
      { label: "Go: Activity", run: () => nav("/activity") },
      { label: "Go: Assistant", run: () => nav("/assistant") },

      { label: "Action: Clear Completed Tasks", run: () => dispatch(clearCompleted()) },
      { label: "Action: Toggle Compact Mode", run: () => dispatch(toggleCompactMode()) },
      { label: "Action: Toggle Notifications", run: () => dispatch(toggleNotifications()) },

      { label: `Theme: Toggle (currently ${state.theme})`, run: () => toggleTheme() },
      { label: "Theme: Dark", run: () => setTheme("dark") },
      { label: "Theme: Light", run: () => setTheme("light") },

      { label: "RSVP: YES", run: () => dispatch(setRsvp("yes")) },
      { label: "RSVP: MAYBE", run: () => dispatch(setRsvp("maybe")) },
      { label: "RSVP: NO", run: () => dispatch(setRsvp("no")) },

      {
        label: "Info: Show shortcuts",
        run: () =>
          dispatch(
            pushToast({
              text: "Shortcuts: Ctrl+K Assistant • Ctrl+P Palette • Ctrl+T Tasks • Ctrl+R Reports • Esc Close",
              type: "info",
            })
          ),
      },
    ];
  }, [dispatch, nav, setTheme, toggleTheme, state.theme]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(s));
  }, [q, actions]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setIdx(0);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (idx >= filtered.length) setIdx(0);
  }, [filtered, idx]);

  const runSelected = () => {
    const item = filtered[idx];
    if (!item) return;
    item.run();
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      runSelected();
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="palette-backdrop" onClick={onClose} />
      <div className="palette" onKeyDown={onKeyDown}>
        <div className="palette-head">
          <div className="palette-title">Command Palette</div>
          <div className="palette-hint muted">Enter to run • Esc to close</div>
        </div>

        <input
          ref={inputRef}
          className="input palette-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a command… (e.g. tasks, theme, clear)"
        />

        <div className="palette-list">
          {filtered.length === 0 ? (
            <div className="palette-empty muted">No commands found.</div>
          ) : (
            filtered.slice(0, 10).map((a, i) => (
              <button
                key={a.label}
                className={i === idx ? "palette-item active" : "palette-item"}
                onMouseEnter={() => setIdx(i)}
                onClick={() => {
                  a.run();
                  onClose();
                }}
                type="button"
              >
                {a.label}
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}