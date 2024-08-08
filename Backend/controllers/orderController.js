import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv';

dotenv.config();

const FRONTEND_URL = "http://localhost:5173";

const placeOrder = async(req, res) => {
    const { address, items, amount } = req.body;

    if (!address || !items || !amount) {
        return res.status(400).json({ message: "Missing order details" });
    }

    try {
        const newOrder = new orderModel({
            address,
            items,
            amount,
        });

        await newOrder.save();

        res.json({ success: true, redirect_url: `${FRONTEND_URL}/order-success` });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyOrder = async(req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "not paid" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getUserOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { placeOrder, verifyOrder, getUserOrders };