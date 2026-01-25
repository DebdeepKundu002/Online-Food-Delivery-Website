import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import foodCounterRoute from "./routes/food_counter.route.js";
import foodRoute from "./routes/food.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/admin.route.js";
import paymentGetway from "./routes/payment.route.js";
import CartRoute from "./routes/cart.route.js";
import OrderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import wishlistRoute from "./routes/wishlist.route.js";
import aboutAdmin from "./routes/aboutAdmin.route.js";
import deliveryBoy from "./routes/deliveryBoy.routes.js";

dotenv.config();

const app = express();

/* =======================
   Middleware
======================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =======================
   CORS CONFIG (FIXED)
======================= */

const allowedOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman, curl, server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // ✅ ADD PATCH
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight support
app.options("*", cors());

/* =======================
   Routes
======================= */

app.get("/", (req, res) => {
  res.send("Welcome in Food Project");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/foodCounter", foodCounterRoute);
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/adminRoute", adminRoute);
app.use("/api/v1/paymentGetway", paymentGetway);
app.use("/api/v1/cart", CartRoute);
app.use("/api/v1/order", OrderRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/aboutAdmin", aboutAdmin);
app.use("/api/v1/deliveryBoy", deliveryBoy);

/* =======================
   Server
======================= */

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
