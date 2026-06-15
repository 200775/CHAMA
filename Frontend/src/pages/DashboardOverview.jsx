import React, { useState, useEffect } from 'react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalContributions: 0,
    totalLoans: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches live aggregated figures straight from your local database tables
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

  if (loading) return <div className="loading-state">Syncing secure database metrics...</div>;

  return (
    <div className="overview-container animate-fade-in">
      <div className="overview-header">
        <h1>Chama Performance Summary</h1>
        <p>Real-time accounting bookkeeping tracking balances.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card teal-card">
          <div className="metric-icon">👥</div>
          <div className="metric-data">
            <h3>Total Members</h3>
            <p className="metric-number">{stats.totalMembers}</p>
          </div>
        </div>

        <div className="metric-card gold-card">
          <div className="metric-icon">💰</div>
          <div className="metric-data">
            <h3>Total Contributions</h3>
            <p className="metric-number">KES {stats.totalContributions.toLocaleString()}</p>
          </div>
        </div>

        <div className="metric-card indigo-card">
          <div className="metric-icon">🏦</div>
          <div className="metric-data">
            <h3>Active Loan Pool</h3>
            <p className="metric-number">KES {stats.totalLoans.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}