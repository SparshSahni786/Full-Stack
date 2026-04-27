import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";

const STORAGE_KEY = "exp5_redux_state_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  preloadedState,
});

// persist (throttle)
let timer = null;
store.subscribe(() => {
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    saveState(store.getState());
  }, 250);
});

export { store };
export default store;