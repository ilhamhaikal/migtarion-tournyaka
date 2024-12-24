import React from "react";
import "../../assets/css/login.css";
import backgroundImage from "../../assets/img/batukaras.png";
import Navbar from "../../layout/navbar";

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="homepage">
        <header 
          className="hero-section" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="row align-items-center justify-content-center min-vh-100">
              {/* Form on Left */}
              <div className="col-md-5 order-md-1">
                <div className="login-card animate__fadeInLeft">
                  <h2 className="login-title">Daftar Akun</h2>
                  <p className="login-subtitle">Mulai petualangan baru bersama kami</p>

                  <button className="social-login-btn">
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="social-icon"
                    />
                    Daftar dengan Google
                  </button>
                  <form className="register-form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Nama Lengkap"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Konfirmasi Password"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="checkbox-container">
                        <input type="checkbox" required />
                        <span className="checkbox-text">
                          Saya setuju dengan syarat dan ketentuan
                        </span>
                      </label>
                    </div>

                    <button type="submit" className="login-button">
                      Daftar Sekarang
                    </button>

                    <p className="register-link">
                      Sudah punya akun? <a href="/login">Masuk</a>
                    </p>
                  </form>
                </div>
              </div>

              {/* Text on Right */}
              <div className="col-md-5 brand-section order-md-2">
                <div className="brand-content animate__fadeInRight">
                  <h1 className="brand-title">tournyaka</h1>
                  <p className="brand-description">
                    Bergabung dengan Tournyaka dan nikmati perjalanan wisata yang tak terlupakan di Pangandaran
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Register;