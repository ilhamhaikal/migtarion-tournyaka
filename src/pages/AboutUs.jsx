import React from "react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import "../assets/css/global.css";
import aboutImage from "../assets/img/about.jpg";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-hero" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${aboutImage})`}}>
        <div className="container">
          <h1 className="about-title animate__fadeInDown">About Tournyaka</h1>
          <p className="about-subtitle animate__fadeIn">Explore Pangandaran with Us</p>
        </div>
      </div>

      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-card animate__fadeInLeft">
              <div className="about-icon">
                <i className="fas fa-compass"></i>
              </div>
              <h2>Our Story</h2>
              <p>Tournyaka merupakan sebuah platform digital berbasis website dengan menggunakan konsep smart tourism yang berorientasi kepada kualitas pelayanan terbaik kepada konsumen.</p>
            </div>

            <div className="about-card animate__fadeInUp">
              <div className="about-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h2>Our Mission</h2>
              <p>Menyediakan berbagai kebutuhan wisatawan dalam berwisata ke Pangandaran seperti layanan jasa tour guide, itinerary planner, dan paket wisata.</p>
            </div>

            <div className="about-card animate__fadeInRight">
              <div className="about-icon">
                <i className="fas fa-star"></i>
              </div>
              <h2>Our Vision</h2>
              <p>Menjadi perusahaan teknologi pariwisata terbesar dan berkontribusi untuk meningkatkan eksistensi pariwisata Pangandaran.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-content">
            <div className="features-text animate__fadeInLeft">
              <h2>Smart Tourism Platform</h2>
              <p>
                Platform pariwisata terintegrasi yang memudahkan wisatawan dalam mencari
                kebutuhannya ketika berwisata di Pangandaran.
              </p>
            </div>
            <div className="features-image animate__fadeInRight">
              <img src="/images/tourism.jpg" alt="Tourism" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
