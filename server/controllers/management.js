import User from "./../models/user.js";
import Transaction from "../models/transactions.js";
export const getAdmins = async (req, res) => {
 try {
  const admins = await User.find({ role: "admin" }).select("-password");
  console.log(admins); // Check what data is retrieved
  res.status(200).json(admins);
 } catch (error) {
  res.status(404).json({ message: error.message });
 }
};

export const getUserPerformance = async (req, res) => {
 try {
 } catch (error) {
  res.status(404).json({ message: error.message });
 }
};
