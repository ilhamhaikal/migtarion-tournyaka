import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import axios from 'axios';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = Number(localStorage.getItem("role"));
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setShowProfileDropdown(false);
  };

  const confirmLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/v1/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setIsLoggedIn(false);
      setShowLogoutModal(false);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      // Fallback: clear local storage anyway
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setIsLoggedIn(false);
      setShowLogoutModal(false);
      navigate('/');
    }
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          isScrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Tournyaka
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/events" ? "active" : ""
                  }`}
                  to="/events"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/articles" ? "active" : ""
                  }`}
                  to="/articles"
                >
                  Article
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="nav-buttons">
              {isLoggedIn ? (
                <div className="nav-profile-container">
                  <button
                    className="nav-profile-btn"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  >
                    <i className="fas fa-user"></i>
                  </button>
                  {showProfileDropdown && (
                    <div className="nav-profile-menu">
                      <Link to="/profile" className="menu-item">
                        <i className="fas fa-user-circle"></i>
                        <span>Profile</span>
                      </Link>
                      {userRole !== 3 && (
                        <Link to="/dashboard" className="menu-item">
                          <i className="fas fa-tachometer-alt"></i>
                          <span>Dashboard</span>
                        </Link>
                      )}
                      <Link to="/notifications" className="menu-item">
                        <i className="fas fa-bell"></i>
                        <span>Notifications</span>
                      </Link>
                      <Link to="/purchase" className="menu-item">
                        <i className="fas fa-shopping-cart"></i>
                        <span>Purchase</span>
                      </Link>
                      <div className="menu-divider"></div>
                      <button
                        className="menu-item"
                        onClick={handleLogoutClick}
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="logout-modal">
          <div
            className="modal-overlay"
            onClick={() => setShowLogoutModal(false)}
          ></div>
          <div className="modal-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
