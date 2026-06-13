import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Contributions.css';

export default function Contributions() {
  const [ledgers, setLedgers] = useState([
    { id: 1, name: "Grace Kendi", amount: 5000, date: "2026-06-10", method: "M-Pesa", status: "Verified" },
    { id: 2, name: "David Ochieng", amount: 5000, date: "2026-06-09", method: "Bank Trans", status: "Pending" }
  ]);

  return (
    <div className="sub-page-view">
      <Navbar />
      <div className="view-content-wrapper">
        <div className="view-title-strip">
          <h2>Collections Ledger</h2>
          <button className="export-statement-trigger">📥 Export CSV Ledger</button>
        </div>

        <div className="table-responsive-wrapper">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Member Contributor</th>
                <th>Amount Contributed</th>
                <th>Deposit Value Date</th>
                <th>Routing Channel</th>
                <th>Audit Verification</th>
              </tr>
            </thead>
            <tbody>
              {ledgers.map(l => (
                <tr key={l.id}>
                  <td><strong>{l.name}</strong></td>
                  <td>KES {l.amount.toLocaleString()}</td>
                  <td>{new Date(l.date).toLocaleDateString('en-KE')}</td>
                  <td><span className="badge-subtle">{l.method}</span></td>
                  <td><span className={`status-dot ${l.status.toLowerCase()}`}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
