import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import generalRoutes from "./routes/general.js";
import clientRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not set
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
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
