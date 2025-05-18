import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layout/navbar';
import Footer from '../../layout/footer';
import '../../assets/css/articleDetail.css';
import articleImage from '../../assets/img/1600w-oO_xIwyw0KM.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ArticleDetail = () => {
  // Gunakan 'id' sebagai nama parameter (bukan 'slug')
  const { id } = useParams();
  
  // Ekstrak ID numerik jika format "28-judul-artikel"
  const articleId = id.includes('-') ? id.split('-')[0] : id;
  
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadVideo, setLoadVideo] = useState(false);
  const [popularArticles, setPopularArticles] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [latestArticles, setLatestArticles] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch artikel detail
  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/v1/articles/${articleId}`);
        console.log('API response:', response.data);
        
        let articleData;
        if (response.data && response.data.data) {
          articleData = response.data.data;
        } else if (response.data && response.data.title) {
          articleData = response.data;
        } else {
          throw new Error('Format data tidak valid');
        }
        
        // Log untuk debugging
        console.log('Gallery data before transformation:', articleData.gallery);
        
        // Transformasi data gallery ke gallery_images
        if (articleData.gallery && Array.isArray(articleData.gallery) && articleData.gallery.length > 0) {
          articleData.gallery_images = articleData.gallery.map(item => ({
            url: getCompleteImageUrl(item.image_url),
            caption: item.caption || '',
            image_url: item.image_url // Simpan juga image_url asli
          }));
          console.log('Gallery transformed:', articleData.gallery_images);
        } else {
          // Jika tidak ada gallery, set sebagai array kosong
          articleData.gallery_images = [];
        }
        
        // Tambahkan setelah transformasi galeri
        console.log('Final gallery structure:', {
          gallery: articleData.gallery,
          gallery_images: articleData.gallery_images,
          firstImage: articleData.gallery_images && articleData.gallery_images[0] ? {
            url: articleData.gallery_images[0].url,
            caption: articleData.gallery_images[0].caption
          } : null
        });
        
        setArticle(articleData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Gagal memuat artikel');
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [articleId]);

  // Tambahkan useEffect untuk scroll ke atas saat artikel berubah
  useEffect(() => {
    // Scroll ke atas halaman saat ID artikel berubah
    window.scrollTo(0, 0);
    
    // Timeout untuk highlight judul jika diperlukan
    setTimeout(() => {
      const titleElement = document.querySelector('.article-title') || 
                          document.querySelector('.articleDetail-title') ||
                          document.querySelector('h1');
      
      if (titleElement) {
        titleElement.classList.add('highlight-title');
        setTimeout(() => {
          titleElement.classList.remove('highlight-title');
        }, 1500);
      }
    }, 500); // Beri waktu bagi konten untuk dimuat
  }, [articleId]);

  // Fetch artikel populer
  useEffect(() => {
    const fetchPopularArticles = async () => {
      try {
        setLoadingPopular(true);
        const response = await axios.get('http://localhost:8080/api/v1/articles/popular?limit=5');
        console.log('Popular articles:', response.data);
        
        // Ekstrak artikel dari respons API
        let articles = [];
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          articles = response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
          articles = response.data;
        }
        
        setPopularArticles(articles);
        setLoadingPopular(false);
      } catch (err) {
        console.error('Error fetching popular articles:', err);
        // Gunakan data default jika gagal fetch
        setPopularArticles([
          {
            id: 1,
            title: "Wisata Kuliner Pangandaran",
            image_url: articleImage,
            created_at: "2024-01-20T00:00:00Z",
            views: 1200
          },
          {
            id: 2, 
            title: "Pantai Tersembunyi di Pangandaran",
            image_url: articleImage,
            created_at: "2024-01-18T00:00:00Z",
            views: 956
          },
          {
            id: 3,
            title: "Festival Budaya Pangandaran",
            image_url: articleImage,
            created_at: "2024-01-15T00:00:00Z",
            views: 834
          }
        ]);
        setLoadingPopular(false);
      }
    };

    fetchPopularArticles();
  }, []);

  // Fetch artikel terbaru
  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setLoadingLatest(true);
        const response = await axios.get('http://localhost:8080/api/v1/articles/latest?limit=10');
        console.log('Latest articles:', response.data);
        
        // Ekstrak data artikel dari respons
        let articles = [];
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          articles = response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
          articles = response.data;
        }
        
        setLatestArticles(articles);
        setLoadingLatest(false);
      } catch (err) {
        console.error('Error fetching latest articles:', err);
        // Gunakan data default jika ada error
        setLatestArticles([]);
        setLoadingLatest(false);
      }
    };

    fetchLatestArticles();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    
    // Tambahkan null check sebelum manipulasi navbar
    if (!navbar) {
      console.warn('Navbar element not found');
      return; // Keluar dari effect jika navbar tidak ditemukan
    }

    document.removeEventListener('scroll', window.onscroll);
    window.onscroll = null;
    window.navbarScrollHandler = null;
    document.removeEventListener('scroll', window.navbarScrollHandler);
    navbar.classList.remove('animate__animated', 'animate__fadeIn', 'animate__fadeOut', 'transparent', 'scrolled');

    navbar.classList.add('navbar-article-detail');

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

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Tambahkan useEffect yang memantau perubahan isImageViewerOpen
  useEffect(() => {
    // Kembalikan overflow ke normal jika image viewer ditutup
    if (!isImageViewerOpen) {
      document.body.style.overflow = '';
    }
  }, [isImageViewerOpen]);

  // Perbaikan fungsi handleArticleClick
  const handleArticleClick = (articleId, event) => {
    // Convert kedua ID ke string untuk perbandingan yang konsisten
    const currentId = articleId.toString();
    const clickedId = articleId.toString();
    
    if (clickedId === currentId) {
      // Cegah navigasi default
      event.preventDefault();
      
      // Tambahkan timeout kecil untuk memastikan DOM sudah siap
      setTimeout(() => {
        // Coba beberapa selector untuk menemukan judul artikel
        const titleElement = document.querySelector('.article-title') || 
                            document.querySelector('.articleDetail-title') ||
                            document.querySelector('h1');
        
        if (titleElement) {
          // Scroll ke elemen judul
          titleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Tambahkan class highlight untuk efek visual
          titleElement.classList.add('highlight-title');
          
          // Hapus highlight setelah animasi selesai
          setTimeout(() => {
            titleElement.classList.remove('highlight-title');
          }, 1500);
          
          console.log('Scrolled to article title');
        } else {
          // Fallback jika elemen judul tidak ditemukan
          window.scrollTo({ top: 0, behavior: 'smooth' });
          console.log('Title element not found, scrolled to top');
        }
      }, 50);
    }
  };

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
    document.body.style.overflow = ''; // Kembalikan overflow ke default
  };

  // Tambahkan fungsi helper untuk mengolah URL gambar
  const getCompleteImageUrl = (imagePath) => {
    if (!imagePath) return articleImage; // Gunakan gambar default jika tidak ada path
    
    // Jika URL sudah lengkap, kembalikan apa adanya
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Jika URL relatif, tambahkan base URL
    if (imagePath.startsWith('/uploads')) {
      return `http://localhost:8080${imagePath}`;
    }
    
    // Kembalikan URL apa adanya untuk kasus lain
    return imagePath;
  };

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
          <main className="article-main-content">
            {loading ? (
              <div className="loading-indicator">
                <p>Memuat artikel...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
              </div>
            ) : article ? (
              <>
                <h1 className="article-title">{article.title}</h1>
                <div className="article-meta-container">
                  <p className="article-meta">
                    <i className="far fa-calendar"></i> {new Date(article.created_at).toLocaleDateString()}
                  </p>
                  {article.author && (
                    <p className="article-meta article-author-meta">
                      <i className="far fa-user"></i> {article.author.username}
                    </p>
                  )}
                </div>
                
                <div className="article-image-container">
                  {article.image_url ? (
                    <LazyLoadImage
                      src={getCompleteImageUrl(article.image_url)}
                      alt={article.title}
                      effect="blur"
                      className="article-image"
                      threshold={100}
                      width="100%"
                      height="auto"
                      style={{ objectFit: "cover", maxHeight: "500px" }}
                      placeholder={
                        <div className="image-placeholder">
                          <i className="fas fa-image"></i>
                        </div>
                      }
                      onError={(e) => {
                        console.error('Error loading image:', article.image_url);
                        e.target.src = articleImage;
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <LazyLoadImage
                      src={articleImage}
                      alt={article.title}
                      effect="blur"
                      className="article-image"
                    />
                  )}
                </div>
                
                <div className="article-text">
                  {article.content ? 
                    (() => {
                      // Periksa apakah konten sudah dalam format HTML
                      if (article.content.includes('<') && article.content.includes('>')) {
                        // Gunakan dangerouslySetInnerHTML untuk render HTML
                        return <div dangerouslySetInnerHTML={{ __html: article.content }} />;
                      } else {
                        // Untuk plain text, pisahkan konten menjadi paragraf
                        const paragraphs = article.content.split('\n\n');
                        
                        // Tentukan posisi galeri berdasarkan jumlah paragraf
                        let galleryPosition = Math.floor(paragraphs.length / 2);
                        
                        // Jika ada 3 paragraf, galeri setelah paragraf ke-2
                        if (paragraphs.length === 3) {
                          galleryPosition = 1; // index 1 = paragraf ke-2
                        } 
                        // Jika ada 5 paragraf, galeri setelah paragraf ke-3
                        else if (paragraphs.length === 5) {
                          galleryPosition = 2; // index 2 = paragraf ke-3
                        }
                        
                        // Render semua elemen
                        return (
                          <>
                            {/* Render paragraf */}
                            {paragraphs.map((paragraph, index) => (
                              <p key={`para-${index}`}>{paragraph}</p>
                            ))}
                          </>
                        );
                      }
                    })()
                    : 
                    <p>Tidak ada konten tersedia untuk artikel ini.</p>
                  }
                </div>

                {/* Galeri setelah konten utama */}
                {article.gallery_images && Array.isArray(article.gallery_images) && article.gallery_images.length > 0 && (
                  <div className="article-gallery">
                    <h3>Galeri Foto</h3>
                    <div className={`gallery-container gallery-count-${article.gallery_images.length}`}>
                      {article.gallery_images.map((image, index) => (
                        <div 
                          key={index} 
                          className={`gallery-item ${index === 0 && article.gallery_images.length >= 3 ? 'gallery-item-main' : ''}`}
                          onClick={() => openImageViewer(index)}
                        >
                          <img
                            src={image.url}
                            alt={image.caption || `Foto galeri ${index + 1}`}
                            className="gallery-image"
                            loading="lazy"
                            onError={(e) => {
                              console.error('Error loading gallery image:', image.url);
                              e.target.src = articleImage;
                              e.target.onerror = null;
                            }}
                          />
                          {image.caption && <div className="gallery-caption">{image.caption}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tambahkan komponen untuk video YouTube */}
                {article.video_url && (
                  <div className="article-video-container">
                    <h3>Video Terkait</h3>
                    <div className="video-wrapper">
                      {!loadVideo ? (
                        <div 
                          className="video-thumbnail"
                          onClick={() => setLoadVideo(true)}
                          style={{
                            backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeVideoId(article.video_url)}/hqdefault.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                        >
                          <div className="play-button">
                            <i className="fas fa-play"></i>
                          </div>
                        </div>
                      ) : (
                        <iframe
                          width="100%"
                          height="450"
                          src={getYouTubeEmbedUrl(article.video_url)}
                          title={article.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      )}
                    </div>
                  </div>
                )}

                {article.categories && article.categories.length > 0 && (
                  <div className="article-categories">
                    <h3>Kategori:</h3>
                    <div className="categories-list">
                      {article.categories.map((category, index) => (
                        <React.Fragment key={category.id}>
                          <span className="category-tag">
                            {category.name}
                          </span>
                          {index < article.categories.length - 1 && <span className="category-separator"> </span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {article.tags && article.tags.length > 0 && (
                  <div className="article-tags">
                    <h3>Tags:</h3>
                    <div className="tags-list">
                      {article.tags.map(tag => (
                        <span key={tag.id} className="tag">#{tag.name}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="error-message">
                <p>Artikel tidak ditemukan</p>
              </div>
            )}
          </main>

          <aside className="article-sidebar">
            <div className="sidebar-ad">
              <div className="ad-space">Ad Space (300x250)</div>
            </div>

            <div className="popular-articles">
              <h3>Artikel Populer</h3>
              {loadingPopular ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Memuat artikel populer...</p>
                </div>
              ) : popularArticles.length > 0 ? (
                popularArticles.map(article => (
                  <Link 
                    to={`/article/${article.id}-${article.title.toLowerCase().replace(/\s+/g, '-')}`} 
                    key={article.id} 
                    className="popular-article-card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={(e) => handleArticleClick(article.id, e)}
                  >
                    <div className="popular-article-image">
                      <LazyLoadImage 
                        src={article.image_url || articleImage} 
                        alt={article.title}
                        effect="blur"
                        threshold={100}
                        onError={(e) => {
                          e.target.src = articleImage;
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <div className="popular-article-content">
                      <h4>{article.title}</h4>
                      <div className="popular-article-meta">
                        <span>
                          <i className="far fa-calendar"></i> {new Date(article.created_at).toLocaleDateString()}
                        </span>
                        <span>
                          <i className="far fa-eye"></i> {article.views || 0} views
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Tidak ada artikel populer saat ini</p>
              )}
            </div>

            <div className="sidebar-ad">
              <div className="ad-space">Ad Space (300x600)</div>
            </div>
          </aside>
        </div>

        <div className="ad-banner-middle">
          <div className="container">
            <div className="ad-space">Ad Space - Banner Middle (728x90)</div>
          </div>
        </div>

        <div className="article-grid-layout">
          <div className="recent-articles-box">
            <h2 className="section-title">Artikel Terbaru</h2>
            
            {loadingLatest ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <i className="fas fa-spinner fa-spin"></i>
                <p>Memuat artikel terbaru...</p>
              </div>
            ) : latestArticles.length > 0 ? (
              <>
                <div className="slider-container">
                  <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 25}%)` }}>
                    {latestArticles.slice(0, 4).map((article) => (
                      <Link
                        to={`/article/${article.id}-${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                        key={article.id} 
                        className="recent-article-card"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onClick={(e) => handleArticleClick(article.id, e)}
                      >
                        <div className="recent-article-image">
                          <LazyLoadImage 
                            src={article.image_url || articleImage} 
                            alt={article.title}
                            effect="blur"
                            threshold={100}
                            wrapperClassName="recent-article-image-wrapper"
                            width="100%"
                            height="180px"
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = articleImage;
                              e.target.onerror = null;
                            }}
                          />
                        </div>
                        <div className="recent-article-content">
                          <h4>{article.title}</h4>
                          <div className="recent-article-meta">
                            <span><i className="far fa-calendar"></i> {new Date(article.created_at).toLocaleDateString()}</span>
                            <span><i className="far fa-eye"></i> {article.views || 0} views</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Tombol navigasi di bawah slider */}
                <div className="slider-controls">
                  <button className="slider-prev" onClick={() => setCurrentSlide(prev => (prev > 0 ? prev - 1 : 2))}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <div className="slider-dots">
                    {[0, 1, 2].map(index => (
                      <button 
                        key={index} 
                        className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                      ></button>
                    ))}
                  </div>
                  <button className="slider-next" onClick={() => setCurrentSlide(prev => (prev < 2 ? prev + 1 : 0))}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <p>Tidak ada artikel terbaru saat ini</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Viewer Modal dengan Desain yang Lebih Modern */}
      {isImageViewerOpen && article.gallery_images && article.gallery_images.length > currentImageIndex && (
        <div className="image-viewer-modal" onClick={closeImageViewer}>
          <button className="close-viewer" onClick={closeImageViewer}>
            <i className="fas fa-times"></i>
          </button>
          <button 
            className="prev-image" 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : article.gallery_images.length - 1));
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={article.gallery_images[currentImageIndex].url || getCompleteImageUrl(article.gallery_images[currentImageIndex].image_url || '')} 
              alt={article.gallery_images[currentImageIndex].caption || "Gambar Galeri"}
              onError={(e) => {
                e.target.src = articleImage;
                e.target.onerror = null;
              }}
            />
            {article.gallery_images[currentImageIndex].caption && (
              <div className="viewer-caption">
                {article.gallery_images[currentImageIndex].caption}
              </div>
            )}
            <div className="viewer-counter">
              {currentImageIndex + 1} / {article.gallery_images.length}
            </div>
          </div>
          <button 
            className="next-image" 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(prev => (prev < article.gallery_images.length - 1 ? prev + 1 : 0));
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      <Footer />
    </>
  );
};

// Fungsi helper untuk mendapatkan ID video YouTube
function getYouTubeVideoId(url) {
  if (!url) return null;
  
  // Handle berbagai format URL YouTube
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getYouTubeEmbedUrl(url) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  // Selalu gunakan format embed yang benar
  return `https://www.youtube.com/embed/${videoId}`;
}

export default ArticleDetail;
