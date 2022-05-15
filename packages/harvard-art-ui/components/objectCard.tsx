import { Badge, Button, Card } from 'react-bootstrap'

const ObjectCard = ({
  credit,
  image,
  rank,
  title,
  url
}) => (
  <Card className='mb-3'>
    <Badge bg='warning' className='position-absolute top-o end-0'>Rank: {rank}</Badge>
    {image && (<a href={url} target='_blank' rel='noreferrer'>
      <Card.Img src={image} />
    </a>)}
    <Card.Body>
      <Card.Title>
        <h3>{title}</h3>
      </Card.Title>
      <blockquote className='blockquote-footer'>
        <p><cite>{credit}</cite></p>
      </blockquote>
      <a href={url} className='float-end' target='_blank' rel='noreferrer'><Button variant='link'>Source</Button></a>
    </Card.Body>
  </Card>
)

export default ObjectCard
