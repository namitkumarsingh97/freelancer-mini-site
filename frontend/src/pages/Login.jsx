import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2025/api/auth/login",
        form
      );
      console.log('res: ', res);
      const { session } = res.data;

      localStorage.setItem("token", session.access_token);

      setError(null);
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">
          Log In
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Log In
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
