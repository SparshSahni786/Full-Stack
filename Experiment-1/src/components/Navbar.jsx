function Navbar({ setPage }) {
  return (
    <nav style={styles.nav}>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("about")}>About</button>
      <button onClick={() => setPage("contact")}>Contact</button>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#0f172a",
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
};

export default Navbar;