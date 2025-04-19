import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import Spinner from 'react-bootstrap/Spinner';
import { Card, ListGroup, Badge, Container, Row, Col } from 'react-bootstrap';

function Post() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => setCharacter(response.data));
  }, [id]);

  if (!character) return (
    <div className="text-center mt-5">
      <Spinner animation="border" variant="success" />
      <p className="mt-2">Carregando personagem...</p>
    </div>
  );

  // Função para determinar a cor do badge baseado no status
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'alive': return 'success';
      case 'dead': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col lg={8}>
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={5}>
                  <img
                    src={character.image}
                    alt={character.name}
                    className="img-fluid rounded-4 mb-3"
                    style={{ border: '3px solid #42b4ca' }}
                  />
                </Col>
                <Col md={7}>
                  <Card.Title className="display-4 mb-3" style={{ color: '#42b4ca' }}>
                    {character.name}
                  </Card.Title>

                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Status:</strong>
                      <Badge pill bg={getStatusBadge(character.status)}>
                        {character.status}
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Espécie:</strong> {character.species}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Gênero:</strong> {character.gender}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Origem:</strong> {character.origin.name}
                    </ListGroup.Item>
                    {character.type && (
                      <ListGroup.Item>
                        <strong>Tipo:</strong> {character.type}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Header className="text-white" style={{ backgroundColor: '#42b4ca' }}>
              <h4 className="mb-0">Comentários</h4>
            </Card.Header>
            <Card.Body>
              <CommentForm characterId={character.id} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Post;