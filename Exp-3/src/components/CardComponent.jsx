import { Col } from 'react-bootstrap'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function CardComponent({ title, text }) {
  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card
        elevation={4}
        sx={{
          height: '100%',
          transition: '0.3s',
          '&:hover': {
            transform: 'translateY(-6px)',
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Col>
  )
}

export default CardComponent
