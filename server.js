require("dotenv").config();
const express = require("express");
const cors = require("cors");
const supabase = require("./utils/supabaseClient");

const userRoutes = require("./routes/users");
const webhookRoutes = require("./routes/webhooks");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/webhooks", webhookRoutes);
app.use("/api/auth", authRoutes);

app.get("/u/:slug", async (req, res) => {
  const { slug } = req.params;

  const { data: site, error } = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !site) return res.status(404).send("Site not found");

  res.send(`
    <html>
      <head><title>${site.title}</title></head>
      <body style="font-family:sans-serif;text-align:center;">
        <h1>${site.title}</h1>
        <p>${site.service}</p>
        <button onclick="pay()">Pay / Book Now</button>

        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <script>
          function pay(){
            fetch('/api/pay', {
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({ slug:'${slug}', amount:499 })
            })
            .then(r=>r.json())
            .then(d=>{
              const rzp = new Razorpay({
                key: d.key,
                order_id: d.orderId,
                amount: 49900,
                currency: 'INR',
                name: '${site.title}',
              });
              rzp.open();
            });
          }
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
