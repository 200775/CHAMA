import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AddMember() {
  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/members",
        member
      );

      alert("Member added successfully");

      setMember({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      alert("Failed to add member");
       }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <div className="form-card">
          <h1>Add New Member</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Member Name"
              value={member.name}
              onChange={handleChange}
            />
             <input
              type="email"
              name="email"
              placeholder="Member Email"
              value={member.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={member.phone}
              onChange={handleChange}
            />

            <button type="submit">Add Member</button>
          </form>
        </div>
         </div>
    </div>
  );
}

export default AddMember;