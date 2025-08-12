import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

// Import your routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";

const app = express();

// ✅ Trust proxy for HTTPS cookies
app.set("trust proxy", 1);

// ✅ Helmet with safer defaults for cookies
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
);

app.use(
  helmet.referrerPolicy({
    policy: "no-referrer-when-downgrade",
  })
);

// ✅ CORS to allow credentials
app.use(
  cors({
    origin: process.env.CLIENT_URL, // example: "https://yourfrontend.com"
    credentials: true,
  })
);

// ✅ Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false, // allow JS access
      secure: true, // must be true for cross-site in HTTPS
      sameSite: "none", // allow all sites
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
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

// ✅ Example route to test cookies
app.get("/check-cookie", (req, res) => {
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  res.json({ loggedIn: false });
});

export default app;
