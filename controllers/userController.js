const supabase = require("../utils/supabaseClient");

const createUserSite = async (req, res) => {
  const { name, email, service, upiId } = req.body;

  const { data, error } = await supabase
    .from("sites")
    .insert([{ name, email, service, upiId }]);

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ site: data[0] });
};

module.exports = { createUserSite };
