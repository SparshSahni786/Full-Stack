import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const location = useLocation();
  const [animateKey, setAnimateKey] = useState(0);

  // Route change => new key => re-trigger animation
  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="content">
        <div className="page-transition" key={animateKey}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
