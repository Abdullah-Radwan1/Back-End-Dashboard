import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors"; // Import CORS

// import routes
import generalRoutes from "./routes/general.js";
import clientRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";

dotenv.config();
const PORT = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not set
const app = express();

// CORS configuration
app.use(cors()); // Enable CORS for all requests

// Middlewares
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);

// MongoDB connection
mongoose
 .connect(process.env.MONGO_URL)
 .then(async () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
   //    AffiliateStat.insertMany(dataAffiliateStat);
   console.log(`Server is running on port ${PORT}`);
  });
 })
 .catch((err) => {
  console.error("Error connecting to MongoDB:", err);
 });
