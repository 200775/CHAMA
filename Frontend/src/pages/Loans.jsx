
import axios from "axios";
import Navbar from '../components/Navbar';
import './Loans.css';

import React, { useState, useEffect } from 'react';

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [members, setMembers] = useState([]); // For selecting a member from a dropdown list
  const [loading, setLoading] = useState(true);
  
  // Form State parameters
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanStatus, setLoanStatus] = useState('Submitted'); // Defaults to 'Submitted'
  const [formFeedback, setFormFeedback] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with your API data hooks on render
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const loanRes = await fetch('https://z4pvw5m6-5000.uks1.devtunnels.ms/api/loans');
      const loanData = await loanRes.json();
      setLoans(Array.isArray(loanData) ? loanData : []);

      const memberRes = await fetch('https://z4pvw5m6-5000.uks1.devtunnels.ms/api/members');
      const memberData = await memberRes.json();
      setMembers(Array.isArray(memberData) ? memberData : []);
    } catch (err) {
      console.error('Error loading loan interface parameters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormFeedback({ text: '', type: '' });

    try {
      const response = await fetch('https://z4pvw5m6-5000.uks1.devtunnels.ms/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          member_id: selectedMemberId,
          amount: parseFloat(loanAmount),
          status: loanStatus
        })
      });

      const data = await response.json();

      if (response.ok) {
        setFormFeedback({ text: '🎉 Loan request successfully written to database!', type: 'success' });
        setLoanAmount('');
        setSelectedMemberId('');
        // Re-sync data grid automatically without full page reload
        fetchData();
      } else {
        setFormFeedback({ text: data.message || 'Database error processing application.', type: 'error' });
      }
    } catch (err) {
      console.error('Network Error:', err);
      setFormFeedback({ text: 'Connection failure. Verify backend pipeline server state.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && loans.length === 0) {
    return <div className="loans-loading">Syncing active loan registries...</div>;
  }

  return (
    <div className="loans-viewport animate-fade-in">
      <div className="loans-header-block">
        <h1>Chama Credit Ledger</h1>
        <p>Complete historical logging of issued capital advances and active requests.</p>
      </div>

      <div className="loans-card-wrapper">
        <table className="loans-premium-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Borrower Name</th>
              <th>Principal Amount</th>
              <th>Request Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-table-prompt">No active loan balances found in database registry.</td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan.loan_id}>
                  <td>#00{loan.loan_id}</td>
                  <td><strong>{loan.full_name || `Member ID: ${loan.member_id}`}</strong></td>
                  <td>KES {parseFloat(loan.amount).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge-node ${loan.status?.toLowerCase()}`}>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="loan-action-divider">
        <div className="divider-line"></div>
        <span>New Application Portal</span>
        <div className="divider-line"></div>
      </div>

      <div className="loans-form-card">
        <h3>Initiate New Loan Request</h3>
        <p className="form-helper-txt">Process an immediate withdrawal advancement allocation against pool resources.</p>

        {formFeedback.text && (
          <div className={`form-feedback-banner ${formFeedback.type}`}>
            {formFeedback.type === 'success' ? '🚀' : '⚠️'} {formFeedback.text}
          </div>
        )}

        <form onSubmit={handleLoanSubmit} className="inline-loan-form">
          <div className="loan-input-group">
            <label htmlFor="memberSelect">Select Borrower</label>
            <select
              id="memberSelect"
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              required
            >
              <option value="">-- Select Active Member --</option>
              {members.map(m => (
                <option key={m.member_id} value={m.member_id}>
                  {m.full_name} (ID: {m.member_id})
                </option>
              ))}
            </select>
          </div>

          <div className="loan-input-group">
            <label htmlFor="amountInput">Requested Amount (KES)</label>
            <input
              id="amountInput"
              type="number"
              min="1"
              placeholder="e.g. 25000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
            />
          </div>

          <div className="loan-input-group">
            <label htmlFor="statusSelect">Initial State Status</label>
            <select
              id="statusSelect"
              value={loanStatus}
              onChange={(e) => setLoanStatus(e.target.value)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <button type="submit" className="process-loan-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Writing to Ledger...' : 'Submit Loan Request'}
          </button>
        </form>
      </div>

    </div>
  );
}