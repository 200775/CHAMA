import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ onLogout }) {
  const [activeItem, setActiveItem] = useState('');

  return (
    <aside className="chama-sidebar">
      <div className="sidebar-brand">
        <h3>Chamaz Dashboard</h3>
        <span className="live-dot">● Active Session</span>
      </div>
      <nav className="sidebar-menu-top">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <span className="icon">📊</span> Dashboard
        </NavLink>
        <NavLink to="/contributions" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <span className="icon">💰</span> Contributions
        </NavLink>
        <NavLink to="/loans" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <span className="icon">📈</span> Loans Portal
        </NavLink>
        <NavLink to="/members" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <span className="icon">👥</span> Member Directory
        </NavLink>
      </nav>

      <div className="sidebar-menu-bottom">
        <NavLink to="/add-member" className={({ isActive }) => isActive ? "menu-item admin-btn active" : "menu-item admin-btn"}>
          <span className="icon">➕</span> Add New Member
        </NavLink>
        
        <div className="user-profile-tile">
          <div className="avatar">AD</div>
          <div className="info">
            <span className="name">System Admin</span>
            <span className="role">Treasurer</span>
          </div>
        </div>

        <button onClick={onLogout} className="logout-action-btn">
          Exit Portal
        </button>
      </div>
    </aside>
  );
}