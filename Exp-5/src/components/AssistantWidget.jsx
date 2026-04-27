import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import {
  addAssistantMessage,
  clearAssistantChat,
  addTask,
  toggleTask,
  deleteTask,
  clearCompleted,
  toggleCompactMode,
  toggleNotifications,
  addActivity,
  setRsvp,
  pushToast,
} from "../redux/slices/appSlice";

export default function AssistantWidget({ compact = false }) {
  const { state, setTheme, toggleTheme } = useContext(AppContext);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const messages = useSelector((s) => s.app.assistantMessages);
  const tasks = useSelector((s) => s.app.tasks);
  const compactMode = useSelector((s) => s.app.compactMode);
  const notifications = useSelector((s) => s.app.notifications);
  const rsvpStatus = useSelector((s) => s.app.rsvpStatus);

  const [input, setInput] = useState("");
  const listRef = useRef(null);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const high = tasks.filter((t) => t.priority === "high").length;
    const medium = tasks.filter((t) => t.priority === "medium").length;
    const low = tasks.filter((t) => t.priority === "low").length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, high, medium, low, completionRate };
  }, [tasks]);

  const faqs = useMemo(
    () => [
      "What should I do next?",
      "Show stats",
      "Open tasks",
      "Open reports",
      "Exp 5 requirements checklist?",
      "Vercel deploy steps + naming format?",
    ],
    []
  );

  const suggestionPool = useMemo(() => {
    return [
      ...faqs,
      "add task: Update README priority high",
      "add task: Add screenshots priority medium",
      "clear completed",
      "toggle compact",
      "toggle notifications",
      "theme dark",
      "theme light",
      "rsvp maybe",
      "open dashboard",
      "open activity",
      "open analytics",
    ];
  }, [faqs]);

  const suggestions = useMemo(() => {
    const q = input.trim().toLowerCase();
    if (!q) return [];
    return suggestionPool.filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
  }, [input, suggestionPool]);

  const normalize = (s) => s.trim().toLowerCase();
  const rank = (p) => (p === "high" ? 3 : p === "medium" ? 2 : 1);

  const nextTask = useMemo(() => {
    const pending = tasks.filter((t) => !t.completed);
    pending.sort((a, b) => rank(b.priority) - rank(a.priority));
    return pending[0] || null;
  }, [tasks]);

  const parseCommand = (raw) => {
    const q = raw.trim();

    const addMatch = q.match(/^add\s+task\s*:\s*(.+)$/i);
    if (addMatch) {
      const rest = addMatch[1].trim();
      const prMatch = rest.match(/\bpriority\s+(high|medium|low)\b/i);
      const priority = prMatch ? prMatch[1].toLowerCase() : "medium";
      const title = prMatch ? rest.replace(prMatch[0], "").trim() : rest;
      if (!title) return { ok: false, reply: "⚠️ Usage: add task: <title> priority high|medium|low" };
      return { ok: true, type: "ADD_TASK", title, priority };
    }

    const toggleTaskMatch = q.match(/^toggle\s+task\s*:\s*(.+)$/i);
    if (toggleTaskMatch) return { ok: true, type: "TOGGLE_TASK", id: toggleTaskMatch[1].trim() };

    const deleteTaskMatch = q.match(/^delete\s+task\s*:\s*(.+)$/i);
    if (deleteTaskMatch) return { ok: true, type: "DELETE_TASK", id: deleteTaskMatch[1].trim() };

    if (/^clear\s+completed$/i.test(q)) return { ok: true, type: "CLEAR_COMPLETED" };
    if (/^clear\s+chat$/i.test(q)) return { ok: true, type: "CLEAR_CHAT" };
    if (/^toggle\s+compact$/i.test(q)) return { ok: true, type: "TOGGLE_COMPACT" };
    if (/^toggle\s+notifications$/i.test(q)) return { ok: true, type: "TOGGLE_NOTIF" };

    const themeMatch = q.match(/^theme\s+(dark|light|toggle)$/i);
    if (themeMatch) return { ok: true, type: "THEME", mode: themeMatch[1].toLowerCase() };

    const rsvpMatch = q.match(/^rsvp\s+(yes|no|maybe)$/i);
    if (rsvpMatch) return { ok: true, type: "RSVP", value: rsvpMatch[1].toLowerCase() };

    if (/^show\s+stats$/i.test(q)) return { ok: true, type: "SHOW_STATS" };

    // ✅ Navigation commands
    const openMatch = q.match(/^(open|go)\s+(dashboard|home|tasks|reports|analytics|activity|assistant)$/i);
    if (openMatch) return { ok: true, type: "NAV", page: openMatch[2].toLowerCase() };

    if (/^what\s+should\s+i\s+do\s+next\??$/i.test(q) || /^next$/i.test(q)) return { ok: true, type: "NEXT_TASK" };

    return null;
  };

  const getAnswer = (qRaw) => {
    const q = normalize(qRaw);
    if (!q) return "Type something 🙂";

    const hasAny = (...keys) => keys.some((k) => q.includes(k));

    if (hasAny("pending", "active", "kitne pending", "pending kitne")) {
      return `Pending tasks: **${stats.pending}** (Total: ${stats.total}, Completed: ${stats.completed})`;
    }
    if (hasAny("completed", "done", "kitne completed")) {
      return `Completed: **${stats.completed}** (Completion: ${stats.completionRate}%)`;
    }
    if (hasAny("total tasks", "kitne tasks", "total")) {
      return `Total tasks: **${stats.total}** (Pending: ${stats.pending})`;
    }
    if (hasAny("high priority", "high")) {
      return `High priority tasks: **${stats.high}** (Med: ${stats.medium}, Low: ${stats.low})`;
    }
    if (hasAny("compact")) return `Compact Mode: **${compactMode ? "ON" : "OFF"}** (command: toggle compact)`;
    if (hasAny("notifications")) return `Notifications: **${notifications ? "ON" : "OFF"}** (command: toggle notifications)`;
    if (hasAny("rsvp")) return `RSVP: **${String(rsvpStatus).toUpperCase()}**`;

    // fallback
    return (
      "Try commands:\n" +
      "• add task: <title> priority high|medium|low\n" +
      "• open tasks / open reports / open dashboard\n" +
      "• clear completed\n" +
      "• toggle compact\n" +
      "• theme dark / theme light\n" +
      "• show stats\n" +
      "• what should I do next?"
    );
  };

  const send = (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text) return;

    dispatch(addAssistantMessage({ role: "user", text }));

    const cmd = parseCommand(text);
    if (cmd) {
      if (cmd.ok === false) {
        dispatch(addAssistantMessage({ role: "bot", text: cmd.reply }));
        setInput("");
        return;
      }

      if (cmd.type === "ADD_TASK") {
        dispatch(addTask({ title: cmd.title, priority: cmd.priority }));
        dispatch(addActivity(`Assistant: added task "${cmd.title}" (${cmd.priority})`));
        dispatch(addAssistantMessage({ role: "bot", text: `✅ Added: "${cmd.title}" (${cmd.priority})` }));
      } else if (cmd.type === "TOGGLE_TASK") {
        dispatch(toggleTask(cmd.id));
        dispatch(addActivity(`Assistant: toggled task ${cmd.id}`));
        dispatch(addAssistantMessage({ role: "bot", text: `✅ Toggled task: ${cmd.id}` }));
      } else if (cmd.type === "DELETE_TASK") {
        dispatch(deleteTask(cmd.id));
        dispatch(addActivity(`Assistant: deleted task ${cmd.id}`));
        dispatch(addAssistantMessage({ role: "bot", text: `🗑️ Deleted task: ${cmd.id}` }));
      } else if (cmd.type === "CLEAR_COMPLETED") {
        dispatch(clearCompleted());
        dispatch(addActivity("Assistant: cleared completed tasks"));
        dispatch(addAssistantMessage({ role: "bot", text: "✅ Cleared completed tasks" }));
      } else if (cmd.type === "CLEAR_CHAT") {
        dispatch(clearAssistantChat());
      } else if (cmd.type === "TOGGLE_COMPACT") {
        dispatch(toggleCompactMode());
        dispatch(addActivity("Assistant: toggled compact mode"));
        dispatch(addAssistantMessage({ role: "bot", text: "✅ Compact mode toggled" }));
      } else if (cmd.type === "TOGGLE_NOTIF") {
        dispatch(toggleNotifications());
        dispatch(addActivity("Assistant: toggled notifications"));
        dispatch(addAssistantMessage({ role: "bot", text: "✅ Notifications toggled" }));
      } else if (cmd.type === "THEME") {
        if (cmd.mode === "toggle") toggleTheme();
        else setTheme(cmd.mode);
        dispatch(addActivity(`Assistant: theme -> ${cmd.mode}`));
        dispatch(addAssistantMessage({ role: "bot", text: `🎨 Theme updated: ${cmd.mode}` }));
      } else if (cmd.type === "RSVP") {
        dispatch(setRsvp(cmd.value));
        dispatch(addActivity(`Assistant: RSVP -> ${cmd.value}`));
        dispatch(addAssistantMessage({ role: "bot", text: `✅ RSVP set: ${cmd.value.toUpperCase()}` }));
      } else if (cmd.type === "SHOW_STATS") {
        dispatch(
          addAssistantMessage({
            role: "bot",
            text:
              `📊 Stats:\nTotal: ${stats.total}\nPending: ${stats.pending}\nCompleted: ${stats.completed}\n` +
              `High/Med/Low: ${stats.high}/${stats.medium}/${stats.low}\nCompletion: ${stats.completionRate}%`,
          })
        );
      } else if (cmd.type === "NAV") {
        const map = {
          dashboard: "/dashboard",
          home: "/",
          tasks: "/tasks",
          reports: "/reports",
          analytics: "/analytics",
          activity: "/activity",
          assistant: "/assistant",
        };
        const path = map[cmd.page] || "/";
        nav(path);
        dispatch(pushToast({ text: `Opened ${cmd.page}`, type: "info" }));
        dispatch(addAssistantMessage({ role: "bot", text: `✅ Opening ${cmd.page}…` }));
      } else if (cmd.type === "NEXT_TASK") {
        if (!nextTask) {
          dispatch(addAssistantMessage({ role: "bot", text: "🎉 No pending tasks! Add a new one with: add task: ..." }));
        } else {
          dispatch(
            addAssistantMessage({
              role: "bot",
              text: `Next best task: **${nextTask.title}** (priority: ${nextTask.priority})`,
            })
          );
        }
      }

      setInput("");
      return;
    }

    const reply = getAnswer(text);
    dispatch(addAssistantMessage({ role: "bot", text: reply }));
    setInput("");
  };

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className={compact ? "assist-wrap compact" : "assist-wrap"}>
      <div className="assist-top">
        <div>
          <div className="assist-title">Assistant</div>
          <div className="assist-sub">
            Theme: <b>{state.theme}</b> • User: <b>{state.user?.name}</b>
          </div>
        </div>

        <button className="btn outline" onClick={() => dispatch(clearAssistantChat())}>
          Clear
        </button>
      </div>

      <div className="assist-faq">
        {faqs.map((q) => (
          <button key={q} className="chip" type="button" onClick={() => send(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="assist-list" ref={listRef}>
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "assist-row right" : "assist-row left"}>
            <div className={m.role === "user" ? "assist-bubble user" : "assist-bubble bot"}>{m.text}</div>
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="assist-suggest">
          {suggestions.map((s) => (
            <button key={s} className="assist-suggest-item" onClick={() => send(s)} type="button">
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="assist-input">
        <textarea
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder='Try: "open dashboard" or "add task: Add screenshots priority high"'
          rows={2}
        />
        <button className="btn" onClick={() => send()}>
          Send
        </button>
      </div>

      <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
        Shortcuts: Ctrl+K Assistant • Ctrl+P Palette • Ctrl+T Tasks • Ctrl+R Reports • Esc Close
      </div>
    </div>
  );
}