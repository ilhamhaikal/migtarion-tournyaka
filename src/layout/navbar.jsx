import React from "react";

const Navbar = ({ username }) => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container-fluid" id="navbar">
          {/* Menu Navigasi */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/events">Events</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>

          {/* Brand */}
          <div className="navbar-brand">
            <a href="/">Tournyaka</a>
          </div>

          {/* User Dropdown */}
          <ul className="navbar-nav">
            {username ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {username}
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/profile">Profile</a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/logout">Logout</a>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className="btn btn-warning" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-warning" href="/register">Register</a>
                </li>
              </>
            )}
          </ul>

          {/* Side Menu Button */}
          <button
            type="button"
            className="btn btn-nav btn-outline-light"
            data-bs-toggle="modal"
            data-bs-target="#navModal"
          >
            <i className="fas fa-list fa-lg"></i>
          </button>
        </div>
      </nav>

      {/* Footer Media Sosial */}
      <div className="side-footer">
        {/* Instagram */}
        <a
          className="side-sosmed"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>

        {/* Facebook */}
        <a
          className="side-sosmed"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f"></i>
        </a>

        {/* WhatsApp */}
        <a
          className="side-sosmed"
          href="https://whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </>
  );
};

export default Navbar;
