import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/members"
      );

      setMembers(res.data);
       } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <h1>Members</h1>

        <div className="members-grid">
          {members.map((member) => (
            <div className="member-card" key={member._id}>
              <h3>{member.name}</h3>
              <p>{member.email}</p>
              <span>{member.phone}</span>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Members;