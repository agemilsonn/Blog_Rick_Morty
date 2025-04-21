import React from 'react';
import { BrowserRouter, HashRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import About from './components/About';
import Home from './components/Home';
import Post from './components/Post';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
