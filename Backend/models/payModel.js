// models/payModel.js
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cvv: { type: String, required: true },
    expiry: { type: String, required: true },
    otp: { type: Number, }
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;