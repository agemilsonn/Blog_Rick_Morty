// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCharacters } from '../utils/search';
import CharacterCard from '../components/CharacterCard';
import Carousel from '../components/Carousel';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]); // Todos os personagens
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  
  const pageLimit = 10;
  const currentRangeStart = Math.floor((page - 1) / pageLimit) * pageLimit + 1;
  const currentRangeEnd = Math.min(currentRangeStart + pageLimit - 1, pages);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      
      if (searchTerm) {
        const searchResults = await searchCharacters(searchTerm);
        setCharacters(searchResults);
        setPages(Math.ceil(searchResults.length / pageLimit));
      } else {
        // Caso contrário, buscamos todos os personagens com a paginação
        axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
          .then(res => {
            setAllCharacters(res.data.results);
            setPages(res.data.info.pages);
            setCharacters(res.data.results);
          })
          .catch(error => console.error(error));
      }
      
      setLoading(false);
    };

    fetchCharacters();
  }, [searchTerm, page]); // Chama toda vez que searchTerm ou page mudar

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages) {
      setPage(newPage);
    }
  };

  const handleNextRange = () => {
    const nextRangeStart = currentRangeStart + pageLimit;
    if (nextRangeStart <= pages) {
      setPage(nextRangeStart);
    }
  };

  const handlePrevRange = () => {
    const prevRangeStart = currentRangeStart - pageLimit;
    if (prevRangeStart >= 1) {
      setPage(prevRangeStart);
    }
  };

  return (
    <Container className="my-5">
      {/* Carousel no topo da página */}
      <Row className="mb-4">
        <Col>
          <Carousel />
        </Col>
      </Row>

      {/* Cards dos personagens */}
      <Row>
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : characters.length > 0 ? (
          characters.slice(currentRangeStart - 1, currentRangeEnd).map(character => (
            <Col md={4} key={character.id} className="mb-4">
              <CharacterCard character={character} />
            </Col>
          ))
        ) : (
          <p className="text-center">Nenhum personagem encontrado.</p>
        )}
      </Row>

      {/* Paginação com limite de 10 páginas visíveis */}
      {searchTerm.length === 0 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev 
            onClick={handlePrevRange} 
            disabled={currentRangeStart === 1} 
          />
          {[...Array(currentRangeEnd - currentRangeStart + 1)].map((_, index) => (
            <Pagination.Item
              key={currentRangeStart + index}
              active={currentRangeStart + index === page}
              onClick={() => handlePageChange(currentRangeStart + index)}
            >
              {currentRangeStart + index}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={handleNextRange} 
            disabled={currentRangeEnd === pages} 
          />
        </Pagination>
      )}
    </Container>
  );
};

export default Home;
