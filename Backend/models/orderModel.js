import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    address: {
        firstName: String,
        lastName: String,
        email: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
        phone: String
    },
    items: [{
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number
    }],
    amount: Number,
    payment: { type: Boolean, default: false }
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;