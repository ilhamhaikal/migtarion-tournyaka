import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-column">
              <h3 className="footer-title">Tournyaka</h3>
              <p className="footer-description">
                Platform pariwisata berbasis digital dengan konsep smart tourism di Pangandaran
              </p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/destinations">Destinations</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h4 className="footer-subtitle">Contact Us</h4>
              <ul className="contact-info">
                <li><i className="fas fa-map-marker-alt"></i> Pangandaran, Jawa Barat</li>
                <li><i className="fas fa-phone"></i> +62 123 456 789</li>
                <li><i className="fas fa-envelope"></i> info@tournyaka.com</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-column">
              <h4 className="footer-subtitle">Newsletter</h4>
              <p>Subscribe untuk mendapatkan info terbaru</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 Tournyaka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;