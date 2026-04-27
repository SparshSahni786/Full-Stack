import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Tasks() {
  const { state, dispatch } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium"); // low | medium | high
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [sort, setSort] = useState("newest"); // newest | oldest | priority

  const priorityRank = (p) => (p === "high" ? 3 : p === "medium" ? 2 : 1);

  // ✅ useMemo: derived stats
  const stats = useMemo(() => {
    const total = state.tasks.length;
    const completed = state.tasks.filter((t) => t.completed).length;
    return { total, completed, active: total - completed };
  }, [state.tasks]);

  // ✅ useMemo: filtered + searched + sorted list
  const visibleTasks = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = state.tasks;

    // filter
    if (filter === "active") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);

    // search
    if (q) list = list.filter((t) => t.title.toLowerCase().includes(q));

    // sort
    if (sort === "oldest") {
      list = [...list].sort((a, b) => (a.id > b.id ? 1 : -1));
    } else if (sort === "priority") {
      list = [...list].sort(
        (a, b) => priorityRank(b.priority) - priorityRank(a.priority)
      );
    } else {
      // newest default
      list = [...list].sort((a, b) => (a.id < b.id ? 1 : -1));
    }

    return list;
  }, [state.tasks, search, filter, sort]);

  const addTask = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    dispatch({
      type: "ADD_TASK",
      payload: { title: t, priority },
    });

    setTitle("");
    setPriority("medium");
  };

  const toggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const clearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  const seedDemoTasks = () => {
    const demo = [
      { title: "Complete Exp-4 (Context + Reducer + Memo)", priority: "high" },
      { title: "Add screenshots in README", priority: "medium" },
      { title: "Deploy on Vercel", priority: "low" },
    ];
    demo.forEach((d) =>
      dispatch({ type: "ADD_TASK", payload: { title: d.title, priority: d.priority } })
    );
  };

  return (
    <div className="container page">
      <h2 className="page-title">Tasks</h2>
      <p className="page-subtitle">
        Experiment 4: useContext + useReducer + useMemo (Search/Filter/Stats)
      </p>

      {/* Stats */}
      <div className="grid" style={{ marginBottom: 16 }}>
        <div className="card">
          <h3 className="card-title">Total</h3>
          <div className="big">{stats.total}</div>
          <p className="muted">All tasks created</p>
        </div>
        <div className="card">
          <h3 className="card-title">Active</h3>
          <div className="big">{stats.active}</div>
          <p className="muted">Pending tasks</p>
        </div>
        <div className="card">
          <h3 className="card-title">Completed</h3>
          <div className="big">{stats.completed}</div>
          <p className="muted">Finished tasks</p>
        </div>
      </div>

      {/* Add Task */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h3 className="card-title">Add a Task</h3>

        <form className="form" onSubmit={addTask}>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
          />

          <select
            className="input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button className="btn" type="submit">
            Add Task
          </button>
        </form>

        <div className="row" style={{ marginTop: 12 }}>
          <button className="chip" type="button" onClick={clearCompleted}>
            Clear Completed
          </button>
          <button className="chip" type="button" onClick={seedDemoTasks}>
            Add Demo Tasks
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h3 className="card-title">Search & Filter</h3>

        <div className="form">
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
          />

          <select
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            className="input"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="priority">Sort: Priority</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="card">
        <h3 className="card-title">Task List</h3>

        {visibleTasks.length === 0 ? (
          <p className="muted" style={{ marginTop: 10 }}>
            No tasks found.
          </p>
        ) : (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
            {visibleTasks.map((t) => (
              <div
                key={t.id}
                className="task-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    style={{ width: 18, height: 18, cursor: "pointer" }}
                  />

                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span
                      style={{
                        fontWeight: 700,
                        textDecoration: t.completed ? "line-through" : "none",
                        opacity: t.completed ? 0.6 : 1,
                      }}
                    >
                      {t.title}
                    </span>

                    <span className="muted" style={{ fontSize: 12 }}>
                      Priority:{" "}
                      <b
                        className={
                          t.priority === "high"
                            ? "p-high"
                            : t.priority === "medium"
                            ? "p-med"
                            : "p-low"
                        }
                      >
                        {t.priority}
                      </b>
                    </span>
                  </div>
                </div>

                <button className="btn danger" onClick={() => deleteTask(t.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
