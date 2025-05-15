import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Verifikasi akses saat komponen di-mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = Number(localStorage.getItem('role'));
    
    // Jika user biasa (role 3) mencoba akses dashboard, redirect ke home
    if (!token || role === 3) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/v1/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      // Hapus token & role jika gagal
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

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
              <Link to="/admin/dashboard"><i className="fas fa-home"></i> Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/dashboard/add-article"><i className="fas fa-newspaper"></i> Add Article</Link>
            </li>
            <li className="logout-item">
              <button className="logout-btn" onClick={() => setShowLogoutConfirm(true)}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="modal-content">
            <h3>Konfirmasi Logout</h3>
            <p>Apakah Anda yakin ingin keluar?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowLogoutConfirm(false)}>
                Batal
              </button>
              <button className="confirm-btn" onClick={handleLogout}>
                Ya, Logout
              </button>
            </div>
          </div>
          <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}></div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;