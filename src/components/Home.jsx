import React, { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(res => {
        setCharacters(res.data.results);
        setPages(res.data.info.pages);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages) {
      setPage(newPage);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        {characters.map(character => (
          <Col md={4} key={character.id} className="mb-4">
            <CharacterCard character={character} />
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
        {[...Array(pages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === page}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === pages} />
      </Pagination>
    </Container>
  );
};

export default Home;
