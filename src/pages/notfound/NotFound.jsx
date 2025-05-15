import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/notFound.css';

const NotFound = () => {
  return (
    <div className="page-wrapper">
      <main className="main-content">
        <div className="not-found-container">
          <div className="not-found-content">
            <h1>404</h1>
            <h2>Halaman Tidak Ditemukan</h2>
            <p>Maaf, URL yang Anda cari tidak tersedia di website ini.</p>
            <div className="not-found-actions">
              <Link to="/" className="btn-primary">Kembali ke Beranda</Link>
              <Link to="/articles" className="btn-secondary">Jelajahi Artikel</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;