import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/contact";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/article/ArticleDetail";
import PageNotFound from "./pages/404/PageNotFound"; // Untuk halaman yang sedang dikembangkan
import NotFound from "./pages/notfound/NotFound"; // Untuk URL yang tidak ada
import "./assets/css/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        
        {/* Halaman yang sedang dalam pengembangan */}
        <Route path="/events" element={<PageNotFound />} />
        
        {/* URL yang benar-benar tidak ada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
