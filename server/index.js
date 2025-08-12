import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import rateLimit from "express-rate-limit";

// Import routes
import generalRoutes from "./routes/general.js";
import clientRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import authRoutes from "./routes/auth.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Trust proxy (needed for secure cookies when behind HTTPS)
app.set("trust proxy", 1);

// ✅ Allow all origins and cookies
app.use(
  cors({
    origin: true, // Reflect request origin
    credentials: true, // Allow cookies & sessions
  })
);

// ✅ Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "fail",
    message: "Too many requests, please try again later.",
  },
});
app.use(limiter);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Helmet security headers (but relaxed to not block cookies)
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.referrerPolicy({ policy: "no-referrer-when-downgrade" }));

// ✅ Logging
app.use(morgan("common"));

// ✅ Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    cookie: {
      secure: true, // Secure cookies for HTTPS
      httpOnly: true,
      sameSite: "none", // ✅ Required for cross-site cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);
app.use("/auth", authRoutes);

// ✅ Global error handler
app.use(globalErrorHandler);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
