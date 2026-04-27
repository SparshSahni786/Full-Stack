// src/components/FilterBar.jsx
import React from "react";

export default function FilterBar({ search, setSearch, status, setStatus }) {
  return (
    <div className="filterbar">
      <input
        className="input"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
