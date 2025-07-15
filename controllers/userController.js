const supabase = require("../utils/supabaseClient");

const createUserSite = async (req, res) => {
  const { full_name, email, service, upiId, slug } = req.body;

  // 1. upsert user
  const { data: user } = await supabase
    .from("users")
    .upsert({ full_name, email })
    .select("id")
    .single();

  // 2. create site
  const { data: site, error } = await supabase
    .from("sites")
    .insert({
      user_id: user.id,
      slug,
      title: full_name,
      service,
      upi_id: upiId,
    })
    .select("*")
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ slug: site.slug });
};

module.exports = { createUserSite };
