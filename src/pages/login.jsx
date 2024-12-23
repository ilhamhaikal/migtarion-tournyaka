import React from "react";
import "../assets/css/login.css";
import backgroundImage from "../assets/img/batukaras.png";
import Navbar from "../layout/navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="login-container">
        <div
          className="masthead text-white"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="masthead-gradient"></div>
          <div className="container">
            <div className="row align-items-center justify-content-center min-vh-100">
              {/* Left Column - Brand Info */}
              <div className="col-md-5 brand-section">
                <div className="brand-content animate__fadeInLeft">
                  <h1 className="brand-title">tournyaka</h1>
                  <p className="brand-description">
                    Tournyaka merupakan sebuah platform pariwisata berbasis digital
                    dengan konsep smart tourism yang memudahkan wisatawan untuk
                    mendapatkan layanan jasa pariwisata di Pangandaran
                  </p>
                </div>
              </div>

              {/* Right Column - Login Form */}
              <div className="col-md-5 form-section">
                <div className="login-card animate__fadeInRight">
                  <h2 className="login-title">Welcome Back!</h2>
                  <p className="login-subtitle">Mulai menjelajah lebih jauh dari sini.</p>

                  <button className="social-login-btn">
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="social-icon"
                    />
                    Masuk dengan Google
                  </button>

                  <div className="divider">
                    <span>Atau masuk dengan</span>
                  </div>

                  <form className="login-form">
                    <div className="form-group">
                      <label className="form-label">Email atau Username</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Masukkan email atau username"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Masukkan password"
                      />
                    </div>

                    <div className="form-action">
                      <label className="remember-me">
                        <input type="checkbox" /> Ingat saya
                      </label>
                      <a href="#" className="forgot-password">
                        Lupa Password?
                      </a>
                    </div>

                    <button type="submit" className="login-button">
                      Masuk
                    </button>

                    <p className="register-link">
                      Belum memiliki akun? <a href="/register">Daftar</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
