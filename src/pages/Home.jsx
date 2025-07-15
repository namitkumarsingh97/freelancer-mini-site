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
    await axios.post("http://localhost:2025/api/users/create", form);
    alert("🎉 Mini-site created!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Create Your Mini-Site 🚀
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Service (e.g. Yoga Tutor)"
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Your UPI ID"
            onChange={(e) => setForm({ ...form, upiId: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Create My Site
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
