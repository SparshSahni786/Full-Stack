import { useEffect, useMemo, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showEmails, setShowEmails] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="users-container">
      <div className="top-bar">
        <h2>User Directory</h2>
        <button className="btn" onClick={fetchUsers}>
          Refresh Data
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        <button className="btn secondary-btn" onClick={() => setShowEmails(!showEmails)}>
          {showEmails ? "Hide Emails" : "Show Emails"}
        </button>
      </div>

      <p className="count-text">
        Total Users: <strong>{filteredUsers.length}</strong>
      </p>

      {loading && <p className="status-text">Loading users...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && (
        <div className="card-grid">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="user-card" key={user.id}>
                <h3>{user.name}</h3>
                {showEmails && <p><strong>Email:</strong> {user.email}</p>}
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>City:</strong> {user.address.city}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
              </div>
            ))
          ) : (
            <p className="status-text">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;