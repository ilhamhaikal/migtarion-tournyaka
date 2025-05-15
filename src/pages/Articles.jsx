import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import '../assets/css/articles.css';
import articleHero from '../assets/img/article.png';

// Tambahkan fungsi helper untuk memotong teks
const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Komponen MultiSelect yang diperbarui dengan fitur auto-close
const MultiSelect = ({ label, options, selected, onChange, id, isOpen, setIsOpen, closeOthers }) => {
  const dropdownRef = useRef(null);
  
  const handleToggle = () => {
    // Tutup dropdown lain sebelum membuka yang ini
    if (!isOpen) {
      closeOthers();
    }
    setIsOpen(!isOpen);
  };
  
  // Deteksi klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    // Tambahkan event listener untuk klik di mana saja
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener saat komponen unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);
  
  const handleOptionClick = (optionId) => {
    let newSelected = [...selected];
    
    // Logika multi-select tetap sama
    if (optionId === 'all') {
      newSelected = ['all'];
    } else {
      if (newSelected.includes('all')) {
        newSelected = newSelected.filter(id => id !== 'all');
      }
      
      if (newSelected.includes(optionId)) {
        newSelected = newSelected.filter(id => id !== optionId);
        if (newSelected.length === 0) {
          newSelected = ['all'];
        }
      } else {
        newSelected.push(optionId);
      }
    }
    
    onChange(newSelected);
  };
  
  const handleSelectAll = () => {
    onChange(['all']);
  };
  
  const handleClearAll = () => {
    const firstOption = options[0]?.id || 'all';
    onChange([firstOption]);
  };
  
  const getDisplayLabel = () => {
    if (selected.includes('all')) {
      return 'Semua';
    }
    if (selected.length === 1) {
      const selectedOption = options.find(opt => opt.id.toString() === selected[0]);
      return selectedOption ? selectedOption.name : 'Pilih...';
    }
    return `${selected.length} dipilih`;
  };
  
  return (
    <div className="multi-select-group" ref={dropdownRef}>
      <label htmlFor={id}>{label}</label>
      <div className="custom-multi-select">
        <div 
          className="multi-select-header" 
          onClick={handleToggle}
        >
          <span>{getDisplayLabel()}</span>
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </div>
        {isOpen && (
          <div className="multi-select-options">
            <div className="multi-select-actions">
              <button type="button" onClick={handleSelectAll}>Pilih Semua</button>
              <button type="button" onClick={handleClearAll}>Reset</button>
            </div>
            <div className="multi-select-list">
              <div 
                className={`multi-select-option ${selected.includes('all') ? 'selected' : ''}`}
                onClick={() => handleOptionClick('all')}
              >
                <input 
                  type="checkbox" 
                  checked={selected.includes('all')} 
                  onChange={() => {}} 
                  id={`${id}-all`}
                />
                <label htmlFor={`${id}-all`}>Semua {label}</label>
              </div>
              {options.map(option => (
                <div 
                  key={option.id} 
                  className={`multi-select-option ${selected.includes(option.id.toString()) ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option.id.toString())}
                >
                  <input 
                    type="checkbox" 
                    checked={selected.includes(option.id.toString())} 
                    onChange={() => {}} 
                    id={`${id}-${option.id}`}
                  />
                  <label htmlFor={`${id}-${option.id}`}>{option.name}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeProvince, setActiveProvince] = useState('all');
  const [activeCategories, setActiveCategories] = useState(['all']);
  const [activeTags, setActiveTags] = useState(['all']);
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;
  
  const [provinces, setProvinces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);

  const [openDropdown, setOpenDropdown] = useState(null);

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownId) => {
    if (openDropdown === dropdownId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownId);
    }
  };

  const getNoResultsMessage = () => {
    // Cek apakah ada filter aktif
    const hasProvinceFilter = activeProvince !== 'all';
    const hasCategoryFilter = !activeCategories.includes('all');
    const hasTagFilter = !activeTags.includes('all');
    const hasSearchFilter = searchTerm.trim() !== '';
    
    // Dapatkan nama filter aktif
    let provinceText = '';
    let categoryText = '';
    let tagText = '';
    
    if (hasProvinceFilter) {
      const province = provinces.find(p => p.id.toString() === activeProvince);
      provinceText = province ? `di ${province.name}` : '';
    }
    
    if (hasCategoryFilter) {
      const categoryNames = activeCategories
        .map(id => categories.find(c => c.id.toString() === id)?.name)
        .filter(Boolean);
      
      if (categoryNames.length === 1) {
        categoryText = `dengan kategori "${categoryNames[0]}"`;
      } else if (categoryNames.length > 1) {
        categoryText = `dengan kategori ${categoryNames.slice(0, -1).join(', ')} dan ${categoryNames.slice(-1)}`;
      }
    }
    
    if (hasTagFilter) {
      const tagNames = activeTags
        .map(id => tags.find(t => t.id.toString() === id)?.name)
        .filter(Boolean);
      
      if (tagNames.length === 1) {
        tagText = `dengan tag "${tagNames[0]}"`;
      } else if (tagNames.length > 1) {
        tagText = `dengan tag ${tagNames.slice(0, -1).join(', ')} dan ${tagNames.slice(-1)}`;
      }
    }
    
    // Buat pesan berdasarkan kombinasi filter
    if (hasSearchFilter) {
      return (
        <>
          <p>Tidak ada artikel ditemukan untuk pencarian <strong>"{searchTerm}"</strong>{' '}
            {(hasProvinceFilter || hasCategoryFilter || hasTagFilter) && 'dengan filter:'}{' '}
            {provinceText} {categoryText} {tagText}
          </p>
          <p className="no-results-suggestion">Coba ubah kata kunci pencarian atau reset filter.</p>
        </>
      );
    } else if (hasProvinceFilter || hasCategoryFilter || hasTagFilter) {
      return (
        <>
          <p>Tidak ada artikel ditemukan {provinceText} {categoryText} {tagText}</p>
          <p className="no-results-suggestion">Coba ubah filter di atas untuk melihat artikel lainnya.</p>
        </>
      );
    } else {
      return (
        <>
          <p>Belum ada artikel yang tersedia saat ini.</p>
          <p className="no-results-suggestion">Silakan kunjungi kembali di lain waktu.</p>
        </>
      );
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/v1/articles');
        console.log('API Response:', response.data);
        
        let articlesData = [];
        
        if (response.data && response.data.data && response.data.data.articles) {
          articlesData = response.data.data.articles;
        } else if (response.data && response.data.articles) {
          articlesData = response.data.articles;
        } else if (Array.isArray(response.data)) {
          articlesData = response.data;
        } else {
          console.warn('Struktur data tidak dikenali:', response.data);
        }
        
        console.log('Extracted articles:', articlesData);
        setArticles(articlesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Gagal memuat artikel. Silakan coba lagi nanti.');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      setLoadingFilters(true);
      try {
        const provincesResponse = await axios.get('http://localhost:8080/api/v1/provinces');
        let provincesData = [];
        if (provincesResponse.data && provincesResponse.data.data) {
          provincesData = provincesResponse.data.data;
        } else if (Array.isArray(provincesResponse.data)) {
          provincesData = provincesResponse.data;
        }
        // Urutkan provinsi berdasarkan abjad
        provincesData.sort((a, b) => a.name.localeCompare(b.name));
        setProvinces(provincesData);
        
        const categoriesResponse = await axios.get('http://localhost:8080/api/v1/categories');
        let categoriesData = [];
        if (categoriesResponse.data && categoriesResponse.data.data) {
          categoriesData = categoriesResponse.data.data;
        } else if (Array.isArray(categoriesResponse.data)) {
          categoriesData = categoriesResponse.data;
        }
        // Urutkan kategori berdasarkan abjad
        categoriesData.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(categoriesData);
        
        const tagsResponse = await axios.get('http://localhost:8080/api/v1/tags');
        let tagsData = [];
        if (tagsResponse.data && tagsResponse.data.data) {
          tagsData = tagsResponse.data.data;
        } else if (Array.isArray(tagsResponse.data)) {
          tagsData = tagsResponse.data;
        }
        // Urutkan tags berdasarkan abjad
        tagsData.sort((a, b) => a.name.localeCompare(b.name));
        setTags(tagsData);
      } catch (err) {
        console.error('Error fetching filters:', err);
      } finally {
        setLoadingFilters(false);
      }
    };
    
    fetchFilters();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredArticles = Array.isArray(articles) ? articles.filter(article => {
    const matchesProvince = activeProvince === 'all' || 
                         String(article.province_id) === String(activeProvince) ||
                         (article.province && String(article.province.id) === String(activeProvince));
    
    let matchesCategory = activeCategories.includes('all');
    
    if (!matchesCategory) {
      if (article.categories && Array.isArray(article.categories)) {
        matchesCategory = article.categories.some(cat => 
          activeCategories.includes(String(cat.id)) || 
          activeCategories.includes(String(cat))
        );
      } else if (article.category_id) {
        matchesCategory = activeCategories.includes(String(article.category_id));
      } else if (article.category && article.category.id) {
        matchesCategory = activeCategories.includes(String(article.category.id));
      }
    }
    
    let matchesTag = activeTags.includes('all');
    
    if (!matchesTag) {
      if (article.tags && Array.isArray(article.tags)) {
        matchesTag = article.tags.some(tag => 
          activeTags.includes(String(tag.id)) || 
          activeTags.includes(String(tag))
        );
      } else if (article.tag_id) {
        matchesTag = activeTags.includes(String(article.tag_id));
      } else if (article.tag && article.tag.id) {
        matchesTag = activeTags.includes(String(article.tag.id));
      }
    }
    
    const matchesSearch = 
      searchTerm === '' ||
      (article.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (article.content?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    return matchesProvince && matchesCategory && matchesTag && matchesSearch;
  }) : [];

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <>
      <Navbar />
      <div className="articles-hero" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${articleHero})`
      }}>
        <div className="container">
          <h1 className="articles-title animate__fadeInDown">Discover Pangandaran</h1>
          <p className="articles-subtitle animate__fadeIn">Explore our latest stories and guides</p>
          
          <div className="search-container animate__fadeInUp">
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <section className="articles-section">
        <div className="container">
          <div className="filter-dropdowns animate__fadeIn">
            {loadingFilters ? (
              <div className="loading-filters">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Memuat filter...</span>
              </div>
            ) : (
              <>
                <div className="filter-dropdown-group">
                  <label htmlFor="dropdown-province">Provinsi</label>
                  <div className="custom-select">
                    <select
                      id="dropdown-province"
                      value={activeProvince}
                      onChange={(e) => {
                        setActiveProvince(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="filter-dropdown"
                    >
                      <option value="all">Semua Provinsi</option>
                      {provinces.map(province => (
                        <option key={province.id} value={province.id.toString()}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    <div className="select-icon">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>

                <MultiSelect
                  id="categories-select"
                  label="Kategori"
                  options={categories}
                  selected={activeCategories}
                  onChange={newSelected => {
                    setActiveCategories(newSelected);
                    setCurrentPage(1);
                  }}
                  isOpen={openDropdown === 'categories'}
                  setIsOpen={(isOpen) => {
                    if (isOpen) {
                      setOpenDropdown('categories');
                    } else if (openDropdown === 'categories') {
                      setOpenDropdown(null);
                    }
                  }}
                  closeOthers={closeAllDropdowns}
                />

                <MultiSelect
                  id="tags-select"
                  label="Tags"
                  options={tags}
                  selected={activeTags}
                  onChange={newSelected => {
                    setActiveTags(newSelected);
                    setCurrentPage(1);
                  }}
                  isOpen={openDropdown === 'tags'}
                  setIsOpen={(isOpen) => {
                    if (isOpen) {
                      setOpenDropdown('tags');
                    } else if (openDropdown === 'tags') {
                      setOpenDropdown(null);
                    }
                  }}
                  closeOthers={closeAllDropdowns}
                />
              </>
            )}
          </div>

          {loading ? (
            <div className="loading-container">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Memuat artikel...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{error}</p>
            </div>
          ) : (
            <>
              {filteredArticles.length === 0 ? (
                <div className="no-results">
                  <i className="fas fa-search"></i>
                  {getNoResultsMessage()}
                </div>
              ) : (
                <div className="articles-grid">
                  {currentArticles.map((article) => (
                    <article key={article.id} className="article-card animate__fadeIn">
                      <div className="article-image">
                        <img 
                          src={article.image_url || 'https://via.placeholder.com/600x400'} 
                          alt={article.title} 
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x400';
                          }}
                        />
                        <div className="article-overlay">
                          <span className="article-category">
                            {article.categories && article.categories.length > 0 
                              ? article.categories[0].name 
                              : 'Uncategorized'}
                          </span>
                        </div>
                      </div>
                      <div className="article-content">
                        <div>
                          <div className="article-meta">
                            <span><i className="far fa-calendar"></i> {new Date(article.created_at).toLocaleDateString()}</span>
                          </div>
                          <h3 className="article-title">{article.title}</h3>
                          <p className="article-excerpt">
                            {truncateText(article.content || article.description || article.excerpt || 'No description available', 100)}
                          </p>
                        </div>
                        <div className="article-footer">
                          <Link to={`/article/${article.id}-${article.title.toLowerCase().replace(/\s+/g, '-')}`} className="read-more">
                            Read More <i className="fas fa-arrow-right"></i>
                          </Link>
                          <div className="article-stats">
                            <span><i className="far fa-eye"></i> {article.views || 0}</span>
                            <span><i className="far fa-comment"></i> {article.comments || 0}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {filteredArticles.length > 0 && (
                <div className="pagination animate__fadeInUp">
                  <button 
                    className="pagination-btn" 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => paginate(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    className="pagination-btn"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Articles;