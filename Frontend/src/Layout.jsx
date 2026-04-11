import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#111", color: "#fff", height: "100vh" }}>
        <h2>ChamaHub</h2>

        <Link to="/">Dashboard</Link><br />
        <Link to="/members">Members</Link><br />
        <Link to="/contributions">Contributions</Link><br />
        <Link to="/loans">Loans</Link>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}