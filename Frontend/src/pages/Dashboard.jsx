
import axios from "../axios";
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'; 

export default function Dashboard({ onLogout }) {
  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2>Chamaz</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
          <Link to="/contributions" style={{ color: 'white', textDecoration: 'none' }}>Contributions</Link>
          <Link to="/loans" style={{ color: 'white', textDecoration: 'none' }}>Loans</Link>
          <Link to="/members" style={{ color: 'white', textDecoration: 'none' }}>Members</Link>
          <Link to="/add-member" style={{ color: 'white', textDecoration: 'none' }}>Add Member</Link>
        </nav>
        <button 
          onClick={onLogout} 
          style={{ marginTop: '50px', background: 'transparent', color: '#e74c3c', border: 'none', cursor: 'pointer' }}
        >
          Log Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: '40px', background: '#ecf0f1', overflowY: 'auto' }}>
        {/* The Outlet is where React Router injects the child components */}
        <Outlet /> 
      </main>

    </div>
  );
}