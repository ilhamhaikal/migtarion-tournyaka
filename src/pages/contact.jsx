import React from "react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import "../assets/css/global.css";
import contactImage from "../assets/img/contact.webp";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-hero" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${contactImage})`}}>
        <div className="container">
          <h1 className="contact-title animate__fadeInDown">Contact Us</h1>
          <p className="contact-subtitle animate__fadeIn">Get in touch with us</p>
        </div>
      </div>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrapper animate__fadeInLeft">
              <h2>Send us a message</h2>
              <form className="contact-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Your email" />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Subject" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="5" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>

            <div className="contact-info animate__fadeInRight">
              <h2>Contact Information</h2>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Location</h3>
                  <p>Pangandaran, West Java, Indonesia</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h3>Phone</h3>
                  <p>+62 821 295 397 78</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>Email</h3>
                  <p>info@tournyaka.com</p>
                </div>
              </div>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;