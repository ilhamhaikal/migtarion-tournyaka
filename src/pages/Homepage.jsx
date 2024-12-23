import React from "react";
import "../assets/css/global.css";
import bgImage from "../assets/img/bg.jpg";

const Homepage = () => {
  return (
    <div>
      <header 
        className="masthead text-white" 
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <div className="masthead-gradient"></div>
        <div className="container h-100">
          <div className="heading d-flex align-items-center justify-content-center h-100">
            <div className="heading-text text-center animate__animated animate__fadeIn">
              <h1 className="display-1 pb-2 text-white fw-bold">tournyaka</h1>
              <h6 className="pb-4 display-text fs-4 mx-auto" style={{ maxWidth: '800px' }}>
                Tournyaka merupakan sebuah platform pariwisata berbasis digital dengan konsep smart tourism yang memudahkan wisatawan
                untuk mendapatkan layanan jasa pariwisata di Pangandaran
              </h6>
              <a className="btn btn-warning btn-lg px-5 py-3 rounded-pill shadow-sm hover-scale" href="/mengapa_pilih_pangandaran">
                Ayo Berangkat! <i className="fas fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Content Section 1 */}
      <section className="page-section1">
        <div className="container">
          <div className="page-content">
            <h5 className="page-text">
              Tournyaka merupakan sebuah platform pariwisata yang menyediakan berbagai kebutuhan wisatawan dalam berwisata ke Pangandaran
              seperti layanan pemandu wisata (<i>tour guide</i>), paket wisata, dan rencana perjalanan (<i>itenerary planner</i>)
              yang menawarkan pengalaman yang lebih personal dimana wisatawan dapat mengatur rencana perjalanan ke berbagai destinasi
              wisata Pangandaran yang diinginkan.
            </h5>
            <a>
              <img className="logo" src="/assets/img/Logo.png" alt="Tournyaka Logo" />
            </a>
          </div>
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="page-section2">
        <div className="container">
          <div className="page-content">
            <h1 className="page-header">Mengapa harus tournyaka?</h1>
            <div className="row-content">
              {/* Detail 1 */}
              <div className="details">
                <h5 className="headline">Liburan sesuai mood kamu</h5>
                <p className="description">
                  Tournyaka akan memberikan rekomendasi tempat wisata dan suasana liburan yang sesuai dengan suasana hati kamu.
                </p>
              </div>
              {/* Detail 2 */}
              <div className="details">
                <h5 className="headline">Bikin nyesel</h5>
                <p className="description">
                  Kamu akan auto nyesel deh kalo ke Pangandaran tanpa ditemani Tournyaka.
                </p>
              </div>
              {/* Tambahkan detail lain jika ada */}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 3 */}
      <section className="page-section3">
        <div className="container">
          <div className="page-content">
            <h1 className="page-header">Destinasi Terbaik</h1>
            <p className="description">
              Di Pangandaran banyak loh destinasi yang bisa bikin kamu nyaman dan ngelupain masalah yang lagi kamu hadapin.
            </p>
            <div className="row-content mt-4">
              <div className="card-destinasi">
                <img src="/assets/img/pangandaran.png" alt="Pangandaran" className="card-img" />
                <div className="card-body">
                  <h4 className="card-title">Pangandaran</h4>
                  <p className="card-text">Pasti kalo wisata satu ini semua orang pada tau yah...</p>
                </div>
              </div>
              {/* Tambahkan kartu lainnya */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
