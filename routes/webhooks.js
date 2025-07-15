const express = require("express");
const router = express.Router();
const supabase = require("../utils/supabaseClient");

router.post("/razorpay", async (req, res) => {
  const { payload } = req.body;
  const { entity } = payload.payment || {};
  if (entity && entity.status === "captured") {
    await supabase
      .from("payments_log")
      .update({ status: "captured", razorpay_payment_id: entity.id })
      .eq("razorpay_order_id", entity.order_id);
  }
  res.sendStatus(200);
});
module.exports = router;
