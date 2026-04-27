import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTheme } from "../themeContext";

function NavBar() {
  const { theme } = useTheme();

  return (
    <Navbar expand="lg" className="cu-red" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          Chandigarh University | TechFest 2026 
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/events">
              Events
            </Nav.Link>

            <Nav.Link as={NavLink} to="/pricing">
              Pricing
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>

            <Nav.Link as={NavLink} to="/event-details">
              Event Details
            </Nav.Link>

            <Nav.Link as={NavLink} to="/register">
              Register
            </Nav.Link>

            <Nav.Link as={NavLink} to="/rsvp">
              RSVP
            </Nav.Link>

            <Nav.Link as={NavLink} to="/analytics">
              Analytics
            </Nav.Link>

            <Nav.Link as={NavLink} to="/settings">
              Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
