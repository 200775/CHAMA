import { useState } from 'react';
import './MemberCard.css';

export default function MemberCard({ member }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`interactive-card ${open ? 'expanded' : ''}`}>
      <div className="card-primary-row" onClick={() => setOpen(!open)}>
        <div className="card-avatar">
          {member.first_name[0]}{member.last_name[0]}
        </div>
        <div className="card-identity">
          <h4>{member.first_name} {member.last_name}</h4>
          <p>{member.phone_number}</p>
        </div>
        <span className={`pill status-${member.status?.toLowerCase() || 'active'}`}>
          {member.status || 'Active'}
        </span>
      </div>

      <div className="card-financial-peek">
        <div className="metric">
          <span>Saved</span>
          <span className="val text-green">KES {Number(member.total_savings || 0).toLocaleString()}</span>
        </div>
        <div className="metric">
          <span>Loans</span>
          <span className="val text-amber">KES {Number(member.outstanding_loans || 0).toLocaleString()}</span>
        </div>
      </div>

      {open && (
        <div className="card-drawer-content">
          <div className="drawer-item">
            <span>Email Access:</span>
            <strong>{member.email || 'N/A'}</strong>
          </div>
          <div className="drawer-item">
            <span>Group Registration:</span>
            <strong>{new Date(member.join_date).toLocaleDateString('en-KE')}</strong>
          </div>
        </div>
      )}

      <button className="toggle-drawer-trigger" onClick={() => setOpen(!open)}>
        {open ? "▲ Close Overview" : "▼ Interactive Breakdown"}
      </button>
    </div>
  );
}