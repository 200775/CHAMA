import { Link } from "react-router-dom";
import {
  FaUsers,
  FaChartLine,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <h2>Smart Chama</h2>
<Link to="/dashboard">
        <FaChartLine /> Dashboard
      </Link>

      <Link to="/members">
        <FaUsers /> Members
      </Link>

      <Link to="/add-member">
        <FaUserPlus /> Add Member
      </Link>

      <button onClick={logout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
export default Sidebar;