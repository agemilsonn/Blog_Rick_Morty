import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCharacters } from '../utils/search';
import CharacterCard from '../components/CharacterCard';
import Carousel from '../components/Carousel';
import { Container, Row, Col, Pagination, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

  const charactersPerPage = 12;
  const visiblePageButtons = 5;

  useEffect(() => {
    const fetchAllCharacters = async () => {
      setLoading(true);
      try {
        const initialResponse = await axios.get('https://rickandmortyapi.com/api/character');
        const totalCount = initialResponse.data.info.count;
        setTotalPages(Math.ceil(totalCount / charactersPerPage));

        const allPages = Math.ceil(totalCount / 20);
        const pageRequests = [];

        for (let i = 1; i <= allPages; i++) {
          pageRequests.push(axios.get(`https://rickandmortyapi.com/api/character?page=${i}`));
        }

        const responses = await Promise.all(pageRequests);
        const allChars = responses.flatMap(response => response.data.results);
        setAllCharacters(allChars);

        if (searchTerm) {
          const filtered = allChars.filter(char =>
            char.name.toLowerCase().includes(searchTerm)
          );
          setFilteredCharacters(filtered);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
      setLoading(false);
    };

    fetchAllCharacters();
  }, [searchTerm]);

  const currentCharacters = searchTerm
    ? filteredCharacters.slice(
      (page - 1) * charactersPerPage,
      page * charactersPerPage
    )
    : allCharacters.slice(
      (page - 1) * charactersPerPage,
      page * charactersPerPage
    );

  const currentTotalPages = searchTerm
    ? Math.ceil(filteredCharacters.length / charactersPerPage)
    : totalPages;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= currentTotalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getVisiblePages = () => {
    let startPage, endPage;

    if (currentTotalPages <= visiblePageButtons) {
      startPage = 1;
      endPage = currentTotalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(visiblePageButtons / 2);
      const maxPagesAfterCurrent = Math.ceil(visiblePageButtons / 2) - 1;

      if (page <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = visiblePageButtons;
      } else if (page + maxPagesAfterCurrent >= currentTotalPages) {
        startPage = currentTotalPages - visiblePageButtons + 1;
        endPage = currentTotalPages;
      } else {
        startPage = page - maxPagesBeforeCurrent;
        endPage = page + maxPagesAfterCurrent;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <Container className="home-container my-5">
      <Row className="mb-4 justify-content-center">
        <Col xs={12} className="text-center">
          <h1 className="portal-title">
            <span className="portal-green">Rick and Morty</span> Universe
          </h1>
        </Col>
      </Row>

      {page === 1 && !searchTerm && (
        <Row className="mb-5">
          <Col>
            <Carousel />
          </Col>
        </Row>
      )}

      {searchTerm && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info" className="search-alert">
              Mostrando resultados para: <strong>{searchTerm}</strong>
              {filteredCharacters.length > 0 && (
                <span className="ms-2">({filteredCharacters.length} resultados)</span>
              )}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="g-4">
        {loading ? (
          <Col xs={12} className="text-center my-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2">Carregando todas as dimensões...</p>
          </Col>
        ) : currentCharacters.length > 0 ? (
          currentCharacters.map(character => (
            <Col key={character.id} xs={12} sm={6} md={4} lg={3}>
              <CharacterCard character={character} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center my-5">
            <Alert variant="warning" className="no-results-alert">
              Nenhum personagem encontrado nesta dimensão!
            </Alert>
          </Col>
        )}
      </Row>

      {currentTotalPages > 1 && (
        <Row className="mt-5">
          <Col xs={12} className="d-flex justify-content-center">
            <Pagination className="custom-pagination">
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              />

              {getVisiblePages().map(pageNumber => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === page}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => handlePageChange(page + 1)}
                disabled={page === currentTotalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(currentTotalPages)}
                disabled={page === currentTotalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;