import { useEffect, useState } from "react";
import axios from "../axios";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");

  // GET members
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await axios.get("/members");
    setMembers(res.data);
  };

  // ADD member
  const addMember = async () => {
    await axios.post("/members", { name });
    setName("");
    alert("Member added!");
    fetchMembers();
  };

  // DELETE member
  const deleteMember = async (id) => {
    await axios.delete(`/members/${id}`);
    fetchMembers();
  };

  return (
    <div>
      <h2>Members</h2>

      <input
        placeholder="Member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addMember}>Add</button>

      <ul>
        {members.map((m) => (
          <li key={m._id}>
            {m.name}
            <button onClick={() => deleteMember(m._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
