import express from "express";

import { getCostumers, getGeography, getproducts, getTransactions } from "../controllers/client.js";
const router = express.Router();

router.get("/products", getproducts);
router.get("/customers", getCostumers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);
export default router;
