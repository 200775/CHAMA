
import axios from "axios";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import './AddMember.css';

export default function AddMemberPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [notif, setNotif] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          phone_number: form.phone,
          email: form.email
        })
      });
      
      if(response.ok) {
        setNotif('✅ Member profile provisioned successfully inside database.');
        setForm({ firstName: '', lastName: '', phone: '', email: '' });
      }
    } catch (err) {
      setNotif('❌ Request dispatch failed.');
    }
  };

  return (
    <div className="sub-page-view">
      <Navbar />
      <div className="view-content-wrapper">
        <div className="form-card-container">
          <h2>Provision Member Profile Account</h2>
          <p>Register a new member to the savings group.</p>

          {notif && <div className="system-alert-banner">{notif}</div>}

          <form onSubmit={handleRegisterSubmit} className="structured-form-layout">
            <div className="form-input-pair-row">
              <div className="input-field-block">
                <label>Legal Given Name</label>
                <input type="text" required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}/>
              </div>
              <div className="input-field-block">
                <label>Family Surname</label>
                <input type="text" required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}/>
              </div>
            </div>

            <div className="input-field-block">
              <label>Safaricom Mobile Number (M-Pesa Ledger Link)</label>
              <input type="tel" required placeholder="e.g. 07XXXXXXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}/>
            </div>

            <div className="input-field-block">
              <label>Communication Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
            </div>

            <button type="submit" className="commit-disbursement-btn">Save Member Record</button>
          </form>
        </div>
      </div>
    </div>
  );
}