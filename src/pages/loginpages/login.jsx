import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../assets/css/login.css";
import backgroundImage from "../../assets/img/batukaras.png";
import Navbar from "../../layout/navbar";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', formData);
      console.log('Login Response:', response.data);

      if (response.data && response.data.token) {
        // Store token and user role in localStorage
        localStorage.setItem('token', response.data.token);
        const userRole = response.data.user?.role; // Safely access role
        console.log('User Role:', userRole);

        if (userRole) {
          // Redirect based on role
          if (userRole === 3) {
            console.log('Role 3: Redirecting to homepage...');
            navigate('/');
          } else {
            console.log(`Role ${userRole}: Redirecting to dashboard...`);
            navigate('/dashboard');
          }
        } else {
          throw new Error('Invalid user role');
        }
      } else {
        throw new Error('Invalid login response');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
          }}
        >
          <div className="masthead-gradient"></div>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              {/* Left Column - Brand Info */}
              <div className="col-md-5 brand-section">
                <div className="brand-content animate__fadeInLeft">
                  <h1 className="brand-title">Tournyaka</h1>
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

                  <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-action">
                      <label className="remember-me">
                        <input type="checkbox" /> Ingat saya
                      </label>
                      <a href="/forgetpassword" className="forgot-password">
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