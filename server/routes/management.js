import express from "express";
import { getCutomers } from "../controllers/client.js";

const router = express.Router();
router.get("/customers", getCutomers);
export default router;
