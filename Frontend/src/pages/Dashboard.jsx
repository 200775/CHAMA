/*import { useEffect, useState } from "react";
import axios from "../axios";

export default function Dashboard() {
  const [membersCount, setMembersCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get("/members");
    setMembersCount(res.data.length);
  };

  return (
    <div>
      <h1>Chama Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>Members: {membersCount}</div>
        <div>Contributions: coming soon</div>
        <div>Loans: coming soon</div>
      </div>
    </div>
  );
}*/
import React from "react";
import Sidebar from "../components/Sidebar";
import axios from "../axios";
function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <h1>Chama Dashboard</h1>

        <div className="stats-grid">
          <div className="card">
            <h2>KES 150,000</h2>
            <p>Total Savings</p>
          </div>
          <div className="card">
            <h2>24</h2>
            <p>Total Members</p>
          </div>

          <div className="card">
            <h2>KES 35,000</h2>
            <p>Loans Issued</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;