import { createSlice, nanoid } from "@reduxjs/toolkit";

const now = () => Date.now();

const makeLog = (text) => ({ id: nanoid(), text, ts: now() });
const makeToast = (text, type = "info") => ({
  id: nanoid(),
  text,
  type, // info | success | warn | error
  ts: now(),
});

const initialState = {
  notifications: true,
  compactMode: false,

  tasks: [
    { id: 1001, title: "Complete Exp-4 features", priority: "high", completed: false },
    { id: 1002, title: "Add screenshots in README", priority: "medium", completed: false },
    { id: 1003, title: "Deploy on Vercel", priority: "low", completed: true },
  ],

  rsvpStatus: "yes",

  assistantMessages: [
    {
      id: "bot-welcome",
      role: "bot",
      text:
        "Hi! 👋 I’m your assistant.\nTry commands:\n- add task: Study Redux priority high\n- open tasks / open reports\n- theme dark\n- clear completed\n- show stats",
      ts: now(),
    },
  ],

  activityLogs: [makeLog("Project started / loaded")],

  // ✅ Toast notifications queue
  toasts: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // ---------- Toasts ----------
    pushToast: {
      reducer(state, action) {
        state.toasts.push(action.payload);
      },
      prepare({ text, type }) {
        return { payload: makeToast(text, type) };
      },
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },

    // ---------- Activity ----------
    addActivity: {
      reducer(state, action) {
        state.activityLogs.unshift(action.payload);
      },
      prepare(text) {
        return { payload: makeLog(text) };
      },
    },
    clearActivity(state) {
      state.activityLogs = [makeLog("Activity cleared ✅")];
      state.toasts.push(makeToast("Activity cleared", "success"));
    },

    // ---------- Settings ----------
    toggleNotifications(state) {
      state.notifications = !state.notifications;
      state.activityLogs.unshift(makeLog(`Notifications turned ${state.notifications ? "ON" : "OFF"}`));
      state.toasts.push(makeToast(`Notifications ${state.notifications ? "ON" : "OFF"}`, "info"));
    },

    toggleCompactMode(state) {
      state.compactMode = !state.compactMode;
      state.activityLogs.unshift(makeLog(`Compact Mode turned ${state.compactMode ? "ON" : "OFF"}`));
      state.toasts.push(makeToast(`Compact Mode ${state.compactMode ? "ON" : "OFF"}`, "info"));
    },

    setRsvp(state, action) {
      state.rsvpStatus = action.payload;
      state.activityLogs.unshift(makeLog(`RSVP updated: ${String(action.payload).toUpperCase()}`));
      state.toasts.push(makeToast(`RSVP: ${String(action.payload).toUpperCase()}`, "success"));
    },

    // ---------- Tasks ----------
    addTask: {
      reducer(state, action) {
        state.tasks.unshift(action.payload);
        state.activityLogs.unshift(makeLog(`Task added: "${action.payload.title}" (${action.payload.priority})`));
        state.toasts.push(makeToast(`Task added: ${action.payload.title}`, "success"));
      },
      prepare({ title, priority }) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            priority: priority || "medium",
            completed: false,
          },
        };
      },
    },

    toggleTask(state, action) {
      const t = state.tasks.find((x) => x.id === action.payload);
      if (t) {
        t.completed = !t.completed;
        state.activityLogs.unshift(makeLog(`Task ${t.completed ? "completed" : "re-opened"}: "${t.title}"`));
        state.toasts.push(makeToast(`${t.completed ? "Completed" : "Re-opened"}: ${t.title}`, "info"));
      }
    },

    deleteTask(state, action) {
      const t = state.tasks.find((x) => x.id === action.payload);
      state.tasks = state.tasks.filter((x) => x.id !== action.payload);
      state.activityLogs.unshift(makeLog(t ? `Task deleted: "${t.title}"` : `Task deleted (id: ${action.payload})`));
      state.toasts.push(makeToast(`Task deleted`, "warn"));
    },

    clearCompleted(state) {
      const before = state.tasks.length;
      state.tasks = state.tasks.filter((t) => !t.completed);
      const removed = before - state.tasks.length;
      state.activityLogs.unshift(makeLog(`Cleared completed tasks (${removed} removed)`));
      state.toasts.push(makeToast(`Cleared completed (${removed})`, "success"));
    },

    // ---------- Assistant ----------
    addAssistantMessage: {
      reducer(state, action) {
        state.assistantMessages.push(action.payload);
      },
      prepare({ role, text }) {
        return {
          payload: {
            id: nanoid(),
            role,
            text,
            ts: now(),
          },
        };
      },
    },

    clearAssistantChat(state) {
      state.assistantMessages = [
        {
          id: "bot-welcome",
          role: "bot",
          text:
            "Chat cleared ✅\nTry: add task: ..., open tasks, theme dark, clear completed, show stats",
          ts: now(),
        },
      ];
      state.activityLogs.unshift(makeLog("Assistant chat cleared"));
      state.toasts.push(makeToast("Chat cleared", "success"));
    },
  },
});

export const {
  pushToast,
  removeToast,
  addActivity,
  clearActivity,
  toggleNotifications,
  toggleCompactMode,
  setRsvp,
  addTask,
  toggleTask,
  deleteTask,
  clearCompleted,
  addAssistantMessage,
  clearAssistantChat,
} = appSlice.actions;

export default appSlice.reducer;