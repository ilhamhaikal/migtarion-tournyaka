import React, { useEffect, useState } from 'react';
import Navbar from '../../layout/navbar';
import Footer from '../../layout/footer';
import '../../assets/css/articleDetail.css';
import articleImage from '../../assets/img/1600w-oO_xIwyw0KM.webp';

const ArticleDetail = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); // Assuming 3 articles
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    
    // Remove scroll handlers
    document.removeEventListener('scroll', window.onscroll);
    window.onscroll = null;
    window.navbarScrollHandler = null;
    document.removeEventListener('scroll', window.navbarScrollHandler);
    navbar.classList.remove('animate__animated', 'animate__fadeIn', 'animate__fadeOut', 'transparent', 'scrolled');
    
    navbar.classList.add('navbar-article-detail');
    
    // Force styles without resetting defaults
    navbar.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      background: #ffffff !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
      z-index: 1000 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
      animation: none !important;
    `;
    
    // Force text styles
    const navItems = navbar.querySelectorAll('a, .nav-link');
    navItems.forEach(item => {
      item.style.cssText = `
        color: #1f2937 !important;
        opacity: 1 !important;
        transition: none !important;
      `;
    });

    return () => {
      navbar.classList.remove('navbar-article-detail');
      navbar.style.cssText = '';
      navItems.forEach(item => item.style.cssText = '');
    };
  }, []);

  const recentArticles = [
    { id: 1, title: "Artikel Terbaru 1", date: "20 Jan 2024" },
    { id: 2, title: "Artikel Terbaru 2", date: "18 Jan 2024" },
    { id: 3, title: "Artikel Terbaru 3", date: "15 Jan 2024" },
  ];

  const popularArticles = [
    {
      id: 1,
      title: "Wisata Kuliner Pangandaran",
      excerpt: "Menjelajahi berbagai kuliner khas Pangandaran...",
      date: "20 Jan 2024",
      image: articleImage,
      views: "1.2K"
    },
    {
      id: 2, 
      title: "Pantai Tersembunyi di Pangandaran",
      excerpt: "Temukan keindahan pantai yang belum terjamah...",
      date: "18 Jan 2024",
      image: articleImage,
      views: "956"
    },
    {
      id: 3,
      title: "Festival Budaya Pangandaran",
      excerpt: "Kemeriahan festival budaya tahunan...",
      date: "15 Jan 2024",
      image: articleImage,
      views: "834"
    }
  ];

return (
  <>
    <Navbar />
    <div className="article-container">
      <div className="ad-banner-top">
        <div className="container">
          <div className="ad-space">Ad Space - Banner Top (728x90)</div>
        </div>
      </div>

      <div className="article-grid-layout">
        {/* Main Content */}
        <main className="article-main-content">
          <h1 className="article-title">Menjelajahi Kuliner Tradisional Pangandaran</h1>
          <p className="article-meta">
            <i className="far fa-calendar"></i> 15 Jan 2024 
            <i className="far fa-clock"></i> 5 menit baca
          </p>
          
          <div className="article-image-container">
            <img src={articleImage} alt="Menjelajahi Kuliner Tradisional Pangandaran" className="article-image" />
          </div>
          
          <div className="article-text">
            <p>
              Pangandaran, surga kuliner tersembunyi di pesisir selatan Jawa Barat, menyimpan kekayaan rasa yang menakjubkan dalam setiap hidangan tradisionalnya. Dari sajian seafood segar hingga bumbu rempah khas, setiap hidangan mencerminkan warisan budaya yang telah diwariskan dari generasi ke generasi. Para pengunjung dapat menemukan berbagai warung dan restoran yang menyajikan hidangan autentik, mulai dari ikan bakar dengan sambal khas hingga sayur lodeh yang menghangatkan.
            </p>

            <p>
              Salah satu hidangan yang wajib dicoba adalah Nasi Tutug Oncom, sebuah paduan sempurna antara nasi yang diaduk dengan oncom goreng dan bumbu rahasia. Hidangan ini tidak hanya mengenyangkan tetapi juga menawarkan pengalaman rasa yang unik. Selain itu, pengunjung juga bisa mencicipi Pindang Gunung, sup ikan dengan kuah bening yang kaya rempah, mencerminkan kearifan lokal dalam mengolah hasil laut menjadi hidangan yang menyehatkan.
            </p>

            <p>
              Tidak lengkap rasanya menjelajahi kuliner Pangandaran tanpa mencicipi kudapan khas seperti Opak dan Rempeyek yang renyah. Jajanan tradisional ini tidak hanya menjadi teman makan yang sempurna tetapi juga menjadi buah tangan favorit para wisatawan. Keberadaan kuliner tradisional ini tidak hanya menjadi daya tarik wisata tetapi juga berperan penting dalam melestarikan warisan budaya dan mendukung perekonomian masyarakat lokal.
            </p>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="article-sidebar">
          <div className="sidebar-ad">
            <div className="ad-space">Ad Space (300x250)</div>
          </div>

          <div className="popular-articles">
            <h3>Artikel Populer</h3>
            {popularArticles.map(article => (
              <div key={article.id} className="popular-article-card">
                <div className="popular-article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="popular-article-content">
                  <h4>{article.title}</h4>
                  <div className="popular-article-meta">
                    <span><i className="far fa-calendar"></i> {article.date}</span>
                    <span><i className="far fa-eye"></i> {article.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-ad">
            <div className="ad-space">Ad Space (300x600)</div>
          </div>
        </aside>
      </div>

      {/* Ad Banner Before Recent Articles */}
      <div className="ad-banner-middle">
        <div className="container">
          <div className="ad-space">Ad Space - Banner Middle (728x90)</div>
        </div>
      </div>

      {/* Recent Articles Section */}
      <div className="article-grid-layout">
        <div className="recent-articles-box">
          <h2 className="section-title">Artikel Terbaru</h2>
          <div className="slider-container">
            <div className="slider-wrapper">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="recent-article-card">
                  <div className="recent-article-image">
                    <img src={articleImage} alt={`Recent article ${item}`} />
                  </div>
                  <div className="recent-article-content">
                    <h4>Wisata Pantai Pangandaran {item}</h4>
                    <div className="recent-article-meta">
                      <span><i className="far fa-calendar"></i> 20 Jan 2024</span>
                      <span><i className="far fa-eye"></i> 1.2K views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </>
);
};

export default ArticleDetail;
