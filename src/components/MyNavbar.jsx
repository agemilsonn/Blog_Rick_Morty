
// components/MyNavbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const MyNavbar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">Rick and Morty</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={`text-white ${location.pathname === '/' ? 'active-link' : ''}`}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className={`text-white ${location.pathname === '/about' ? 'active-link' : ''}`}>Sobre</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;