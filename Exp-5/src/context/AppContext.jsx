import React, { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setThemeState] = useState(() => localStorage.getItem("theme") || "light");

  // mock user (global context example)
  const [user] = useState(() => ({ name: "Student", role: "Developer" }));

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setThemeState((t) => (t === "light" ? "dark" : "light"));
  const setTheme = (t) => setThemeState(t === "dark" ? "dark" : "light");

  const value = useMemo(
    () => ({
      state: { theme, user },
      toggleTheme,
      setTheme,
    }),
    [theme, user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}