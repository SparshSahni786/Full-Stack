import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { appReducer, initialState } from "../reducer/appReducer";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (init) => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? { ...init, theme: savedTheme } : init;
  });

  // ✅ This is what makes theme toggle actually work
  useEffect(() => {
    document.body.setAttribute("data-theme", state.theme);
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);
  useEffect(() => {
  document.body.setAttribute("data-compact", state.compactMode ? "true" : "false");
}, [state.compactMode]);


  const value = useMemo(() => {
    return {
      state,
      dispatch,
      toggleTheme: () => dispatch({ type: "TOGGLE_THEME" }),
      setTheme: (theme) => dispatch({ type: "SET_THEME", payload: { theme } }),
    };
  }, [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
