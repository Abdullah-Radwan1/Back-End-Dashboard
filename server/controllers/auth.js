import User from "../models/user.js";
import passport from "passport";
import bcrypt from "bcrypt";
import "../strategy/passport.js";
import { custome_error } from "../utils/custome_error.js";
// Register controller
export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // ✅ Optional: Auto-login the user
    req.logIn(newUser, (err) => {
      if (err) return next(err);
      res
        .status(201)
        .json({ message: "Registered and logged in", user: newUser });
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// Login controller
export const login = (req, res, next) => {
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
