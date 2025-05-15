import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/article/ArticleDetail';
import About from './pages/About';
import NotFound from './pages/NotFound'; // Import komponen NotFound

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/about" element={<About />} />
        
        {/* Route untuk menangkap semua URL yang tidak terdaftar */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;