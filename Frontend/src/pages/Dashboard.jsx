import { useEffect, useState } from "react";
import axios from "../api/axios";

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
}
