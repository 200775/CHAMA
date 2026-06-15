
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardOverview.css';

export default function DashboardOverview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMembers: 2,
    totalContributions: 0,
    totalLoans: 0
  });
  const [loading, setLoading] = useState(true);

  // Grab active admin name from email storage
  const adminEmail = localStorage.getItem('chama_email') || 'Admin';
  const adminName = adminEmail.split('@')[0];

  useEffect(() => {
    fetch('https://z4pvw5m6-5000.uks1.devtunnels.ms/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading metrics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="premium-loader-wrapper">
        <div className="premium-spinner"></div>
        <p>Syncing encrypted Chama ledger keys...</p>
      </div>
    );
  }

  return (
    <div className="ov-viewport animate-fade-in">
      
      {/* 1. HERO GREETING BANNER */}
      <header className="ov-hero-banner">
        <div className="hero-text-wrapper">
          <h1>Welcome back, <span className="highlight-text">@{adminName}</span></h1>
          <p>Here is your Chama's financial standing and administrative checklist for today.</p>
        </div>
        <div className="hero-badge">System Status: Active 🟢</div>
      </header>

      {/* 2. HIGH-Fidelity METRIC CARDS */}
      <section className="ov-cards-grid">
        
        <div className="ov-premium-card card-members">
          <div className="card-glass-glow"></div>
          <div className="card-top">
            <span className="card-icon-frame">👥</span>
            <span className="trend-badge positive">+4 new</span>
          </div>
          <div className="card-body">
            <h3>Total Registered Members</h3>
            <h2>{stats.totalMembers}</h2>
            <p className="card-footer-text">Active regular accounts</p>
          </div>
        </div>

        <div className="ov-premium-card card-contributions">
          <div className="card-glass-glow"></div>
          <div className="card-top">
            <span className="card-icon-frame">💰</span>
            <span className="trend-badge neutral">This Month</span>
          </div>
          <div className="card-body">
            <h3>Total Pooled Contributions</h3>
            <h2>KES {stats.totalContributions.toLocaleString()}</h2>
            <p className="card-footer-text">Aggregated welfare capital savings</p>
          </div>
        </div>

        <div className="ov-premium-card card-loans">
          <div className="card-glass-glow"></div>
          <div className="card-top">
            <span className="card-icon-frame">🏦</span>
            <span className="trend-badge warning">Low Reserve</span>
          </div>
          <div className="card-body">
            <h3>Active Disbursed Loans</h3>
            <h2>KES {stats.totalLoans.toLocaleString()}</h2>
            <p className="card-footer-text">Outstanding principal collectibles</p>
          </div>
        </div>

      </section>

      {/* 3. TWO-COLUMN INTERACTIVE CONTENT GRID */}
      <section className="ov-content-split">
        
        {/* LEFT COLUMN: RECENT LEDGER ENTRIES LIST */}
        <div className="ov-panel table-panel">
          <div className="panel-header">
            <h3>Recent Activity Feed</h3>
            <span className="panel-tag">Live Log</span>
          </div>
          <div className="table-responsive">
            <table className="ov-modern-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Jane Koech</strong> initiated membership</td>
                  <td><span className="badge-cat join">Registration</span></td>
                  <td><span className="status-indicator done">Completed</span></td>
                </tr>
                <tr>
                  <td>Contribution paid via M-Pesa</td>
                  <td><span className="badge-cat deposit">Contribution</span></td>
                  <td><span className="status-indicator done">Verified</span></td>
                </tr>
                <tr>
                  <td>Loan payout process initiated</td>
                  <td><span className="badge-cat debit">Loan Issue</span></td>
                  <td><span className="status-indicator pending">Pending Approval</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK ADMINISTRATIVE ACTION HUB */}
        <div className="ov-panel action-panel">
          <div className="panel-header">
            <h3>Administrative Toolbelt</h3>
          </div>
          <p className="panel-subtitle">Immediate functional shortcuts to update system states.</p>
          
          <div className="action-buttons-list">
            <button onClick={() => navigate('/dashboard/add-member')} className="tool-btn teal-btn">
              <span>➕</span> Register New Member Profile
            </button>
            <button onClick={() => navigate('/dashboard/contributions')} className="tool-btn regular-btn">
              <span>💵</span> Record Capital Contribution
            </button>
            <button onClick={() => navigate('/dashboard/loans')} className="tool-btn regular-btn">
              <span>📝</span> Review Pending Loan Requests
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}