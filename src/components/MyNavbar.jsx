import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import searchAnimation from '../assets/icon-pesquisar.json';
import { searchCharacters } from '../utils/search';
import SearchOverlay from './SearchOverlay';
import './MyNavbar.css';

const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      const result = await searchCharacters(searchTerm);
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSuggestionClick = (id) => {
    navigate(`/post/${id}`);
    setShowSearch(false);
    setSearchTerm('');
    setSuggestions([]);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: searchAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark px-3 py-2" data-bs-theme="dark">
        <Container fluid className="d-flex align-items-center justify-content-between">

          <div className="d-lg-none" onClick={() => setShowSidebar(true)} style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'white' }}>
            ☰
          </div>

          <Navbar.Brand as={Link} to="/" className="text-white mx-2">
            <img src="/src/assets/LogoRickMorty.png" alt="Logo" style={{ height: '40px' }} />
          </Navbar.Brand>

          <div className="d-none d-lg-flex align-items-center ms-auto">
            <Nav className="me-3">
              <Nav.Link as={Link} to="/" className={`text-white ${location.pathname === '/' ? 'active-link' : ''}`}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className={`text-white ${location.pathname === '/about' ? 'active-link' : ''}`}>Sobre</Nav.Link>
              <Nav.Link as={Link} to="/contact" className={`text-white ${location.pathname === '/contact' ? 'active-link' : ''}`}>Nos contate</Nav.Link>
            </Nav>
            <div onClick={() => setShowSearch(true)} style={{ cursor: 'pointer' }}>
              <Lottie options={defaultOptions} height={40} width={40} />
            </div>
          </div>

          <div className="d-lg-none" onClick={() => setShowSearch(true)} style={{ cursor: 'pointer' }}>
            <Lottie options={defaultOptions} height={40} width={40} />
          </div>
        </Container>
      </Navbar>

      <div className={`custom-sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-header text-end pe-3 pt-2">
          <span onClick={() => setShowSidebar(false)} style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'white' }}>×</span>
        </div>
        <Nav className="flex-column p-3">
          <Nav.Link as={Link} to="/" onClick={() => setShowSidebar(false)}
            className={`text-white ${location.pathname === '/' ? 'active-link' : ''}`}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about" onClick={() => setShowSidebar(false)}
            className={`text-white ${location.pathname === '/about' ? 'active-link' : ''}`}>
            Sobre
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" onClick={() => setShowSidebar(false)}
            className={`text-white ${location.pathname === '/contact' ? 'active-link' : ''}`}>
            Nos contate
          </Nav.Link>
        </Nav>
      </div>

      {showSidebar && <div className="sidebar-backdrop" onClick={() => setShowSidebar(false)} />}

      <SearchOverlay
        visible={showSearch}
        onClose={() => setShowSearch(false)}
        suggestions={suggestions}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSuggestionClick={handleSuggestionClick}
      />
    </>
  );
};

export default MyNavbar;
