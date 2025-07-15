const razorpay = require("../utils/razorpayClient");
const supabase = require("../utils/supabaseClient");

exports.createOrder = async (req, res) => {
  const { slug, amount } = req.body;
  const site = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .single();

  // create razorpay order (₹ to paise)
  const rzpOrder = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    payment_capture: 1,
    notes: { slug },
  });

  // save log
  await supabase.from("payments_log").insert({
    site_id: site.data.id,
    razorpay_order_id: rzpOrder.id,
    amount,
    status: "created",
  });

  res.json({ orderId: rzpOrder.id, key: process.env.RAZORPAY_KEY_ID });
};
