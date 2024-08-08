// routes/payRoute.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getPayments, addPayment } from '../controllers/payController.js';

const payRouter = express.Router();

// Get all payments (protected route)
payRouter.get('/pay', getPayments);

// Add a payment (protected route)
payRouter.post('/pay', addPayment);

export default payRouter;