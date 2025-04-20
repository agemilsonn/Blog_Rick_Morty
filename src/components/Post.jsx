import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import Spinner from 'react-bootstrap/Spinner';
import { Card, ListGroup, Badge, Container, Row, Col } from 'react-bootstrap';
import './Post.css';

function Post() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultComments = [
    {
      id: 1,
      author: "Rick Sanchez",
      text: "Wubba lubba dub dub! Esse é um dos meus favoritos!",
      date: "15/05/2023 14:30"
    },
    {
      id: 2,
      author: "Morty Smith",
      text: "Ah não... esse cara me dá pesadelos!",
      date: "10/05/2023 09:15"
    },
    {
      id: 3,
      author: "Summer Smith",
      text: "Esse personagem é incrível! Melhor que o Rick!",
      date: "05/05/2023 18:45"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(characterResponse.data);

        const species = characterResponse.data.species;
        const relatedResponse = await axios.get(`https://rickandmortyapi.com/api/character/?species=${species}`);
        setRelatedPosts(relatedResponse.data.results.filter(char => char.id !== parseInt(id)).slice(0, 4));

        const savedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || defaultComments;
        setComments(savedComments);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = (newComment) => {
    const comment = {
      id: Date.now(),
      author: "Você",
      text: newComment,
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);

    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'alive': return 'success';
      case 'dead': return 'danger';
      default: return 'secondary';
    }
  };

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" variant="success" />
      <p className="mt-2">Viajando entre dimensões...</p>
    </div>
  );

  return (
    <Container className="my-4 post-container">
      <Row>
        <Col lg={8}>
          <Card className="mb-4 border-0 shadow-sm portal-card">
            <Card.Body>
              <Row>
                <Col md={5}>
                  <img
                    src={character.image}
                    alt={character.name}
                    className="img-fluid rounded-4 mb-3 character-image"
                  />
                </Col>
                <Col md={7}>
                  <Card.Title className="display-4 mb-3 portal-title">
                    {character.name}
                  </Card.Title>

                  <ListGroup variant="flush" className="character-details">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Status:</strong>
                      <Badge pill bg={getStatusBadge(character.status)} className="status-badge">
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
              <div className="mt-4 post-content">
                <h4 className="portal-subtitle">Lista de Características</h4>
                <ul className="feature-list">
                  <li>Apareceu em {character.episode?.length || 'N'} episódio(s)</li>
                  <li>Localização atual: {character.location?.name || 'Desconhecida'}</li>
                  <li>Status dimensional: {character.status === 'Alive' ? 'Ativo' : 'Inativo'}</li>
                  <li>Espécie registrada no portal #{Math.floor(Math.random() * 1000)}</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4 border-0 shadow-sm portal-card">
            <Card.Header className="text-white portal-header">
              <h4 className="mb-0">Outros</h4>
            </Card.Header>
            <Card.Body className="related-posts-container">
              <ListGroup variant="flush">
                {relatedPosts.map(post => (
                  <ListGroup.Item key={post.id} className="related-post-item">
                    <Link to={`/post/${post.id}`} className="text-decoration-none post-link">
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={post.image}
                          alt={post.name}
                          className="rounded-circle me-3 post-thumbnail"
                        />
                        <div className="post-info">
                          <h6 className="mb-0 post-title">{post.name}</h6>
                          <Badge pill bg={getStatusBadge(post.status)}>
                            {post.status}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm portal-card">
            <Card.Header className="text-white portal-header">
              <h4 className="mb-0">Comentários ({comments.length})</h4>
            </Card.Header>
            <Card.Body>
              <div className="comments-section">
                <ListGroup variant="flush" className="comments-list">
                  {comments.map(comment => (
                    <ListGroup.Item key={comment.id} className="comment-item">
                      <div className="comment-header d-flex justify-content-between mb-2">
                        <strong className={`comment-author ${comment.author === "Você" ? "you-comment" : ""}`}>
                          {comment.author}
                        </strong>
                        <small className="comment-date">{comment.date}</small>
                      </div>
                      <p className="comment-text mb-0">{comment.text}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <div className="mt-4">
                <CommentForm onAddComment={handleAddComment} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Post;