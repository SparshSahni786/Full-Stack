import React from "react";
import { Link } from "react-router-dom";

export default function Events() {
  const events = [
    {
      title: "Hackathon",
      tag: "Flagship",
      time: "24 Hours",
      desc: "Build something amazing with your team. Win exciting prizes.",
    },
    {
      title: "Workshops",
      tag: "Hands-on",
      time: "2–3 Hours",
      desc: "Learn trending tech with practical demos and guided tasks.",
    },
    {
      title: "Tech Talks",
      tag: "Speakers",
      time: "60 Minutes",
      desc: "Industry experts share insights, careers, and real-world trends.",
    },
    {
      title: "Coding Contest",
      tag: "Competitive",
      time: "90 Minutes",
      desc: "Solve DSA problems under time pressure and rank up.",
    },
    {
      title: "Project Expo",
      tag: "Showcase",
      time: "All Day",
      desc: "Present your projects and get feedback from mentors/judges.",
    },
    {
      title: "Gaming Arena",
      tag: "Fun",
      time: "All Day",
      desc: "Quick matches, challenges, and giveaways with friends.",
    },
  ];

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Events</h2>
          <p className="page-subtitle">
            Explore events, timings and highlights — choose what you love.
          </p>
        </div>
        <Link to="/register" className="btn">
          Register
        </Link>
      </div>

      <div className="grid-3">
        {events.map((e, i) => (
          <div className="event-card" key={i}>
            <div className="event-top">
              <span className="badge">{e.tag}</span>
              <span className="pill">{e.time}</span>
            </div>

            <h3 className="event-title">{e.title}</h3>
            <p className="muted">{e.desc}</p>

            <div className="event-actions">
              <Link to="/event-details" className="link-btn">
                View Details →
              </Link>
              <Link to="/rsvp" className="link-btn">
                RSVP →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
