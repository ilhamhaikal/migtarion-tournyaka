import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            <li className="active">
              <a href="/dashboard"><i className="fas fa-home"></i> Dashboard</a>
            </li>
            <li>
              <a href="/dashboard/add-article"><i className="fas fa-newspaper"></i> Add Article</a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;