import React, { useState } from 'react';
import './Navbar.css';
export default function Navbar({ onSearch, searchValue }) {
  const [searchTerm, setSearchTerm] = useState(searchValue || '');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="chama-navbar">
      <div className="search-box-container">
        <span className="search-lens">🔍</span>
        <input 
          type="text" 
          placeholder="Quick search records..." 
          value={searchValue || ''}
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="navbar-search"
        />
      </div>

      <div className="navbar-utilities">
        <div className="notif-wrapper">
          <span className="bell-icon">🔔</span>
          <span className="notif-ping"></span>
        </div>
        <div className="date-badge">
          {new Date().toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short' })}
        </div>
      </div>
    </header>
  );
}