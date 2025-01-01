import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import '../assets/css/articles.css';
import articleHero from '../assets/img/article.png';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'All', icon: 'fa-globe' },
    { id: 'culture', name: 'Culture', icon: 'fa-landmark' },
    { id: 'culinary', name: 'Culinary', icon: 'fa-utensils' },
    { id: 'nature', name: 'Nature', icon: 'fa-leaf' },
    { id: 'events', name: 'Events', icon: 'fa-calendar' }
  ];

  const articles = [
    {
      id: 1,
      title: "Exploring Traditional Pangandaran Cuisine",
      category: "culinary",
      excerpt: "Discover the rich flavors and cultural significance behind Pangandaran's traditional dishes...",
      image: articleHero,
      date: "Jan 15, 2024",
      readTime: "5 min read",
      likes: 245,
      comments: 18
    },
    // ...add more articles
  ];

  return (
    <>
      <Navbar />
      <div className="articles-hero" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${articleHero})`
      }}>
        <div className="container">
          <h1 className="articles-title animate__fadeInDown">Discover Pangandaran</h1>
          <p className="articles-subtitle animate__fadeIn">Explore our latest stories and guides</p>
          
          <div className="search-container animate__fadeInUp">
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <section className="articles-section">
        <div className="container">
          <div className="categories-wrapper animate__fadeIn">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <i className={`fas ${category.icon}`}></i>
                {category.name}
              </button>
            ))}
          </div>

          <div className="articles-grid">
            {articles.map((article) => (
              <article key={article.id} className="article-card animate__fadeIn">
                <div className="article-image">
                  <img src={articleHero} alt={article.title} />
                  <div className="article-overlay">
                    <span className="article-category">
                      <i className="fas fa-utensils"></i> {article.category}
                    </span>
                  </div>
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span><i className="far fa-calendar"></i> {article.date}</span>
                    <span><i className="far fa-clock"></i> {article.readTime}</span>
                  </div>
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-footer">
                    <Link to={`/article/${article.id}`} className="read-more">
                      Read More <i className="fas fa-arrow-right"></i>
                    </Link>
                    <div className="article-stats">
                      <span><i className="far fa-heart"></i> {article.likes}</span>
                      <span><i className="far fa-comment"></i> {article.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination animate__fadeInUp">
            <button className="pagination-btn"><i className="fas fa-chevron-left"></i></button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Articles;