import React from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      note: "For basic entry",
      features: ["Entry Pass", "Tech Talk Access", "Event Updates"],
      highlight: false,
    },
    {
      name: "Standard",
      price: "₹199",
      note: "Most popular",
      features: ["Workshops Access", "Events Pass", "Certificate"],
      highlight: true,
    },
    {
      name: "Pro",
      price: "₹499",
      note: "All access",
      features: ["All Standard Features", "VIP Seating", "Goodies + Swag"],
      highlight: false,
    },
  ];

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Pricing</h2>
          <p className="page-subtitle">
            Choose a plan that fits you — upgrade anytime.
          </p>
        </div>
        <Link to="/register" className="btn">
          Get Pass
        </Link>
      </div>

      <div className="grid-3">
        {plans.map((p, i) => (
          <div className={p.highlight ? "price-card highlight" : "price-card"} key={i}>
            <div className="price-top">
              <h3 className="event-title">{p.name}</h3>
              <span className="badge">{p.note}</span>
            </div>

            <div className="price">{p.price}</div>

            <ul className="feature-list">
              {p.features.map((f, idx) => (
                <li key={idx}>✓ {f}</li>
              ))}
            </ul>

            <Link to="/register" className={p.highlight ? "btn full" : "btn outline full"}>
              Choose Plan
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
