import { Container } from 'react-bootstrap'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'

function HeroSection() {
  return (
    <div className="bg-dark text-light text-center py-5">
      <Container>
        <h1 className="display-6 fw-bold">TechFest 2026</h1>
        <p className="lead mt-3 px-2">Innovation • Coding • Technology</p>

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, px: 4, py: 1.5 }}
          component={NavLink}
          to="/register"
        >
          Register Now
        </Button>
      </Container>
    </div>
  )
}

export default HeroSection
