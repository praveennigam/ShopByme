import express from "express";
import { placeOrder, verifyOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.post("/verify", verifyOrder);
router.get("/userOrders", getUserOrders);

export default router;