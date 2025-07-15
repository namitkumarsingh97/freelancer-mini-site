import React, { useState } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2025/api/auth/signup",
        form
      );
      console.log("res:", res);
      setSuccess("Signup successful! Please log in.");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess(null);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
      <div className="w-full max-w-sm p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            className="w-full p-3 border rounded-md"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded-md"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full p-3 border rounded-md"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </form>
      </div>
    </div>
  );
}
