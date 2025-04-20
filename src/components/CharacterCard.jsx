import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import './CharacterCard.css';

function CharacterCard({ character }) {
  const getStatusVariant = () => {
    switch (character.status.toLowerCase()) {
      case 'alive': return 'success';
      case 'dead': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Card className="character-card">
      <div className="card-image-container">
        <Card.Img
          variant="top"
          src={character.image}
          alt={character.name}
          className="character-image"
        />
        <Badge pill bg={getStatusVariant()} className="status-badge">
          {character.status}
        </Badge>
      </div>

      <Card.Body className="card-body">
        <Card.Title className="character-name">{character.name}</Card.Title>

        <div className="character-info">
          <p className="character-meta">
            <span className="info-label">Espécie:</span>
            <span className="info-value">{character.species}</span>
          </p>
          <p className="character-meta">
            <span className="info-label">Origem:</span>
            <span className="info-value">{character.origin.name}</span>
          </p>
        </div>

        <Link to={`/post/${character.id}`} className="card-link">
          <Button variant="primary" className="details-button">
            Ver detalhes completos
            <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CharacterCard;