import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // ✅ Animated counters
  const target = useMemo(
    () => ({ events: 12, participants: 2500, prizes: 150000, workshops: 8 }),
    []
  );

  const [count, setCount] = useState({
    events: 0,
    participants: 0,
    prizes: 0,
    workshops: 0,
  });

  // refs for parallax icons
  const heroRef = useRef(null);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      setCount({
        events: Math.round(target.events * ease),
        participants: Math.round(target.participants * ease),
        prizes: Math.round(target.prizes * ease),
        workshops: Math.round(target.workshops * ease),
      });

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  // ✅ Scroll reveal cards + sections
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ✅ Parallax floating icons
  useEffect(() => {
    const onMove = (e) => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      hero.style.setProperty("--mx", dx.toFixed(3));
      hero.style.setProperty("--my", dy.toFixed(3));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero-neo" ref={heroRef}>
        {/* floating icons */}
        <div className="float-icon fi-1">{"</>"}</div>
        <div className="float-icon fi-2">{"{}"}</div>
        <div className="float-icon fi-3">{"⚡"}</div>
        <div className="float-icon fi-4">{"☁"}</div>
        <div className="float-icon fi-5">{"AI"}</div>

        <div className="hero-neo-inner">
          <div className="glass reveal">
            <h1 className="hero-neo-title">
              Chandigarh University <span className="accent">TechFest 2026</span>
            </h1>
            <p className="hero-neo-subtitle">
              Innovation • Coding • Technology • Competitions
            </p>

            <div className="hero-neo-actions">
              <Link to="/register" className="btn glow">
                Register Now
              </Link>
              <Link to="/events" className="btn outline glow-soft">
                Explore Events
              </Link>
            </div>

            {/* Counters */}
            <div className="counter-grid">
              <div className="counter-card">
                <div className="counter-num">{count.events}+</div>
                <div className="counter-label">Events</div>
              </div>
              <div className="counter-card">
                <div className="counter-num">{count.workshops}+</div>
                <div className="counter-label">Workshops</div>
              </div>
              <div className="counter-card">
                <div className="counter-num">{count.participants}+</div>
                <div className="counter-label">Participants</div>
              </div>
              <div className="counter-card">
                <div className="counter-num">₹{count.prizes.toLocaleString()}</div>
                <div className="counter-label">Prize Pool</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Highlights ===== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Highlights</h2>
          <p className="section-text reveal">
            Participate in Hackathons, Workshops, Coding Contests and Tech Talks.
          </p>

          <div className="grid-3" style={{ marginTop: 18 }}>
            <div className="card reveal">
              <h3 className="card-title">Hackathon</h3>
              <p className="muted">
                24-hour coding challenge with exciting prizes and mentorship.
              </p>
            </div>

            <div className="card reveal">
              <h3 className="card-title">Workshops</h3>
              <p className="muted">
                Hands-on sessions on AI, Web Dev, Cloud & more.
              </p>
            </div>

            <div className="card reveal">
              <h3 className="card-title">Tech Talks</h3>
              <p className="muted">
                Learn from industry experts and startup founders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
