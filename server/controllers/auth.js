import User from "../models/user.js";
import passport from "passport";
import bcrypt from "bcrypt";
import "../strategy/passport.js";
import { custome_error } from "../utils/custome_error.js";
import { registerSchema } from "../utils/zod.schema.js";

// Register controller
export const register = async (req, res, next) => {
  const parsedData = registerSchema.safeParse(req.body);
  if (!parsedData.success) {
    // Send raw Zod error array
    return next(
      custome_error(
        parsedData.error.issues.map((e) => {
          return e.message;
        }),
        400
      )
    );
  }

  const { username, password } = parsedData.data;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return next(custome_error("Username already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    req.logIn(newUser, (err) => {
      if (err) return next(err);
      res.status(201).json({
        message: "Registered and logged in",
        user: newUser,
      });
    });
  } catch (error) {
    return next(custome_error("Registration failed", 500));
  }
};

// Login controller
export const login = (req, res, next) => {
  const parsedData = registerSchema.safeParse(req.body);
  if (!parsedData.success) {
    // Send raw Zod error array
    return next(
      custome_error(
        parsedData.error.issues.map((e) => {
          return e.message;
        }),
        400
      )
    );
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return next(custome_error("invalid credentials", 401));
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next); // 👈 important: immediately invoke the middleware
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    req.session.destroy();
    res.clearCookie("connect.sid"); // optional: مسح الكوكي الخاصة بالسيشن
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export const me = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    return next(custome_error("Failed to fetch user", 500));
  }
};
