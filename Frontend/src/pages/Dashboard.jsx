
import axios from "../axios";
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import './Dashboard.css'; 
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; 
import { Outlet, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
export default function Dashboard() {
  return (
    <div className="sub-page-view">
      <Navbar />
      <div className="view-content-wrapper">
        <div className="dashboard-hero">
          <h1>Habari, Treasurer</h1>
          <p>Here is an automated baseline report of the Group's financial health.</p>
        </div>

        {/* Financial KPI Summary Matrix */}
        <div className="summary-matrix">
          <div className="kpi-card group-savings">
            <span className="badge-ico">💰</span>
            <h3>Total Accumulated Pool</h3>
            <p className="kpi-amount">KES 1,450,000</p>
            <span className="trend positive">↑ +12.4% This month</span>
          </div>

          <div className="kpi-card active-loans">
            <span className="badge-ico">📈</span>
            <h3>Active Loans Awarded</h3>
            <p className="kpi-amount">KES 380,000</p>
            <span className="trend stable">8 Members Active</span>
          </div>

          <div className="kpi-card penalties">
            <span className="badge-ico">⚠️</span>
            <h3>Outstanding Penalties</h3>
            <p className="kpi-amount">KES 4,500</p>
            <span className="trend negative">Requires attention</span>
          </div>
        </div>

        {/* Quick Insights Block */}
        <div className="insights-panel">
          <h3>Upcoming Important Events</h3>
          <div className="insight-row">
            <div className="calendar-block"><span>15</span><span>Jun</span></div>
            <p>Monthly contribution collection cycle closes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
