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

// import routes
import generalRoutes from "./routes/general.js";
import clientRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import authRoutes from "./routes/auth.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// ----------- CORS configuration -----------
app.use(
  cors({
    origin: process.env.FRONT_END_URL, // must match frontend exactly (including https://)
    credentials: true, // allow cookies
  })
);

// ----------- Security & rate limiting -----------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "fail",
    message: "Too many requests, please try again later.",
  },
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
app.use(morgan("common"));

// ----------- Session & Passport (BEFORE routes) -----------
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
      secure: true, // production = HTTPS required
      httpOnly: true,
      sameSite: "none", // required for cross-site cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ----------- Routes (AFTER session setup) -----------
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);
app.use("/auth", authRoutes);

// ----------- Global error handler -----------
app.use(globalErrorHandler);

// ----------- MongoDB connection & server start -----------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
