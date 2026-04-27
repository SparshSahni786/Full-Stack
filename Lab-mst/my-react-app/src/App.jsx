import Users from "./components/Users";

function App() {
  return (
    <div className="app">
      <h1>Fetch Data from API using useEffect</h1>
      <p className="subtitle">
        This React app fetches user data from an external API and displays it in an interactive list.
      </p>
      <Users />
    </div>
  );
}

export default App;