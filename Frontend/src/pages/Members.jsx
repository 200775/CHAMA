/*import axios from "axios";
import MemberCard from '../components/MemberCard';
export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch data from your Node.js API
    fetch('http://localhost:5000/api/members')
      .then(response => response.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching Chama members:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading Chama Directory...</div>;
  return (
    <div className="members-page">
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Chama Members Directory6</h2>
        <span className="count-badge">{members.length} Total Members</span>
      </div>
      <div className="members-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {members.map(member => (
          <MemberCard 
            key={member.member_id} 
            memberData={member} // Passing the database row down as a prop
          />
        ))}
      </div>
    </div>
  );
}
*/
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MemberCard from '../components/MemberCard';
import './Members.css';
import pool from '../config/db.js';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Standard secure streaming extraction loop
    fetch('http://localhost:5000/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error(err));
  }, []);

  const dataFiltered = members.filter(m => 
    `${m.first_name} ${m.last_name}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="sub-page-view">
      <Navbar onSearch={setQuery} searchValue={query} />
      <div className="view-content-wrapper">
        <div className="view-title-strip">
          <h2>Active Directory Profiles</h2>
          <span className="count-pill">{dataFiltered.length} Members Listed</span>
        </div>

        <div className="responsive-members-grid">
          {dataFiltered.map(m => (
            <MemberCard key={m.member_id} member={m} />
          ))}
        </div>
      </div>
    </div>
  );
}