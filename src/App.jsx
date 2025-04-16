import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import About from './components/About';
import PostList from './components/PostList'; 
import Post from './components/Post'; 

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/about" element={<About />} />
        <Route path="/postagem/:id" element={<Post />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
