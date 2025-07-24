import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors"; // Import CORS
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import rateLimit from "express-rate-limit";
// import routes
import generalRoutes from "./routes/general.js";
import clientRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import authRoutes from "./routes/auth.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
dotenv.config();
const PORT = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not set
const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONT_END_URL, // or whatever your frontend is
    credentials: true, // allow cookies, sessions, etc.
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: "fail",
    message: "Too many requests, please try again later.",
  },
});
//adding limiter to all routes
app.use(limiter); // ⛔ Apply globally or to specific routes
// app.use("/api/auth/login", apiLimiter); // apply only to login
// Middlewares
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));

app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    cookie: {
      secure: false, // change to true in prod + https
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use(globalErrorHandler);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
