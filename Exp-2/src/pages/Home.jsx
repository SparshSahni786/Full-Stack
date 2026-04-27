import { Container, Row } from 'react-bootstrap'
import NavBar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CardComponent from '../components/CardComponent'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />

      <Container className="my-5">
        <h2 className="text-center mb-4">
          Featured Events
        </h2>

        <Row>
          <CardComponent
            title="Hackathon"
            text="24-hour coding challenge with real-world problem statements."
          />
          <CardComponent
            title="Workshops"
            text="Hands-on sessions by industry experts."
          />
          <CardComponent
            title="Tech Talks"
            text="Learn about AI, Web3, and future technologies."
          />
        </Row>
      </Container>

      <Footer />
    </>
  )
}

export default Home
