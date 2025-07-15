import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    upiId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:2025/api/users/create",
      form
    );
    alert("Mini-site created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Service (e.g. Yoga Tutor)"
        onChange={(e) => setForm({ ...form, service: e.target.value })}
      />
      <input
        placeholder="UPI ID"
        onChange={(e) => setForm({ ...form, upiId: e.target.value })}
      />
      <button type="submit">Create My Mini Site</button>
    </form>
  );
};

export default Home;
