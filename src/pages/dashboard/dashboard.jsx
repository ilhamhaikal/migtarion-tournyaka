import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import '../../assets/css/dashboard.css';
import AddArticle from './AddArticle';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/dashboard', icon: 'fa-home', label: 'Dashboard' },
    { path: '/dashboard/add-article', icon: 'fa-newspaper', label: 'Artikel' },
    { path: '/dashboard/events', icon: 'fa-calendar', label: 'Events' },
    { path: '/dashboard/users', icon: 'fa-users', label: 'Users' }
  ];

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Tournyaka</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className={window.location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path}>
                  <i className={`fas ${item.icon}`}></i> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="add-article" element={<AddArticle />} />
          <Route path="/" element={
            <>
              <header className="dashboard-header">
                <div className="header-left">
                  <h1>Dashboard</h1>
                </div>
                <div className="header-right">
                  <div className="search-bar">
                    <input type="search" placeholder="Search..." />
                    <i className="fas fa-search"></i>
                  </div>
                  <div className="admin-profile">
                    <img src="admin-avatar.jpg" alt="Admin" />
                    <span>Admin Name</span>
                  </div>
                </div>
              </header>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon"><i className="fas fa-newspaper"></i></div>
                  <div className="stat-details">
                    <h3>Total Articles</h3>
                    <p className="stat-number">124</p>
                    <span className="stat-trend positive">+12% from last month</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon"><i className="fas fa-calendar"></i></div>
                  <div className="stat-details">
                    <h3>Active Events</h3>
                    <p className="stat-number">45</p>
                    <span className="stat-trend positive">+5% from last month</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon"><i className="fas fa-users"></i></div>
                  <div className="stat-details">
                    <h3>Total Users</h3>
                    <p className="stat-number">1,234</p>
                    <span className="stat-trend positive">+8% from last month</span>
                  </div>
                </div>
              </div>

              <section className="recent-activity">
                <div className="section-header">
                  <h2>Recent Activity</h2>
                  <button className="btn-primary">View All</button>
                </div>
                
                <div className="activity-grid">
                  <div className="activity-card">
                    <h3>Latest Articles</h3>
                    <div className="activity-list">
                      <div className="activity-item">
                        <img src="article1.jpg" alt="Article" />
                        <div className="activity-info">
                          <h4>Pesona Pantai Pangandaran</h4>
                          <p>Published 2 hours ago</p>
                        </div>
                        <div className="activity-actions">
                          <button><i className="fas fa-edit"></i></button>
                          <button><i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="activity-card">
                    <h3>Upcoming Events</h3>
                    <div className="activity-list">
                      <div className="activity-item">
                        <div className="event-date">
                          <span className="day">15</span>
                          <span className="month">Aug</span>
                        </div>
                        <div className="activity-info">
                          <h4>Festival Pantai 2024</h4>
                          <p>08:00 AM - 05:00 PM</p>
                        </div>
                        <div className="activity-actions">
                          <button><i className="fas fa-edit"></i></button>
                          <button><i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          } />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;