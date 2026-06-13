import React from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import './Loans.css';

export default function Loans() {
  const activeLoans = [
    { id: 1, borrower: "Alex Mwangi", principal: 40000, balance: 15000, dueDate: "2026-08-01" }
  ];

  return (
    <div className="sub-page-view">
      <Navbar />
      <div className="view-content-wrapper">
        <div className="view-title-strip">
          <h2>Group Credit Exposure Logs</h2>
          <button className="primary-action-trigger">Authorize New Disbursement</button>
        </div>

        <div className="loan-tracking-grid">
          {activeLoans.map(loan => (
            <div key={loan.id} className="loan-track-card">
              <h4>{loan.borrower}</h4>
              <div className="loan-progress-metrics">
                <span>Remaining Obligation: KES {loan.balance.toLocaleString()}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '60%' }}></div></div>
              </div>
              <p className="due-warning">Matures: {new Date(loan.dueDate).toLocaleDateString('en-KE')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
