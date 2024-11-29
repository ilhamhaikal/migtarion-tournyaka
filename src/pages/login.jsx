import React from "react";
import "../assets/css/login.css";  // Login-specific styles

const Login = () => {
  return (
    <div
      className="masthead sign text-white"
      style={{ backgroundImage: "url(D:\belajarprogram\tournyaka_react_go\src\assets\img\bg.jpg)" }}
    >
      <div className="masthead-gradient sign"></div>
      <div className="container">
        <div className="row">
          <div className="col sign">
            <h1 className="display-1 pb-2 text-white">tournyaka</h1>
            <h6 className="pb-4 display-text">
              Tournyaka merupakan sebuah platform pariwisata berbasis digital
              dengan konsep smart tourism yang memudahkan wisatawan untuk
              mendapatkan layanan jasa pariwisata di Pangandaran
            </h6>
          </div>
          <div className="col">
            <div className="card sign-modal">
              <div className="card-body text-center">
                <h1 className="card-title modal-title">Login</h1>
                <p>Mulai menjelajah lebih jauh dari sini.</p>

                {/* Button Login Google */}
                <div className="row mx-auto mb-2">
                  <button className="btn btn-google">
                    <div className="logo">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG path */}
                      </svg>
                      Masuk dengan Google
                    </div>
                  </button>
                </div>

                {/* Divider */}
                <div className="row mx-auto">
                  <div className="col">
                    <hr className="divider" />
                  </div>
                  <div className="col-5 mt-1">
                    <p>Atau masuk dengan</p>
                  </div>
                  <div className="col">
                    <hr className="divider" />
                  </div>
                </div>

                {/* Form Login */}
                <form action="#" method="post">
                  <div className="row mx-auto mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="login"
                      placeholder="Email atau Username"
                    />
                  </div>
                  <div className="row mx-auto mb-2">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <div className="row mx-auto justify-content-end">
                    <div className="col-auto">
                      <a href="#" className="link">
                        Lupa Password?
                      </a>
                    </div>
                  </div>

                  <div className="row mt-4 mx-auto justify-content-center">
                    <button type="submit" className="btn btn-header">
                      Masuk
                    </button>
                  </div>
                </form>

                <div className="row mx-auto justify-content-center">
                  <div className="col-auto">
                    <a>Belum memiliki akun? </a>
                    <a href="/register" className="link">
                      Daftar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
