import React from "react";
import "../../assets/css/login.css";
import bgImage from "../../assets/img/bg.jpg";
import Navbar from "../../layout/navbar";

const ForgetPassword = () => {
  return (
    <>
      <Navbar />
      <div className="login-container">
        <div
          className="masthead text-white"
          style={{
            backgroundImage: `url(${bgImage})`,
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
                  <h1 className="brand-title">Reset Password</h1>
                  <p className="brand-description">
                    Masukkan email yang terdaftar pada akun Anda. 
                    Kami akan mengirimkan tautan untuk mereset password Anda.
                  </p>
                </div>
              </div>

              {/* Right Column - Reset Form */}
              <div className="col-md-5">
                <div className="login-card animate__fadeInRight">
                  <h2 className="login-title">Lupa Password?</h2>
                  <p className="login-subtitle">
                    Jangan khawatir! Kami akan membantu Anda mendapatkan akses kembali.
                  </p>

                  <form className="login-form">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="Masukkan email Anda"
                        required
                      />
                    </div>

                    <button type="submit" className="login-button">
                      Kirim Link Reset
                    </button>

                    <p className="register-link mt-4">
                      Kembali ke <a href="/login">Login</a>
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

export default ForgetPassword;