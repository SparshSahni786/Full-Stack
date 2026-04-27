import { Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="hero">
        <Container>
          <h1 className="display-5 fw-bold">
            Chandigarh University TechFest 2026
          </h1>
          <p className="lead mt-3">
            Innovation • Coding • Technology • Competitions
          </p>

          <Button
            as={NavLink}
            to="/register"
            className="register-blue-btn px-4 py-2 mt-3"
          >
            Register Now
          </Button>
        </Container>
      </div>

      <Container className="py-5 text-center">
        <h2 className="fw-bold text-danger mb-3">About TechFest</h2>
        <p>
          TechFest 2026 is Chandigarh University’s flagship technical event with
          Hackathons, Workshops, Tech Talks, prizes and certificates.
        </p>
      </Container>
    </>
  );
}

export default Home;
