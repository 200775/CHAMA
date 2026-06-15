
import axios from "axios";
import Navbar from '../components/Navbar';
import './AddMember.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddMember() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [joinDate, setJoinDate] = useState(new Date().toISOString().split('T')[0]); // Defaults to today
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ text: '', type: '' });

    try {
      const response = await fetch('https://z4pvw5m6-5000.uks1.devtunnels.ms/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          phone_number: phoneNumber,
          join_date: joinDate
        })
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ text: '🎉 Member added successfully to your Chama database!', type: 'success' });
        
        // Reset form inputs
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        
        // Smoothly redirect over to your members list table viewport after 2 seconds
        setTimeout(() => {
          navigate('/dashboard/members');
        }, 2000);
      } else {
        setFeedback({ text: data.message || 'Database rejected profile save request.', type: 'error' });
      }
    } catch (err) {
      console.error('Submission connection error:', err);
      setFeedback({ text: 'Network connection failure. Verify your Backend server is running.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-member-container animate-fade-in">
      <div className="form-heading">
        <h1>Register New Member</h1>
        <p>Input bookkeeping registration parameters to store securely in database tables.</p>
      </div>

      {feedback.text && (
        <div className={`status-banner ${feedback.type}`}>
          {feedback.type === 'success' ? '✅' : '⚠️'} {feedback.text}
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="add-member-form-card">
        <div className="form-grid-layout">
          
          <div className="input-block">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. John Kamau"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="input-block">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="input-block">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="e.g. +254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="input-block">
            <label htmlFor="joinDate">Chama Joining Date</label>
            <input
              id="joinDate"
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

        </div>

        <div className="form-actions-tray">
          <button type="submit" className="save-member-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Syncing Database Records...' : 'Save Member to System'}
          </button>
        </div>
      </form>
    </div>
  );
}

