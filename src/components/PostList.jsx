// components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

const PostList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => setCharacters(response.data.results))
      .catch(error => console.error(error));
  }, [page]);

  return (
    <Container className="mt-4">
      <Carousel />
      <Row>
        {characters.map(post => (
          <Col key={post.id} md={4} className="mb-4">
            <Card className="custom-card h-100 text-white bg-dark">
              <Card.Img variant="top" src={post.image} alt={post.name} />
              <Card.Body>
                <Card.Title className="custom-title">{post.name}</Card.Title>
                <Card.Text>{post.species}</Card.Text>
                <Button as={Link} to={`/postagem/${post.id}`} className="btn btn-light">
                  Ver Detalhes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-between my-3">
        <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Anterior</Button>
        <Button onClick={() => setPage(prev => prev + 1)}>Próxima</Button>
      </div>
    </Container>
  );
};

export default PostList;
