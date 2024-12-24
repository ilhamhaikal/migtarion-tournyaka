import React, { useState } from 'react';

const AddArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    category: '',
    content: '',
    image: null
  });

  return (
    <div className="dashboard__content">
      <div className="article-header">
        <h2>Create New Article</h2>
        <div className="action-buttons">
          <button className="article-btn article-btn--draft">Save Draft</button>
          <button className="article-btn article-btn--publish">Publish</button>
        </div>
      </div>

      <div className="article-form">
        <div className="form-section">
          <div className="form-group">
            <label className="form-label">Article Title</label>
            <input 
              type="text" 
              className="form-input title-input"
              placeholder="Enter article title..."
              value={article.title}
              onChange={(e) => setArticle({...article, title: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              className="form-input"
              value={article.category}
              onChange={(e) => setArticle({...article, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option value="travel">Travel</option>
              <option value="food">Food & Culinary</option>
              <option value="culture">Culture</option>
              <option value="events">Events</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Featured Image</label>
            <div className="image-upload-container">
              {article.image ? (
                <div className="image-preview">
                  <img src={URL.createObjectURL(article.image)} alt="Preview" />
                  <button 
                    className="remove-image"
                    onClick={() => setArticle({...article, image: null})}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setArticle({...article, image: e.target.files[0]})}
                    id="image-upload"
                    hidden
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>Drop your image here or click to upload</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea 
              className="form-input content-editor"
              rows="15"
              placeholder="Write your article content here..."
              value={article.content}
              onChange={(e) => setArticle({...article, content: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;