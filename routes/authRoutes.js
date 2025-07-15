const express = require("express");
const router = express.Router();
const { supabase } = require("../utils/supabaseClient");

// Signup
router.post("/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ user: data.user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });
  res.status(200).json({ session: data.session });
});

module.exports = router;
