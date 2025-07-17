import express from "express";

import { getproducts, getTransactions } from "../controllers/client.js";
const router = express.Router();

router.get("/products", getproducts);
router.get("/transactions", getTransactions);
export default router;
