import React from "react";
import "../assets/css/global.css";
import bgImage from "../assets/img/bg.jpg";
import logoImage from "../assets/img/Logo.png";
import pangandaranImage from "../assets/img/pangandaran.png";
import greencanyon from "../assets/img/green_canyon.png";
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
            <h2 className="section-title text-center">Mengapa harus tournyaka?</h2>
            <div className="features-grid">
              <div className="feature-card animate__fadeInUp">
                <div className="feature-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <h3>Panduan Lengkap</h3>
                <p>Temukan panduan wisata terlengkap dengan rekomendasi tempat terbaik di Pangandaran</p>
                <div className="feature-stat">500+ Tempat Wisata</div>
              </div>

              <div className="feature-card animate__fadeInUp" data-delay="0.2s">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Tour Guide Berpengalaman</h3>
                <p>Pemandu wisata profesional siap menemani perjalanan Anda dengan cerita menarik</p>
                <div className="feature-stat">100+ Guide Terverifikasi</div>
              </div>

              <div className="feature-card animate__fadeInUp" data-delay="0.4s">
                <div className="feature-icon">
                  <i className="fas fa-route"></i>
                </div>
                <h3>Rute Terbaik</h3>
                <p>Nikmati perjalanan dengan rute yang dioptimalkan dan hemat waktu</p>
                <div className="feature-stat">50+ Rute Pilihan</div>
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
            <div className="destination-card animate__fadeInUp">
              <div className="destination-image">
                <img src={greencanyon} alt="Green Canyon" />
                <div className="destination-overlay">
                  <span className="destination-category">Wisata Alam</span>
                </div>
              </div>
              <div className="destination-content">
                <h3>Green Canyon</h3>
                <p>Jelajahi keindahan ngarai hijau dengan body rafting yang menantang.</p>
                <div className="destination-meta">
                  <span><i className="fas fa-map-marker-alt"></i> Cijulang</span>
                  <span><i className="fas fa-star"></i> 4.7</span>
                </div>
                <a href="/destinations/green-canyon" className="btn-explore">
                  Explore <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="destination-card animate__fadeInUp">
              <div className="destination-image">
                <img src={pangandaranImage} alt="Citumang" />
                <div className="destination-overlay">
                  <span className="destination-category">Wisata Air</span>
                </div>
              </div>
              <div className="destination-content">
                <h3>Citumang</h3>
                <p>Rasakan kesejukan air jernih dan pemandangan hutan yang asri.</p>
                <div className="destination-meta">
                  <span><i className="fas fa-map-marker-alt"></i> Parigi</span>
                  <span><i className="fas fa-star"></i> 4.6</span>
                </div>
                <a href="/destinations/citumang" className="btn-explore">
                  Explore <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
