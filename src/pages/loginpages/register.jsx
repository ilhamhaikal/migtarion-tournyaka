import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../assets/css/login.css";
import backgroundImage from "../../assets/img/batukaras.png";
import Navbar from "../../layout/navbar";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password harus minimal 8 karakter';
    }
    if (!hasUpperCase || !hasLowerCase) {
      return 'Password harus mengandung huruf besar dan kecil';
    }
    if (!hasNumbers) {
      return 'Password harus mengandung angka';
    }
    if (!hasSpecialChar) {
      return 'Password harus mengandung karakter special (!@#$%^&*(),.?":{}|<>)';
    }
    return '';
  };

  const validateEmail = (email) => {
    // Regex for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!emailRegex.test(email)) {
      setWarning('⚠️ Format email tidak valid');
      return true;
    }
    
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setWarning('⚠️ Hanya email Gmail yang diperbolehkan');
      return true;
    }
    
    setWarning('');
    return false;
  };

  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const metCount = Object.values(requirements).filter(Boolean).length;

    if (metCount <= 2) return 'low';
    if (metCount <= 4) return 'better';
    return 'strong';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Validate email when changed
    if (name === 'email') {
      const emailError = validateEmail(value);
      if (emailError) {
        setError(emailError);
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email before submission
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak sama');
      return;
    }

    try {
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post('http://localhost:8080/api/v1/register', registerData);

      if (response.data) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    }
  };

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
                  <form className="register-form" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {warning && <div className="warning-message">{warning}</div>}
                    <div className="form-group">
                      <input
                        type="text"
                        name="username"
                        className="form-input"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-input"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        required
                      />
                      <i 
                        className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                      {isPasswordFocused && formData.password && (
                        <div className="password-strength">
                          <div className="strength-bar">
                            <div className={`strength-bar-fill ${passwordStrength}`}></div>
                          </div>
                          <div className={`strength-text ${passwordStrength}`}>
                            {passwordStrength === 'low' && 'Password lemah'}
                            {passwordStrength === 'better' && 'Password cukup kuat'}
                            {passwordStrength === 'strong' && 'Password kuat'}
                          </div>
                          <div className="password-requirements">
                            <div className={`requirement ${formData.password.length >= 8 ? 'met' : 'unmet'}`}>
                              <i></i>Minimal 8 karakter
                            </div>
                            <div className={`requirement ${/[A-Z]/.test(formData.password) ? 'met' : 'unmet'}`}>
                              <i></i>Huruf besar
                            </div>
                            <div className={`requirement ${/[a-z]/.test(formData.password) ? 'met' : 'unmet'}`}>
                              <i></i>Huruf kecil
                            </div>
                            <div className={`requirement ${/\d/.test(formData.password) ? 'met' : 'unmet'}`}>
                              <i></i>Angka
                            </div>
                            <div className={`requirement ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'met' : 'unmet'}`}>
                              <i></i>Karakter spesial
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="form-input"
                        placeholder="Konfirmasi Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <i 
                        className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </div>

                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="terms"
                        className="form-checkbox"
                        required
                      />
                      <label htmlFor="terms" className="checkbox-label">
                        Saya setuju dengan syarat dan ketentuan yang berlaku
                      </label>
                    </div>

                    <button type="submit" className="register-btn">
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
                  <h1 className="brand-title">Tournyaka</h1>
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