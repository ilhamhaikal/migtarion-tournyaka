import React from "react";
import "../assets/css/global.css";
import bgImage from "../assets/img/bg.jpg";
import logoImage from "../assets/img/Logo.png";
import pangandaranImage from "../assets/img/pangandaran.png";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="homepage">
        {/* Hero Section */}
        <header 
          className="hero-section" 
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-content animate__fadeIn">
              <h1 className="hero-title">tournyaka</h1>
              <p className="hero-description">
                Tournyaka merupakan sebuah platform pariwisata berbasis digital dengan konsep smart tourism 
                yang memudahkan wisatawan untuk mendapatkan layanan jasa pariwisata di Pangandaran
              </p>
              <a className="cta-button" href="/explore">
                Ayo Berangkat! <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </header>

        {/* About Section */}
        <section className="about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text animate__fadeInLeft">
                <h2 className="section-title text-center mb-4">About Tournyaka</h2>
                <p className="about-description text-center">
                  Tournyaka merupakan sebuah platform pariwisata yang menyediakan berbagai kebutuhan wisatawan 
                  dalam berwisata ke Pangandaran seperti layanan pemandu wisata (tour guide), 
                  paket wisata, dan rencana perjalanan (itenerary planner).
                </p>
                <div className="about-image animate__fadeInUp">
                  <img src={logoImage} alt="Tournyaka Logo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Mengapa harus tournyaka?</h2>
            <div className="features-grid">
              <div className="feature-card animate__fadeInUp">
                <div className="feature-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h3>Liburan sesuai mood kamu</h3>
                <p>Tournyaka akan memberikan rekomendasi tempat wisata dan suasana liburan yang sesuai dengan suasana hati kamu.</p>
              </div>
              <div className="feature-card animate__fadeInUp" style={{animationDelay: "0.2s"}}>
                <div className="feature-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h3>Bikin nyesel</h3>
                <p>Kamu akan auto nyesel deh kalo ke Pangandaran tanpa ditemani Tournyaka.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section className="destinations-section">
          <div className="container">
            <h2 className="section-title text-center">Destinasi Terbaik</h2>
            <p className="section-description text-center mb-5">
              Di Pangandaran banyak loh destinasi yang bisa bikin kamu nyaman dan ngelupain masalah yang lagi kamu hadapin.
            </p>
            <div className="destinations-grid">
              <div className="destination-card animate__fadeInUp">
                <div className="destination-image">
                  <img src={pangandaranImage} alt="Pangandaran Beach" />
                  <div className="destination-overlay">
                    <span className="destination-category">Pantai</span>
                  </div>
                </div>
                <div className="destination-content">
                  <h3>Pantai Pangandaran</h3>
                  <p>Nikmati keindahan sunset dan aktivitas water sports di pantai eksotis ini.</p>
                  <div className="destination-meta">
                    <span><i className="fas fa-map-marker-alt"></i> Pangandaran</span>
                    <span><i className="fas fa-star"></i> 4.8</span>
                  </div>
                  <a href="/destinations/pangandaran" className="btn-explore">
                    Explore <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
              {/* Add more destination cards here */}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
