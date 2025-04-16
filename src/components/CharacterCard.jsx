import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CharacterCard({ character }) {
  return (
    <Card className="mb-4 shadow rounded-4">
      <Card.Img variant="top" src={character.image} alt={character.name} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>Status: {character.status}</Card.Text>
        <Link to={`/post/${character.id}`}>
          <Button variant="primary">Ver mais</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CharacterCard;
