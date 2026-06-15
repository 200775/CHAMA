
import axios from "../axios";
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import './Dashboard.css'; 
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; 
import { Outlet, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import React from 'react';

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve the logged-in admin's email from localStorage
  const adminEmail = localStorage.getItem('chama_email') || 'admin@chama.or.ke';
  // Split email to create a clean display username
  const adminUsername = adminEmail.split('@')[0];

  const handleSignOut = () => {
    localStorage.removeItem('chama_email');
    onLogout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      
      {/* 1. SIDEBAR PANEL */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-logo">🇰🇪</span>
          <div>
            <h3>Chamaz</h3>
            <p>Admin Portal</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          <Link 
            to="/dashboard" 
            className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            📊 Overview
          </Link>
          <Link 
            to="/dashboard/members" 
            className={`menu-item ${location.pathname.includes('members') ? 'active' : ''}`}
          >
            👥 Members
          </Link>
          <Link 
            to="/dashboard/add-member" 
            className={`menu-item ${location.pathname.includes('add-member') ? 'active' : ''}`}
          >
            ➕ Add Member
          </Link>
          <Link 
            to="/dashboard/contributions" 
            className={`menu-item ${location.pathname.includes('contributions') ? 'active' : ''}`}
          >
            💰 Contributions
          </Link>
          <Link 
            to="/dashboard/loans" 
            className={`menu-item ${location.pathname.includes('loans') ? 'active' : ''}`}
          >
            🏦 Loans
          </Link>
        </nav>

        {/* 2. ADMIN PROFILE FOOTER */}
        <div className="sidebar-profile-footer">
          <div className="profile-avatar">
            {adminUsername.substring(0, 2).toUpperCase()}
          </div>
          <div className="profile-info">
            <span className="profile-name">@{adminUsername}</span>
            <span className="profile-role">System Admin</span>
          </div>
          <button onClick={handleSignOut} className="logout-action-btn" title="Sign Out">
            🚪
          </button>
        </div>
      </aside>

      {/* 3. MAIN APP VIEWPORT */}
      <main className="main-content-panel">
        <Outlet />
      </main>

    </div>
  );
}