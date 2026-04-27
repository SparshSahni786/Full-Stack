export const initialState = {
  theme: "light",

  // ✅ Extra settings (Exp-4: context/reducer state meaningful)
  notifications: true,
  compactMode: false,

  // Tasks (already used in Tasks + Analytics)
  tasks: [
    { id: 1001, title: "Complete Exp-4 features", priority: "high", completed: false },
    { id: 1002, title: "Add screenshots in README", priority: "medium", completed: false },
    { id: 1003, title: "Deploy on Vercel", priority: "low", completed: true },
  ],

  // RSVP store
  rsvpStatus: "yes", // yes | no | maybe
};

export function appReducer(state, action) {
  switch (action.type) {
    // ✅ Theme
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };

    case "SET_THEME": {
      const theme = action.payload?.theme === "dark" ? "dark" : "light";
      return { ...state, theme };
    }

    // ✅ Settings
    case "TOGGLE_NOTIFICATIONS":
      return { ...state, notifications: !state.notifications };

    case "TOGGLE_COMPACT":
      return { ...state, compactMode: !state.compactMode };

    // ✅ RSVP
    case "SET_RSVP":
      return { ...state, rsvpStatus: action.payload }; // yes/no/maybe

    // ✅ Tasks
    case "ADD_TASK": {
      const title = (action.payload?.title || "").trim();
      const priority = action.payload?.priority || "medium";
      if (!title) return state;

      const newTask = {
        id: Date.now(),
        title,
        priority,
        completed: false,
      };

      return { ...state, tasks: [newTask, ...state.tasks] };
    }

    case "TOGGLE_TASK": {
      const id = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      };
    }

    case "DELETE_TASK": {
      const id = action.payload;
      return { ...state, tasks: state.tasks.filter((t) => t.id !== id) };
    }

    case "CLEAR_COMPLETED":
      return { ...state, tasks: state.tasks.filter((t) => !t.completed) };

    default:
      return state;
  }
}
