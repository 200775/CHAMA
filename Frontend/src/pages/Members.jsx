import { useEffect, useState } from "react";
import axios from "axios";

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://chamazyl.up.railway.app/api/members")
      .then(res => setMembers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Members</h1>
      {members.map(m => (
        <p key={m._id}>{m.name}</p>
      ))}
    </div>
  );
}

export default Members;