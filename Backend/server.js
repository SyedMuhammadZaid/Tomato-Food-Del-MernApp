import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());

const allowedOrigin = ''; // Single allowed origin

const corsOptions = {
  origin: allowedOrigin,
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
};

// Configure CORS middleware
app.use(cors(corsOptions));

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API created");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
