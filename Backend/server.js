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

// CORS configuration
const corsOptions = {
    origin: 'https://tomato-food-del-frontend.vercel.app/',
    credentials: true
};

app.use(cors(corsOptions));

// Manual CORS headers (for debugging, can be removed if not needed)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://tomato-food-del-frontend.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log('Applying CORS settings'); // Log to verify middleware application
    next();
});

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
