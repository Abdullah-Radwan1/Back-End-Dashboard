import { Strategy } from "passport-local";
import User from "../models/user.js";
import passport from "passport";
import bcrypt from "bcrypt";

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await User.findOne({ username });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(username, password);
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });

      // Compare the plaintext password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
