import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

// ✅ Trust proxy is needed if you’re behind Nginx, Vercel, Render, etc.
app.set("trust proxy", 1);

// ✅ Helmet security but without breaking cookies
app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // Needed for some cross-origin cookies
    contentSecurityPolicy: false, // Avoid strict blocking unless needed
  })
);

// ✅ Optional: keep referer safe but not blocking cookies
app.use(
  helmet.referrerPolicy({
    policy: "no-referrer-when-downgrade", // Safe & cookie-friendly
  })
);

// ✅ CORS settings to allow credentials (cookies)
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g., "https://yourfrontend.com"
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Session cookie settings
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // JS can't access the cookie
      secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Allow cross-site in prod
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Example auth route
app.get("/auth/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ username: req.session.user.username });
});

export default app;
